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
    "Stay updated on where Pastor Awe is ministering next — conferences, church visits, and international engagements.",
};

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
        subtitle="Where Pastor Awe is ministering next"
      />

      {/*
        ── 2. Upcoming Schedule ──
        Empty state by design. Confirmed engagements go here when the client
        supplies them — never placeholder rows with a "TBA" date, which read
        as a real schedule.
      */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="light">Upcoming</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
            Upcoming Engagements
          </h2>
          <div className="mx-auto mb-8 h-0.5 w-16 bg-blue-sky" />
          <div className="border-l-4 border-l-blue bg-cream p-8 text-left">
            <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
              Pastor Awe&apos;s schedule is updated as engagements are
              confirmed. Check back soon, or reach out to discuss an
              invitation.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/contact" variant="primary" size="lg">
              Request an invitation
            </Button>
          </div>
        </AnimateIn>
      </section>

      {/* ── 3. Booking ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <SectionLabel tone="dark">Book Pastor Awe</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Invite Him to Your Church or Event
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Pastor Awe is available for church services, conferences, prayer
              gatherings, retreats, and special events across the UK, Nigeria,
              and beyond.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
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
                src="/images/apostle-portrait.jpg"
                alt="Pastor Ayodele Oladapo Awe"
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
            Stay updated on Pastor Awe&apos;s schedule and upcoming
            engagements.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>
    </>
  );
}
