"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useHoverFocusPause } from "@/lib/motion";

/**
 * The cobe globe itself. Never import this directly — `GlobeSection` loads it
 * with `next/dynamic` (`ssr: false`) only once the section is near the
 * viewport and the device can carry it. That keeps cobe out of every route's
 * first-load JS.
 *
 * cobe 2 has no render loop of its own: it draws when `update()` is called.
 * So the loop here IS the render, and stopping it stops all GPU work. It runs
 * only while all of these hold:
 *   - the canvas is on screen (IntersectionObserver),
 *   - the tab is visible,
 *   - the pointer is not resting on it (hover pauses the sway; dragging
 *     still turns it, because a drag redraws directly).
 * When it stops the last frame simply stays on the canvas.
 *
 * ⚠️ Jank guard: the first ~60 frames are timed, and if they average slower
 * than ~22fps the globe hands back to the static fallback via `onFail`. The
 * device checks in `GlobeSection` catch most weak hardware; this catches the
 * rest (old GPUs, thermal throttling, a busy page).
 */

// [lat, lon]
const NORWICH: [number, number] = [52.6309, 1.2974];
const ADO_EKITI: [number, number] = [7.6233, 5.2209];

/**
 * Orientation that puts both cities in view. They sit almost on the same
 * meridian (~1°E and ~5°E), so the camera faces ~3°E and tilts north enough
 * to see Norwich at 52.6°N while Ado Ekiti at 7.6°N stays well inside the
 * disc. cobe's phi for a longitude is `π - (lon·π/180 - π/2)`.
 */
const FOCUS_LON = 3;
const BASE_PHI = Math.PI - ((FOCUS_LON * Math.PI) / 180 - Math.PI / 2);
const BASE_THETA = 0.42;
/** Idle sway either side of the focus, radians. Small: both cities stay in view. */
const SWAY = 0.32;
const SWAY_PERIOD_MS = 9000;

// Palette, as 0–1 RGB. Base is a mid blue so the dot-matrix land reads on the
// navy section; markers and arc are the brand orange pair.
const BASE: [number, number, number] = [0.16, 0.36, 0.62];
const GLOW: [number, number, number] = [0.04, 0.2, 0.42];
const ORANGE: [number, number, number] = [0.92, 0.39, 0.2];
const ORANGE_LIGHT: [number, number, number] = [1, 0.6, 0.44];

const JANK_SAMPLE_FRAMES = 60;
const JANK_MAX_AVG_MS = 45;

export default function Globe({
  onReady,
  onFail,
}: {
  onReady: () => void;
  onFail: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paused = useHoverFocusPause(canvasRef);
  const controls = useRef<{ setPaused: (p: boolean) => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = canvas.offsetWidth || 400;
    const small = size < 480;

    let globe: ReturnType<typeof createGlobe>;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi: BASE_PHI,
        theta: BASE_THETA,
        dark: 1,
        diffuse: 1.4,
        mapSamples: small ? 10000 : 16000,
        mapBrightness: 5,
        mapBaseBrightness: 0.04,
        baseColor: BASE,
        markerColor: ORANGE,
        glowColor: GLOW,
        markers: [
          { location: NORWICH, size: 0.07 },
          { location: ADO_EKITI, size: 0.07 },
        ],
        arcs: [{ from: NORWICH, to: ADO_EKITI }],
        arcColor: ORANGE_LIGHT,
        arcWidth: 1.2,
        arcHeight: 0.35,
        markerElevation: 0.02,
        opacity: 0.95,
      });
    } catch {
      onFail();
      return;
    }

    let raf = 0;
    let onScreen = false;
    let halted = false;
    let elapsed = 0;
    let last = 0;
    let drag = 0;
    let dragFrom: number | null = null;
    let samples = 0;
    let sampleTotal = 0;

    const draw = () => {
      const phi =
        BASE_PHI + Math.sin((elapsed / SWAY_PERIOD_MS) * Math.PI * 2) * SWAY + drag;
      globe.update({ phi });
    };

    const loop = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      elapsed += dt;
      draw();

      if (samples < JANK_SAMPLE_FRAMES) {
        // Skip the first few frames — shader compile and first upload are slow
        // everywhere and say nothing about the device.
        if (elapsed > 300) {
          samples += 1;
          sampleTotal += dt;
          if (samples === JANK_SAMPLE_FRAMES && sampleTotal / samples > JANK_MAX_AVG_MS) {
            stop();
            onFail();
            return;
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || !onScreen || halted || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    controls.current = {
      setPaused: (p) => {
        halted = p;
        if (p) stop();
        else start();
      },
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      const next = canvas.offsetWidth;
      if (!next || next === size) return;
      size = next;
      globe.update({ width: size * dpr, height: size * dpr });
      if (!raf) draw();
    });
    ro.observe(canvas);

    // Drag to turn. Horizontal only, and `touch-action: pan-y` on the canvas
    // leaves vertical swipes to the page, so the globe never traps a scroll.
    const onDown = (e: PointerEvent) => {
      dragFrom = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMoveDrag = (e: PointerEvent) => {
      if (dragFrom === null) return;
      drag += ((e.clientX - dragFrom) / size) * Math.PI;
      dragFrom = e.clientX;
      if (!raf) draw();
    };
    const onUp = () => {
      dragFrom = null;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMoveDrag);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    // createGlobe draws the first frame synchronously.
    draw();
    const readyId = requestAnimationFrame(() => onReady());

    return () => {
      cancelAnimationFrame(readyId);
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMoveDrag);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      controls.current = null;
      globe.destroy();
    };
    // The callbacks are stable for the life of the section; re-creating the
    // WebGL context because a parent re-rendered would be far worse.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controls.current?.setPaused(paused);
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
    />
  );
}
