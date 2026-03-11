import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

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
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
          Schedule
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Ministry Itinerary
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
          Where Minister Awe is ministering next
        </p>
      </section>

      {/* ── 2. Upcoming Schedule ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-4xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
            Upcoming
          </p>
          <h2 className="font-serif text-3xl text-blue-navy mb-4">
            Upcoming Engagements
          </h2>
          <p className="font-sans text-muted mb-12 max-w-xl">
            Minister Awe is available to minister across the UK, Nigeria, and
            internationally.
          </p>

          <div className="space-y-6">
            {ITINERARY.map((item) => (
              <div
                key={item.title}
                className="bg-cream rounded-lg border-l-4 border-l-blue p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
              >
                {/* Date */}
                <div className="shrink-0 text-center sm:w-24">
                  <span className="font-serif text-2xl text-blue-navy">
                    {item.date}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <span className="inline-block font-sans text-[0.6rem] uppercase tracking-widest font-semibold text-white bg-wine px-3 py-1 rounded mb-2">
                    {item.badge}
                  </span>
                  <h3 className="font-serif text-lg text-blue-navy">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-muted mt-1">
                    {item.location}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="shrink-0 font-sans text-sm font-semibold bg-blue text-white px-6 py-3 rounded-lg hover:bg-blue-deep transition-colors text-center"
                >
                  Request Invitation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Booking ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
              Book Minister Awe
            </p>
            <h2 className="font-serif text-3xl text-white mb-6">
              Invite Him to Your Church or Event
            </h2>
            <p className="font-sans text-white/70 leading-relaxed mb-10">
              Minister Awe is available for church services, conferences, prayer
              gatherings, retreats, and special events across the UK, Nigeria,
              and beyond.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {ENGAGEMENT_TYPES.map((type) => (
                <div
                  key={type.title}
                  className="bg-blue-deep/50 rounded-lg p-6 border border-white/5"
                >
                  <h3 className="font-serif text-sm text-blue-sky mb-2">
                    {type.title}
                  </h3>
                  <p className="font-sans text-xs text-white/50 leading-relaxed">
                    {type.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors"
            >
              Submit Booking Request →
            </Link>
          </div>

          {/* Right — Image */}
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800&q=80"
              alt="Minister Awe ministering"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 4. Newsletter ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-navy to-blue-deep">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Stay Updated
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            Follow the Schedule
          </h2>
          <p className="font-sans text-white/70 mb-10">
            Stay updated on Minister Awe&apos;s schedule and upcoming
            engagements.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
