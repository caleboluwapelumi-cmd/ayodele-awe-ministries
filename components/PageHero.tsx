import { ReactNode } from "react";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import SectionLabel from "./SectionLabel";

/**
 * Shared hero for every inner page. Keeps rhythm, type scale and the
 * decorative rule identical site-wide.
 *
 * `backgroundImage` puts a photo behind the copy under the standard navy +
 * wine scrim. It always renders the dark treatment — light text on a scrimmed
 * photo — so `variant` is ignored when an image is passed. `imageAlt` is
 * optional: leave it off for a purely decorative backdrop (it is then
 * `aria-hidden`), pass it when the photo is actually part of the page's
 * subject, as on /about.
 */
export default function PageHero({
  label,
  title,
  subtitle,
  variant = "dark",
  backgroundImage,
  imageAlt,
  imagePosition = "object-center",
  children,
}: {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  variant?: "dark" | "light";
  backgroundImage?: string;
  imageAlt?: string;
  imagePosition?: string;
  children?: ReactNode;
}) {
  const dark = variant === "dark" || Boolean(backgroundImage);

  return (
    <section
      className={`relative overflow-hidden px-4 py-36 text-center sm:px-6 sm:py-48 lg:px-16 ${
        backgroundImage
          ? ""
          : dark
            ? "bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep"
            : "bg-gradient-to-br from-[#EEF3FA] to-white"
      }`}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={imageAlt ?? ""}
            aria-hidden={imageAlt ? undefined : true}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${imagePosition}`}
          />
          <div className="absolute inset-0 bg-blue-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-navy/85 via-blue-deep/55 to-wine-deep/85" />
        </>
      )}

      <AnimateIn direction="up" className="relative z-10 mx-auto max-w-3xl">
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
