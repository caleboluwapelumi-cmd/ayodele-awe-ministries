/**
 * Norwich Prayer Surge — the ministry's monthly prayer gathering.
 *
 * It recurs on the last Saturday of every month, so there is no single date to
 * hard-code: `nextPrayerSurge()` derives the next occurrence from the current
 * time. Any page that calls it must therefore set `export const revalidate`,
 * otherwise the date is frozen into the static build and goes stale.
 *
 * ⚠️ Call it inside the component, not at module scope — module constants are
 * evaluated once when the module loads and would survive every revalidation.
 */

import { LONDON, londonInstant, londonOffsetMs } from "./london-time";

const TIME_ZONE = LONDON;

export const PRAYER_SURGE = {
  title: "Norwich Prayer Surge",
  location: "Norwich, United Kingdom",
  /** Recurrence in words, for copy that shouldn't name a single date. */
  schedule: "Last Saturday of every month",
  /** London wall-clock start, 24h. */
  startHour: 10,
  durationHours: 7,
  timeRange: "10:00 AM – 5:00 PM",
  scripture: {
    reference: "Isaiah 32:15",
    text: "Until the Spirit is poured upon us from on high, and the wilderness becomes a fruitful field, and the fruitful field is counted as a forest.",
  },
} as const;

/** Day-of-month of the last Saturday in the given month. */
function lastSaturdayOfMonth(year: number, monthIndex: number): number {
  const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0));
  return lastDay.getUTCDate() - ((lastDay.getUTCDay() + 1) % 7);
}

export interface PrayerSurgeOccurrence {
  /** ISO timestamp of the 10:00 start — feeds `CountdownTimer`. */
  startsAt: string;
  /** "Saturday 25 July 2026" */
  fullDate: string;
  /** "Sat 25 Jul" — short enough for the `EventCard` badge. */
  shortDate: string;
}

/**
 * The next Prayer Surge. A gathering in progress still counts as "next" until
 * its seven hours are up, so the countdown reads "This event has started!"
 * rather than skipping ahead to next month mid-meeting.
 */
export function nextPrayerSurge(now: number = Date.now()): PrayerSurgeOccurrence {
  // Work from London's calendar date, not UTC's — they differ late in the
  // evening under BST.
  const wallClock = new Date(now + londonOffsetMs(now));
  const year = wallClock.getUTCFullYear();
  let month = wallClock.getUTCMonth();

  const durationMs = PRAYER_SURGE.durationHours * 60 * 60 * 1000;
  let start = londonInstant(
    year,
    month,
    lastSaturdayOfMonth(year, month),
    PRAYER_SURGE.startHour
  );

  if (start + durationMs <= now) {
    // Date.UTC normalises month 12 into January of the following year.
    month += 1;
    start = londonInstant(
      year,
      month,
      lastSaturdayOfMonth(year, month),
      PRAYER_SURGE.startHour
    );
  }

  const date = new Date(start);
  return {
    startsAt: date.toISOString(),
    fullDate: new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date),
    shortDate: new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date),
  };
}
