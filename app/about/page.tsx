import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ChurchCard from "@/components/ChurchCard";
import { CHURCHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Ayodele Oladapo Awe Ministries",
  description:
    "Learn about Ayodele Oladapo Awe — a Nigerian-born, UK-based minister of the Gospel.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          About the Minister
        </h1>
        <div className="mx-auto w-12 h-0.5 bg-wine mb-6" />
        <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
          A life surrendered to the Gospel of Jesus Christ
        </p>
      </section>

      {/* ── 2. Bio Section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
              alt="Minister Ayodele Oladapo Awe"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
              Biography
            </p>
            <h2 className="font-serif text-3xl text-blue-navy mb-1">
              Ayodele Oladapo Awe
            </h2>
            <p className="font-sans text-wine text-sm mb-8">
              Minister of the Gospel
            </p>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Nigerian-born, UK-based minister of the gospel with a burning
              mandate to see souls saved, believers built up, and the house of
              God established across nations.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-4">
              His ministry spans the United Kingdom and Nigeria, expressed
              through two thriving church communities — Building House Christian
              Center (BHCC) in the UK and Bethel Livingstone Christian Network
              (BLCN) in Nigeria.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Known for his depth in the Word, prophetic worship, and apostolic
              grace, Minister Awe has been used by God to ignite revival fires
              and raise a generation of worshippers and kingdom builders.
            </p>
            <p className="font-sans text-muted leading-relaxed">
              Beyond the pulpit, he is a teacher, a builder, and a shepherd —
              committed to discipleship, prayer, and the advancement of the
              gospel in every sphere of life.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Mandate Section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            The Mandate
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-16 max-w-3xl mx-auto">
            Raising Voices, Building Houses, Transforming Nations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Raising Voices",
                desc: "Cultivating a generation of worshippers who carry the presence of God into every room they enter and every nation they reach.",
              },
              {
                title: "Building Houses",
                desc: "Establishing thriving local churches in the UK and Nigeria — houses of prayer, discipleship, and kingdom community.",
              },
              {
                title: "Transforming Nations",
                desc: "Taking the gospel beyond the four walls into communities and nations, bringing lasting change through the power of Christ.",
              },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-serif text-xl text-blue-sky mb-4">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Calling Section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
              The Calling
            </p>
            <h2 className="font-serif text-3xl text-blue-navy mb-6">
              A Life Given to the Gospel
            </h2>
            <p className="font-sans text-muted leading-relaxed mb-10">
              Minister Awe&apos;s calling is rooted in the Great Commission — to
              go, preach, and make disciples. His ministry is marked by a
              passion for revival, a love for the local church, and a deep
              commitment to raising the next generation of kingdom builders.
            </p>
            <Link
              href="/partners"
              className="inline-flex items-center font-sans text-sm font-semibold bg-blue text-white px-10 py-4 rounded-lg hover:bg-blue-deep transition-colors"
            >
              Partner With Us
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { stat: "2 Churches", label: "UK & Nigeria" },
              { stat: "10+ Years", label: "In Ministry" },
              { stat: "2 Nations", label: "One Mandate" },
            ].map((item) => (
              <div key={item.stat} className="bg-cream rounded-lg px-8 py-6 text-center border border-blue/10">
                <p className="font-serif text-2xl text-blue-navy">{item.stat}</p>
                <p className="font-sans text-xs uppercase tracking-wider text-muted mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Churches Teaser ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Our Churches
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            Our Church Communities
          </h2>
          <p className="font-sans text-white/70 mb-12">
            Two expressions of one vision
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
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

      {/* ── 6. CTA Banner ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Join the Movement
          </h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">
            Whether in the UK or Nigeria, there is a place for you in this
            ministry.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/churches"
              className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors"
            >
              Find a Church
            </Link>
            <Link
              href="/contact"
              className="font-sans text-sm font-semibold border border-white/40 text-white px-10 py-4 rounded-lg hover:border-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
