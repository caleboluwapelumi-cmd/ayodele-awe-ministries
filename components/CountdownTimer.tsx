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

const LABELS = ["Days", "Hours", "Min", "Sec"];

const NUMBER_CLASS =
  "font-serif font-black leading-none tabular-nums text-white text-4xl sm:text-6xl md:text-7xl";
const LABEL_CLASS =
  "mt-1 font-sans text-xs uppercase tracking-[0.2em] text-white/40";
const SEPARATOR_CLASS =
  "self-start mt-2 font-light text-white/20 text-2xl sm:text-4xl";

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
  return (
    <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-8">
      {children}
    </div>
  );
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

  if (state.status === "pending") {
    return (
      <Shell>
        {LABELS.map((label) => (
          <div key={label} className="flex flex-col items-center">
            <span className={NUMBER_CLASS}>--</span>
            <span className={LABEL_CLASS}>{label}</span>
          </div>
        ))}
      </Shell>
    );
  }

  if (state.status === "expired") {
    return (
      <p className="text-center font-serif text-xl font-bold text-blue-sky">
        This event has started!
      </p>
    );
  }

  const { timeLeft } = state;
  const segments = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <Shell>
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-start gap-4 sm:gap-8">
          <div className="flex flex-col items-center">
            <span className={NUMBER_CLASS}>
              {String(seg.value).padStart(2, "0")}
            </span>
            <span className={LABEL_CLASS}>{seg.label}</span>
          </div>
          {i < segments.length - 1 && (
            <span aria-hidden className={SEPARATOR_CLASS}>
              :
            </span>
          )}
        </div>
      ))}
    </Shell>
  );
}
