import { Metadata } from "next";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { Music, Headphones, Radio, Disc3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

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

const GENRES = [
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
];

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
      <PageHero
        label="Music"
        title={<>Music &amp; Worship</>}
        subtitle="Songs that carry the presence of God"
      />

      {/* ── 2. About ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep p-16 shadow-xl">
              <SpotifyIcon size={120} />
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">Stream on Spotify</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Worship That Transforms
            </h2>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Music has always been central to the ministry of Ayodele
                Oladapo Awe. From intimate worship recordings to powerful gospel
                anthems, every song is crafted to draw listeners into a genuine
                encounter with God.
              </p>
              <p>
                Spanning worship, gospel, and prophetic genres, the music of
                Minister Awe carries the weight of God&apos;s presence — birthed
                from the place of prayer and designed to minister to the heart
                of every listener.
              </p>
              <p>
                Whether you&apos;re in your quiet time, driving to work, or
                gathered with fellow believers, let these songs usher you into
                the presence of the Most High.
              </p>
            </div>
            <Button href="#" variant="primary" size="lg" external>
              Open Spotify
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Genres ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Genres</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Music for Every Season
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {GENRES.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1} className="h-full">
                <div className="h-full border-t-2 border-blue-sky bg-cream p-8 text-center">
                  <h3 className="mb-3 font-serif text-lg font-bold leading-tight text-blue-navy">
                    {card.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-muted">
                    {card.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Platforms ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Platforms</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Available Everywhere
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORMS.map((p, i) => (
              <AnimateIn key={p.name} delay={i * 0.1} className="h-full">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-[200px] flex-col items-center justify-center border border-white/5 bg-blue-deep/50 p-8 text-center transition-colors hover:border-white/20"
                >
                  <div className="mb-4">
                    <PlatformIcon type={p.icon} />
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-white">
                    {p.name}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-blue-sky transition-colors group-hover:text-white">
                    Listen
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Let the Worship Minister to You
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Press play and let God meet you where you are.
          </p>
          <Button href="#" variant="wine" size="lg" external>
            Stream Now
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
