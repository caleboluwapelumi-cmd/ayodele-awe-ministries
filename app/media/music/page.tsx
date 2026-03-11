import { Metadata } from "next";
import Link from "next/link";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { Music, Headphones, Radio, Disc3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Music & Worship — Ayodele Oladapo Awe Ministries",
  description:
    "Worship, gospel, and prophetic songs from Minister Awe — stream on Spotify and all major platforms.",
};

const PLATFORMS = [
  { name: "Spotify", icon: "spotify", href: "#" },
  { name: "Apple Music", icon: "music", href: "#" },
  { name: "YouTube Music", icon: "headphones", href: "#" },
  { name: "Audiomack", icon: "disc", href: "#" },
] as const;

function PlatformIcon({ type, size = 32 }: { type: string; size?: number }) {
  const cls = "mx-auto";
  switch (type) {
    case "spotify":
      return <SpotifyIcon size={size} className={cls} />;
    case "music":
      return <Music size={size} className={`${cls} text-pink-400`} />;
    case "headphones":
      return <Headphones size={size} className={`${cls} text-red-400`} />;
    case "disc":
      return <Disc3 size={size} className={`${cls} text-orange-400`} />;
    default:
      return <Radio size={size} className={cls} />;
  }
}

export default function MusicPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
          Music
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Music &amp; Worship
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
          Songs that carry the presence of God
        </p>
      </section>

      {/* ── 2. About ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Icon card */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep rounded-lg p-16 flex items-center justify-center shadow-xl">
              <SpotifyIcon size={120} />
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
              Stream on Spotify
            </p>
            <h2 className="font-serif text-3xl text-blue-navy mb-6">
              Worship That Transforms
            </h2>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Music has always been central to the ministry of Ayodele Oladapo
              Awe. From intimate worship recordings to powerful gospel anthems,
              every song is crafted to draw listeners into a genuine encounter
              with God.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Spanning worship, gospel, and prophetic genres, the music of
              Minister Awe carries the weight of God&apos;s presence — birthed
              from the place of prayer and designed to minister to the heart of
              every listener.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              Whether you&apos;re in your quiet time, driving to work, or
              gathered with fellow believers, let these songs usher you into the
              presence of the Most High.
            </p>
            <Link
              href="#"
              className="inline-flex items-center font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors"
            >
              Open Spotify →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Genres ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
            Genres
          </p>
          <h2 className="font-serif text-3xl text-blue-navy mb-16">
            Music for Every Season
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                title: "Worship",
                desc: "Intimate songs of adoration and encounter — created to draw you into God's presence.",
              },
              {
                title: "Gospel",
                desc: "Uplifting anthems of faith and victory that celebrate the goodness and faithfulness of God.",
              },
              {
                title: "Prophetic",
                desc: "Songs birthed from the place of prayer — carrying a prophetic edge and spiritual depth.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-cream rounded-lg p-8 text-center border border-blue/10"
              >
                <h3 className="font-serif text-lg text-blue-navy mb-3">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Platforms ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue text-center">
        <div className="mx-auto max-w-5xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Platforms
          </p>
          <h2 className="font-serif text-3xl text-white mb-16">
            Available Everywhere
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PLATFORMS.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group bg-blue-deep/50 rounded-lg p-8 border border-white/5 hover:border-white/20 transition-all text-center"
              >
                <div className="mb-4">
                  <PlatformIcon type={p.icon} />
                </div>
                <h3 className="font-sans text-sm font-medium text-white mb-2">
                  {p.name}
                </h3>
                <span className="font-sans text-xs text-blue-sky group-hover:text-white transition-colors">
                  Listen →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Banner ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Let the Worship Minister to You
          </h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">
            Press play and let God meet you where you are.
          </p>
          <Link
            href="#"
            className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors"
          >
            Stream Now →
          </Link>
        </div>
      </section>
    </>
  );
}
