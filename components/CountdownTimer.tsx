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

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [expired, setExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate);

    function tick() {
      const tl = calculateTimeLeft(target);
      if (tl) {
        setTimeLeft(tl);
      } else {
        setExpired(true);
      }
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-8">
        {["Days", "Hours", "Min", "Sec"].map((label) => (
          <div key={label} className="text-center">
            <span className="block font-serif text-5xl text-blue-sky">--</span>
            <span className="block font-sans text-xs uppercase tracking-widest text-white/50 mt-2">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (expired) {
    return (
      <p className="font-serif text-xl text-blue-sky text-center">
        This event has started!
      </p>
    );
  }

  if (!timeLeft) return null;

  const segments = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-8">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-8">
          <div className="text-center">
            <span className="block font-serif text-5xl text-blue-sky tabular-nums">
              {String(seg.value).padStart(2, "0")}
            </span>
            <span className="block font-sans text-xs uppercase tracking-widest text-white/50 mt-2">
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span className="text-white/20 text-2xl font-light">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
