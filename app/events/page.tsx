import { Metadata } from "next";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import CountdownTimer from "@/components/CountdownTimer";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Events — Ayodele Oladapo Awe Ministries",
  description:
    "Discover upcoming conferences, prayer surges, and ministry gatherings across the UK and Nigeria.",
};

const COUNTDOWN_TARGET = new Date(
  Date.now() + 90 * 24 * 60 * 60 * 1000
).toISOString();

const UPCOMING = [
  {
    title: "Norwich Prayer Surge",
    date: "TBA",
    location: "Norwich, UK",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
  },
  {
    title: "BHCC Special Service",
    date: "TBA",
    location: "United Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1526467937878-5c76dab97a6a?w=600&q=80",
  },
  {
    title: "BLCN Revival Meeting",
    date: "TBA",
    location: "Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
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
              The Norwich Prayer Surge is a powerful gathering of believers
              coming together for intense corporate prayer, prophetic worship,
              and a fresh encounter with God. This is not a conference — it is a
              surge. Come hungry, leave transformed.
            </p>

            <dl className="mb-8 space-y-3 font-sans text-base text-muted">
              <div className="flex gap-2">
                <dt className="font-semibold text-blue-navy">Date:</dt>
                <dd>Coming Soon — Stay Connected</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-blue-navy">Location:</dt>
                <dd>Norwich, United Kingdom</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-blue-navy">Time:</dt>
                <dd>To Be Announced</dd>
              </div>
            </dl>

            <Button href="#" variant="primary" size="lg">
              Register Interest
            </Button>
          </AnimateIn>
        </div>

        {/* Full-width band so the countdown numerals have room to breathe */}
        <AnimateIn direction="up" className="mx-auto mt-16 w-full max-w-7xl">
          <div className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-6 py-12 text-center sm:px-12 sm:py-16">
            <SectionLabel tone="dark">Counting Down</SectionLabel>
            <div className="mt-8">
              <CountdownTimer targetDate={COUNTDOWN_TARGET} />
            </div>
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
            {UPCOMING.map((event, i) => (
              <AnimateIn key={event.title} delay={i * 0.1} className="h-full">
                <EventCard
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  imageUrl={event.imageUrl}
                  registerLink="#"
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
