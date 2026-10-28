/**
 * A slow strip of names sliding right to left. Server component: the motion is
 * the `.marquee-track` CSS animation, so the strip costs no JavaScript at all.
 *
 * - **Seamless loop**: the track holds two identical copies and slides by half
 *   its width. On wide screens each copy repeats the list once more
 *   (`marquee-wide`) so a copy is always wider than the viewport, even at
 *   2560px — otherwise the strip would show a gap before the loop restarts.
 *   Phones skip that repeat: six names already outrun a 390px screen, and a
 *   strip half as wide is half the layer to composite.
 * - **Off-screen it does no work**: `content-visibility: auto` on `.marquee`
 *   skips rendering it — animation included — until it nears the viewport.
 * - **Pausable**: hover and keyboard focus stop it (see globals.css). There is
 *   no pause button — see lib/motion.ts.
 * - **Reduced motion**: one copy, wrapped and centred, standing still.
 * - **Screen readers** get a plain list; the moving copies are `aria-hidden`
 *   so nobody hears every name four times.
 *
 * ⚠️ Type size is the contrast floor. Alternate names run in `brand-orange`,
 * which is only legitimate as text at 24px+ — the smallest step here is
 * `text-4xl` (36px) bold, so it clears AA large on the navy band.
 */
export default function Marquee({
  items,
  label,
  className = "",
}: {
  items: string[];
  label: string;
  className?: string;
}) {
  const copy = (copyIndex: number) => (
    <div
      key={copyIndex}
      className={`flex shrink-0 items-center ${copyIndex > 0 ? "marquee-dup" : ""}`}
    >
      {[0, 1].map((repeat) =>
        items.map((item, i) => (
          <span
            key={`${repeat}-${item}`}
            className={`flex items-center ${repeat > 0 ? "marquee-dup marquee-wide" : ""}`}
          >
            <span
              className={`whitespace-nowrap px-6 font-serif text-4xl font-bold leading-none sm:px-10 sm:text-6xl ${
                i % 2 === 0 ? "text-white" : "text-brand-orange"
              }`}
            >
              {item}
            </span>
            {/* A small cross between names — the ministry mark's own motif. */}
            <svg
              viewBox="0 0 12 12"
              className="h-3 w-3 shrink-0 text-brand-orange-light sm:h-4 sm:w-4"
              fill="currentColor"
            >
              <path d="M5 0h2v5h5v2H7v5H5V7H0V5h5z" />
            </svg>
          </span>
        )),
      )}
    </div>
  );

  return (
    <section
      aria-label={label}
      className={`marquee relative overflow-hidden py-8 sm:py-10 ${className}`}
    >
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div aria-hidden>
        <div className="marquee-track flex w-max">{[0, 1].map(copy)}</div>
      </div>

      {/* Edge fades. Two gradient overlays in the band's own navy, NOT a
          `mask-image` on the track: a mask over a moving layer that wide made
          the browser re-composite the whole strip every frame, and it was the
          single heaviest thing on the homepage in the 390px frame-timing
          probe. The band's gradient runs out to navy at both ends, so the
          overlays match it exactly. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-brand-navy to-transparent sm:w-24" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand-navy to-transparent sm:w-24" />
    </section>
  );
}
