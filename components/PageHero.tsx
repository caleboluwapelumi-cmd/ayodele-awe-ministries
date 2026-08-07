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
 * `backgroundImage` puts a photo behind the copy under the standard navy
 * scrim. It always renders the dark treatment — light text on a scrimmed
 * photo — so `variant` is ignored when an image is passed. `imageAlt` is
 * optional: leave it off for a purely decorative backdrop (it is then
 * `aria-hidden`), pass it when the photo is actually part of the page's
 * subject, as on /about.
 *
 * ── imageScrim ──────────────────────────────────────────────────────────────
 * `"default"` is the flat navy wash every existing image hero uses: ~96%
 * opaque at the corners, which is right when the photo is pure texture and
 * nothing in it is meant to be looked at (/about, /books).
 *
 * `"soft"` is for a backdrop that is itself part of the message and has to be
 * legible — /media/teachings, whose hero is a screenshot of the actual
 * Telegram channel. It is a **centre-weighted** scrim, not simply a thinner
 * one: ~92% navy behind the copy column falling to ~51% at the edges, so the
 * image reads around a text block that stays on near-solid navy. A uniformly
 * lighter wash cannot do both — it either erases the image or puts the h1 over
 * whatever the image happens to contain.
 *
 * ⚠️ Only use `"soft"` over an already-dark source. Measured against the worst
 * case (copy landing directly on a white pixel of the screenshot): the h1 holds
 * 11.8:1 and the white/70 subtitle 5.7:1. A light photo under the same scrim
 * would put both under AA.
 *
 * `"brand"` is that same idea for a **bright** screenshot whose palette is not
 * ours — /media/music, whose hero is the Spotify artist page and therefore a
 * wall of Spotify green. It does two jobs `"soft"` cannot:
 *
 *   1. Legibility. `"soft"` over this source measures **2.91:1 on the h1** and
 *      2.20:1 on the subtitle — both well under AA, exactly the failure the
 *      warning above predicts. `"brand"` restores 9.3:1 and 5.5:1, measured the
 *      same way (worst/brightest composite pixel under the copy column, at
 *      1280x644, 1024x600 and 390x620 alike — the worst pixel is the white
 *      artist name burned into the screenshot itself).
 *   2. Palette. A near-full-frame green band is off-system on a white/blue/
 *      orange site, so the base wash is heavier and carries a `brand-blue` tint
 *      over it. The green survives as a hue in the corners, not as the ground —
 *      the same restraint the platform-branded sections on /media/teachings use.
 *
 * ⚠️ Re-measure if you point `"brand"` at a different image. The figures above
 * are properties of this screenshot, not of the recipe.
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
  imageScrim = "default",
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
  /**
   * How hard to knock the photo back. See the note above before using "soft"
   * (dark sources only) or "brand" (a bright, foreign-palette screenshot).
   */
  imageScrim?: "default" | "soft" | "brand";
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
            ? "bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy"
            : "bg-gradient-to-br from-brand-tint to-white"
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
          {imageScrim === "soft" ? (
            <>
              {/* A light brand tint over the whole frame — enough to pull a
                  foreign palette (Telegram's near-black + violet wallpaper)
                  into the site's blue without hiding it. */}
              <div className="absolute inset-0 bg-brand-navy/30" />
              {/* Then the centre weighting: near-solid navy behind the copy,
                  thinning towards the edges where the image does its work. */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(1,30,60,0.94)_0%,rgba(1,30,60,0.86)_40%,rgba(1,30,60,0.62)_70%,rgba(1,30,60,0.22)_100%)]" />
            </>
          ) : imageScrim === "brand" ? (
            <>
              {/* Heavier than "soft"'s 30% because the source is bright, and
                  tinted with brand-blue on top so what survives reads as our
                  palette rather than as Spotify green. */}
              <div className="absolute inset-0 bg-brand-navy/70" />
              <div className="absolute inset-0 bg-brand-blue/20" />
              {/* Same centre weighting as "soft", a touch stronger at the rim:
                  the corners of this source are the brightest part of the frame. */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(1,30,60,0.92)_0%,rgba(1,30,60,0.84)_40%,rgba(1,30,60,0.58)_70%,rgba(1,30,60,0.26)_100%)]" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-brand-navy/75" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/85 via-brand-blue/55 to-brand-navy/85" />
            </>
          )}
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
            dark ? "text-white" : "text-brand-blue"
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
        <div className="mx-auto mt-6 h-0.5 w-16 bg-brand-orange" />
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
