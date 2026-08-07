"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * The Prayer Surge countdown, on `/` and `/events`.
 *
 * The treatment is `BirthdayCountdown`'s, ported to the site's blue palette so
 * the two countdowns on this project read as one component rather than two: the
 * same sharp accent-topped tiles, the same 2×2 → 4-across grid, the same
 * display numerals over small uppercase tracked labels.
 *
 * ⚠️ The labels are full words now ("Minutes", not "Min"). They were abbreviated
 * because the old `flex-wrap` row had no room; the 2-column mobile grid gives
 * each tile ~165px, which fits the word.
 */

const SEGMENTS = ["Days", "Hours", "Minutes", "Seconds"] as const;

/**
 * ⚠️ `blue-sky` (#4A90D9) is 3.10:1 against the tile — the tile's
 * `bg-white/[0.07]` over the band's `via-blue-deep` stop, which is the darkest
 * this gets and therefore the figure that governs. That clears AA **large**
 * (3:1) and nothing more, so it is legitimate at 60px+ and at no smaller size.
 * This is the tightest accent-on-dark pairing on the site — measured, not
 * eyeballed. The unit labels below stay white for exactly that reason, the same
 * split `BirthdayCountdown` makes with its orange.
 *
 * Measure again if the band's gradient is ever lightened; `to-wine-deep` and
 * `from-blue-navy` are both more forgiving (3.83:1 and better), so the middle
 * stop is the one to check.
 */
const NUMBER_CLASS =
  "font-serif font-bold leading-none tabular-nums text-blue-sky text-6xl sm:text-6xl md:text-7xl lg:text-8xl";
/** ⚠️ /65 measured against the tile's `bg-white/[0.07]`, not the band — 5.5:1. */
const UNIT_LABEL_CLASS =
  "mt-3 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.25em] text-white/65 sm:text-xs";

/**
 * Sharp-cornered tile per the site's card rule — only the buttons are pills.
 *
 * ⚠️ 2×2 below `sm`, 4-across above. Four tiles in a row on a 375px screen
 * leaves ~80px each, which caps the numerals at about 36px; 2×2 gives ~165px
 * and lets them run at 60px, which is the whole point of a countdown. The grid
 * also replaces the old `flex-wrap` row, which could wrap into a ragged 3+1 and
 * needed ":" separators to read as a clock at all.
 */
const GRID_CLASS =
  "mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-6";
const TILE_CLASS =
  "flex flex-col items-center border-t-2 border-blue-sky bg-white/[0.07] px-2 py-7 backdrop-blur-sm sm:px-6 sm:py-10";

function calculateTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className={GRID_CLASS}>{children}</div>;
}

/**
 * `pending` is what both the server and the first client render produce, so
 * hydration always matches; the interval takes over from there.
 */
type State =
  | { status: "pending" }
  | { status: "expired" }
  | { status: "live"; timeLeft: TimeLeft };

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [state, setState] = useState<State>({ status: "pending" });

  useEffect(() => {
    const target = new Date(targetDate);

    function tick() {
      const tl = calculateTimeLeft(target);
      setState(tl ? { status: "live", timeLeft: tl } : { status: "expired" });
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (state.status === "expired") {
    return (
      <p className="text-center font-serif text-xl font-bold text-blue-sky">
        This event has started!
      </p>
    );
  }

  const values: (number | null)[] =
    state.status === "pending"
      ? [null, null, null, null]
      : [
          state.timeLeft.days,
          state.timeLeft.hours,
          state.timeLeft.minutes,
          state.timeLeft.seconds,
        ];

  return (
    <Shell>
      {SEGMENTS.map((label, i) => (
        <div key={label} className={TILE_CLASS}>
          <span className={NUMBER_CLASS}>
            {values[i] === null ? "--" : String(values[i]).padStart(2, "0")}
          </span>
          <span className={UNIT_LABEL_CLASS}>{label}</span>
        </div>
      ))}
    </Shell>
  );
}
