/**
 * Birthday testimony wall — storage + notification.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SETUP (must be done before this works in production)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 1. STORAGE — a Redis-compatible KV store (Vercel Storage → Upstash Redis).
 *
 *    ⚠️ This project's store uses a CUSTOM ENV VAR PREFIX. `@vercel/kv`
 *    auto-detects only the unprefixed `KV_REST_API_URL` / `KV_REST_API_TOKEN`,
 *    which do not exist here, so `getKv()` below passes the values to
 *    `createClient` explicitly. The names actually read are:
 *
 *      AYODELE_KV_REST_API_URL              ← required
 *      AYODELE_KV_REST_API_TOKEN            ← required (read/write)
 *      AYODELE_KV_REST_API_READ_ONLY_TOKEN  ← optional, used by GET
 *
 *    Vercel also exposes AYODELE_KV_URL and AYODELE_REDIS_URL. Both are
 *    `redis://` connection strings for a TCP client; `@vercel/kv` speaks the
 *    REST protocol, so neither is used here. Leave them set — they cost
 *    nothing and another client may want them later.
 *
 *    ⚠️ If the store is ever re-provisioned WITHOUT the prefix, these names
 *    change and the route returns 503 until they are updated. There is no
 *    fallback to the unprefixed names, on purpose — see getKv().
 *
 *    For local testing, pull the real values down:
 *
 *      vercel env pull .env.local
 *
 *    `.env*` is gitignored, so nothing pulled is ever committed. The required
 *    names are documented in `.env.local.example`, which IS committed (via a
 *    gitignore negation) and holds placeholders only.
 *
 * 2. EMAIL — Resend.
 *
 *    RESEND_API_KEY        from resend.com → API Keys
 *    BIRTHDAY_NOTIFY_EMAIL where submissions are emailed (defaults below)
 *    BIRTHDAY_EMAIL_FROM   the verified sender (defaults below)
 *
 *    ⚠️ Resend will only send from a domain you have verified. Until
 *    ayodeleaweministries.org is verified in Resend, the only usable sender is
 *    `onboarding@resend.dev`, and in that mode Resend delivers ONLY to the
 *    email address that owns the Resend account. Verify the domain, or set
 *    BIRTHDAY_NOTIFY_EMAIL to the account owner's address.
 *
 * 3. ADMIN — BIRTHDAY_ADMIN_PASSWORD, read by /birthday/admin.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Nothing here is required for the page to render. Every dependency is resolved
 * lazily and every failure is soft: if KV is unconfigured the POST reports the
 * failure honestly rather than pretending to have saved, and if Resend is
 * unconfigured (or errors) the testimony is still stored. The email is a
 * convenience, never the record.
 *
 * ⚠️ KNOWN LIMITATION — the GET handler is unauthenticated. Anyone who guesses
 * this URL can read every testimony, including submitters' email addresses. It
 * is obscurity, not security, accepted deliberately for a short-lived page. See
 * CLAUDE.md → "The birthday page".
 */

import { NextResponse } from "next/server";
import type { Testimony } from "@/lib/birthday";

// Reads request state and external stores — never prerender or cache it.
export const dynamic = "force-dynamic";

const KEY = "birthday-testimonies";

const MAX_NAME = 120;
const MAX_LOCATION = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;

/**
 * The KV client.
 *
 * ⚠️ The credentials are read from AYODELE_-prefixed names, NOT the
 * `KV_REST_API_URL` / `KV_REST_API_TOKEN` that `@vercel/kv` auto-detects. The
 * store attached to this project uses a custom prefix, so auto-detection finds
 * nothing — `createClient` is given the values explicitly instead. There is
 * deliberately no fallback to the unprefixed names: a silent fallback would
 * turn a misconfigured deploy into a mystery, rather than the clean "not
 * configured" 503 you get now.
 *
 * ⚠️ Built per-request rather than at module scope. `createClient` throws when
 * the credentials are absent, and at module scope that would take the whole
 * route down — including the GET — at import time, during `next build`. This is
 * why there is no top-level `const kv = createClient(...)`.
 *
 * `readOnly` picks the read-only token for the GET path where one is provided,
 * so a read can never mutate the list. It falls back to the read-write token,
 * so GET still works if that variable is not set.
 */
async function getKv(readOnly = false) {
  const url = process.env.AYODELE_KV_REST_API_URL;
  const writeToken = process.env.AYODELE_KV_REST_API_TOKEN;
  const token = readOnly
    ? (process.env.AYODELE_KV_REST_API_READ_ONLY_TOKEN ?? writeToken)
    : writeToken;

  if (!url || !token) return null;

  const { createClient } = await import("@vercel/kv");
  return createClient({ url, token });
}

/** Trim, coerce to string, and cap. Empty string for anything missing. */
function field(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** A slow email must never hold up the reply to someone submitting a form. */
const EMAIL_TIMEOUT_MS = 5000;

/**
 * Best-effort notification. It can fail in any way it likes and the caller will
 * not know: a testimony that is safely in KV must never be reported as failed
 * because of the email step.
 *
 * Three separate guards, because this runs on the night the page goes live and
 * the failure it protects against is invisible to the person submitting:
 *
 *   1. No RESEND_API_KEY  → returns immediately. This is the expected state for
 *      the 3 August 2026 launch; Resend was deliberately not set up.
 *   2. Resend throws      → caught and logged here.
 *   3. Resend hangs       → the timeout wins the race, so the submitter is not
 *      left waiting on a network stall (and the function cannot time out and
 *      turn a saved testimony into a visible error).
 *
 * ⚠️ Never make this throw, and never make the POST's success depend on it.
 */
async function notify(testimony: Testimony): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(
      "RESEND_API_KEY not set — testimony stored, email notification skipped."
    );
    return;
  }

  const to = process.env.BIRTHDAY_NOTIFY_EMAIL ?? "contact@ayodeleaweministries.org";
  const from =
    process.env.BIRTHDAY_EMAIL_FROM ?? "AOA Ministries <onboarding@resend.dev>";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const rows: [string, string][] = [
      ["Name", testimony.name],
      ["Location", testimony.location || "—"],
      ["Email", testimony.email || "—"],
      ["Submitted", testimony.submittedAt],
    ];

    const send = resend.emails.send({
      from,
      to,
      // Replying goes straight back to the sender when they left an address.
      ...(testimony.email ? { replyTo: testimony.email } : {}),
      subject: `Birthday testimony from ${testimony.name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0A1628">
          <h2 style="color:#6B1530;margin:0 0 16px">New birthday testimony</h2>
          <table style="border-collapse:collapse;margin-bottom:20px">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:2px 16px 2px 0;color:#6B7A99">${label}</td><td style="padding:2px 0"><strong>${escapeHtml(
                    value
                  )}</strong></td></tr>`
              )
              .join("")}
          </table>
          <div style="border-left:4px solid #4A90D9;padding-left:16px;white-space:pre-wrap">${escapeHtml(
            testimony.message
          )}</div>
        </div>
      `,
    });

    // Whichever settles first wins; a hung request loses to the timer.
    const result = await Promise.race([
      send,
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Resend timed out after ${EMAIL_TIMEOUT_MS}ms`)),
          EMAIL_TIMEOUT_MS
        )
      ),
    ]);

    /**
     * ⚠️ Resend does NOT throw on an API error — it RESOLVES with
     * `{ data, error }`. A bad API key, an unverified sender or a rejected
     * recipient all land here, not in the catch below. Without this check the
     * failure is completely silent: the submission succeeds, no email arrives,
     * and nothing is logged to explain why. Verified with a deliberately
     * invalid key.
     */
    if (result?.error) {
      console.error(
        "Birthday testimony email rejected by Resend (testimony was saved):",
        result.error
      );
    }
  } catch (error) {
    console.error("Birthday testimony email failed (testimony was saved):", error);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const testimony: Testimony = {
    name: field(raw.name, MAX_NAME),
    location: field(raw.location, MAX_LOCATION),
    message: field(raw.message, MAX_MESSAGE),
    email: field(raw.email, MAX_EMAIL),
    submittedAt: new Date().toISOString(),
  };

  if (!testimony.name || !testimony.message) {
    return NextResponse.json(
      { success: false, error: "Please give your name and a message." },
      { status: 400 }
    );
  }

  const kv = await getKv();
  if (!kv) {
    console.error(
      "Birthday testimony rejected: AYODELE_KV_REST_API_URL / " +
        "AYODELE_KV_REST_API_TOKEN are not set."
    );
    return NextResponse.json(
      {
        success: false,
        error: "Testimonies cannot be received right now. Please try again later.",
      },
      { status: 503 }
    );
  }

  try {
    // LPUSH, so LRANGE reads back newest-first with no sorting.
    await kv.lpush(KEY, JSON.stringify(testimony));
  } catch (error) {
    console.error("Birthday testimony store failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Testimonies cannot be received right now. Please try again later.",
      },
      { status: 503 }
    );
  }

  // The testimony is already safely in KV at this point, so the response is
  // decided. `notify` swallows its own failures, and this catch makes that a
  // structural guarantee rather than a promise about its internals — nothing
  // the email step does can turn a saved testimony into an error for the person
  // who submitted it.
  try {
    await notify(testimony);
  } catch (error) {
    console.error("Birthday testimony notify() threw unexpectedly:", error);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  // Reads take the read-only token where one is configured.
  const kv = await getKv(true);
  if (!kv) {
    return NextResponse.json(
      { success: false, error: "Storage is not configured.", testimonies: [] },
      { status: 503 }
    );
  }

  try {
    const rows = await kv.lrange<string | Testimony>(KEY, 0, -1);

    // Upstash deserialises JSON automatically on some clients and not others,
    // so entries come back as either a parsed object or the raw string.
    const testimonies = rows
      .map((row) => {
        if (typeof row !== "string") return row;
        try {
          return JSON.parse(row) as Testimony;
        } catch {
          return null;
        }
      })
      .filter((row): row is Testimony => Boolean(row));

    return NextResponse.json({ success: true, testimonies });
  } catch (error) {
    console.error("Birthday testimony read failed:", error);
    return NextResponse.json(
      { success: false, error: "Could not read testimonies.", testimonies: [] },
      { status: 500 }
    );
  }
}
