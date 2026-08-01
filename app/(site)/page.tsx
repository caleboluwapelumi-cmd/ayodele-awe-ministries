import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ChurchCard from "@/components/ChurchCard";
import EventCard from "@/components/EventCard";
import CountdownTimer from "@/components/CountdownTimer";
import MediaLinks from "@/components/MediaLinks";
import NewsletterForm from "@/components/NewsletterForm";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import { CHURCHES } from "@/lib/constants";
import { PRAYER_SURGE, nextPrayerSurge } from "@/lib/prayer-surge";

/**
 * The Prayer Surge date is derived from the current time, so this page has to
 * be re-rendered rather than frozen at build — see lib/prayer-surge.ts.
 */
export const revalidate = 3600;

/**
 * Card copy only — the card image is each church's own emblem, read from
 * `CHURCHES[].logo`. There is no stock photograph here on purpose: a generic
 * photo in a card headed "BHCC" reads as a photo of BHCC.
 */
const CHURCH_COPY: Record<string, { description: string }> = {
  BHCC: {
    description:
      "A vibrant, Spirit-led community in the United Kingdom committed to building lives and raising leaders through the Word of God.",
  },
  BLCN: {
    description:
      "A thriving network of believers in Nigeria dedicated to community-driven ministry, discipleship, and gospel outreach.",
  },
};

export default function HomePage() {
  const surge = nextPrayerSurge();

  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* ── 2. About Snippet ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/apostle-portrait.jpg"
                alt="Pastor Ayodele Oladapo Awe"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">About the Pastor</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              A Voice Sent with Purpose
            </h2>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Born in Nigeria and now based in the United Kingdom, Ayodele
                Oladapo Awe carries a mandate rooted in worship, the Word, and
                the building of God&apos;s house across nations.
              </p>
              <p>
                Through conferences, church planting, and discipleship, he
                equips individuals and communities to walk in their God-given
                purpose, raising a generation of worshippers and leaders.
              </p>
              <p>
                From the pulpit to the marketplace, the vision remains the same
                — raising voices, building houses, and transforming nations.
              </p>
            </div>
            <Button href="/about" variant="primary">
              Read More
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Ministry Expressions ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up">
            <SectionLabel tone="dark">Our Ministry Expressions</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Two churches, one mandate
            </h2>
            <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Building the house of God in the UK and Nigeria.
            </p>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {CHURCHES.map((church, i) => (
              <AnimateIn key={church.acronym} delay={i * 0.1} className="h-full">
                <ChurchCard
                  name={church.name}
                  acronym={church.acronym}
                  description={CHURCH_COPY[church.acronym].description}
                  location={church.location}
                  logoUrl={church.logo}
                  href={church.href}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Upcoming Events ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up">
            <SectionLabel tone="light">Upcoming Events</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Join us at our next gathering
            </h2>
            <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              Whether in person or online, there is always a place for you.
            </p>
          </AnimateIn>

          <AnimateIn direction="up" className="mt-12 max-w-md">
            <EventCard
              title={PRAYER_SURGE.title}
              date={surge.shortDate}
              location={PRAYER_SURGE.location}
              registerLink="/events"
              ctaLabel="Event details"
            />
          </AnimateIn>

          {/* Full-width band so the countdown numerals have room to breathe */}
          <AnimateIn direction="up" className="mt-16">
            <div className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-6 py-12 text-center sm:px-12 sm:py-16">
              <SectionLabel tone="dark">Next Gathering</SectionLabel>
              <p className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                {surge.fullDate}
              </p>
              <div className="mt-8">
                <CountdownTimer targetDate={surge.startsAt} />
              </div>
              <p className="mx-auto mt-10 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                Join us every last Saturday of the month at 10:00 AM and become
                part of what God is doing in Norwich through united,
                Spirit-filled prayer.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 5. Teachings & Music ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up">
            <SectionLabel tone="dark">Teachings &amp; Music</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Access the Word and worship from anywhere
            </h2>
            <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Stream sermons on Telegram and worship on Spotify.
            </p>
          </AnimateIn>

          <div className="mt-12">
            <MediaLinks />
          </div>
        </div>
      </section>

      {/* ── 6. Partners ── */}
      {/* The backdrop is a CSS gradient, not a photo. It was a decorative
          Unsplash image (aria-hidden) sitting under a black/70 scrim, so almost
          none of it survived to the eye — but every visitor still paid for a
          cross-origin fetch through the image optimiser. Same look, no request. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-wine-deep via-blue-navy to-blue-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-wine/25 via-transparent to-blue-deep/40"
        />

        <AnimateIn direction="up" className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionLabel tone="onAccent">Partnership</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Partner With Us
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Your partnership fuels the gospel across the UK and Nigeria. Join a
            community of believers sowing into revival.
          </p>
          <Button href="/partners" variant="wine" size="lg">
            Become a Partner
          </Button>
        </AnimateIn>
      </section>

      {/* ── 7. Newsletter ── */}
      <section className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Stay Connected</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Join our mailing list
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Get updates on events, teachings, and ministry news.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>
    </>
  );
}
