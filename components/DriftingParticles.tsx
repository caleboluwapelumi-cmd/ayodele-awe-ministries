"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  SITE_ATMOSPHERE_TONE,
  type AtmosphereTone,
} from "./HeroAtmosphere";

/**
 * The drifting dot field, generalised out of `BirthdayConfetti` so the homepage
 * hero can use the same technique without importing something birthday-branded.
 * `BirthdayConfetti` is now a one-line preset of this component, and the
 * `birthday` colour row below is its original table verbatim — that page's
 * output is unchanged, dot for dot.
 *
 * ⚠️ The positions are a hard-coded table, never `Math.random()`. A random
 * layout is generated afresh on the client and will not match the server
 * render — the same hydration trap `HeroSection`'s slideshow index avoids.
 *
 * ⚠️ No dot sits past 94% left. Each is positioned by its top-left corner and
 * is up to 8px wide, so a dot at 99% would push the layer — and the page — past
 * the viewport on a 375px screen. The layer's own `overflow-hidden` clips it,
 * but the margin keeps the artwork intact rather than half-cut.
 *
 * Purely ornamental, so the whole layer is `aria-hidden` and
 * `pointer-events-none`. Under `prefers-reduced-motion` the dots render still
 * rather than disappearing: the texture is part of the design, the drifting is
 * not.
 *
 * ⚠️ This is the only new client component in the atmosphere layer, and it
 * reuses framer-motion, which is already in the shared chunk on every route —
 * so it adds no new bytes to the bundle. Don't reach for a particle library.
 */

/** left %, top %, size px, seconds per cycle, delay seconds. */
type Dot = [number, number, number, number, number];

const DOTS: Dot[] = [
  [6, 18, 6, 7, 0],
  [14, 62, 4, 9, 1.2],
  [21, 30, 8, 8, 0.6],
  [28, 78, 5, 10, 2.1],
  [35, 12, 4, 7.5, 1.7],
  [42, 55, 7, 9.5, 0.3],
  [49, 86, 5, 8.5, 2.6],
  [57, 24, 6, 11, 1.1],
  [64, 68, 4, 7, 3.0],
  [71, 40, 8, 9, 0.9],
  [78, 14, 5, 10.5, 2.3],
  [84, 72, 6, 8, 1.5],
  [90, 34, 4, 9.5, 0.4],
  [94, 58, 5, 7.5, 2.8],
  [10, 44, 5, 10, 1.9],
  [66, 92, 4, 8.5, 0.7],
];

/**
 * One colour class per dot, in the same order as `DOTS`.
 *
 * ⚠️ **The per-dot alpha variation is the point — do not collapse these to one
 * class per hue.** The dots all animate through the same opacity keyframes, so
 * the only thing giving the field any sense of depth is that each dot's colour
 * carries a different alpha. Flattened to four fixed values it reads as a
 * regular grid of identical dots, which is exactly what it is.
 *
 * ⚠️ Full class strings, never interpolated. Tailwind scans source text, so a
 * built-up `bg-${hue}/${alpha}` produces no CSS at all.
 *
 * The `site` row is the `birthday` row transposed into blue/wine, and the
 * alphas are NOT copied across: wine-light is far darker than bday-orange
 * against a navy hero and needs about ten more points to register, while
 * blue-sky is much brighter than bday-blue-mid and needs roughly twenty fewer.
 * The relative variation within each hue is preserved, which is what carries
 * the effect.
 */
const PALETTE: Record<AtmosphereTone, string[]> = {
  site: [
    "bg-wine-light/70",
    "bg-white/40",
    "bg-blue-sky/45",
    "bg-wine-light/55",
    "bg-white/30",
    "bg-wine-light/45",
    "bg-blue-sky/40",
    "bg-white/35",
    "bg-wine-light/65",
    "bg-blue-sky/30",
    "bg-white/40",
    "bg-wine-light/40",
    "bg-wine-light/70",
    "bg-white/30",
    "bg-wine-light/35",
    "bg-blue-sky/40",
  ],
  birthday: [
    "bg-bday-orange/60",
    "bg-white/40",
    "bg-bday-blue-mid/70",
    "bg-bday-orange/45",
    "bg-white/30",
    "bg-bday-orange-light/50",
    "bg-bday-blue-mid/60",
    "bg-white/35",
    "bg-bday-orange/55",
    "bg-bday-blue-mid/50",
    "bg-white/40",
    "bg-bday-orange-light/45",
    "bg-bday-orange/60",
    "bg-white/30",
    "bg-bday-orange-light/40",
    "bg-bday-blue-mid/60",
  ],
};

/**
 * `full` is the birthday hero's 16 dots. `sparse` takes every other one, which
 * is the density the main site's heroes use — the same technique, dialled back
 * so it reads as texture behind a page of content rather than as a party.
 */
const DENSITY = { full: 1, sparse: 2 } as const;

export default function DriftingParticles({
  tone = SITE_ATMOSPHERE_TONE,
  density = "full",
}: {
  tone?: AtmosphereTone;
  density?: keyof typeof DENSITY;
}) {
  const reduced = useReducedMotion();
  const step = DENSITY[density];
  const colours = PALETTE[tone];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOTS.map(([left, top, size, duration, delay], i) =>
        i % step !== 0 ? null : (
          <motion.span
            key={i}
            className={`absolute rounded-full ${colours[i]}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
            }}
            animate={
              reduced ? undefined : { y: [0, -22, 0], opacity: [0.35, 1, 0.35] }
            }
            transition={
              reduced
                ? undefined
                : { duration, delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ),
      )}
    </div>
  );
}
