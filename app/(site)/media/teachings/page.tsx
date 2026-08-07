import { Metadata } from "next";
import Image from "next/image";
import TelegramIcon from "@/components/icons/TelegramIcon";
import YouTubeIcon from "@/components/icons/YouTubeIcon";
import PageHero from "@/components/PageHero";
import MediaTabs from "@/components/MediaTabs";
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
  title: "Teachings by Pastor Ayodele Awe — Ayodele Oladapo Awe Ministries",
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
      {/* ── 1. Hero ──
          The backdrop is a screenshot of the real channel, so unlike every
          other image hero on the site it is meant to be looked at rather than
          read as texture — hence `imageScrim="soft"`, and hence a real
          `imageAlt` rather than aria-hidden. `object-[50%_18%]`: a ~2:1 hero
          crop of this 1.60 source shows only ~71% of its height, and centring
          cuts the channel header off the top. */}
      <PageHero
        label="Teachings"
        title="Teachings by Pastor Ayodele Awe"
        subtitle="The Word of God — accessible anywhere, anytime"
        backgroundImage="/images/telegram-hero.jpg"
        imageAlt="The Pastor Ayodele O Awe Teachings channel on Telegram, showing recent audio messages"
        imagePosition="object-[50%_18%]"
        imageScrim="soft"
      />

      {/* ── 2. Section sub-nav ── */}
      <MediaTabs />

      {/* ── 3. About the Channel ── */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            {/* The channel's own info panel, contained on a dark mat — the same
                idiom the church About panels use for an emblem. Contained, not
                cropped: it is a 441×822 phone-shaped screenshot and any
                object-cover crop cuts the panel apart. The mat is dark rather
                than the usual white plate because the screenshot is itself
                near-black, and a white mat would ring it with a hard edge. */}
            <div className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy p-8 shadow-xl sm:p-12">
              <div className="relative mx-auto aspect-[441/822] w-full max-w-[280px] overflow-hidden ring-1 ring-white/10">
                <Image
                  src="/images/telegram-about.jpg"
                  alt="The Telegram channel info panel for Pastor Ayodele O Awe Teachings"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">About the Channel</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
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
              {/* ⚠️ This read "Join thousands of believers" until the channel
                  screenshots went in. The hero now shows the real subscriber
                  count on the channel header, so the claim was contradicted by
                  the image directly above it. Don't put a number back here —
                  the screenshot is the number. */}
              <p>
                Join believers across the UK, Nigeria, and beyond who are being
                transformed by the consistent ministry of the Word through this
                platform.
              </p>
            </div>
            <Button href={SOCIALS.telegram} variant="primary" size="lg" external>
              Join Telegram Channel
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Latest Sermons — live from the Telegram channel ──
          Platform-branded, but only by tint and watermark: the ground stays the
          standard dark gradient. Telegram's own #229ED9 is far too light to be
          a section ground (see the "two blues" note in CLAUDE.md), so the brand
          reference is a low-alpha `brand-blue-mid` wash — measured at 0.30 over
          the gradient it lands on ~#013971, which keeps every accent figure in
          this section at or above where it sits on flat `brand-blue`. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_12%_0%,rgba(2,74,143,0.30),transparent_65%)]"
        />
        {/* The mark itself, oversized and nearly invisible — texture, not a logo
            placement. Bleeds off the corner so it never reads as a stray icon. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 opacity-[0.07] sm:-right-24 sm:-top-16"
        >
          <TelegramIcon size={340} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="dark">Listen Now</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Latest Sermons
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Our 5 most recent teachings — updated automatically
            </p>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
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

      {/* ── 5. Watch — YouTube ──
          The Telegram section's counterpart, and deliberately the second dark
          section in a row: the two platforms read as a pair. ⚠️ That is exactly
          the case the `border-t-2 border-brand-orange` seam exists for — blue
          against blue has no edge of its own, and without the rule these two
          would collapse into one long block. Don't drop it.

          The warm wash is `brand-orange-dark`, not YouTube's #FF0000. It reads
          red against navy at this alpha while staying a palette token, and it
          composites *darker* than the ground rather than lighter, so nothing in
          the section loses contrast. The literal red lives only in the
          watermark. */}
      <section className="relative overflow-hidden border-t-2 border-brand-orange bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_88%_0%,rgba(156,58,24,0.28),transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 opacity-[0.08] sm:-bottom-16 sm:-left-24"
        >
          <YouTubeIcon size={340} />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="dark">Watch</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Services on YouTube
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Full services, live sessions, and video messages from Pastor
              Awe.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <AnimateIn direction="up" className="mt-16">
            {YOUTUBE_UPLOADS_PLAYLIST_ID ? (
              <YouTubeEmbed
                playlistId={YOUTUBE_UPLOADS_PLAYLIST_ID}
                title="Ayodele Awe Ministries on YouTube"
              />
            ) : (
              /* The left rule, not a second top rule — the section already
                 carries one, and stacking the two reads as a mistake. */
              <div className="border-l-4 border-brand-orange bg-white/5 p-12 text-center">
                <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
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

      {/* ── 6. What to Expect ──
          Light, where it used to be mid-blue. Giving the two platform sections
          above their own dark treatments put three dark bands in a row ahead of
          the dark CTA; this is the slot that had to give way to keep the page
          alternating. ⚠️ The card headings move `brand-orange-light` →
          `brand-orange-deep` with it — the light tone is 2.2:1 on white. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">What to Expect</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              Content on the Channel
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {CONTENT_TYPES.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-brand-orange-deep">
                  {card.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-muted">
                  {card.desc}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA Banner ── */}
      <section className="border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Start Today
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Join the channel today and let the Word transform your life.
          </p>
          <Button href={SOCIALS.telegram} variant="secondary" size="lg" external>
            Join Telegram Channel
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
