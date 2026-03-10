import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ChurchCard from "@/components/ChurchCard";
import EventCard from "@/components/EventCard";
import CountdownTimer from "@/components/CountdownTimer";
import MediaLinks from "@/components/MediaLinks";
import NewsletterForm from "@/components/NewsletterForm";
import { CHURCHES } from "@/lib/constants";

const COUNTDOWN_TARGET = new Date(
  Date.now() + 90 * 24 * 60 * 60 * 1000
).toISOString();

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* ── 2. About Snippet ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
              alt="Minister Ayodele Oladapo Awe"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
              About the Minister
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-blue-navy mb-6">
              A Voice Sent with Purpose
            </h2>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Born in Nigeria and now based in the United Kingdom, Ayodele
              Oladapo Awe carries a mandate rooted in worship, the Word, and the
              building of God&apos;s house across nations.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Through conferences, church planting, and discipleship, he equips
              individuals and communities to walk in their God-given purpose,
              raising a generation of worshippers and leaders.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              From the pulpit to the marketplace, the vision remains the same —
              raising voices, building houses, and transforming nations.
            </p>
            <Link
              href="/about"
              className="font-sans text-sm text-blue-sky hover:text-blue transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Ministry Expressions ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Our Ministry Expressions
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            Two churches, one mandate
          </h2>
          <p className="font-sans text-white/70 mb-12 max-w-xl">
            Building the house of God in the UK and Nigeria.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CHURCHES.map((church) => (
              <ChurchCard
                key={church.acronym}
                name={church.name}
                acronym={church.acronym}
                description={
                  church.acronym === "BHCC"
                    ? "A vibrant, Spirit-led community in the United Kingdom committed to building lives and raising leaders through the Word of God."
                    : "A thriving network of believers in Nigeria dedicated to community-driven ministry, discipleship, and gospel outreach."
                }
                location={church.location}
                imageUrl={
                  church.acronym === "BHCC"
                    ? "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80"
                    : "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"
                }
                href={church.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Upcoming Events ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
            Upcoming Events
          </p>
          <h2 className="font-serif text-3xl text-blue-navy mb-4">
            Join us at our next gathering
          </h2>
          <p className="font-sans text-muted mb-12 max-w-xl">
            Whether in person or online, there is always a place for you.
          </p>

          <div className="max-w-md">
            <EventCard
              title="Norwich Prayer Surge"
              date="Coming Soon"
              location="Norwich, United Kingdom"
              imageUrl="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&q=80"
              registerLink="#"
            />
          </div>

          <div className="mt-12 max-w-lg bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep rounded-lg p-10">
            <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
              Counting Down
            </p>
            <CountdownTimer targetDate={COUNTDOWN_TARGET} />
          </div>
        </div>
      </section>

      {/* ── 5. Teachings & Music ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Teachings &amp; Music
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            Access the Word and worship from anywhere
          </h2>
          <p className="font-sans text-white/70 mb-12 max-w-xl">
            Stream sermons on Telegram and worship on Spotify.
          </p>
          <MediaLinks />
        </div>
      </section>

      {/* ── 6. Partners ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl text-center z-10">
          <p className="font-sans text-xs uppercase tracking-widest text-white/60 mb-4">
            Partnership
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">Partner With Us</h2>
          <p className="font-sans text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Your partnership fuels the gospel across the UK and Nigeria. Join a
            community of believers sowing into revival.
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors"
          >
            Become a Partner
          </Link>
        </div>
      </section>

      {/* ── 7. Newsletter ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-navy to-blue-deep">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            Join our mailing list
          </h2>
          <p className="font-sans text-white/70 mb-10">
            Get updates on events, teachings, and ministry news.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
