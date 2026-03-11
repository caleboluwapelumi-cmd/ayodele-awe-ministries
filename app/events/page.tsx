import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import CountdownTimer from "@/components/CountdownTimer";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Events — Ayodele Oladapo Awe Ministries",
  description:
    "Discover upcoming conferences, prayer surges, and ministry gatherings across the UK and Nigeria.",
};

const COUNTDOWN_TARGET = new Date(
  Date.now() + 90 * 24 * 60 * 60 * 1000
).toISOString();

const PAST_EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1478147427282-58a87a433b2f?w=600&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
];

export default function EventsPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
          Events
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Gather. Encounter. Be Transformed.
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
          Join us at our upcoming gatherings across the UK and Nigeria
        </p>
      </section>

      {/* ── 2. Featured Event ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&q=80"
              alt="Norwich Prayer Surge"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
              Featured Event
            </p>
            <h2 className="font-serif text-3xl text-blue-navy mb-1">
              Norwich Prayer Surge
            </h2>
            <p className="font-sans text-sm text-wine mb-6">United Kingdom</p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              The Norwich Prayer Surge is a powerful gathering of believers
              coming together for intense corporate prayer, prophetic worship,
              and a fresh encounter with God. This is not a conference — it is a
              surge. Come hungry, leave transformed.
            </p>
            <div className="space-y-3 mb-8">
              <p className="font-sans text-sm text-muted">
                <span className="text-blue-navy font-medium">Date:</span> Coming
                Soon — Stay Connected
              </p>
              <p className="font-sans text-sm text-muted">
                <span className="text-blue-navy font-medium">Location:</span>{" "}
                Norwich, United Kingdom
              </p>
              <p className="font-sans text-sm text-muted">
                <span className="text-blue-navy font-medium">Time:</span> To Be
                Announced
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors"
            >
              Register Interest
            </Link>
            <div className="mt-10 bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep rounded-lg p-8">
              <CountdownTimer targetDate={COUNTDOWN_TARGET} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. All Events Grid ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            All Events
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            Upcoming Gatherings
          </h2>
          <p className="font-sans text-white/70 mb-12 max-w-xl">
            UK and Nigeria — both nations, one fire
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard
              title="Norwich Prayer Surge"
              date="TBA"
              location="Norwich, UK"
              imageUrl="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80"
              registerLink="#"
            />
            <EventCard
              title="BHCC Special Service"
              date="TBA"
              location="United Kingdom"
              imageUrl="https://images.unsplash.com/photo-1526467937878-5c76dab97a6a?w=600&q=80"
              registerLink="#"
            />
            <EventCard
              title="BLCN Revival Meeting"
              date="TBA"
              location="Nigeria"
              imageUrl="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80"
              registerLink="#"
            />
          </div>
          <p className="font-sans text-sm text-white/40 mt-10 text-center">
            More events will be announced. Subscribe to our newsletter to be the
            first to know.
          </p>
        </div>
      </section>

      {/* ── 4. Past Events ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
            Past Events
          </p>
          <h2 className="font-serif text-3xl text-blue-navy mb-4">
            What God Has Done
          </h2>
          <p className="font-sans text-muted mb-12">
            A testimony of His faithfulness
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 opacity-80">
            {[
              { title: "Kingdom Advancement Conference", date: "2024" },
              { title: "Night of Encounter", date: "2024" },
              { title: "Building House Prayer Summit", date: "2023" },
            ].map((event, i) => (
              <div key={event.title} className="bg-cream rounded-lg overflow-hidden text-left border border-blue/10">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={PAST_EVENT_IMAGES[i]}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs uppercase tracking-widest text-wine mb-2">
                    Past
                  </p>
                  <h3 className="font-serif text-lg text-blue-navy mb-1">
                    {event.title}
                  </h3>
                  <p className="font-sans text-xs text-muted mb-2">
                    {event.date}
                  </p>
                  <p className="font-sans text-sm text-muted italic">
                    God moved powerfully at this gathering.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm text-muted mt-10">
            Full archive coming soon
          </p>
        </div>
      </section>

      {/* ── 5. Newsletter CTA ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-navy to-blue-deep text-center">
        <div className="mx-auto max-w-lg">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Never Miss an Event
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="font-sans text-white/70 mb-10">
            Subscribe to get event announcements, reminders, and updates
            directly in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Want to Host an Event?
          </h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">
            Invite Minister Ayodele Oladapo Awe to minister at your church,
            conference, or gathering.
          </p>
          <Link
            href="/contact"
            className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
