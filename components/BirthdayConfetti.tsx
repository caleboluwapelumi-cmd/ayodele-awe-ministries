"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative confetti field for the /birthday hero.
 *
 * ⚠️ The positions are a hard-coded table, never `Math.random()`. A random
 * layout is generated afresh on the client and will not match the server
 * render — the same hydration trap `HeroSection`'s slideshow index avoids.
 *
 * Purely ornamental, so the whole layer is `aria-hidden` and
 * `pointer-events-none`. Under `prefers-reduced-motion` the dots render still
 * rather than disappearing: the texture is part of the design, the drifting is
 * not.
 */

/** left %, top %, size px, colour class, seconds per cycle, delay seconds. */
const DOTS: [number, number, number, string, number, number][] = [
  [6, 18, 6, "bg-blue-sky/50", 7, 0],
  [14, 62, 4, "bg-white/40", 9, 1.2],
  [21, 30, 8, "bg-wine-light/50", 8, 0.6],
  [28, 78, 5, "bg-blue-sky/40", 10, 2.1],
  [35, 12, 4, "bg-white/30", 7.5, 1.7],
  [42, 55, 7, "bg-wine-light/40", 9.5, 0.3],
  [49, 86, 5, "bg-blue-sky/50", 8.5, 2.6],
  [57, 24, 6, "bg-white/35", 11, 1.1],
  [64, 68, 4, "bg-wine-light/50", 7, 3.0],
  [71, 40, 8, "bg-blue-sky/40", 9, 0.9],
  [78, 14, 5, "bg-white/40", 10.5, 2.3],
  [84, 72, 6, "bg-wine-light/40", 8, 1.5],
  [91, 34, 4, "bg-blue-sky/50", 9.5, 0.4],
  [96, 58, 5, "bg-white/30", 7.5, 2.8],
  [10, 44, 5, "bg-wine-light/40", 10, 1.9],
  [66, 92, 4, "bg-blue-sky/40", 8.5, 0.7],
];

export default function BirthdayConfetti() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOTS.map(([left, top, size, colour, duration, delay], i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${colour}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
          }}
          animate={
            reduced
              ? undefined
              : { y: [0, -22, 0], opacity: [0.35, 1, 0.35] }
          }
          transition={
            reduced
              ? undefined
              : { duration, delay, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
