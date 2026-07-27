import { TELEGRAM_CHANNEL } from "./constants";

/**
 * Live sermon list, scraped from Telegram's public channel preview.
 *
 * Telegram has no read API for public channels without a bot token, but
 * `t.me/s/<channel>` is server-rendered HTML containing the last 20 posts, and
 * `?before=<id>` pages backwards through the archive. That is the only
 * no-credentials route to this data, so we fetch and parse it on the server.
 *
 * ⚠️ This is scraping. The markup is stable and machine-generated, but it is not
 * a contract — if Telegram restyles the preview, `parseChannelPage` stops
 * matching and `getLatestSermons` returns []. Every caller must render an empty
 * state rather than assume results.
 */

export interface Sermon {
  /** Telegram message ID. */
  id: number;
  title: string;
  /** Performer tag from the audio file, when the upload carries one. */
  performer?: string;
  /** ISO 8601 timestamp from the post's <time datetime="…">. */
  date: string;
  /** Permalink to the post. */
  url: string;
  /**
   * Playback length, e.g. "42:15".
   *
   * ⚠️ Almost always absent. Telegram's preview exposes a duration for *voice
   * notes* and video, but this channel posts sermons as audio **documents**,
   * whose markup carries only title and performer — no duration, no
   * `data-duration`, nothing derivable. Verified against the live endpoint.
   * Treat this as optional forever and never synthesise a value.
   */
  duration?: string;
}

/** Newest 20 posts live at the bare URL; older pages need `?before=`. */
const CHANNEL_URL = `https://t.me/s/${TELEGRAM_CHANNEL}`;

/**
 * How many 20-post pages to walk back looking for audio. The channel mixes
 * daily text devotionals with occasional sermons, so the newest page is
 * routinely all text — without paging back the list would render empty. Eight
 * pages ≈ 160 posts of lookback, which is several months of history.
 */
const MAX_PAGES = 8;

const REVALIDATE_SECONDS = 3600;

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(chunk: string, re: RegExp): string | null {
  const m = chunk.match(re);
  return m ? stripTags(m[1]) : null;
}

/**
 * Telegram names an un-tagged upload after its file, which surfaces as a title
 * like "Audio" or "AUD-20260605-WA0001". Those tell a visitor nothing, so the
 * caption is preferred when the title looks auto-generated.
 */
function isGenericTitle(title: string): boolean {
  return (
    title.length === 0 ||
    /^(audio|voice|video|file|document)$/i.test(title) ||
    /^(aud|rec|voice|audio)[-_ ]?\d/i.test(title) ||
    /\.(mp3|m4a|ogg|wav|opus)$/i.test(title)
  );
}

/** Extracts every audio post on one rendered channel page, oldest first. */
export function parseChannelPage(html: string): Sermon[] {
  const sermons: Sermon[] = [];

  // Each post opens with `<div class="tgme_widget_message …" data-post="…">`.
  for (const chunk of html.split('<div class="tgme_widget_message ').slice(1)) {
    const idMatch = chunk.match(/data-post="[^"/]+\/(\d+)"/);
    if (!idMatch) continue;

    // The icon's `audio` modifier is what separates a sermon upload from a PDF
    // or an image; voice notes use their own block entirely.
    const isAudioDocument =
      /tgme_widget_message_document_icon[^"]*\baudio\b/.test(chunk);
    const isVoice = /tgme_widget_message_voice/.test(chunk);
    if (!isAudioDocument && !isVoice) continue;

    const date = chunk.match(/<time[^>]*datetime="([^"]+)"/)?.[1];
    if (!date) continue;

    const fileTitle =
      firstMatch(
        chunk,
        /tgme_widget_message_document_title[^>]*>([\s\S]*?)<\/div>/
      ) ?? "";
    const caption =
      firstMatch(chunk, /tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/) ?? "";
    const performer =
      firstMatch(
        chunk,
        /tgme_widget_message_document_extra[^>]*>([\s\S]*?)<\/div>/
      ) ?? "";

    let title = fileTitle;
    if (isGenericTitle(title) && caption) {
      // First sentence of the caption, capped so a long devotional doesn't
      // blow out the row.
      const excerpt = caption.split(/(?<=[.!?])\s/)[0] ?? caption;
      title = excerpt.length > 90 ? `${excerpt.slice(0, 87).trimEnd()}…` : excerpt;
    }
    if (!title) title = "Untitled teaching";

    // Matches tgme_widget_message_voice_duration / _video_duration. Audio
    // documents have no such node — see the Sermon.duration note.
    const duration = firstMatch(chunk, /_duration"[^>]*>([^<]+)</);

    const id = Number(idMatch[1]);
    sermons.push({
      id,
      title,
      date,
      url: `https://t.me/${TELEGRAM_CHANNEL}/${id}`,
      ...(performer ? { performer } : {}),
      ...(duration ? { duration } : {}),
    });
  }

  return sermons;
}

async function fetchPage(before?: number): Promise<string | null> {
  const url = before ? `${CHANNEL_URL}?before=${before}` : CHANNEL_URL;
  try {
    const res = await fetch(url, {
      // Telegram serves a stripped page to unrecognised clients.
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AOAMinistriesBot/1.0)" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    // Network failure, DNS, timeout — the caller renders the empty state.
    return null;
  }
}

/**
 * The `limit` most recent sermon posts, newest first. Returns [] on any
 * failure — callers must handle that, not assume a populated list.
 */
export async function getLatestSermons(limit = 5): Promise<Sermon[]> {
  const collected = new Map<number, Sermon>();
  let before: number | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const html = await fetchPage(before);
    if (!html) break;

    const found = parseChannelPage(html);
    for (const sermon of found) collected.set(sermon.id, sermon);

    if (collected.size >= limit) break;

    // Page backwards from the oldest post on this page — including non-audio
    // ones, otherwise an all-text page would leave `before` unchanged.
    const allIds = [...html.matchAll(/data-post="[^"/]+\/(\d+)"/g)].map((m) =>
      Number(m[1])
    );
    if (allIds.length === 0) break;

    const oldest = Math.min(...allIds);
    if (before !== undefined && oldest >= before) break; // no progress; stop
    before = oldest;
  }

  return [...collected.values()].sort((a, b) => b.id - a.id).slice(0, limit);
}
