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

const TIME_ZONE = "Europe/London";

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

/** How far ahead of UTC Europe/London runs at a given instant, in ms. */
function londonOffsetMs(utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date(utcMs));

  const at = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  // en-GB with hour12:false renders midnight as "24" — fold it back to 0.
  const wallClock = Date.UTC(
    at("year"),
    at("month") - 1,
    at("day"),
    at("hour") % 24,
    at("minute"),
    at("second")
  );
  return wallClock - utcMs;
}

/**
 * The UTC instant of a Europe/London wall-clock time. A single offset
 * correction is enough here: 10:00 sits nowhere near the 01:00/02:00 DST
 * transitions, so the offset at the guess and at the true instant agree.
 */
function londonInstant(
  year: number,
  monthIndex: number,
  day: number,
  hour: number
): number {
  const guess = Date.UTC(year, monthIndex, day, hour);
  return guess - londonOffsetMs(guess);
}

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
