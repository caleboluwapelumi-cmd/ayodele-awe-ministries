import { ReactNode } from "react";

/**
 * The small caps eyebrow that sits above every section heading.
 * `tone` picks the accent colour for the section background it sits on.
 */
export type LabelTone =
  | "dark"
  | "light"
  | "onAccent"
  | "bdayDark"
  | "bdayLight";

const TONES: Record<LabelTone, string> = {
  dark: "text-blue-sky", // on navy / deep blue sections
  light: "text-wine", // on white / cream sections
  onAccent: "text-white/60", // on wine sections
  /**
   * /birthday only. The label is 12px, so each tone takes the orange that
   * clears 4.5:1 on its own ground — the light tint on deep blue (5.6:1), the
   * deep tint on white (4.6:1). The brand #EB6434 fails both and is reserved
   * for glows, rules and display-size numerals.
   */
  bdayDark: "text-bday-orange-light", // on the birthday deep-blue sections
  bdayLight: "text-bday-orange-deep", // on the birthday white sections
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
