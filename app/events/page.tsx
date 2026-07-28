import { Metadata } from "next";
import Image from "next/image";
import EventCard from "@/components/EventCard";
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

/** Everything except the Prayer Surge, whose date is computed per request. */
const OTHER_UPCOMING = [
  {
    title: "BHCC Special Service",
    date: "TBA",
    location: "United Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1526467937878-5c76dab97a6a?w=600&q=80",
    registerLink: "#",
    ctaLabel: "Register",
  },
  {
    title: "BLCN Revival Meeting",
    date: "TBA",
    location: "Ado Ekiti, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    registerLink: "#",
    ctaLabel: "Register",
  },
];

const PAST_EVENTS = [
  {
    title: "Kingdom Advancement Conference",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1478147427282-58a87a433b2f?w=600&q=80",
  },
  {
    title: "Night of Encounter",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
  },
  {
    title: "Building House Prayer Summit",
    date: "2023",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
  },
];

export default function EventsPage() {
  const surge = nextPrayerSurge();

  const upcoming = [
    {
      title: PRAYER_SURGE.title,
      date: surge.shortDate,
      location: "Norwich, UK",
      imageUrl:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
      registerLink: "/contact",
      ctaLabel: "Plan your visit",
    },
    ...OTHER_UPCOMING,
  ];

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

      {/* ── 3. All Events Grid ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up">
            <SectionLabel tone="dark">All Events</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Upcoming Gatherings
            </h2>
            <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              UK and Nigeria — both nations, one fire
            </p>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, i) => (
              <AnimateIn key={event.title} delay={i * 0.1} className="h-full">
                <EventCard
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  imageUrl={event.imageUrl}
                  registerLink={event.registerLink}
                  ctaLabel={event.ctaLabel}
                />
              </AnimateIn>
            ))}
          </div>

          <p className="mt-12 text-center font-sans text-sm leading-relaxed text-white/40">
            More events will be announced. Subscribe to our newsletter to be the
            first to know.
          </p>
        </div>
      </section>

      {/* ── 4. Past Events ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Past Events</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              What God Has Done
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              A testimony of His faithfulness
            </p>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {PAST_EVENTS.map((event, i) => (
              <AnimateIn key={event.title} delay={i * 0.1} className="h-full">
                <div className="group flex h-full flex-col bg-cream text-left shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 bg-blue-navy/80 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest text-white">
                      {event.date}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="mt-4 font-serif text-lg font-bold leading-tight text-blue-navy">
                      {event.title}
                    </h3>
                    <p className="mt-3 font-sans text-base italic leading-relaxed text-muted">
                      God moved powerfully at this gathering.
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <p className="mt-12 font-sans text-sm text-muted">
            Full archive coming soon
          </p>
        </div>
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
            Invite Minister Ayodele Oladapo Awe to minister at your church,
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
