import Image from "next/image";
import AnimateIn from "./AnimateIn";
import Button from "./Button";
import SectionLabel from "./SectionLabel";
import HeroAtmosphere from "./HeroAtmosphere";
import HeroSlideshow, { type HeroSlide } from "./HeroSlideshow";

/**
 * The hero shared by /churches/bhcc and /churches/blcn (22 October 2026).
 * One component so the two pages cannot drift: same masthead, same copy
 * block, same scrim, same progress bar.
 *
 * Layout, top to bottom:
 * - **Masthead**, top-left under the navbar: the church's emblem, a hairline
 *   vertical rule, then the name and place stacked in small caps. It replaced
 *   the centred emblem on a white plate. The emblems are transparent cuts —
 *   `bhcc-mark-reverse.png` (white knocked out, navy recoloured white, the
 *   orange kept) and `blcn-emblem.png` (the disc cut out of its charcoal
 *   square). The originals are untouched; see CLAUDE.md → Assets Status.
 * - **The photographs**, under HeroSlideshow's `directional` scrim — dark only
 *   where there is copy, so the congregation is visible on the right.
 * - **The acronym**, giant and stroke-only, bleeding off the right edge. It
 *   is `aria-hidden` decoration; the label above the h1 carries the acronym as
 *   real text.
 * - **The copy**, bottom-left: label, h1, rule, subtitle, CTA.
 * - **The progress bar** under the copy, from HeroSlideshow.
 *
 * ⚠️ The copy is measured against every slide (see CLAUDE.md, "The church
 * heroes"). The acronym's stroke is part of that ground — it lightens what it
 * crosses, so its alpha is not free to be raised without re-measuring.
 */
export default function ChurchHero({
  name,
  acronym,
  place,
  label,
  subtitle,
  emblem,
  slides,
  intervalMs,
  fadeMs,
}: {
  name: string;
  acronym: string;
  /** Masthead second line, e.g. "Norwich · United Kingdom". */
  place: string;
  label: string;
  subtitle: string;
  emblem: { src: string; alt: string; width: number; height: number };
  slides: HeroSlide[];
  intervalMs?: number;
  fadeMs?: number;
}) {
  return (
    // Same height rule as the homepage hero: below `lg`, <main> carries the
    // 72px navbar offset, so the hero is one screen less that.
    <section className="relative flex min-h-[calc(100svh-72px)] flex-col overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy lg:min-h-svh">
      <HeroSlideshow
        slides={slides}
        intervalMs={intervalMs}
        fadeMs={fadeMs}
        scrim="directional"
        indicator="progress"
      />
      {/* The shared glow, over the scrims so it tints rather than being
          washed out by them. */}
      <HeroAtmosphere />

      <span
        aria-hidden
        // Below `lg` the copy spans the full width at the foot, so the
        // acronym rides the photo gap between masthead and copy; from `lg`
        // it drops to the bottom-right, clear of the copy column.
        className="hero-outline pointer-events-none absolute -right-[0.08em] top-[16%] select-none font-serif text-[40vw] font-bold leading-none tracking-tight sm:text-[30vw] lg:-bottom-[0.17em] lg:top-auto lg:text-[17vw]"
      >
        {acronym}
      </span>

      {/* Masthead */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-16 lg:pt-28">
        <AnimateIn direction="fade">
          <div className="flex items-center gap-4 sm:gap-5">
            <Image
              src={emblem.src}
              alt={emblem.alt}
              width={emblem.width}
              height={emblem.height}
              priority
              sizes="64px"
              className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
            />
            <span aria-hidden className="h-10 w-px shrink-0 bg-white/40 sm:h-12" />
            <div className="min-w-0 font-sans uppercase">
              <p className="text-xs font-semibold leading-snug tracking-[0.18em] text-white sm:text-sm">
                {name}
              </p>
              <p className="mt-1 text-[0.7rem] font-medium leading-snug tracking-[0.2em] text-white/90 sm:text-xs">
                {place}
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Copy, bottom-left. `mt-auto` pins it to the foot of the hero; the
          bottom padding clears the progress bar. */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-24 lg:px-16 lg:pb-28">
        <AnimateIn direction="up" className="max-w-2xl">
          <SectionLabel tone="photo">{label}</SectionLabel>
          <h1 className="font-serif text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="hero-shimmer">{name}</span>
          </h1>
          <div className="mt-6 h-0.5 w-16 bg-brand-orange" />
          <p className="mb-8 mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/80 sm:text-xl">
            {subtitle}
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Join Us
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
