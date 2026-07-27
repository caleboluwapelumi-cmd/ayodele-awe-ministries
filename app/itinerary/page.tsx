import { Metadata } from "next";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Ministry Itinerary — Ayodele Oladapo Awe Ministries",
  description:
    "Stay updated on where Minister Awe is ministering next — conferences, church visits, and international engagements.",
};

const ITINERARY = [
  {
    date: "TBA",
    badge: "Church Service",
    title: "BHCC Sunday Service",
    location: "United Kingdom",
  },
  {
    date: "TBA",
    badge: "Conference",
    title: "International Ministry Engagement",
    location: "TBA",
  },
  {
    date: "TBA",
    badge: "Revival Meeting",
    title: "BLCN Revival Night",
    location: "Nigeria",
  },
];

const ENGAGEMENT_TYPES = [
  {
    title: "Church Services",
    desc: "Sunday services, special services, anniversary events",
  },
  {
    title: "Conferences",
    desc: "Keynote addresses and ministry sessions at kingdom gatherings",
  },
  {
    title: "Prayer Gatherings",
    desc: "Corporate prayer, prophetic worship, and intercession events",
  },
];

export default function ItineraryPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <PageHero
        label="Schedule"
        title="Ministry Itinerary"
        subtitle="Where Minister Awe is ministering next"
      />

      {/* ── 2. Upcoming Schedule ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <AnimateIn direction="up">
            <SectionLabel tone="light">Upcoming</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Upcoming Engagements
            </h2>
            <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              Minister Awe is available to minister across the UK, Nigeria, and
              internationally.
            </p>
          </AnimateIn>

          <div className="mt-12 space-y-6">
            {ITINERARY.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1}>
                <div className="flex flex-col gap-6 border-l-4 border-l-blue bg-cream p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                  {/* Date */}
                  <div className="shrink-0 text-center sm:w-24">
                    <span className="font-serif text-2xl font-bold text-blue-navy">
                      {item.date}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <span className="mb-3 inline-block bg-wine px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest text-white">
                      {item.badge}
                    </span>
                    <h3 className="font-serif text-lg font-bold leading-tight text-blue-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-sans text-xs uppercase tracking-widest text-muted">
                      {item.location}
                    </p>
                  </div>

                  <Button href="/contact" variant="primary" className="shrink-0">
                    Request Invitation
                  </Button>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Booking ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <SectionLabel tone="dark">Book Minister Awe</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Invite Him to Your Church or Event
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Minister Awe is available for church services, conferences, prayer
              gatherings, retreats, and special events across the UK, Nigeria,
              and beyond.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {ENGAGEMENT_TYPES.map((type) => (
                <div
                  key={type.title}
                  className="border-t-2 border-blue-sky bg-blue-deep/50 p-6"
                >
                  <h3 className="mb-2 font-serif text-base font-bold leading-tight text-blue-sky">
                    {type.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-white/50">
                    {type.desc}
                  </p>
                </div>
              ))}
            </div>

            <Button href="/contact" variant="secondary" size="lg">
              Submit Booking Request
            </Button>
          </AnimateIn>

          <AnimateIn direction="right" className="hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800&q=80"
                alt="Minister Awe ministering"
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-navy/80 via-transparent to-transparent" />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Newsletter ── */}
      <section className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Stay Updated</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Follow the Schedule
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Stay updated on Minister Awe&apos;s schedule and upcoming
            engagements.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>
    </>
  );
}
