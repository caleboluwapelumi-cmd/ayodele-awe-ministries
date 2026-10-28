import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import SectionPhoto from "@/components/SectionPhoto";
import RevealImage from "@/components/RevealImage";
import {
  MINISTRY_PROGRAMMES,
  type ProgrammeCategory,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ministry — Ayodele Oladapo Awe Ministries",
  description:
    "The three expressions of Ayodele Oladapo Awe's ministry — apostolic and prophetic, pastoral and teaching, and evangelistic — and the programmes through which each is carried out.",
};

/**
 * The three ministry expressions. `category` keys into MINISTRY_PROGRAMMES so
 * each card can index the named programmes it runs without that list being
 * duplicated here — add a programme in lib/constants.ts and it appears below.
 */
const EXPRESSIONS: {
  title: string;
  category: ProgrammeCategory;
  desc: string;
}[] = [
  {
    title: "Apostolic & Prophetic Ministry",
    category: "Apostolic & Prophetic",
    desc: "As a revivalist, Ayodele carries a burden to see cities, churches, and nations experience genuine spiritual awakening through the outpouring of the Holy Spirit. This expression of his ministry is primarily expressed through Special Apostolic Visits, Special Holyghost Meetings (SHM), and the Holyghost Convocation (HC), where believers are stirred into deeper intimacy with God and equipped to carry His presence into every sphere of society.",
  },
  {
    title: "Pastoral & Teaching Ministry",
    category: "Pastoral & Teaching",
    desc: "At the heart of Ayodele's ministry is a passion for making disciples. He believes that revival must produce mature believers who faithfully represent Christ in every area of life. This burden finds expression through Building House Christian Centre (BHCC) in Norwich, United Kingdom, Bethel Livingstone Christian Network (BLCN), One Thing Is Needful (OTIN), Discipleship Retreats, and the Partnership Conference. Through systematic biblical teaching, mentorship, and spiritual formation, he is committed to raising believers grounded in Scripture, led by the Holy Spirit, and equipped for Kingdom service.",
  },
  {
    title: "Evangelistic Ministry",
    category: "Evangelistic",
    desc: "As “The Pointer,” Ayodele is passionate about directing people to Jesus Christ through bold evangelism and supernatural demonstrations of God's love and power. His evangelistic ministry includes the Great Light Campaign (GLC), the Summer Harvest Campaign UK, the Healing Ministry (through healing crusades and training schools), and the Fire Fest Europe Tour. Through these outreaches, many have encountered Christ, received healing, and been equipped to minister effectively to others.",
  },
];

const EXPRESSIONS_CLOSING =
  "Ayodele's ministry is driven by a vision to see believers transformed into mature ambassadors of Christ, churches revived by the Holy Spirit, and communities impacted by the reality of God's Kingdom. Whether preaching, teaching, mentoring leaders, or leading extended seasons of prayer, his desire is to see Jesus revealed and glorified among the nations.";

export default function MinistryPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <PageHero
        label="Ministry"
        title="Three Expressions of Ministry"
        subtitle="How the mandate is carried out — in the prophetic, the pastoral, and the evangelistic"
        /* The second and last inner page with the dot field. /ministry is the
           overview the rest of the Expressions menu hangs off, so it carries
           the fuller treatment. See the warning in PageHero. */
        particles
      />

      {/* ── 2. The Three Expressions ──
          An editorial index, not a card grid. Each expression is a full-width
          row — big numeral, title, then the prose and its programme tags —
          and the rows step in from the left one column at a time on wide
          screens, so the eye walks down a diagonal instead of across three
          equal boxes. On a phone the stagger flattens and the rows stack.

          The numerals are `brand-orange` on a light ground (3.3:1), which is
          legitimate only as display type; they are 72px+ and aria-hidden — the
          `h2` carries the meaning. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ol>
            {EXPRESSIONS.map((card, i) => {
              const programmes = MINISTRY_PROGRAMMES.filter(
                (p) => p.category === card.category,
              );
              const indent = ["", "lg:ml-[8.333%]", "lg:ml-[16.666%]"][i] ?? "";

              return (
                <li key={card.title} className={`border-t border-brand-orange/30 py-12 sm:py-16 ${indent}`}>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
                    <AnimateIn direction="up" className="lg:col-span-2">
                      <span
                        aria-hidden
                        className="block font-serif text-7xl font-bold leading-none text-brand-orange sm:text-8xl"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </AnimateIn>

                    <AnimateIn direction="up" delay={0.1} className="lg:col-span-4">
                      <h2 className="font-serif text-2xl font-bold leading-tight text-brand-blue sm:text-3xl">
                        {card.title}
                      </h2>
                    </AnimateIn>

                    <AnimateIn direction="up" delay={0.2} className="lg:col-span-6">
                      <p className="font-sans text-base leading-relaxed text-muted sm:text-lg">
                        {card.desc}
                      </p>

                      {/* Scannable index of the named programmes behind the prose */}
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {programmes.map((p) => (
                          <li
                            key={p.name}
                            className="border border-brand-orange/40 bg-white px-3 py-1 font-sans text-xs text-muted"
                          >
                            {p.acronym ? `${p.name} (${p.acronym})` : p.name}
                          </li>
                        ))}
                      </ul>
                    </AnimateIn>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── 3. The Vision Behind It ──
          Overlapping image and text: a wide photograph across most of the row,
          with the vision copy on a navy plate laid over its right-hand edge.
          On a phone the plate rides up over the foot of the image. The plate
          is near-opaque navy, so its text measures against navy, not the
          photograph — the same reasoning as SectionLabel's `photo` tone. */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <RevealImage
              src="/images/apostle-1.jpg"
              alt="Pastor Ayodele Oladapo Awe preaching"
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="group aspect-[4/3] w-full sm:aspect-[16/10]"
              imageClassName="object-[62%_40%]"
            />
          </div>

          <AnimateIn
            direction="right"
            className="relative z-10 mx-3 -mt-20 sm:mx-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mx-0 lg:mt-0"
          >
            <div className="border-t-2 border-brand-orange bg-brand-navy/95 p-8 shadow-2xl backdrop-blur-sm sm:p-12">
              <SectionLabel tone="dark">The Vision</SectionLabel>
              <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                One Burden, Three Expressions
              </h2>
              <div className="mb-8 h-0.5 w-16 bg-brand-orange" />
              <p className="font-sans text-base leading-relaxed text-white/75 sm:text-lg">
                {EXPRESSIONS_CLOSING}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="relative isolate overflow-hidden border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <SectionPhoto src="/images/apostle-2.jpg" position="object-[30%_25%]" />
        <AnimateIn direction="up" className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Invite Pastor Awe
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            For a revival gathering, a teaching series, a healing crusade, or an
            outreach in your city.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" variant="secondary" size="lg">
              Request an Invitation
            </Button>
            <Button
              href="/itinerary"
              variant="outline"
              size="lg"
              className="text-white"
            >
              View the Itinerary
            </Button>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
