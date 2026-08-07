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
 * ── Tones ──────────────────────────────────────────────────────────────────
 * `birthday` is the original: a warm orange glow low-left behind the copy and a
 * cool blue one high-right behind the portrait, so the flat gradient reads as
 * lit rather than painted. The values are verbatim from app/birthday/page.tsx.
 *
 * `site` is the same construction in the main site's blue/wine palette — wine
 * where the birthday page puts orange, mid-blue where it puts its own blue.
 *
 * ⚠️ **Read this before switching the site over to the orange tone.** The main
 * site is still on blue/wine: nothing outside /birthday uses a `bday-*` token,
 * so orange glows would sit on wine-gradient sections and read as a mistake,
 * not a treatment. When the palette migration lands, flip
 * `SITE_ATMOSPHERE_TONE` below and every hero on the site follows — that single
 * constant is the whole switch, and it is why the tone is a named export
 * instead of a default argument repeated at each call site.
 */

export type AtmosphereTone = "site" | "birthday";
export type AtmosphereSurface = "dark" | "light";

/**
 * The tone every main-site hero uses. `/birthday` passes `birthday` explicitly;
 * nothing else should hardcode a tone — change this one line instead.
 */
export const SITE_ATMOSPHERE_TONE: AtmosphereTone = "site";

/**
 * ⚠️ Full class strings, never interpolated fragments. Tailwind scans source
 * text, so a built-up `bg-[radial-gradient(...${x}...)]` produces no CSS.
 *
 * The alpha figures are not interchangeable between surfaces. On a dark hero
 * the glow is doing the lighting and can carry real weight; on a light hero the
 * same values turn the section muddy, so both drop by roughly half and the warm
 * tone drops further still — wine over white greys out long before it tints.
 */
const GLOW: Record<AtmosphereTone, Record<AtmosphereSurface, string>> = {
  site: {
    // wine-light #8B2346 low-left, blue #1B4F8A high-right
    dark: "bg-[radial-gradient(circle_at_20%_75%,rgba(139,35,70,0.35),transparent_58%),radial-gradient(circle_at_78%_22%,rgba(27,79,138,0.55),transparent_60%)]",
    light:
      "bg-[radial-gradient(circle_at_20%_75%,rgba(139,35,70,0.08),transparent_58%),radial-gradient(circle_at_78%_22%,rgba(74,144,217,0.16),transparent_60%)]",
  },
  birthday: {
    // bday-orange #EB6434 low-left, bday-blue-mid #024A8F high-right
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
