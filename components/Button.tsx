import Link from "next/link";
import { ReactNode } from "react";

/**
 * Global button standard. Pill shape, sentence-case label, no letter-spacing.
 * Variant picks the treatment that suits the section background — see CLAUDE.md
 * button rules (wine is never a button background on dark blue sections).
 *
 * Labels render exactly as authored — there is no `uppercase` here any more, so
 * write them in sentence or title case at the call site.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "wine"
  | "birthday";
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
  // Light sections
  primary: "bg-blue text-white hover:bg-blue-deep",
  // Dark blue sections
  secondary: "bg-white text-blue-navy hover:bg-cream",
  // Any section — inherits the surrounding text colour
  outline: "border border-current hover:bg-white/10",
  // Wine / accent sections
  wine: "bg-white text-wine hover:bg-cream",
  /**
   * /birthday only — the orange CTA, on light and dark sections alike.
   *
   * ⚠️ The fill is `bday-orange-deep`, not the brand `bday-orange`: white on
   * #EB6434 is 3.3:1, which fails AA for a 16px label. #C74E23 is 4.6:1 and
   * reads as the same orange. Keep the brighter tone for glows and numerals.
   */
  birthday: "bg-bday-orange-deep text-white hover:bg-bday-orange-dark",
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
