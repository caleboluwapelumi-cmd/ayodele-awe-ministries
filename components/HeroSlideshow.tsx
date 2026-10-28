"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { REDUCED_MOTION, useHoverFocusPause, useMediaQuery } from "@/lib/motion";

/**
 * The crossfading hero backdrop, shared by the homepage and both church pages.
 *
 * It was `HeroSection`'s private implementation until BLCN's real congregation
 * photography arrived and needed the same treatment; everything below —
 * including the deferred mount and the 44px dot targets — is that code moved,
 * not rewritten. Both scrims come with it, because a hero photo is never shown
 * unwashed on this site and a caller that forgot one would put white type on
 * whatever the photograph happens to contain.
 *
 * The caller supplies the `relative` section: every layer here is absolutely
 * positioned against it, and `HeroAtmosphere` is expected to render *after*
 * this component so the glow sits above the scrims rather than under them.
 */
export type HeroSlide = {
  src: string;
  /** `object-position` utility, e.g. `object-[48%_32%]`. */
  position?: string;
  /**
   * Leave undefined when the slideshow is pure decoration — the whole layer is
   * then `aria-hidden`, which is what the homepage wants, since its h1 already
   * names the Pastor and a rotating set of captions would only add noise.
   *
   * Pass real alt text when the photographs are themselves the subject, as on
   * /churches/blcn, where they are the congregation the page is about.
   */
  alt?: string;
};

/**
 * How long after hydration the non-leading slides are allowed into the DOM.
 *
 * ⚠️ `loading="lazy"` does NOT defer these on its own, and that was the bug it
 * was written to fix. Every slide is stacked at `inset-0`, so slide 2 is
 * *inside the viewport* from the first paint — lazy loading only defers images
 * that are off-screen, so the browser fetched the whole slideshow at once and
 * the later slides competed for bandwidth with the LCP element while being
 * invisible for the first six seconds.
 *
 * An <img> that is not in the document is never fetched, so the fix is to keep
 * the later slides out of the markup rather than to hint at the loader. 2.5s
 * clears first paint comfortably and still leaves 3.5s of headroom before the
 * 6s crossfade needs the next image decoded.
 */
const DEFERRED_SLIDE_DELAY_MS = 2500;

const DEFAULT_INTERVAL_MS = 6000;

/**
 * How long the opacity crossfade itself takes.
 *
 * ⚠️ This must stay comfortably shorter than `intervalMs`, and that is the
 * whole reason it is a prop rather than the `duration-1000` class it used to
 * be. The two are independent timers: the interval decides when the next slide
 * is selected, the transition decides how long the swap takes to paint. Set a
 * fade as long as (or longer than) the interval and every slide begins fading
 * in before the previous one has finished fading out — the stack never settles
 * on a single image and the hero reads as a permanent smear rather than a
 * sequence of photographs.
 *
 * The default pairs 1s against the 6s interval: ~5s held, 1s moving. A page
 * running a much faster interval must scale this down with it.
 */
const DEFAULT_FADE_MS = 1000;

/**
 * Parallax depth: the photographs travel at 22% of the scroll speed, so the
 * copy above them appears to lift off the image. The layer is scaled up by
 * PARALLAX_SCALE so the drifting image still covers the hero.
 */
const PARALLAX_RATE = 0.22;
const PARALLAX_SCALE = 1.12;


/**
 * The two scrim treatments.
 *
 * `uniform` is the original: `bg-black/60` over the whole frame plus a navy
 * wash top and bottom. The homepage keeps it — its photographs are texture
 * behind a full-width headline.
 *
 * `directional` is the church heroes' (22 October 2026): dark where the copy
 * is (the left, the foot, and a band under the navbar and masthead) and light
 * over the right of the frame, so the congregation is actually visible. Below
 * `lg` the copy spans the full width at the foot, so the bottom gradient
 * climbs higher there and carries most of the weight.
 *
 * ⚠️ Measured, not chosen by eye: h1, subtitle and labels hold 4.5:1+ on every
 * slide of both church heroes at 390, 1280 and 2560 — see CLAUDE.md, "The
 * church heroes". Re-measure when a slide changes; this is tuned against the
 * brightest frames in those sets, not proven for any photograph.
 */
const SCRIMS = {
  uniform: (
    <>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-brand-navy/40" />
    </>
  ),
  directional: (
    <>
      {/* Left to right: near-solid behind the copy column, ~10% at the far
          right. Only from `lg`, where the copy is a column. It holds ~0.86 to
          a third of the way across because the h1 runs that far: "Bethel
          Livingstone Christian Network" measured 4.3:1 at 1280 under a
          gradient that started thinning at 30%. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(1,30,60,0.92)_0%,rgba(1,30,60,0.86)_34%,rgba(1,30,60,0.62)_52%,rgba(1,30,60,0.22)_74%,rgba(1,30,60,0.08)_100%)] lg:block" />
      {/* The foot, where the copy sits. Taller and heavier on phones. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(1,30,60,0.96)_0%,rgba(1,30,60,0.9)_38%,rgba(1,30,60,0.55)_62%,rgba(1,30,60,0.15)_80%,rgba(1,30,60,0)_92%)] lg:bg-[linear-gradient(to_top,rgba(1,30,60,0.9)_0%,rgba(1,30,60,0.5)_30%,rgba(1,30,60,0)_55%)]" />
      {/* Under the navbar and the masthead. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,30,60,0.8)_0%,rgba(1,30,60,0.55)_14%,rgba(1,30,60,0)_32%)]" />
    </>
  ),
} as const;

export default function HeroSlideshow({
  slides,
  intervalMs = DEFAULT_INTERVAL_MS,
  fadeMs = DEFAULT_FADE_MS,
  parallax = false,
  scrim = "uniform",
  indicator = "dots",
  indicatorClassName,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
  /** Crossfade duration. Keep it well under `intervalMs` — see DEFAULT_FADE_MS. */
  fadeMs?: number;
  /**
   * Scroll-linked drift on the photographs. Transform-only and driven by a
   * motion value, so scrolling never re-renders React. Off under
   * `prefers-reduced-motion`.
   */
  parallax?: boolean;
  /** See SCRIMS. */
  scrim?: keyof typeof SCRIMS;
  /**
   * `dots` — centred 8px dots (the homepage). `progress` — a segmented bar
   * whose active segment fills over the interval (the church heroes).
   */
  indicator?: "dots" | "progress";
  /** Positions the indicator row. Each mode has a sensible default. */
  indicatorClassName?: string;
}) {
  const [active, setActive] = useState(0);
  /**
   * `false` on the server and on the first client render alike, so the deferred
   * slides are absent from the SSR markup and hydration still matches — the
   * same contract `AnimateIn` keeps for its media queries.
   */
  const [deferredMounted, setDeferredMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(
      () => setDeferredMounted(true),
      DEFERRED_SLIDE_DELAY_MS,
    );
    return () => clearTimeout(id);
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery(REDUCED_MOTION);
  // The photographs sit under the copy, so hover and focus are read off the
  // hero section that contains both.
  const held = useHoverFocusPause(rootRef, "parent");

  /**
   * ⚠️ The rotation is driven by a CSS animation, not a `setInterval`: the
   * active segment's fill (or, in `dots` mode, an invisible stand-in) runs for
   * `intervalMs` and its `animationend` advances the slide. Pausing is then
   * one property — `animation-play-state` — and the bar and the clock cannot
   * drift apart, because they are the same thing.
   *
   * It does not start until the deferred slides are in the DOM. Any interval
   * shorter than DEFERRED_SLIDE_DELAY_MS would otherwise advance onto a slide
   * that is still `null` and blank the hero. It never runs under reduced
   * motion, and holds while the hero is hovered or holds keyboard focus.
   */
  const rotating = slides.length > 1 && deferredMounted && !reduced;
  const advance = () => setActive((i) => (i + 1) % slides.length);
  const timerStyle = {
    animationDuration: `${intervalMs}ms`,
    animationPlayState: held ? "paused" : "running",
  } as const;

  // Read through a ref so the drift can switch itself off without the motion
  // value being torn down and rebuilt.
  const still = useRef(true);
  useEffect(() => {
    still.current = !parallax || reduced;
  }, [parallax, reduced]);
  const { scrollY } = useScroll();
  // Clamped at one screen of scroll: past that the hero is gone, and an
  // unchanging value means no style write on every later scroll frame.
  const drift = useTransform(scrollY, (v) =>
    still.current
      ? 0
      : Math.round(Math.min(Math.max(0, v), window.innerHeight) * PARALLAX_RATE),
  );

  /** Any slide carrying alt text opts the whole layer into the a11y tree. */
  const described = slides.some((slide) => slide.alt);

  const select = (i: number) => {
    // A tap inside the first 2.5s would otherwise select a slide that is not
    // in the DOM yet and leave the hero blank, so an explicit choice mounts
    // them immediately.
    setDeferredMounted(true);
    setActive(i);
  };

  return (
    <>
      {/* Every slide is stacked in the same box so the section height never
          depends on which one is showing. */}
      <motion.div
        ref={rootRef}
        aria-hidden={described ? undefined : true}
        // Its own compositor layer when it moves, so a scroll frame shifts
        // the bitmap rather than repainting the photograph.
        className={`absolute inset-0 ${parallax ? "will-change-transform" : ""}`}
        style={parallax ? { y: drift, scale: PARALLAX_SCALE } : undefined}
      >
        {slides.map((slide, i) => {
          // Slide 0 is the LCP element and always renders. The rest stay out of
          // the DOM until the delay above has run — see DEFERRED_SLIDE_DELAY_MS
          // for why `loading="lazy"` cannot do this job here.
          if (i > 0 && !deferredMounted) return null;

          return (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt ?? ""}
              /* Only the slide actually on screen is exposed. All of them sit
                 in the DOM at once, hidden by opacity rather than by display,
                 so without this a screen reader would read every caption in
                 the set as though they were all present. */
              aria-hidden={described && i !== active ? true : undefined}
              fill
              // Never both: Next throws if `priority` and `loading` are passed
              // together.
              {...(i === 0 ? { priority: true } : { loading: "lazy" as const })}
              sizes="100vw"
              // Inline rather than a `duration-*` class: the value is a prop,
              // and Tailwind can only emit classes it can see in the source.
              style={{ transitionDuration: `${fadeMs}ms` }}
              className={`object-cover transition-opacity ease-in-out ${
                slide.position ?? "object-center"
              } ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          );
        })}
      </motion.div>

      {/* Part of the component rather than the caller's job: a hero
          photograph on this site is never shown unscrimmed. */}
      {SCRIMS[scrim]}

      {slides.length > 1 && indicator === "dots" && (
        /* The dot stays 8px; the button around it is a full 44px tap target. */
        <div
          className={
            indicatorClassName ??
            "absolute inset-x-0 bottom-6 z-20 flex items-center justify-center sm:bottom-10"
          }
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show image ${i + 1} of ${slides.length}`}
              aria-current={i === active}
              className="group flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i === active
                    ? "bg-white"
                    : "bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
          {/* The clock, invisible: see `rotating` above. Keyed on the slide
              so it restarts from zero each time. */}
          {rotating && (
            <span
              key={active}
              aria-hidden
              className="slide-timer pointer-events-none absolute h-0 w-0"
              style={timerStyle}
              onAnimationEnd={advance}
            />
          )}
        </div>
      )}

      {slides.length > 1 && indicator === "progress" && (
        <div
          className={
            indicatorClassName ??
            "absolute inset-x-0 bottom-4 z-20 mx-auto max-w-7xl px-4 sm:bottom-8 sm:px-6 lg:px-16"
          }
        >
          <div className="flex w-full max-w-xs gap-2 sm:max-w-sm">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => select(i)}
                aria-label={`Show image ${i + 1} of ${slides.length}`}
                aria-current={i === active}
                // A 44px-tall tap target around a 3px bar.
                className="group flex h-11 flex-1 items-center"
              >
                <span className="relative block h-[3px] w-full overflow-hidden bg-white/30 transition-colors group-hover:bg-white/50">
                  {/* Earlier segments full; the active one filling (or full
                      and still under reduced motion); before the deferred
                      slides mount it waits at empty. */}
                  {i < active || (i === active && reduced) ? (
                    <span className="absolute inset-0 bg-white" />
                  ) : i === active && rotating ? (
                    <span
                      key={active}
                      className="slide-timer absolute inset-0 origin-left bg-brand-orange-light"
                      style={timerStyle}
                      onAnimationEnd={advance}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
