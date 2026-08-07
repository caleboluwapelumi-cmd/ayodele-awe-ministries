import AnimateIn from "./AnimateIn";
import Button from "./Button";
import SectionLabel from "./SectionLabel";
import HeroAtmosphere from "./HeroAtmosphere";
import DriftingParticles from "./DriftingParticles";
import HeroSlideshow, { type HeroSlide } from "./HeroSlideshow";
import { MINISTER_NAME, TAGLINE } from "@/lib/constants";

/**
 * Homepage full-screen hero — left-aligned and editorial.
 *
 * The crossfade, the deferred mount of the later slides and the slide dots all
 * live in `HeroSlideshow`, which /churches/blcn now shares. This file is a
 * server component because nothing is left in it that needs state.
 */

/**
 * Hero backdrop rotation. These sit behind the headline and are purely
 * decorative — no `alt`, so `HeroSlideshow` marks the whole layer aria-hidden.
 * The h1 already names the Pastor, and announcing a rotating set of images
 * would only add noise for screen readers.
 *
 * `position` compensates for the two photos being different orientations:
 * apostle-2 is portrait (1928x2560), so a full-bleed hero crops most of its
 * height. Biasing up and left keeps the subject — who sits high and to the
 * left of frame — from being cropped out on wide viewports.
 */
const SLIDES: HeroSlide[] = [
  { src: "/images/apostle-1.jpg", position: "object-center" },
  { src: "/images/apostle-2.jpg", position: "object-[30%_25%]" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Backdrop + both scrims + the dots. */}
      <HeroSlideshow slides={SLIDES} />

      {/* The atmosphere layer, shared with every `PageHero`. It sits ABOVE the
          slideshow's two scrims: under them the glow would be flattened back
          out by the very wash it is meant to tint. Both layers are
          `aria-hidden` and carry no JS beyond the dots' framer-motion loop,
          which is already in the shared chunk on every route. */}
      <HeroAtmosphere />
      <DriftingParticles density="sparse" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
        <AnimateIn direction="up" className="max-w-3xl">
          <SectionLabel tone="dark">
            Pastor &mdash; UK &amp; Nigeria
          </SectionLabel>

          {/* The sweep is on the span, not the h1 — at `leading-none` the h1's
              background box is shorter than the glyphs, so `background-clip:
              text` would drop the tails of the "y" and "p" in "Ayodele
              Oladapo". An inline box is sized from the font metrics instead.
              See PageHero for the full note. */}
          <h1 className="mb-6 font-serif text-5xl font-bold leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
            <span className="hero-shimmer">{MINISTER_NAME}</span>
          </h1>

          <div className="mb-8 h-0.5 w-16 bg-brand-orange" />

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

      {/* Fade into the following section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-navy to-transparent" />
    </section>
  );
}
