import Link from "next/link";
import { ReactNode } from "react";

/**
 * Global button standard. Pill shape, sentence-case label, no letter-spacing.
 * Variant picks the treatment that suits the section background — see CLAUDE.md.
 *
 * Labels render exactly as authored — there is no `uppercase` here any more, so
 * write them in sentence or title case at the call site.
 *
 * ⚠️ Two variants were removed in the palette migration (7 August 2026):
 * `wine`, which had no palette left to sit on, and `birthday`, which was the
 * orange CTA back when orange was one page's private colour. `primary` IS that
 * button now, so /birthday's CTA needed no new treatment — just the standard
 * variant name. Old call sites became `secondary` and `primary` respectively.
 */
export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "default" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  /** Opens the link in a new tab. */
  external?: boolean;
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full transition-all duration-200 focus-visible:outline-none";

// Pills need more horizontal room than the old square buttons, and the label
// steps up a size now that it is no longer uppercased.
const SIZES: Record<ButtonSize, string> = {
  default: "px-8 py-3.5 text-sm",
  lg: "px-10 py-4 text-base",
};

const VARIANTS: Record<ButtonVariant, string> = {
  /**
   * The orange CTA — the site's primary action, on light and dark sections
   * alike. A solid fill carries its own ground, so unlike the accent *text*
   * tones this one needs no light/dark split.
   *
   * ⚠️ The fill is `brand-orange-deep`, NOT the brand `brand-orange`: white on
   * #EB6434 is 3.3:1, which fails AA for a 16px label. #BC4820 is 5.1:1 and
   * reads as the same orange. Keep the brighter tone for glows and numerals.
   */
  primary: "bg-brand-orange-deep text-white hover:bg-brand-orange-dark",
  // Dark sections — the quieter of the two solid fills, so a section can carry
  // a white pill beside an orange one without two CTAs competing.
  secondary: "bg-white text-brand-blue hover:bg-cream",
  // Any section — inherits the surrounding text colour
  outline: "border border-current hover:bg-white/10",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  onClick,
  className = "",
  disabled = false,
  type = "button",
  external = false,
}: ButtonProps) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className}`.trim();

  if (href && !disabled) {
    // Hash anchors, mail links and absolute URLs bypass the router.
    const isPlainAnchor =
      external || /^(https?:|mailto:|tel:|#)/.test(href);

    if (isPlainAnchor) {
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
