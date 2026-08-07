"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * The crossfading hero backdrop, shared by the homepage and /churches/blcn.
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

export default function HeroSlideshow({
  slides,
  intervalMs = DEFAULT_INTERVAL_MS,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
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

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  /** Any slide carrying alt text opts the whole layer into the a11y tree. */
  const described = slides.some((slide) => slide.alt);

  return (
    <>
      {/* Every slide is stacked in the same box so the section height never
          depends on which one is showing. */}
      <div aria-hidden={described ? undefined : true} className="absolute inset-0">
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
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                slide.position ?? "object-center"
              } ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          );
        })}
      </div>

      {/* Overlays — flat dark for legibility, then a navy wash into the next
          section. Part of the component rather than the caller's job: a hero
          photograph on this site is never shown unscrimmed. */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-brand-navy/40" />

      {/* Slide indicators. The dot stays 8px; the button around it is a full
          44px tap target, so the control is reachable on touch without
          changing how it looks. */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-10 z-20 flex items-center justify-center">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => {
                // A tap inside the first 2.5s would otherwise select a slide
                // that is not in the DOM yet and leave the hero blank, so an
                // explicit choice mounts them immediately.
                setDeferredMounted(true);
                setActive(i);
              }}
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
        </div>
      )}
    </>
  );
}
