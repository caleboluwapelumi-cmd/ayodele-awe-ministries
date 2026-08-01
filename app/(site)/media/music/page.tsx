import { Metadata } from "next";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { Music, Headphones, Radio, Disc3, Mic } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import {
  ANCHOR_FM_URL,
  SOCIALS,
  SPOTIFY_ARTIST_ID,
  SPOTIFY_PODCAST_ID,
  SPOTIFY_PODCAST_NAME,
  SPOTIFY_PODCAST_TAGLINE,
  SPOTIFY_PODCAST_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Music & Worship — Ayodele Oladapo Awe Ministries",
  description:
    "Worship, gospel, and prophetic songs from Pastor Awe — plus the Babylonian Legends podcast. Stream on Spotify and all major platforms.",
};

// Spotify and Anchor.fm are live; Apple Music and Audiomack are still pending.
// Anchor.fm took the YouTube Music slot to keep the grid at four across.
const PLATFORMS = [
  { name: "Spotify", icon: "spotify", href: SOCIALS.spotify },
  { name: "Anchor.fm", icon: "podcast", href: ANCHOR_FM_URL },
  { name: "Apple Music", icon: "music", href: "#" },
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
    case "podcast":
      return <Mic size={size} className={`${cls} text-purple-400`} />;
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
            <SpotifyEmbed
              kind="artist"
              id={SPOTIFY_ARTIST_ID}
              title="Ayodele Oladapo Awe on Spotify"
              className="shadow-xl"
            />
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
                Pastor Awe carries the weight of God&apos;s presence — birthed
                from the place of prayer and designed to minister to the heart
                of every listener.
              </p>
              <p>
                Whether you&apos;re in your quiet time, driving to work, or
                gathered with fellow believers, let these songs usher you into
                the presence of the Most High.
              </p>
            </div>
            <Button href={SOCIALS.spotify} variant="primary" size="lg" external>
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

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
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
            {PLATFORMS.map((p, i) => {
              const pending = p.href === "#";
              return (
                <AnimateIn key={p.name} delay={i * 0.1} className="h-full">
                  <div
                    className={`group flex h-full min-h-[200px] flex-col items-center justify-center border border-white/5 bg-blue-deep/50 p-8 text-center transition-colors ${
                      pending ? "opacity-60" : "hover:border-white/20"
                    }`}
                  >
                    <div className="mb-4">
                      <PlatformIcon type={p.icon} />
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-white">
                      {p.name}
                    </h3>
                    {pending ? (
                      <span className="mt-6 inline-flex items-center border border-white/20 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-white/50">
                        Coming Soon
                      </span>
                    ) : (
                      <Button
                        href={p.href}
                        variant="outline"
                        external
                        className="mt-6 text-white"
                      >
                        Listen
                      </Button>
                    )}
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Podcast ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <SpotifyEmbed
              kind="show"
              id={SPOTIFY_PODCAST_ID}
              title={`${SPOTIFY_PODCAST_NAME} podcast on Spotify`}
              className="shadow-xl"
            />
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">Also On</SectionLabel>
            <h2 className="mb-3 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              {SPOTIFY_PODCAST_NAME}
            </h2>
            <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-blue-sky">
              {SPOTIFY_PODCAST_TAGLINE}
            </p>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Beyond the music, Pastor Ayodele Oladapo Awe shares
                conversations, reflections, and teaching in podcast form —
                available to stream free on Spotify.
              </p>
              <p>
                Follow the show to get every new episode as soon as it drops,
                wherever you listen.
              </p>
            </div>
            <Button
              href={SPOTIFY_PODCAST_URL}
              variant="primary"
              size="lg"
              external
            >
              Listen on Spotify
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Let the Worship Minister to You
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Press play and let God meet you where you are.
          </p>
          <Button href={SOCIALS.spotify} variant="wine" size="lg" external>
            Stream Now
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
