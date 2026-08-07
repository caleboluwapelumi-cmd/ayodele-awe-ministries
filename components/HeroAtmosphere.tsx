/**
 * The layered radial glow that sits behind a hero's copy, extracted from the
 * /birthday hero so both `PageHero` and `HeroSection` render the same thing
 * rather than two copy-pasted gradient strings.
 *
 * ⚠️ This is a **server** component and contains no JavaScript at all — the
 * whole effect is two `radial-gradient()`s in one `background-image`. That is
 * deliberate: this renders on every route, and the performance audit's standing
 * rule is that the atmosphere layer must not grow framer-motion's footprint.
 * If you ever need it to move, animate the parent, not this.
 *
 * ── The tone ────────────────────────────────────────────────────────────────
 * A warm orange glow low-left behind the copy and a cool blue one high-right
 * behind the portrait, so a flat gradient reads as lit rather than painted.
 *
 * ⚠️ **There used to be two tones and there is now one.** `site` held a
 * blue/wine transposition of these values, and `SITE_ATMOSPHERE_TONE` was the
 * switch that would flip the whole site over when the palette migration landed.
 * It landed on 7 August 2026: every hero on the site now runs the orange/blue
 * values below, which are /birthday's originals verbatim. The second tone was
 * deleted rather than left pointing at the same table — a `Record` with two
 * identical rows is not a switch, it is duplication waiting to drift.
 *
 * The constant is kept because it is still the one place a future tone change
 * would be made, and because call sites read better naming it than repeating a
 * literal. Nothing passes `tone` explicitly any more, /birthday included.
 */

export type AtmosphereTone = "brand";
export type AtmosphereSurface = "dark" | "light";

/** The tone every hero uses. See the note above before adding a second. */
export const SITE_ATMOSPHERE_TONE: AtmosphereTone = "brand";

/**
 * ⚠️ Full class strings, never interpolated fragments. Tailwind scans source
 * text, so a built-up `bg-[radial-gradient(...${x}...)]` produces no CSS.
 *
 * The alpha figures are not interchangeable between surfaces. On a dark hero
 * the glow is doing the lighting and can carry real weight; on a light hero the
 * same values turn the section muddy, so both drop by roughly half.
 */
const GLOW: Record<AtmosphereTone, Record<AtmosphereSurface, string>> = {
  brand: {
    // brand-orange #EB6434 low-left, brand-blue-mid #024A8F high-right
    dark: "bg-[radial-gradient(circle_at_20%_75%,rgba(235,100,52,0.30),transparent_58%),radial-gradient(circle_at_78%_22%,rgba(2,74,143,0.65),transparent_60%)]",
    light:
      "bg-[radial-gradient(circle_at_20%_75%,rgba(235,100,52,0.10),transparent_58%),radial-gradient(circle_at_78%_22%,rgba(2,74,143,0.14),transparent_60%)]",
  },
};

export default function HeroAtmosphere({
  tone = SITE_ATMOSPHERE_TONE,
  surface = "dark",
  className = "",
}: {
  tone?: AtmosphereTone;
  surface?: AtmosphereSurface;
  /** Extra positioning classes. The layer is `absolute inset-0` by default. */
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${GLOW[tone][surface]} ${className}`.trim()}
    />
  );
}
