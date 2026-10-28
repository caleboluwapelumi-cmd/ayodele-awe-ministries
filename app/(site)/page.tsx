import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ChurchCard from "@/components/ChurchCard";
import EventCard from "@/components/EventCard";
import CountdownTimer from "@/components/CountdownTimer";
import MediaLinks from "@/components/MediaLinks";
import NewsletterForm from "@/components/NewsletterForm";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import RevealImage from "@/components/RevealImage";
import Marquee from "@/components/Marquee";
import GlobeSection from "@/components/GlobeSection";
import { CountryFlag } from "@/components/icons/FlagIcons";
import { CHURCHES, HIGHLIGHTS } from "@/lib/constants";
import { PRAYER_SURGE, nextPrayerSurge } from "@/lib/prayer-surge";

/**
 * The Prayer Surge date is derived from the current time, so this page has to
 * be re-rendered rather than frozen at build — see lib/prayer-surge.ts.
 */
export const revalidate = 3600;

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

/**
 * The marquee strip between "About" and the churches. Every name is a real
 * expression of the ministry: the two churches, the one confirmed event, and
 * three programmes from MINISTRY_PROGRAMMES by the short names the ministry
 * uses. No dates — this names what the ministry is, not a schedule.
 */
const MARQUEE_NAMES = ["BHCC", "BLCN", "Prayer Surge", "OTIN", "GLC", "Fire Fest"];

/** One curve and duration for every entrance in the About block. */
const ABOUT_EASE = [0.22, 1, 0.36, 1] as const;
const ABOUT_DURATION = 0.9;

/** Flag codes for the globe legend, keyed by acronym. */
const CHURCH_FLAG: Record<string, "GB" | "NG"> = { BHCC: "GB", BLCN: "NG" };

export default function HomePage() {
  const surge = nextPrayerSurge();

  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* Target of the hero's scroll cue. A bare anchor rather than an id on
          the next section, because "What's New" disappears when HIGHLIGHTS is
          empty. `scroll-mt-20` clears the fixed mobile navbar. */}
      <div id="home-next" className="scroll-mt-20" />

      {/* ── 2. What's New ──
          The announcement band. Sits directly under the hero because that is
          the whole point of it — a returning visitor should see what has
          changed without scrolling into the page.

          ⚠️ It is mid-blue with `border-t-2 border-brand-orange`, and both
          halves of that matter. The hero above ends in a dark scrimmed
          photograph, so a blue band beneath it has no seam of its own — this
          is the same case every accent band on the site uses the orange rule
          for. And it cannot be light: "About Snippet" directly below is light,
          and two light gradients stacked have no seam either. Blue + rule is
          the only treatment that separates from both neighbours.

          ⚠️ The whole section is gated on HIGHLIGHTS being non-empty, so
          emptying the array removes the band rather than leaving a heading
          over nothing. An empty announcements strip is worse than none.

          ⚠️ Rows, not a grid. One announcement in a 3-column grid reads as two
          missing announcements; a full-width row reads as one piece of news.
          See the note on HIGHLIGHTS in lib/constants.ts — in particular that
          no item may carry an unconfirmed date. */}
      {HIGHLIGHTS.length > 0 && (
        <section className="border-t-2 border-brand-orange bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-20 sm:px-6 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
              <SectionLabel tone="dark">What&apos;s New</SectionLabel>
              <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Latest from the Ministry
              </h2>
              <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
            </AnimateIn>

            <div className="mx-auto mt-14 max-w-4xl space-y-8">
              {HIGHLIGHTS.map((item, i) => (
                <AnimateIn key={item.title} delay={i * 0.1}>
                  <div className="flex flex-col items-center gap-8 border-t-2 border-brand-orange bg-white/[0.07] p-8 sm:flex-row sm:items-start sm:p-10">
                    {item.image && (
                      <div className="relative aspect-[2/3] w-32 shrink-0 overflow-hidden shadow-xl sm:w-36">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? ""}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="text-center sm:text-left">
                      {/* 12px uppercase label on a `bg-white/[0.07]` card, so
                          it takes the light tone — `brand-orange` is 3.26:1
                          against this card and needs 24px+ to be legitimate. */}
                      <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-light">
                        {item.label}
                        {item.date ? ` · ${item.date}` : ""}
                      </p>
                      <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-white sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mb-6 font-sans text-base leading-relaxed text-white/70">
                        {item.blurb}
                      </p>
                      <Button href={item.href} variant="outline" className="text-white">
                        {item.cta}
                      </Button>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. About Snippet ──
          Overlapping image and text: the copy is a white plate laid across the
          portrait's edge rather than sitting in its own column. On a phone the
          plate rides up over the foot of the image instead, so the overlap
          survives the stack. The plate is solid white, so its text measures
          against white whatever the photograph does beneath it. */}
      {/* ⚠️ Balance, measured at 390/1280/2560 (22 October 2026):
          - The portrait sits in six columns at 4:5 and the plate takes the
            other seven, overlapping one. At 1280 that is a 576×720 image
            against a ~620px plate, so neither overpowers the other — the
            plate used to run taller than the photo it was laid across.
          - ⚠️ NO parallax on this image. The 640px source has only ~6%
            headroom above his hair, so RevealImage's 1.14× parallax zoom
            clipped the top of his head at every width. 4:5 crops the sides
            only (80% of the width), and `object-[36%_0%]` keeps the whole
            height, at every width — a square box showed the whole source,
            including a blue prop and a cable at its top-right edge.
          - 576px from a 512px-wide crop is ~1.1× at 1x DPR. A larger source
            was considered: apostle-1.jpg is hero slide 1 directly above this
            section, and apostle-key.jpg (720px) is barely bigger and is the
            /about hero. Ask the client for the portrait at full size.
          - Entrances share one curve (ABOUT_EASE, 0.9s) and one trigger
            margin, staggered 0 / 0.1 / 0.2s: image wipe, frame, plate. The
            wipe used to run 1.15s on a slow-start curve and land ~0.6s
            after the plate. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:max-w-none">
            {/* The /about offset frame, knocked out of register to the
                bottom-left so it never collides with the plate on the right.
                -12px on phones stays inside the 16px page gutter. */}
            <AnimateIn
              direction="fade"
              duration={ABOUT_DURATION}
              ease={ABOUT_EASE}
              delay={0.1}
              className="absolute -bottom-3 -left-3 right-3 top-3 sm:-bottom-6 sm:-left-6 sm:right-6 sm:top-6"
            >
              <div aria-hidden className="h-full w-full border-2 border-brand-orange" />
            </AnimateIn>
            <RevealImage
              src="/images/apostle-portrait.jpg"
              alt="Pastor Ayodele Oladapo Awe"
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 45vw, (min-width: 640px) 512px, 100vw"
              className="group aspect-[4/5] w-full"
              imageClassName="object-[36%_0%]"
              parallax={false}
              duration={ABOUT_DURATION}
              ease={ABOUT_EASE}
              viewportMargin="-80px"
            />
          </div>

          <AnimateIn
            direction="right"
            duration={ABOUT_DURATION}
            ease={ABOUT_EASE}
            delay={0.2}
            className="relative z-10 mx-4 -mt-12 sm:mx-auto sm:w-full sm:max-w-xl lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mx-0 lg:mt-0 lg:max-w-none"
          >
            <div className="border-t-2 border-brand-orange bg-white p-8 shadow-2xl shadow-brand-navy/15 sm:p-12">
              <SectionLabel tone="light">About the Pastor</SectionLabel>
              <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
                A Voice Sent with Purpose
              </h2>
              <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  Born in Nigeria and now based in the United Kingdom, Ayodele
                  Oladapo Awe carries a mandate rooted in worship, the Word, and
                  the building of God&apos;s house across nations.
                </p>
                <p>
                  Through conferences, church planting, and discipleship, he
                  equips individuals and communities to walk in their God-given
                  purpose, raising a generation of worshippers and leaders.
                </p>
                <p>
                  From the pulpit to the marketplace, the vision remains the
                  same — raising voices, building houses, and transforming
                  nations.
                </p>
              </div>
              <Button href="/about" variant="primary">
                Read More
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3b. Marquee ──
          A dark band between the light About and the mid-blue churches. Its
          top edge separates itself against the light section; the orange rule
          at the foot is the seam against the blue below, which has none. */}
      <Marquee
        items={MARQUEE_NAMES}
        label="Expressions of the ministry"
        className="border-b-2 border-brand-orange bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy"
      />

      {/* ── 4. Ministry Expressions ──
          The site's one 3D moment: a globe joining Norwich and Ado Ekiti,
          beside the heading. Below it the church cards run as an offset grid —
          the second card drops a step on wider screens, so the pair reads as
          two places rather than two tiles. */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <AnimateIn direction="up" className="lg:col-span-6">
              <SectionLabel tone="dark">Our Ministry Expressions</SectionLabel>
              <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Two churches, one mandate
              </h2>
              {/* 5,017 km great-circle, Norwich to Ado Ekiti. */}
              <p className="mb-10 max-w-xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                Building the house of God in the UK and Nigeria — two
                congregations, some 5,000 km apart, carrying one burden.
              </p>

              {/* Legend for the globe's two markers. The globe is decoration
                  (aria-hidden); this list is where its meaning lives. */}
              <ul className="space-y-4">
                {CHURCHES.map((church) => (
                  <li key={church.acronym} className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="h-3 w-3 shrink-0 rounded-full bg-brand-orange shadow-[0_0_0_6px_rgb(235_100_52/0.2)]"
                    />
                    <span className="font-sans text-base text-white">
                      <span className="font-semibold">{church.acronym}</span>
                      <span className="text-white/70"> &middot; {church.location}</span>
                    </span>
                    <CountryFlag
                      code={CHURCH_FLAG[church.acronym]}
                      className="h-3 w-6 shrink-0"
                    />
                  </li>
                ))}
              </ul>
            </AnimateIn>

            <div className="mx-auto w-full max-w-[22rem] sm:max-w-md lg:col-span-6 lg:max-w-[34rem]">
              <GlobeSection />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20">
            {CHURCHES.map((church, i) => (
              <AnimateIn
                key={church.acronym}
                delay={i * 0.1}
                className={`h-full ${i % 2 === 1 ? "sm:mt-16" : ""}`}
              >
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

      {/* ── 5. Upcoming Events ── */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up">
            <SectionLabel tone="light">Upcoming Events</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              Join us at our next gathering
            </h2>
            <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              Whether in person or online, there is always a place for you.
            </p>
          </AnimateIn>

          <AnimateIn direction="up" className="mt-12 max-w-md">
            <EventCard
              title={PRAYER_SURGE.title}
              date={surge.shortDate}
              location={PRAYER_SURGE.location}
              registerLink="/events"
              ctaLabel="Event details"
            />
          </AnimateIn>

          {/* Full-width band so the countdown numerals have room to breathe */}
          <AnimateIn direction="up" className="mt-16">
            <div className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-6 py-12 text-center sm:px-12 sm:py-16">
              <SectionLabel tone="dark">Next Gathering</SectionLabel>
              <p className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                {surge.fullDate}
              </p>
              <div className="mt-8">
                <CountdownTimer targetDate={surge.startsAt} />
              </div>
              <p className="mx-auto mt-10 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                Join us every last Saturday of the month at 10:00 AM and become
                part of what God is doing in Norwich through united,
                Spirit-filled prayer.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 6. Teachings & Music ── */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up">
            <SectionLabel tone="dark">Teachings &amp; Music</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Access the Word and worship from anywhere
            </h2>
            <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Stream sermons on Telegram and worship on Spotify.
            </p>
          </AnimateIn>

          <div className="mt-12">
            <MediaLinks />
          </div>
        </div>
      </section>

      {/* ── 7. Partners ── */}
      {/* The backdrop is a CSS gradient, not a photo. It was a decorative
          Unsplash image (aria-hidden) sitting under a black/70 scrim, so almost
          none of it survived to the eye — but every visitor still paid for a
          cross-origin fetch through the image optimiser. Same look, no request. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-brand-orange/12 via-transparent to-brand-blue-mid/35"
        />

        <AnimateIn direction="up" className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Partnership</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Partner With Us
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Your partnership fuels the gospel across the UK and Nigeria. Join a
            community of believers sowing into revival.
          </p>
          <Button href="/partners" variant="secondary" size="lg">
            Become a Partner
          </Button>
        </AnimateIn>
      </section>

      {/* ── 8. Newsletter ── */}
      <section className="bg-gradient-to-b from-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Stay Connected</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Join our mailing list
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Get updates on events, teachings, and ministry news.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>
    </>
  );
}
