import Link from "next/link";
import { MINISTER_NAME, TAGLINE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1609234656432-603ef6e4b079?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-blue-sky mb-6">
          Minister of the Gospel | UK &amp; Nigeria
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8">
          {MINISTER_NAME}
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">
          {TAGLINE}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/media"
            className="font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors"
          >
            Watch &amp; Listen
          </Link>
          <Link
            href="/partners"
            className="font-sans text-sm font-semibold border border-white/40 text-white px-10 py-4 rounded-lg hover:border-white transition-colors"
          >
            Partner With Us
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
    </section>
  );
}
