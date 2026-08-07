import { ReactNode } from "react";

/**
 * The small caps eyebrow that sits above every section heading.
 * `tone` picks the accent colour for the section background it sits on.
 *
 * ⚠️ Two tones down from five. The `bdayDark`/`bdayLight` pair was /birthday's
 * private copy of exactly this dark/light split and merged into it in the
 * palette migration; `onAccent` (white/60) existed for the wine bands, which no
 * longer exist — those sections are dark now and take `dark` like every other.
 *
 * The label is 12px, so each tone takes the orange that clears 4.5:1 on its own
 * ground. The brand #EB6434 fails on both grounds at this size and is reserved
 * for glows, rules and display-size numerals — don't reach for it here.
 */
export type LabelTone = "dark" | "light";

const TONES: Record<LabelTone, string> = {
  dark: "text-brand-orange-light", // on brand-navy / brand-blue sections — 6.3:1
  light: "text-brand-orange-deep", // on white / tint sections — 5.1:1 / 4.7:1
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
