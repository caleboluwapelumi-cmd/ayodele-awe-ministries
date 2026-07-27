import Image from "next/image";
import AnimateIn from "./AnimateIn";
import Button from "./Button";
import SectionLabel from "./SectionLabel";
import { MINISTER_NAME, TAGLINE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1609234656432-603ef6e4b079?w=1920&q=80"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlays — flat dark for legibility, then a navy wash into the next section */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-navy/90 via-transparent to-blue-navy/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
        <AnimateIn direction="up" className="max-w-3xl">
          <SectionLabel tone="dark">
            Minister of the Gospel &mdash; UK &amp; Nigeria
          </SectionLabel>

          <h1 className="mb-6 font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
            {MINISTER_NAME}
          </h1>

          <div className="mb-8 h-0.5 w-16 bg-blue-sky" />

          <p className="mb-10 max-w-lg font-sans text-lg leading-relaxed text-white/60 sm:text-xl">
            {TAGLINE}
          </p>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Button href="/media" variant="secondary" size="lg">
              Watch &amp; Listen
            </Button>
            <Button href="/partners" variant="outline" size="lg" className="text-white">
              Partner With Us
            </Button>
          </div>
        </AnimateIn>
      </div>

      {/* Fade into the following section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
    </section>
  );
}
