import { Metadata } from "next";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { Music, Headphones, Radio, Disc3, Mic } from "lucide-react";
import PageHero from "@/components/PageHero";
import MediaTabs from "@/components/MediaTabs";
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
      {/* ── 1. Hero ──
          The backdrop is a screenshot of the real Spotify artist page, so like
          /media/teachings it is meant to be looked at rather than read as
          texture — hence a real `imageAlt` rather than aria-hidden.

          ⚠️ `imageScrim="brand"`, NOT "soft". This source is a wall of Spotify
          green, and "soft" over it measures 2.91:1 on the h1 — under AA, exactly
          the failure PageHero's own note warns about for a bright source.
          "brand" restores 9.3:1 and also pulls the green back to our blue. See
          the imageScrim block in PageHero.tsx.

          `object-[4%_50%]`: the crop is the banner alone and so is 4.36:1 —
          far wider than any hero box — which means the height always fills
          exactly and only a slice of the WIDTH is ever shown (46% at desktop,
          ~15% on a phone). The vertical half of the value is therefore inert;
          the horizontal half is what matters, and biasing hard left is what
          keeps the single artwork and the start of the name in frame instead
          of the empty green field that fills the middle of the banner. */}
      <PageHero
        label="Music"
        title={<>Music &amp; Worship</>}
        subtitle="Songs that carry the presence of God"
        backgroundImage="/images/spotify-hero.jpg"
        imageAlt="The Ayodele Awe artist page on Spotify, showing the Sound of Restoration single"
        imagePosition="object-[4%_50%]"
        imageScrim="brand"
      />

      {/* ── Section sub-nav ── */}
      <MediaTabs />

      {/* ── 2. Spotify player ──
          Restored to the position it held before the media restructure: the
          live artist player is the page's only on-site playback, so it leads
          the page rather than sitting three sections down. Its prose came back
          with it — while it led Platforms, these paragraphs were parked in
          Genres, and leaving them there as well would print them twice on one
          page.

          Light, because MediaTabs is a mid-blue bar and every media page opens
          light beneath it. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
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

      {/* ── 3. Podcast ──
          ⚠️ Mid-blue, not light. It follows the light Spotify section above,
          and two light gradients stacked have no seam between them. Everything
          in here takes the dark idiom for that reason — `SectionLabel
          tone="dark"`, white heading, `white/70` body, and the tagline on
          `brand-orange-light`: that line is a 12px uppercase label, well under
          the 24px floor `brand-orange` needs as text, and `brand-orange-deep`
          is a light-section tone. */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
            <SectionLabel tone="dark">The Podcast</SectionLabel>
            <h2 className="mb-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {SPOTIFY_PODCAST_NAME}
            </h2>
            <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-light">
              {SPOTIFY_PODCAST_TAGLINE}
            </p>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
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

      {/* ── 4. Genres ──
          Back to light, and back to heading + rule only. The prose it was
          carrying belongs to the Spotify section and went home with it; this
          section is the three cards, which is what it was before. Light works
          here because the podcast band above is mid-blue. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Genres</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              Music for Every Season
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {GENRES.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1} className="h-full">
                <div className="h-full border-t-2 border-brand-orange bg-cream p-8 text-center">
                  <h3 className="mb-3 font-serif text-lg font-bold leading-tight text-brand-blue">
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

      {/* ── 5. Platforms ──
          The grid alone — the artist player that used to lead this section is
          back at position 2.

          ⚠️ No `border-t-2 border-brand-orange` here, deliberately: the seam
          rule is for a dark section following another dark one, and Genres
          above is light, which separates itself. The CTA below does need it. */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Platforms</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Available Everywhere
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORMS.map((p, i) => {
              const pending = p.href === "#";
              return (
                <AnimateIn key={p.name} delay={i * 0.1} className="h-full">
                  <div
                    className={`group flex h-full min-h-[200px] flex-col items-center justify-center border border-white/5 bg-white/[0.07] p-8 text-center transition-colors ${
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

      {/* ── 6. CTA Banner ── */}
      <section className="border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Let the Worship Minister to You
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Press play and let God meet you where you are.
          </p>
          <Button href={SOCIALS.spotify} variant="secondary" size="lg" external>
            Stream Now
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
