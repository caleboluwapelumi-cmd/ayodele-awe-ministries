import { Metadata } from "next";
import ChurchCard from "@/components/ChurchCard";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import RevealImage from "@/components/RevealImage";
import StickyStory from "@/components/StickyStory";
import CountUp from "@/components/CountUp";
import { CHURCHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Ayodele Oladapo Awe Ministries",
  description:
    "Ayodele Oladapo Awe (RDP) — Revivalist, Discipler and Pointer. Founder and president of Ayodele Oladapo Awe Ministries, an apostolic ministry advancing God's Kingdom through revival, discipleship, evangelism and the ministry of the Holy Spirit.",
};

/**
 * First person, and deliberately so — /about is the one page written in the
 * Pastor's own voice. Every fact here is the client-supplied biography; only
 * the person of the verbs changed. Don't quietly revert it to third person.
 */
const BIO = [
  "I'm Ayodele Oladapo Awe — known to many simply as RDP: a Revivalist, a Discipler and a Pointer. God has entrusted me with a mandate to raise believers who steward His presence and manifest the realities of His Kingdom. He called me into ministry in 2014, and everything since has been shaped by one passion: to see revival awaken hearts, disciples matured in Christ, and the lost pointed to Jesus through the demonstration of the Gospel.",
  "I serve as the founder and president of Ayodele Oladapo Awe Ministries, an apostolic ministry committed to advancing God's Kingdom through revival, discipleship, evangelism, leadership development, and the ministry of the Holy Spirit.",
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
  "I am married to Iyanuoluwa, and together we are devoted to serving God and equipping people to live lives of wholehearted devotion to Christ.";

/**
 * The large pull-quote. Lifted word for word from the first paragraph of
 * BIO above — a pull-quote repeats the page's own text, it never adds to it.
 * If BIO changes, re-check that this still appears in it verbatim.
 */
const PULL_QUOTE =
  "Everything since has been shaped by one passion: to see revival awaken hearts, disciples matured in Christ, and the lost pointed to Jesus through the demonstration of the Gospel.";

/**
 * Split into number + words so the figure can count up. The rendered text is
 * the same as before ("2 Churches", "Since 2014", "2 Nations").
 *
 * The year counts from 2000, not 0: a year rolling up from zero reads as a
 * glitch, from a nearby year as an odometer.
 */
const STATS = [
  { value: 2, prefix: "", suffix: " Churches", from: 0, label: "UK & Nigeria" },
  { value: 2014, prefix: "Since ", suffix: "", from: 2000, label: "Called into Ministry" },
  { value: 2, prefix: "", suffix: " Nations", from: 0, label: "One Mandate" },
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
        label="In My Own Words"
        title="Let Me Introduce Myself"
        subtitle="I'm Ayodele — a husband, a pastor, and a man captured by the presence of God. Here is a little of the story He has been writing."
        backgroundImage="/images/apostle-key.jpg"
        imageAlt="Pastor Ayodele Oladapo Awe at the keyboard"
        /* Portrait source in a wide slot — bias the crop upward so his face
           stays in frame rather than centring on the keys. */
        imagePosition="object-[50%_22%]"
      />

      {/* ── 2. Bio Section ──
          Offset grid: the portrait takes five columns and sits inside an
          orange frame knocked out of register behind it; the text starts a
          column later than a 50/50 split would put it. The frame is a border
          only, so nothing is laid over the photograph. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 left-4 top-4 border-2 border-brand-orange sm:-bottom-6 sm:-right-6 sm:left-6 sm:top-6"
            />
            <RevealImage
              src="/images/apostle-portrait.jpg"
              alt="Pastor Ayodele Oladapo Awe"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="group aspect-square w-full"
            />
          </div>

          <AnimateIn direction="right" className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <SectionLabel tone="light">My Story</SectionLabel>
            <h2 className="mb-3 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              Ayodele Oladapo Awe <span className="text-muted">(RDP)</span>
            </h2>
            <p className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-brand-orange-deep">
              Pastor &middot; Founder &amp; President
            </p>

            {/* The tagline the initials stand for — sits directly under the
                name so "RDP" reads as its acronym without needing a gloss. */}
            <blockquote className="mb-8 border-l-4 border-brand-orange pl-6">
              <p className="font-serif text-2xl font-bold italic leading-tight text-brand-blue sm:text-3xl">
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

      {/* ── 3. Mandate — the umbrella vision the expressions below serve ──
          A pinned-scroll section: on desktop the photograph holds still while
          the three pillars scroll past it, and the caption on the photograph
          follows along. See StickyStory.

          ⚠️ `overflow-clip`, not `overflow-hidden` — `hidden` makes the
          section a scroll container and the pin stops working. */}
      <section className="relative overflow-clip bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-brand-navy/30"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mb-16 max-w-3xl lg:mb-8">
            <SectionLabel tone="dark">The Mandate</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Raising Voices, Building Houses, Transforming Nations
            </h2>
            <div className="h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <StickyStory
            steps={MANDATE}
            eyebrow="The Mandate"
            image="/images/apostle-2.jpg"
            imageAlt="Pastor Ayodele Oladapo Awe ministering at a lectern"
            /* 1928×2560 portrait; the subject sits high and left of frame —
               the same bias the homepage hero gives this photograph. */
            imagePosition="object-[30%_25%]"
          />
        </div>
      </section>

      {/* ── 4. Pull-quote + ministry teaser — the detail lives at /ministry ──
          The one large pull-quote on the site. It quotes BIO verbatim (see
          PULL_QUOTE), set big enough to stop the scroll, then hands on to the
          teaser in an offset two-column row rather than another centred
          label-heading-paragraph block. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up">
            <figure className="relative mx-auto max-w-5xl">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 -top-16 select-none font-serif text-[9rem] font-bold leading-none text-brand-orange/20 sm:-left-10 sm:-top-24 sm:text-[14rem]"
              >
                &ldquo;
              </span>
              <blockquote className="relative">
                {/* A span, not a <p>: the unlayered `p { line-height: 1.7 }` in
                    globals.css beats any `leading-*` utility on a <p>, which
                    spread a display-size quote across double-spaced lines. */}
                <span className="block text-balance font-serif text-3xl font-bold leading-[1.15] text-brand-blue sm:text-4xl lg:text-5xl">
                  {PULL_QUOTE}
                </span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-deep">
                <span aria-hidden className="h-0.5 w-10 bg-brand-orange" />
                Ayodele Oladapo Awe
              </figcaption>
            </figure>
          </AnimateIn>

          <div className="mt-24 grid grid-cols-1 gap-8 border-t border-brand-blue/10 pt-16 lg:grid-cols-12 lg:gap-16">
            <AnimateIn direction="left" className="lg:col-span-4">
              <SectionLabel tone="light">In Practice</SectionLabel>
              <h2 className="font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl">
                How I Live This Out
              </h2>
            </AnimateIn>
            <AnimateIn direction="right" className="lg:col-span-7 lg:col-start-6">
              <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
                {EXPRESSIONS_TEASER}
              </p>
              <Button href="/ministry" variant="primary" size="lg">
                Explore Ministry Expressions
              </Button>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 5. Life & Family ── */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
              <AnimateIn key={item.label} direction="right" delay={i * 0.1}>
                <div className="border-t-2 border-brand-orange bg-white/[0.07] px-8 py-8 text-center">
                  {/* The figure is the accent, the label stays white — the
                      split `CountdownTimer` and `BirthdayCountdown` both make
                      with their numerals, and what BLCN's "Network" stats
                      already did.

                      ⚠️ `brand-orange` here is 3.26:1 against the card
                      (`bg-white/[0.07]` over this section's `from-brand-blue`
                      stop, the lightest ground it sits on). That clears AA
                      **large** only, which 24px bold qualifies for — so this
                      size is the floor. Anything smaller in this tile takes
                      `brand-orange-light` or goes back to white. */}
                  <p className="font-serif text-2xl font-bold leading-tight text-brand-orange sm:text-3xl">
                    <CountUp
                      value={item.value}
                      from={item.from}
                      prefix={item.prefix}
                      suffix={item.suffix}
                    />
                  </p>
                  {/* /70, not /50: white at 50% is 3.6:1 on this card (see
                      CLAUDE.md, "Measure against the card") and fails AA at
                      12px. /70 is what CopyField settled on for the same card. */}
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-white/70">
                    {item.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Churches Teaser ── */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
      <section className="border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Join the Movement
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Whether you are in the UK or Nigeria, there is a place for you in
            this ministry. I would love to welcome you.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button href="/churches" variant="secondary" size="lg">
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
