import { Metadata } from "next";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import { PRAYER_SURGE, nextPrayerSurge } from "@/lib/prayer-surge";

export const metadata: Metadata = {
  title: "Events — Ayodele Oladapo Awe Ministries",
  description:
    "Discover upcoming conferences, prayer surges, and ministry gatherings across the UK and Nigeria.",
};

/**
 * The Prayer Surge date is derived from the current time, so this page has to
 * be re-rendered rather than frozen at build — see lib/prayer-surge.ts.
 */
export const revalidate = 3600;

export default function EventsPage() {
  const surge = nextPrayerSurge();

  return (
    <>
      {/* ── 1. Page Hero ── */}
      <PageHero
        label="Events"
        title="Gather. Encounter. Be Transformed."
        subtitle="Join us at our upcoming gatherings across the UK and Nigeria"
      />

      {/* ── 2. Featured Event ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&q=80"
                alt="Norwich Prayer Surge"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">Featured Event</SectionLabel>
            <h2 className="mb-3 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Norwich Prayer Surge
            </h2>
            <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-wine">
              United Kingdom
            </p>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              Norwich Prayer Surge is a monthly gathering of believers committed
              to contending for spiritual awakening through sustained, fervent
              prayer. Held every last Saturday of the month from 10:00 AM, this
              seven-hour prayer meeting is a call to seek God&apos;s face until
              His presence transforms lives, churches, and the city.
            </p>

            <dl className="mb-8 space-y-3 font-sans text-base text-muted">
              <div className="flex gap-2">
                <dt className="font-semibold text-blue-navy">Date:</dt>
                <dd>
                  {PRAYER_SURGE.schedule} &mdash; next on {surge.fullDate}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-blue-navy">Time:</dt>
                <dd>{PRAYER_SURGE.timeRange} (seven hours)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-blue-navy">Location:</dt>
                <dd>{PRAYER_SURGE.location}</dd>
              </div>
            </dl>

            <Button href="/contact" variant="primary" size="lg">
              Plan your visit
            </Button>
          </AnimateIn>
        </div>

        {/* Why the gathering exists — the scripture the vision came from. */}
        <AnimateIn direction="up" className="mx-auto mt-24 max-w-3xl">
          <div className="text-center">
            <SectionLabel tone="light">The Vision</SectionLabel>
            <h3 className="mb-6 font-serif text-2xl font-bold leading-tight text-blue-navy sm:text-3xl md:text-4xl">
              Until the wilderness becomes a fruitful field
            </h3>
            <div className="mx-auto mb-8 h-0.5 w-16 bg-blue-sky" />
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              This vision was birthed from {PRAYER_SURGE.scripture.reference}:
            </p>
          </div>

          <blockquote className="border-l-4 border-wine bg-cream p-8">
            <p className="font-serif text-xl font-medium italic leading-relaxed text-blue-navy sm:text-2xl">
              &ldquo;{PRAYER_SURGE.scripture.text}&rdquo;
            </p>
            <cite className="mt-4 block font-sans text-xs uppercase not-italic tracking-[0.2em] text-wine">
              {PRAYER_SURGE.scripture.reference}
            </cite>
          </blockquote>

          <div className="mt-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
            <p>
              We believe that when the Holy Spirit is poured out, barren places
              become fruitful, broken lives are restored, and cities experience
              the transforming power of God&apos;s Kingdom. Norwich Prayer Surge
              exists to release the river of the Holy Spirit through worship,
              intercession, prophetic declarations, and Spirit-led prayer until
              every spiritual wilderness is turned into a fruitful field, and
              every fruitful field becomes a flourishing forest.
            </p>
            <p>
              Whether you are hungry for personal revival, burdened for your
              community, or passionate about seeing God&apos;s purposes
              established in Norwich and beyond, this gathering is for you.
            </p>
            <p>
              Come and stand with us as we pray for revival, salvation, healing,
              transformation, and the manifestation of God&apos;s Kingdom in our
              generation.
            </p>
          </div>
        </AnimateIn>

        {/* Full-width band so the countdown numerals have room to breathe */}
        <AnimateIn direction="up" className="mx-auto mt-24 w-full max-w-7xl">
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
              part of what God is doing in Norwich through united, Spirit-filled
              prayer.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/*
        ── 3. All Events ──
        The Prayer Surge is the only confirmed gathering, and the featured
        section above already carries it in full — a one-card grid here would
        just repeat it. This band keeps the dark beat in the page rhythm and
        says plainly that there is nothing else to list yet.
      */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">All Events</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Upcoming Gatherings
          </h2>
          <div className="mx-auto mb-8 h-0.5 w-16 bg-blue-sky" />
          <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            The Norwich Prayer Surge is our regular monthly gathering. More
            events across the UK and Nigeria will be announced as they are
            confirmed.
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Get in touch
          </Button>
        </AnimateIn>
      </section>

      {/*
        ── 4. Past Events ──
        Empty state by design. Nothing goes in here until the client supplies
        real photos and testimonies — never invented gatherings.
      */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="light">Past Events</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
            What God Has Done
          </h2>
          <div className="mx-auto mb-8 h-0.5 w-16 bg-blue-sky" />
          <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
            A testimony of His faithfulness
          </p>
          <div className="border-l-4 border-wine bg-cream p-8 text-left">
            <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
              Photos and testimonies from past gatherings will be shared here
              soon.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ── 5. Newsletter CTA ── */}
      <section className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Never Miss an Event</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Stay in the Loop
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Subscribe to get event announcements, reminders, and updates
            directly in your inbox.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Want to Host an Event?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Invite Pastor Ayodele Oladapo Awe to minister at your church,
            conference, or gathering.
          </p>
          <Button href="/contact" variant="wine" size="lg">
            Get in Touch
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
