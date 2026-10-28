"use client";

import { useEffect, useRef } from "react";
import { REDUCED_MOTION } from "@/lib/motion";

/**
 * A figure that counts up when it scrolls into view.
 *
 * ⚠️ The server renders the REAL figure, and so does every case where the
 * animation will not run: no JavaScript, reduced motion, or a figure that is
 * already on screen when the page loads (counting from zero in front of the
 * reader would show them a false number first). Only a figure that is still
 * below the fold is reset to `from`, out of sight, and counted up on arrival.
 *
 * The count writes straight to the DOM rather than through state, so it costs
 * no re-renders. Screen readers get the final figure from the `sr-only` copy;
 * the animated one is `aria-hidden` so it is never announced mid-count.
 */
export default function CountUp({
  value,
  from = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: {
  value: number;
  /** Where the count starts. A year reads better from a nearby year than from 0. */
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia(REDUCED_MOTION).matches) return;

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    const write = (n: number) => {
      el.textContent = `${prefix}${n}${suffix}`;
    };
    write(from);

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
          write(Math.round(from + (value - from) * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      write(value);
    };
  }, [value, from, prefix, suffix, duration]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden className="tabular-nums">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}
