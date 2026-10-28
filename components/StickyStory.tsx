"use client";

import { useEffect, useRef, useState } from "react";
import RevealImage from "./RevealImage";

/**
 * A pinned image with text steps scrolling past it. The caption set over the
 * image changes to match whichever step is at the middle of the screen, so the
 * picture stays put while the story moves.
 *
 * - **Desktop (lg+)**: the image column is `sticky`; each step is at least
 *   60vh tall so there is room to scroll while it is pinned.
 * - **Mobile**: nothing is pinned. A sticky image would take half a phone's
 *   height for the whole section, so the image sits on top and the steps
 *   follow as an ordinary list. The changing caption is desktop-only for the
 *   same reason — on a phone the image has scrolled away by step two.
 *
 * Step text never dims. Fading inactive steps is the usual move, but white at
 * reduced opacity on this blue fails 4.5:1; the active step is marked by its
 * numeral and rule instead, both decorative.
 *
 * The step tracker is an IntersectionObserver on a thin band at mid-screen —
 * no scroll listener, no layout reads.
 *
 * ⚠️ The section around this must use `overflow-clip`, never
 * `overflow-hidden`. `hidden` makes the section a scroll container, and a
 * sticky child then sticks to a box that never scrolls — i.e. not at all.
 */
export type StoryStep = { title: string; desc: string };

export default function StickyStory({
  steps,
  image,
  imageAlt,
  imagePosition,
  eyebrow,
}: {
  steps: StoryStep[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
  /** Small label over the image, e.g. "The Mandate". */
  eyebrow: string;
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.step);
          if (!Number.isNaN(i)) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const total = String(steps.length).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="relative">
            <RevealImage
              src={image}
              alt={imageAlt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]"
              imageClassName={imagePosition}
              /* The pin is this image's motion. Parallax on a sticky element
                 measures against a position that stops changing mid-scroll,
                 so it would lurch at the pin points. */
              parallax={false}
            />

            {/* Caption plate. The scrim is near-solid navy at the foot, so the
                caption measures against navy whatever the photograph does —
                the reasoning behind SectionLabel's `photo` tone. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-transparent px-6 pb-6 pt-24 sm:px-8 sm:pb-8">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-light">
                {eyebrow}
              </p>
              {/* aria-hidden: it repeats the step headings below, which screen
                  readers already reach in order. Announcing it on every
                  scroll would be noise. */}
              <div aria-hidden className="mt-2 hidden lg:block">
                <p key={active} className="caption-swap font-serif text-2xl font-bold leading-tight text-white">
                  <span className="mr-3 text-white/80">
                    {String(active + 1).padStart(2, "0")}/{total}
                  </span>
                  {steps[active]?.title}
                </p>
              </div>

              {/* Progress — one segment per step. */}
              <div aria-hidden className="mt-5 hidden gap-2 lg:flex">
                {steps.map((step, i) => (
                  <span
                    key={step.title}
                    className={`h-0.5 flex-1 transition-colors duration-500 ${
                      i <= active ? "bg-brand-orange" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol className="lg:col-span-6 lg:col-start-7">
        {steps.map((step, i) => (
          <li
            key={step.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-step={i}
            className="flex flex-col justify-center border-t border-white/10 py-10 first:border-t-0 first:pt-0 lg:min-h-[60vh] lg:py-16 lg:first:pt-16"
          >
            <span
              aria-hidden
              className={`font-serif text-5xl font-bold leading-none transition-colors duration-500 sm:text-6xl ${
                i === active ? "text-brand-orange" : "text-white/25"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className={`mt-6 block h-0.5 bg-brand-orange transition-all duration-500 ${
                i === active ? "w-16" : "w-6"
              }`}
            />
            <h3 className="mt-6 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
              {step.title}
            </h3>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-white/75 sm:text-lg">
              {step.desc}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
