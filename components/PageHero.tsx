import { ReactNode } from "react";
import AnimateIn from "./AnimateIn";
import SectionLabel from "./SectionLabel";

/**
 * Shared hero for every inner page. Keeps rhythm, type scale and the
 * decorative rule identical site-wide.
 */
export default function PageHero({
  label,
  title,
  subtitle,
  variant = "dark",
  children,
}: {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  variant?: "dark" | "light";
  children?: ReactNode;
}) {
  const dark = variant === "dark";

  return (
    <section
      className={`px-4 py-36 text-center sm:px-6 sm:py-48 lg:px-16 ${
        dark
          ? "bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep"
          : "bg-gradient-to-br from-[#EEF3FA] to-white"
      }`}
    >
      <AnimateIn direction="up" className="mx-auto max-w-3xl">
        {label && (
          <SectionLabel tone={dark ? "dark" : "light"}>{label}</SectionLabel>
        )}
        <h1
          className={`font-serif text-4xl font-bold leading-tight tracking-tight sm:text-6xl ${
            dark ? "text-white" : "text-blue-navy"
          }`}
        >
          {title}
        </h1>
        <div className="mx-auto mt-6 h-0.5 w-16 bg-blue-sky" />
        {subtitle && (
          <p
            className={`mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed sm:text-lg ${
              dark ? "text-white/70" : "text-muted"
            }`}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </AnimateIn>
    </section>
  );
}
