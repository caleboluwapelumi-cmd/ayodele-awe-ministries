import { Metadata } from "next";
import Image from "next/image";
import ChurchCard from "@/components/ChurchCard";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import { CHURCHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Ayodele Oladapo Awe Ministries",
  description:
    "Learn about Ayodele Oladapo Awe — a Nigerian-born, UK-based minister of the Gospel.",
};

const MANDATE = [
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
];

const STATS = [
  { stat: "2 Churches", label: "UK & Nigeria" },
  { stat: "10+ Years", label: "In Ministry" },
  { stat: "2 Nations", label: "One Mandate" },
];

const CHURCH_COPY: Record<string, { description: string; imageUrl: string }> = {
  BHCC: {
    description:
      "A vibrant, Spirit-led community in the United Kingdom committed to building lives and raising leaders through the Word of God.",
    imageUrl:
      "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80",
  },
  BLCN: {
    description:
      "A thriving network of believers in Nigeria dedicated to community-driven ministry, discipleship, and gospel outreach.",
    imageUrl:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <PageHero
        label="The Minister"
        title="About the Minister"
        subtitle="A life surrendered to the Gospel of Jesus Christ"
      />

      {/* ── 2. Bio Section ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/apostle-portrait.jpg"
                alt="Minister Ayodele Oladapo Awe"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">Biography</SectionLabel>
            <h2 className="mb-3 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Ayodele Oladapo Awe
            </h2>
            <p className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-wine">
              Minister of the Gospel
            </p>
            <div className="space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Nigerian-born, UK-based minister of the gospel with a burning
                mandate to see souls saved, believers built up, and the house of
                God established across nations.
              </p>
              <p>
                His ministry spans the United Kingdom and Nigeria, expressed
                through two thriving church communities — Building House
                Christian Centre (BHCC) in the UK and Bethel Livingstone
                Christian Network (BLCN) in Nigeria.
              </p>
              <p>
                Known for his depth in the Word, prophetic worship, and
                apostolic grace, Minister Awe has been used by God to ignite
                revival fires and raise a generation of worshippers and kingdom
                builders.
              </p>
              <p>
                Beyond the pulpit, he is a teacher, a builder, and a shepherd —
                committed to discipleship, prayer, and the advancement of the
                gospel in every sphere of life.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Mandate Section ── */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-navy/85" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-navy/80 via-blue-deep/60 to-wine-deep/80" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <AnimateIn direction="up">
            <SectionLabel tone="dark">The Mandate</SectionLabel>
            <h2 className="mx-auto mb-6 max-w-3xl font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Raising Voices, Building Houses, Transforming Nations
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {MANDATE.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-blue-sky">
                  {card.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-white/70">
                  {card.desc}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Calling Section ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <SectionLabel tone="light">The Calling</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              A Life Given to the Gospel
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              Minister Awe&apos;s calling is rooted in the Great Commission — to
              go, preach, and make disciples. His ministry is marked by a
              passion for revival, a love for the local church, and a deep
              commitment to raising the next generation of kingdom builders.
            </p>
            <Button href="/partners" variant="primary" size="lg">
              Partner With Us
            </Button>
          </AnimateIn>

          <div className="space-y-4">
            {STATS.map((item, i) => (
              <AnimateIn key={item.stat} direction="right" delay={i * 0.1}>
                <div className="border-t-2 border-blue-sky bg-cream px-8 py-8 text-center">
                  <p className="font-serif text-2xl font-bold leading-tight text-blue-navy sm:text-3xl">
                    {item.stat}
                  </p>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-muted">
                    {item.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Churches Teaser ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="dark">Our Churches</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Our Church Communities
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Two expressions of one vision
            </p>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 gap-8 text-left sm:grid-cols-2">
            {CHURCHES.map((church, i) => (
              <AnimateIn key={church.acronym} delay={i * 0.1} className="h-full">
                <ChurchCard
                  name={church.name}
                  acronym={church.acronym}
                  description={CHURCH_COPY[church.acronym].description}
                  location={church.location}
                  imageUrl={CHURCH_COPY[church.acronym].imageUrl}
                  href={church.href}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Join the Movement
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Whether in the UK or Nigeria, there is a place for you in this
            ministry.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button href="/churches" variant="wine" size="lg">
              Find a Church
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="text-white">
              Contact Us
            </Button>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
