import Button from "./Button";
import SectionLabel from "./SectionLabel";
import HeroAtmosphere from "./HeroAtmosphere";
import DriftingParticles from "./DriftingParticles";
import HeroSlideshow, { type HeroSlide } from "./HeroSlideshow";
import { MINISTER_NAME, TAGLINE } from "@/lib/constants";

/**
 * Homepage full-screen hero — left-aligned and editorial.
 *
 * The crossfade, the deferred mount of the later slides, the slide dots and
 * the scroll parallax all live in `HeroSlideshow`, which /churches/blcn and
 * /churches/bhcc share (they leave `parallax` off). This file stays a server
 * component.
 *
 * ⚠️ The entrance is CSS, not `AnimateIn`. The h1 is split into words that
 * rise in one after another (`.hero-word` in globals.css), and the label, rule,
 * tagline and buttons follow on `.hero-rise` with staggered `--d` delays. Doing
 * it in CSS keeps the whole hero — h1 included — in the server markup, with no
 * JavaScript in the critical path of the LCP screen. Reduced motion shows it
 * all at once.
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

/** Delay for a `.hero-rise` element, in seconds. */
const rise = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

export default function HeroSection() {
  const words = MINISTER_NAME.split(" ");
  // The rest of the hero follows the last word in.
  const afterName = 0.15 + words.length * 0.09 + 0.25;

  return (
    // `svh`, not `min-h-screen`: on mobile Safari `vh` ignores the browser
    // chrome, so a 100vh hero is cut off until the address bar hides.
    // ⚠️ Below `lg` it is one screen LESS the 72px navbar, because <main>
    // carries `pt-[72px]` there. A full `100svh` hero pushed its bottom row —
    // scroll cue, slide dots — just under the fold on a phone.
    <section className="relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden lg:min-h-svh">
      {/* Backdrop + both scrims + the dots. Hovering or focusing the hero
          holds the rotation; there is no pause button (see lib/motion.ts). */}
      <HeroSlideshow slides={SLIDES} parallax />

      {/* The atmosphere layer, shared with every `PageHero`. It sits ABOVE the
          slideshow's two scrims: under them the glow would be flattened back
          out by the very wash it is meant to tint. */}
      <HeroAtmosphere />
      <DriftingParticles density="sparse" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="max-w-3xl">
          {/* `photo`, not `dark`: this label sits on the slideshow, where the
              dark tone measured 3.36:1 on slide 2 and 4.33:1 on slide 1 at
              2560px. See SectionLabel. */}
          <div className="hero-rise" style={rise(0)}>
            <SectionLabel tone="photo">
              Pastor &mdash; UK &amp; Nigeria
            </SectionLabel>
          </div>

          {/* One span per word; the spaces between them are real text, so the
              heading reads and copies as one name. */}
          <h1 className="mb-6 font-serif text-5xl font-bold leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
            {words.map((word, i) => (
              <span key={word + i}>
                <span className="hero-word">
                  <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <div className="hero-rise mb-8 h-0.5 w-16 bg-brand-orange" style={rise(afterName)} />

          <p
            className="hero-rise mb-10 max-w-lg font-sans text-lg leading-relaxed text-white/70 sm:text-xl"
            style={rise(afterName + 0.1)}
          >
            {TAGLINE}
          </p>

          <div
            className="hero-rise flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            style={rise(afterName + 0.2)}
          >
            <Button href="/media" variant="secondary" size="lg">
              Watch &amp; Listen
            </Button>
            <Button href="/partners" variant="outline" size="lg" className="text-white">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue. A real link to the next section, so it is useful from
          the keyboard too; the travelling bead runs twice then rests (see
          `.scroll-cue-line`). Bottom-left, clear of the centred dots. */}
      <a
        href="#home-next"
        className="absolute bottom-6 left-4 z-20 flex h-11 items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white sm:bottom-10 sm:left-6 lg:left-16"
      >
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-white/25">
          <span className="scroll-cue-line absolute inset-x-0 top-0 h-1/2 bg-brand-orange-light" />
        </span>
        Scroll
      </a>

      {/* Fade into the following section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-navy to-transparent" />
    </section>
  );
}
