import { Metadata } from "next";
import TelegramIcon from "@/components/icons/TelegramIcon";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { SOCIALS, YOUTUBE_UPLOADS_PLAYLIST_ID } from "@/lib/constants";
import { getLatestSermons } from "@/lib/telegram";

/** How many of the newest Telegram sermons to list. */
const SERMON_COUNT = 5;

/** "26 June 2026" — en-GB in UTC so server and client agree. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const metadata: Metadata = {
  title: "Telegram Teachings — Ayodele Oladapo Awe Ministries",
  description:
    "Access sermons, Bible studies, and prophetic messages from Pastor Awe via Telegram.",
};

const CONTENT_TYPES = [
  {
    title: "Sermons",
    desc: "Weekly messages from Pastor Awe rooted in the Word and delivered with prophetic insight.",
  },
  {
    title: "Bible Studies",
    desc: "Deep dives into Scripture — verse by verse, book by book — for a richer understanding of God's truth.",
  },
  {
    title: "Prophetic Messages",
    desc: "Words of encouragement, direction, and prophetic insight to strengthen your faith and sharpen your walk.",
  },
];

export default async function TeachingsPage() {
  // Scraped from the public channel preview, revalidated hourly. Can legitimately
  // come back empty — the section below renders a fallback for that.
  const sermons = await getLatestSermons(SERMON_COUNT);

  return (
    <>
      {/* ── 1. Hero ── */}
      <PageHero
        label="Teachings"
        title="Telegram Teachings"
        subtitle="The Word of God — accessible anywhere, anytime"
      />

      {/* ── 2. About the Channel ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep p-16 shadow-xl">
              <TelegramIcon size={120} />
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">About the Channel</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              A Library of the Word
            </h2>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Pastor Ayodele Oladapo Awe&apos;s Telegram channel is a
                growing library of sermons, Bible studies, and prophetic
                messages — curated to build faith and equip believers wherever
                they are.
              </p>
              <p>
                Whether you&apos;re a new believer seeking foundation or a
                seasoned Christian hungry for deeper truths, the teachings
                shared on this channel are designed to bring the Word of God to
                life in your everyday walk.
              </p>
              <p>
                Join thousands of believers across the UK, Nigeria, and beyond
                who are being transformed by the consistent ministry of the Word
                through this platform.
              </p>
            </div>
            <Button href={SOCIALS.telegram} variant="primary" size="lg" external>
              Join Telegram Channel
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Latest Sermons — live from the Telegram channel ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="dark">Listen Now</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Latest Sermons
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Our 5 most recent teachings — updated automatically
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          {sermons.length > 0 ? (
            <>
              <ul className="mx-auto mt-16 max-w-4xl border-t border-white/10">
                {sermons.map((sermon, i) => (
                  <AnimateIn key={sermon.id} delay={i * 0.1}>
                    <li className="flex flex-col gap-5 border-b border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg font-bold leading-tight text-white">
                          {sermon.title}
                        </h3>
                        <p className="mt-2 font-sans text-xs uppercase tracking-widest text-white/50">
                          <time dateTime={sermon.date}>
                            {formatDate(sermon.date)}
                          </time>
                          {sermon.duration && <> &middot; {sermon.duration}</>}
                          {sermon.performer && <> &middot; {sermon.performer}</>}
                        </p>
                      </div>

                      <Button
                        href={sermon.url}
                        variant="outline"
                        external
                        className="shrink-0 self-start text-white sm:self-auto"
                      >
                        Listen on Telegram
                      </Button>
                    </li>
                  </AnimateIn>
                ))}
              </ul>

              <AnimateIn direction="up" className="mt-16 text-center">
                <Button
                  href={SOCIALS.telegram}
                  variant="secondary"
                  size="lg"
                  external
                >
                  Browse the full library
                </Button>
              </AnimateIn>
            </>
          ) : (
            /* Fetch failed, or the channel has posted no audio recently. */
            <AnimateIn direction="up" className="mt-16 text-center">
              <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                New teachings coming soon.
              </p>
              <Button
                href={SOCIALS.telegram}
                variant="secondary"
                size="lg"
                external
              >
                Browse the full library
              </Button>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* ── 4. Watch — YouTube ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="light">Watch</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Services on YouTube
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              Full services, live sessions, and video messages from Pastor
              Awe.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <AnimateIn direction="up" className="mt-16">
            {YOUTUBE_UPLOADS_PLAYLIST_ID ? (
              <YouTubeEmbed
                playlistId={YOUTUBE_UPLOADS_PLAYLIST_ID}
                title="Ayodele Awe Ministries on YouTube"
              />
            ) : (
              <div className="border-t-2 border-blue-sky bg-cream p-12 text-center">
                <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  Watch every service and message on the ministry&apos;s YouTube
                  channel.
                </p>
                <Button href={SOCIALS.youtube} variant="primary" size="lg" external>
                  Open YouTube channel
                </Button>
              </div>
            )}
          </AnimateIn>
        </div>
      </section>

      {/* ── 5. What to Expect ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">What to Expect</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Content on the Channel
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {CONTENT_TYPES.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-blue-sky">
                  {card.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-white/70">
                  {card.desc}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Start Today
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Join the channel today and let the Word transform your life.
          </p>
          <Button href={SOCIALS.telegram} variant="wine" size="lg" external>
            Join Telegram Channel
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
