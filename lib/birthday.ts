/**
 * Pastor Ayodele Oladapo Awe's birthday — Monday 3 August 2026.
 *
 * Unlike the Prayer Surge this is a single fixed date, so it IS hard-coded. The
 * London wall-clock resolution still matters: the countdown must hit zero at
 * midnight *in Norwich*, not at midnight UTC, and not at midnight wherever the
 * Vercel edge happens to be running.
 *
 * `BIRTHDAY_STARTS_AT` / `BIRTHDAY_ENDS_AT` are exported as ISO strings so they
 * can be serialised straight into a client component — the phase check itself
 * has to run on the client, since the server render is cached and would freeze
 * the page in whichever phase it was built in.
 */

import { LONDON, londonInstant } from "./london-time";

export const BIRTHDAY = {
  name: "Ayodele Oladapo Awe",
  /** Europe/London calendar date of the birthday. */
  year: 2026,
  monthIndex: 7, // August
  day: 3,
  /** "Monday 3 August 2026" */
  fullDate: "Monday 3 August 2026",
} as const;

/** Midnight opening the birthday, Europe/London, as a UTC instant. */
const startMs = londonInstant(
  BIRTHDAY.year,
  BIRTHDAY.monthIndex,
  BIRTHDAY.day,
  0
);
/** Midnight closing it — the day runs a full 24 hours. */
const endMs = londonInstant(
  BIRTHDAY.year,
  BIRTHDAY.monthIndex,
  BIRTHDAY.day + 1,
  0
);

export const BIRTHDAY_STARTS_AT = new Date(startMs).toISOString();
export const BIRTHDAY_ENDS_AT = new Date(endMs).toISOString();

/**
 * Where we are relative to the day.
 *
 * `before` counts down · `during` celebrates · `after` gives thanks. The page
 * never renders a dead countdown, and it never needs a code change to move on
 * from the day itself.
 */
export type BirthdayPhase = "before" | "during" | "after";

export function birthdayPhase(now: number = Date.now()): BirthdayPhase {
  if (now < startMs) return "before";
  if (now < endMs) return "during";
  return "after";
}

/**
 * A submitted testimony, as stored in KV and as returned by the GET handler.
 * Lives here rather than in the route module so the admin page can import the
 * type without importing anything server-side.
 */
export interface Testimony {
  /**
   * A UUID, written at submission time.
   *
   * ⚠️ Optional because records stored before archiving existed do not have
   * one. Never read it directly — go through `testimonyId()`, which falls back
   * for those. A record with no `id` is a legacy record, not a broken one.
   */
  id?: string;
  name: string;
  location: string;
  message: string;
  email: string;
  /** ISO 8601, UTC. */
  submittedAt: string;
  /**
   * Set by the GET handler from the archive set — **never** part of the stored
   * record. Archiving does not rewrite the testimony; see the route module.
   */
  archived?: boolean;
}

/**
 * The stable identity of a testimony, for archiving.
 *
 * ⚠️ It must not be the record's position in the list. The list is `LPUSH`ed,
 * so every new submission shifts every existing index by one — an index-based
 * id would silently retarget the archive set the moment anyone submits.
 *
 * Records written from 3 August 2026 carry a UUID. Older ones fall back to
 * their timestamp and name, which is stable for a record that is never
 * rewritten. Two testimonies would have to be stored in the same millisecond
 * *under the same name* to collide, and only among those legacy records.
 */
export function testimonyId(testimony: Testimony): string {
  return testimony.id ?? `${testimony.submittedAt}::${testimony.name}`;
}

/** "3 August 2026" — for prose that shouldn't repeat the weekday. */
export const BIRTHDAY_DATE_SHORT = new Intl.DateTimeFormat("en-GB", {
  timeZone: LONDON,
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date(startMs));
