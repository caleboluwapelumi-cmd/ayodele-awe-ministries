"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import Button from "./Button";
import SectionLabel from "./SectionLabel";
import { MINISTER_NAME, TAGLINE } from "@/lib/constants";

const SLIDE_DURATION_MS = 6000;

/**
 * Hero backdrop rotation. These sit behind the headline and are purely
 * decorative (aria-hidden) — the h1 already names the minister, so announcing
 * a rotating set of images would only add noise for screen readers.
 *
 * `position` compensates for the two photos being different orientations:
 * apostle-2 is portrait (3072x4080), so a full-bleed hero crops most of its
 * height. Biasing up and left keeps the subject — who sits high and to the
 * left of frame — from being cropped out on wide viewports.
 */
const SLIDES = [
  { src: "/images/apostle-1.jpg", position: "object-center" },
  { src: "/images/apostle-2.jpg", position: "object-[30%_25%]" },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_DURATION_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background slideshow — every slide is stacked in the same box so the
          section height never depends on which one is showing */}
      <div aria-hidden className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              slide.position
            } ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Overlays — flat dark for legibility, then a navy wash into the next section */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-navy/90 via-transparent to-blue-navy/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
        <AnimateIn direction="up" className="max-w-3xl">
          <SectionLabel tone="dark">
            Pastor &mdash; UK &amp; Nigeria
          </SectionLabel>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
            {MINISTER_NAME}
          </h1>

          <div className="mb-8 h-0.5 w-16 bg-blue-sky" />

          <p className="mb-10 max-w-lg font-sans text-lg leading-relaxed text-white/60 sm:text-xl">
            {TAGLINE}
          </p>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Button href="/media" variant="secondary" size="lg">
              Watch &amp; Listen
            </Button>
            <Button href="/partners" variant="outline" size="lg" className="text-white">
              Partner With Us
            </Button>
          </div>
        </AnimateIn>
      </div>

      {/* Slide indicators */}
      {/* The dot stays 8px; the button around it is a full 44px tap target, so
          the control is reachable on touch without changing how it looks. */}
      <div className="absolute inset-x-0 bottom-10 z-20 flex items-center justify-center">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
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

      {/* Fade into the following section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
    </section>
  );
}
