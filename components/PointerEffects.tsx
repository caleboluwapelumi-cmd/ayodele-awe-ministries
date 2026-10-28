"use client";

import { useEffect, useRef } from "react";
import { FINE_POINTER, REDUCED_MOTION } from "@/lib/motion";

/**
 * Desktop-only pointer effects, mounted once in the (site) layout:
 *
 * - **Magnetic buttons.** Any element with `data-magnetic` (every `Button`)
 *   drifts a few pixels toward the cursor while hovered. One delegated
 *   listener, not one per button — there are dozens on some pages.
 * - **Cursor glow.** A soft orange light that follows the pointer. See
 *   `.cursor-glow` in globals.css for why it blends with `screen`.
 *
 * Both are off on touch screens (`FINE_POINTER` fails) and under
 * `prefers-reduced-motion`, and both re-check if either setting changes.
 * Pointer moves are batched into one write per animation frame, and the glow
 * moves by `transform` only, so neither causes layout.
 */

/** How far a button follows the cursor, as a share of the offset. */
const PULL = 0.22;
/** Hard cap in px, so a wide button never wanders off its grid line. */
const MAX_PULL = 8;

export default function PointerEffects() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia(FINE_POINTER);
    const reduce = window.matchMedia(REDUCED_MOTION);
    let teardown: (() => void) | null = null;

    const enable = () => {
      const glow = glowRef.current;
      let frame = 0;
      let x = 0;
      let y = 0;
      let current: HTMLElement | null = null;

      const release = () => {
        if (!current) return;
        current.style.removeProperty("--mx");
        current.style.removeProperty("--my");
        current = null;
      };

      const paint = () => {
        frame = 0;
        if (glow) glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (!current) return;
        const r = current.getBoundingClientRect();
        const dx = (x - (r.left + r.width / 2)) * PULL;
        const dy = (y - (r.top + r.height / 2)) * PULL;
        const clamp = (v: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, v));
        current.style.setProperty("--mx", `${clamp(dx).toFixed(2)}px`);
        current.style.setProperty("--my", `${clamp(dy).toFixed(2)}px`);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        x = e.clientX;
        y = e.clientY;
        if (glow) glow.dataset.on = "true";

        const target = (e.target as Element | null)?.closest?.<HTMLElement>(
          "[data-magnetic]",
        );
        if (target !== current) {
          release();
          current = target ?? null;
        }
        if (!frame) frame = requestAnimationFrame(paint);
      };

      const onLeave = () => {
        release();
        if (glow) glow.dataset.on = "false";
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);

      return () => {
        cancelAnimationFrame(frame);
        release();
        if (glow) glow.dataset.on = "false";
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
      };
    };

    const sync = () => {
      teardown?.();
      teardown = fine.matches && !reduce.matches ? enable() : null;
    };

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      teardown?.();
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return <div ref={glowRef} aria-hidden className="cursor-glow" />;
}
