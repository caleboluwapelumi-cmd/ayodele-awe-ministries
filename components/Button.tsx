import Link from "next/link";
import { ReactNode } from "react";

/**
 * Global button standard. Sharp corners, small uppercase label, wide tracking.
 * Variant picks the treatment that suits the section background — see CLAUDE.md
 * button rules (wine is never a button background on dark blue sections).
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "wine";
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
  "inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase tracking-widest rounded-none transition-all duration-200 focus-visible:outline-none";

const SIZES: Record<ButtonSize, string> = {
  default: "px-7 py-3.5 text-xs",
  lg: "px-8 py-4 text-sm",
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
