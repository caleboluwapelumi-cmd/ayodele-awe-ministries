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
    "Ayodele Oladapo Awe (RDP) — Revivalist, Discipler and Pointer. Founder and president of Ayodele Oladapo Awe Ministries, an apostolic ministry advancing God's Kingdom through revival, discipleship, evangelism and the ministry of the Holy Spirit.",
};

const BIO = [
  "Ayodele Oladapo Awe, also known as RDP, is a Revivalist, Discipler, and Pointer with a divine mandate to raise believers who steward the presence of God and manifest the realities of His Kingdom. Called by God into ministry in 2014, his life and ministry are marked by a passion to see revival awaken hearts, disciples matured in Christ, and the lost pointed to Jesus through the demonstration of the Gospel.",
  "He is the founder and president of Ayodele Oladapo Awe Ministries, an apostolic ministry committed to advancing God's Kingdom through revival, discipleship, evangelism, leadership development, and the ministry of the Holy Spirit.",
];

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

/**
 * Teaser copy only — the three expressions are set out in full, with their
 * programme lists, on /ministry. Keep this a summary; don't re-import the
 * card copy here or the two pages will drift.
 */
const EXPRESSIONS_TEASER =
  "The mandate takes shape in three ways: apostolically, through revival gatherings that stir the Church into deeper intimacy with God; pastorally, through churches, teaching and discipleship that mature believers in Christ; and evangelistically, through campaigns and healing outreaches that point the lost to Jesus. Each carries the same burden — that His presence would be stewarded and His Kingdom made visible among the nations.";

const FAMILY =
  "Ayodele is married to Iyanuoluwa, and together they are devoted to serving God and equipping people to live lives of wholehearted devotion to Christ.";

const STATS = [
  { stat: "2 Churches", label: "UK & Nigeria" },
  { stat: "Since 2014", label: "Called into Ministry" },
  { stat: "2 Nations", label: "One Mandate" },
];

/**
 * Card copy only — the card image is each church's own emblem, read from
 * `CHURCHES[].logo`. There is no stock photograph here on purpose: a generic
 * photo in a card headed "BHCC" reads as a photo of BHCC.
 */
const CHURCH_COPY: Record<string, { description: string }> = {
  BHCC: {
    description:
      "A vibrant, Spirit-led community in the United Kingdom committed to building lives and raising leaders through the Word of God.",
  },
  BLCN: {
    description:
      "A thriving network of believers in Nigeria dedicated to community-driven ministry, discipleship, and gospel outreach.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <PageHero
        label="The Pastor"
        title="About the Pastor"
        subtitle="A life surrendered to the Gospel of Jesus Christ"
      />

      {/* ── 2. Bio Section ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/apostle-portrait.jpg"
                alt="Pastor Ayodele Oladapo Awe"
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
              Ayodele Oladapo Awe <span className="text-muted">(RDP)</span>
            </h2>
            <p className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-wine">
              Pastor &middot; Founder &amp; President
            </p>

            {/* The tagline the initials stand for — sits directly under the
                name so "RDP" reads as its acronym without needing a gloss. */}
            <blockquote className="mb-8 border-l-4 border-blue-sky pl-6">
              <p className="font-serif text-2xl font-bold italic leading-tight text-blue-navy sm:text-3xl">
                Revivalist. Discipler. Pointer.
              </p>
            </blockquote>

            <div className="space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              {BIO.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Mandate — the umbrella vision the expressions below serve ── */}
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

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
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

      {/* ── 4. Ministry teaser — the detail lives at /ministry ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="light">In Practice</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
            How the Mandate Is Lived Out
          </h2>
          <div className="mx-auto mb-8 h-0.5 w-16 bg-blue-sky" />
          <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
            {EXPRESSIONS_TEASER}
          </p>
          <Button href="/ministry" variant="primary" size="lg">
            Explore Ministry Expressions
          </Button>
        </AnimateIn>
      </section>

      {/* ── 5. Life & Family ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <SectionLabel tone="dark">Life &amp; Family</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Serving Together
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              {FAMILY}
            </p>
            <Button href="/partners" variant="secondary" size="lg">
              Partner With Us
            </Button>
          </AnimateIn>

          <div className="space-y-4">
            {STATS.map((item, i) => (
              <AnimateIn key={item.stat} direction="right" delay={i * 0.1}>
                <div className="border-t-2 border-blue-sky bg-blue-deep/50 px-8 py-8 text-center">
                  <p className="font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {item.stat}
                  </p>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-white/50">
                    {item.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Churches Teaser ── */}
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
                  logoUrl={church.logo}
                  href={church.href}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA Banner ── */}
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
