import { ReactNode } from "react";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import SectionLabel from "./SectionLabel";
import HeroAtmosphere from "./HeroAtmosphere";
import DriftingParticles from "./DriftingParticles";

/**
 * Shared hero for every inner page. Keeps rhythm, type scale and the
 * decorative rule identical site-wide.
 *
 * `backgroundImage` puts a photo behind the copy under the standard navy +
 * wine scrim. It always renders the dark treatment — light text on a scrimmed
 * photo — so `variant` is ignored when an image is passed. `imageAlt` is
 * optional: leave it off for a purely decorative backdrop (it is then
 * `aria-hidden`), pass it when the photo is actually part of the page's
 * subject, as on /about.
 *
 * ── The atmosphere layer ────────────────────────────────────────────────────
 * Every hero carries `HeroAtmosphere` (the /birthday hero's layered radial
 * glows) and a one-pass shimmer sweep on the h1. Both are shared with
 * `HeroSection` so the homepage and the inner pages read as one system; see
 * those two files for the mechanics.
 *
 * ⚠️ `particles` is **opt-in and deliberately rare**. Drifting dots on all ten
 * PageHero routes would stop being atmosphere and start being a tic — the
 * technique earns its keep by not appearing everywhere. It is on /events and
 * /ministry only; the homepage gets it through `HeroSection`. Adding a fourth
 * is a design decision, not a default.
 *
 * ⚠️ Ordering matters: glow, then particles, then the scrim-free content at
 * `z-10`. With `backgroundImage` set, the glow sits **over** the photo scrim so
 * it tints the same way it does on a plain gradient — under it the scrim would
 * flatten it back out.
 */
export default function PageHero({
  label,
  title,
  subtitle,
  variant = "dark",
  backgroundImage,
  imageAlt,
  imagePosition = "object-center",
  particles = false,
  children,
}: {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  variant?: "dark" | "light";
  backgroundImage?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** Adds the drifting dot field. See the warning above before turning it on. */
  particles?: boolean;
  children?: ReactNode;
}) {
  const dark = variant === "dark" || Boolean(backgroundImage);

  return (
    <section
      className={`relative overflow-hidden px-4 py-36 text-center sm:px-6 sm:py-48 lg:px-16 ${
        backgroundImage
          ? ""
          : dark
            ? "bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep"
            : "bg-gradient-to-br from-[#EEF3FA] to-white"
      }`}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={imageAlt ?? ""}
            aria-hidden={imageAlt ? undefined : true}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${imagePosition}`}
          />
          <div className="absolute inset-0 bg-blue-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-navy/85 via-blue-deep/55 to-wine-deep/85" />
        </>
      )}

      <HeroAtmosphere surface={dark ? "dark" : "light"} />
      {particles && <DriftingParticles density="sparse" />}

      <AnimateIn direction="up" className="relative z-10 mx-auto max-w-3xl">
        {label && (
          <SectionLabel tone={dark ? "dark" : "light"}>{label}</SectionLabel>
        )}
        <h1
          className={`font-serif text-4xl font-bold leading-tight tracking-tight sm:text-6xl ${
            dark ? "text-white" : "text-blue-navy"
          }`}
        >
          {/* ⚠️ The sweep goes on an inline span, never on the h1 itself — the
              same shape /birthday uses. `background-clip: text` paints the
              element's own background box, and a block h1's box is its
              line-height: at `leading-tight` the tails of a "g" or "y" fall
              outside it and would render transparent. An inline box is sized
              from the font's own metrics, so descenders keep their gradient.

              ⚠️ The variant must match the heading colour. The sweep settles on
              its gradient's end stop, so `.hero-shimmer` (white) under navy
              text would leave the h1 white on a light section. */}
          <span className={dark ? "hero-shimmer" : "hero-shimmer-light"}>
            {title}
          </span>
        </h1>
        <div className="mx-auto mt-6 h-0.5 w-16 bg-blue-sky" />
        {subtitle && (
          <p
            className={`mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed sm:text-lg ${
              dark ? "text-white/70" : "text-muted"
            }`}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </AnimateIn>
    </section>
  );
}
