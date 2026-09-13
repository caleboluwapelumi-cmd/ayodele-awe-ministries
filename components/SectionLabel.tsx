import { ReactNode } from "react";

/**
 * The small caps eyebrow that sits above every section heading.
 * `tone` picks the treatment for the section background it sits on.
 *
 * ⚠️ Two tones down from five. The `bdayDark`/`bdayLight` pair was /birthday's
 * private copy of exactly this dark/light split and merged into it in the
 * palette migration; `onAccent` (white/60) existed for the wine bands, which no
 * longer exist — those sections are dark now and take `dark` like every other.
 *
 * The label is 12px, so each tone takes the orange that clears 4.5:1 on its own
 * ground. The brand #EB6434 fails on both grounds at this size and is reserved
 * for glows, rules and display-size numerals — don't reach for it here.
 *
 * ── `photo` is the third tone, and it is a backing, not a colour ────────────
 * ⚠️ A gradient's ground is a known quantity; a photograph's is not, and this
 * label was failing AA on every hero that sits on one. Measured before the fix,
 * worst pixel behind the glyphs: **2.77:1** on /churches/bhcc, **3.09:1** on
 * /churches/blcn, **3.36:1** on the homepage's second slide, **4.00:1** on
 * /media/teachings — against the 4.5:1 that 12px text needs. The h1 and the
 * body copy on those same heroes were never in trouble; this label was, because
 * it is the smallest text on the page and it takes the *lighter* of the two
 * oranges.
 *
 * ⚠️ The fix is a backing rather than a darker scrim **because the photograph
 * is not ours to rely on**. Every hero photo on this site is swappable — the
 * client has replaced the BLCN hero set once already and the Prayer Surge
 * banner is still pending — so a scrim tuned to the frames we happen to have
 * today silently breaks the day one is swapped for a brighter one. A backing
 * makes the ground behind the glyphs a constant, so the figure cannot move.
 *
 * ⚠️ `bg-brand-navy/70` is measured, not picked by eye. The worst ground a
 * photo hero can physically produce is a pure-white pixel under the
 * slideshow's `bg-black/60` and then the full-strength orange atmosphere glow
 * (`rgba(235,100,52,0.30)`) — rgb(142,101,87). Navy at 70% over *that* still
 * measures **6.06:1**, so this clears AA against any photograph whatsoever,
 * not merely the ones in the repo. Don't thin it below ~0.55 (4.72:1 at the
 * ceiling) and don't swap the navy for a lighter blue.
 *
 * The chip is the bordered-badge idiom already used on /books, /media,
 * /media/music and `MediaLinks` — sharp corners, `px-3 py-1.5`, a hairline
 * accent edge. It is `inline-flex` so the backing hugs the words rather than
 * stretching the column, which is also what keeps it centred inside the
 * church heroes' `text-center` and left-aligned in the homepage's block.
 *
 * ⚠️ It is NOT for a label over a plain gradient. Those already pass (6.3:1 on
 * flat brand-blue) and a chip there is decoration on a problem that does not
 * exist. The rule is mechanical: **over a photograph, `photo`; over a
 * gradient, `dark` or `light`.** `PageHero` applies it automatically whenever
 * `backgroundImage` is set, so only the three hand-built slideshow heroes pass
 * it explicitly.
 */
export type LabelTone = "dark" | "light" | "photo";

const TONES: Record<LabelTone, string> = {
  dark: "text-brand-orange-light", // on brand-navy / brand-blue sections — 6.3:1
  light: "text-brand-orange-deep", // on white / tint sections — 5.1:1 / 4.7:1
  // On a photograph — see the note above for the measurement behind the 70%.
  photo:
    "inline-flex items-center border border-brand-orange/25 bg-brand-navy/70 px-3 py-1.5 text-brand-orange-light",
};

export default function SectionLabel({
  children,
  tone = "dark",
  className = "mb-3",
}: {
  children: ReactNode;
  tone?: LabelTone;
  className?: string;
}) {
  return (
    <p
      className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] ${TONES[tone]} ${className}`}
    >
      {children}
    </p>
  );
}
