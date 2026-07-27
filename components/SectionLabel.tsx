import { ReactNode } from "react";

/**
 * The small caps eyebrow that sits above every section heading.
 * `tone` picks the accent colour for the section background it sits on.
 */
export type LabelTone = "dark" | "light" | "onAccent";

const TONES: Record<LabelTone, string> = {
  dark: "text-blue-sky", // on navy / deep blue sections
  light: "text-wine", // on white / cream sections
  onAccent: "text-white/60", // on wine sections
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
