"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import {
  BIRTHDAY_ENDS_AT,
  BIRTHDAY_STARTS_AT,
  type BirthdayPhase,
} from "@/lib/birthday";

/**
 * The birthday countdown — the visual centrepiece of /birthday.
 *
 * Same hydration contract as `CountdownTimer`: the server render and the first
 * client render both produce the `pending` shell, and the real values land in
 * an effect. The *phase* is resolved on the client for the same reason — the
 * page is statically rendered, so a server-side phase check would bake in
 * whichever side of midnight the build ran on and never move.
 */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type State =
  | { status: "pending" }
  | { status: "counting"; timeLeft: TimeLeft }
  | { status: "during" }
  | { status: "after" };

const SEGMENTS = ["Days", "Hours", "Minutes", "Seconds"] as const;

const NUMBER_CLASS =
  "font-serif font-bold leading-none tabular-nums text-white text-5xl sm:text-7xl md:text-8xl";
const UNIT_LABEL_CLASS =
  "mt-3 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.25em] text-white/45 sm:text-xs";

/** Sharp-cornered tile per the site's card rule — only the buttons are pills. */
const TILE_CLASS =
  "flex min-w-[4.5rem] flex-1 flex-col items-center border-t-2 border-blue-sky bg-white/5 px-3 py-6 backdrop-blur-sm sm:min-w-[8rem] sm:px-6 sm:py-10";

function phaseFor(now: number): Exclude<BirthdayPhase, "before"> | "before" {
  if (now < Date.parse(BIRTHDAY_STARTS_AT)) return "before";
  if (now < Date.parse(BIRTHDAY_ENDS_AT)) return "during";
  return "after";
}

function timeLeftTo(target: number, now: number): TimeLeft {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-6">
      {children}
    </div>
  );
}

/** The celebratory message that replaces the clock on and after the day. */
function Celebration({ status }: { status: "during" | "after" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="mb-6 font-serif text-4xl font-bold leading-tight text-white sm:text-6xl">
        {status === "during" ? (
          <>Today We Celebrate Him! 🎉</>
        ) : (
          <>We Celebrated Him! 🎉</>
        )}
      </p>
      <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
        {status === "during"
          ? "Happy birthday, Pastor Ayodele. Thank God for a life poured out for the gospel — and for every life it has touched."
          : "Thank you to everyone who celebrated with us. The testimonies are still open, and every word still blesses him."}
      </p>
      <div className="mt-10">
        <Button href="#testimony" variant="secondary" size="lg">
          Share your testimony
        </Button>
      </div>
    </motion.div>
  );
}

export default function BirthdayCountdown() {
  const [state, setState] = useState<State>({ status: "pending" });

  useEffect(() => {
    const target = Date.parse(BIRTHDAY_STARTS_AT);

    function tick() {
      const now = Date.now();
      const phase = phaseFor(now);
      setState(
        phase === "before"
          ? { status: "counting", timeLeft: timeLeftTo(target, now) }
          : { status: phase }
      );
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (state.status === "during" || state.status === "after") {
    return <Celebration status={state.status} />;
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
