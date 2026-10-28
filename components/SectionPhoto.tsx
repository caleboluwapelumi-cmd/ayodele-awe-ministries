import Image from "next/image";

/**
 * A real photograph laid faintly into a dark or mid-blue section, so a band
 * that was gradient-only reads as lit by the ministry's own pictures. Added 22
 * October 2026 to one section each on /partners, /contact, /itinerary,
 * /events, /ministry, /media and /books.
 *
 * Usage: the section takes `relative isolate overflow-hidden` and its content
 * `relative z-10`. `isolate` is load-bearing — the blend below mixes against
 * the section's own gradient, and without a stacking context of its own the
 * photo would blend against whatever sits behind the section instead.
 *
 * ⚠️ The recipe is measured, not a look:
 * - `mix-blend-luminosity` keeps the section's blue hue and borrows only the
 *   photograph's light and shade, so a foreign colour (an orange top, a red
 *   flag) never lands on the ground. That is the "brand-blue overlay".
 * - `brightness-50` caps the brightest pixel the photo can contribute, and
 *   12% opacity sets how much of it reaches the ground. ⚠️ Both were lowered
 *   from 60% / 16% after measuring: at those values the 12px
 *   `brand-orange-light` labels on /contact's `bg-white/[0.07]` cards fell to
 *   4.28:1 and /itinerary's "Conferences" to 4.35:1. Now the worst text run in
 *   any of the seven sections is 4.75:1. Raising either value breaks those
 *   labels first — see CLAUDE.md, "Photography in section backgrounds".
 * - Dark and mid sections only. On a light section the same photo reads as a
 *   grey smudge across white.
 *
 * ⚠️ Weight: `sizes="50vw"` + `quality={40}` deliberately ask for a small
 * rendition. At 12% opacity under a blend nobody can see the difference, and
 * it keeps each photo at a few KB to a few tens of KB. Lazy-loaded: none of these is the
 * LCP element.
 *
 * ⚠️ Content integrity: these are `aria-hidden` texture, so they carry no
 * caption — but placement is still a claim. Never put a congregation photo
 * behind copy about a specific dated gathering (it would read as a picture
 * *of* that gathering), and never behind the /events "What God Has Done"
 * empty state, which says photos are yet to come. Only photographs from
 * `public/images/` — no stock.
 */
export default function SectionPhoto({
  src,
  position = "object-center",
}: {
  src: string;
  /** `object-position` utility, e.g. `object-[50%_30%]`. */
  position?: string;
}) {
  return (
    <div
      aria-hidden
      data-section-photo
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="50vw"
        quality={40}
        loading="lazy"
        className={`object-cover opacity-[0.12] mix-blend-luminosity brightness-50 ${position}`}
      />
    </div>
  );
}
