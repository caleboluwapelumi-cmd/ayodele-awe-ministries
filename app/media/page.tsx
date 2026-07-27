import { Metadata } from "next";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import YouTubeIcon from "@/components/icons/YouTubeIcon";

export const metadata: Metadata = {
  title: "Media — Ayodele Oladapo Awe Ministries",
  description:
    "Access teachings, music, and messages from Minister Ayodele Oladapo Awe.",
};

const QUICK_ACCESS = [
  { Icon: SpotifyIcon, title: "Music", desc: "Stream worship & gospel songs", link: "Listen" },
  { Icon: TelegramIcon, title: "Teachings", desc: "Access sermons & Bible studies", link: "Join" },
  { Icon: YouTubeIcon, title: "Videos", desc: "Watch live sessions & messages", link: "Watch" },
  { Icon: SpotifyIcon, title: "Podcast", desc: "Listen on the go", link: "Listen" },
];

export default function MediaPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <PageHero
        label="Media"
        title={<>The Word &amp; The Worship</>}
        subtitle="Access teachings, music, and messages from Minister Ayodele Oladapo Awe anywhere in the world"
      />

      {/* ── 2. Teachings Section ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <SectionLabel tone="light">Teachings</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Word of God on Telegram
            </h2>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Minister Awe&apos;s teachings are made available through our
                Telegram channel — a growing library of sermons, Bible studies,
                and prophetic messages.
              </p>
              <p>
                Whether you are looking for foundational truths or deep
                prophetic insights, the Telegram channel is your access point to
                the Word taught with clarity and fire.
              </p>
              <p>
                Join the channel, share with your community, and let the Word of
                God transform your life.
              </p>
            </div>
            <Button href="#" variant="primary" size="lg" external>
              Join Telegram Channel
            </Button>
            <p className="mt-4 font-sans text-xs uppercase tracking-widest text-muted">
              Free to join. New teachings posted regularly.
            </p>
          </AnimateIn>

          <AnimateIn direction="right">
            <div className="relative overflow-hidden border-t-2 border-blue-sky p-12 text-center">
              <Image
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/85" />
              <div className="relative z-10">
                <div className="mx-auto mb-6 flex justify-center">
                  <TelegramIcon size={64} />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-blue-navy">
                  Telegram Teachings
                </h3>
                <p className="mb-6 font-sans text-sm text-muted">
                  Sermons · Bible Studies · Prophetic Messages
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-blue-sky transition-colors hover:text-blue"
                >
                  Join Now
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Music Section ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="relative overflow-hidden border-t-2 border-blue-sky p-12 text-center">
              <Image
                src="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-navy/80" />
              <div className="relative z-10">
                <div className="mx-auto mb-6 flex justify-center">
                  <SpotifyIcon size={64} />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-white">
                  Music on Spotify
                </h3>
                <p className="mb-6 font-sans text-sm text-white/50">
                  Worship · Gospel · Prophetic Songs
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-blue-sky transition-colors hover:text-white"
                >
                  Listen Now
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="dark">Music</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Worship on Spotify
            </h2>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              <p>
                Minister Awe&apos;s music is a vessel of encounter — crafted to
                usher believers into the presence of God through worship,
                prophetic songs, and gospel anthems.
              </p>
              <p>
                His discography spans worship, gospel, and prophetic music, each
                song carrying a message of hope, revival, and the glory of God.
              </p>
              <p>
                Stream his music on Spotify, add it to your worship playlists,
                and let the songs minister to you in your personal devotion and
                corporate gatherings.
              </p>
            </div>
            <Button href="#" variant="secondary" size="lg" external>
              Stream on Spotify
            </Button>
            <p className="mt-4 font-sans text-xs uppercase tracking-widest text-white/40">
              Available on all major streaming platforms.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Quick Access ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Quick Access</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Everything in One Place
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_ACCESS.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1} className="h-full">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-[200px] flex-col items-center justify-center bg-cream p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-center">
                    <card.Icon size={48} />
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-bold leading-tight text-blue-navy transition-colors group-hover:text-blue">
                    {card.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                    {card.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-blue-sky transition-colors group-hover:text-blue">
                    {card.link}
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

      {/* ── 5. Newsletter CTA ── */}
      <section className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Stay Updated</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            New Content, Straight to Your Inbox
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Subscribe to get notified when new teachings and music are released.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Invite Minister Awe to Minister
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Book Minister Ayodele Oladapo Awe for your church, conference, or
            event.
          </p>
          <Button href="/contact" variant="wine" size="lg">
            Book Now
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
