"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/motion";

/**
 * The homepage globe: Norwich and Ado Ekiti, joined by an arc.
 *
 * What renders is decided in three steps, and the static globe is always the
 * floor — it is in the server markup, so the section is complete before any
 * of this runs and stays complete if none of it does.
 *
 * 1. **Can this device carry it?** Not under reduced motion, not with Save-Data
 *    on, not on low-end hardware (fewer than 4 cores, or under 4 GB where the
 *    browser reports memory), and not without WebGL. Any "no" leaves the
 *    static globe in place for good.
 * 2. **Is it near the screen?** Only then is cobe fetched (`next/dynamic`,
 *    `ssr: false`) — so it never lands in the route's first-load JS, and a
 *    visitor who never scrolls this far never downloads it.
 * 3. **Did it run smoothly?** `Globe` times its first frames and calls
 *    `onFail` if they were slow, which drops back to the static version.
 *
 * The live globe fades in over the static one only after its first frame, so
 * there is never an empty square while the chunk and shaders load.
 */
const Globe = dynamic(() => import("./Globe"), { ssr: false });

function deviceCanCarryGlobe(): boolean {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (window.matchMedia(REDUCED_MOTION).matches) return false;
  if (nav.connection?.saveData) return false;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return false;
  if (nav.deviceMemory && nav.deviceMemory < 4) return false;
  try {
    const probe = document.createElement("canvas");
    return !!(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function GlobeSection({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useMediaQuery(REDUCED_MOTION);

  useEffect(() => {
    const el = ref.current;
    if (!el || !deviceCanCarryGlobe()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion switched on mid-visit also retires the live globe.
  const live = near && !failed && !reduced;
  const showingLive = live && ready;

  return (
    <div ref={ref} className={`relative aspect-square w-full ${className}`}>
      <StaticGlobe
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          showingLive ? "opacity-0" : "opacity-100"
        }`}
      />

      {live && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Globe
            onReady={() => setReady(true)}
            onFail={() => {
              setFailed(true);
              setReady(false);
            }}
          />
        </div>
      )}

    </div>
  );
}

/**
 * The fallback: a still, brand-blue globe with the same two markers and arc,
 * drawn in SVG. Marker positions are an orthographic projection centred on
 * 30°N 3°E — the same view the live globe opens on — at radius 84 in a
 * 200-unit box:
 *   Norwich   52.63°N 1.30°E → (98.5, 67.7)
 *   Ado Ekiti  7.62°N 5.22°E → (103.2, 132.0)
 * The id prefix is unique because this renders once per page; if it is ever
 * rendered twice, switch to `useId()`.
 */
function StaticGlobe({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <defs>
        <radialGradient id="globe-fill" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="var(--color-brand-blue-mid)" />
          <stop offset="55%" stopColor="var(--color-brand-blue)" />
          <stop offset="100%" stopColor="var(--color-brand-navy)" />
        </radialGradient>
        <radialGradient id="globe-halo" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="var(--color-brand-blue-mid)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-brand-blue-mid)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="100" fill="url(#globe-halo)" />
      <circle cx="100" cy="100" r="84" fill="url(#globe-fill)" />

      {/* Graticule: parallels as ellipses, meridians as narrowing ellipses. */}
      <g fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.5">
        {[-52, -26, 0, 26, 52].map((dy) => (
          <ellipse
            key={`p${dy}`}
            cx="100"
            cy={100 + dy}
            rx={Math.sqrt(84 * 84 - dy * dy)}
            ry={Math.sqrt(84 * 84 - dy * dy) * 0.22}
          />
        ))}
        {[84, 60, 32].map((rx) => (
          <ellipse key={`m${rx}`} cx="100" cy="100" rx={rx} ry="84" />
        ))}
      </g>

      <path
        d="M98.5 67.7 Q 132 98 103.2 132"
        fill="none"
        stroke="var(--color-brand-orange-light)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
      {[
        [98.5, 67.7],
        [103.2, 132],
      ].map(([cx, cy]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="5" fill="var(--color-brand-orange)" fillOpacity="0.25" />
          <circle cx={cx} cy={cy} r="2.4" fill="var(--color-brand-orange)" />
        </g>
      ))}
    </svg>
  );
}
