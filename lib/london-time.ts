/**
 * Europe/London wall-clock helpers.
 *
 * Extracted from `prayer-surge.ts` so the birthday countdown can resolve a
 * London wall-clock time to a UTC instant the same way. Both consumers need the
 * offset looked up rather than hard-coded, so a date stays at its stated hour
 * through BST and GMT alike.
 */

export const LONDON = "Europe/London";

/** How far ahead of UTC Europe/London runs at a given instant, in ms. */
export function londonOffsetMs(utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON,
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
 * correction is enough for both current callers: the Prayer Surge starts at
 * 10:00 and the birthday at 00:00, neither of which sits near the 01:00/02:00
 * DST transitions, so the offset at the guess and at the true instant agree.
 */
export function londonInstant(
  year: number,
  monthIndex: number,
  day: number,
  hour: number
): number {
  const guess = Date.UTC(year, monthIndex, day, hour);
  return guess - londonOffsetMs(guess);
}
