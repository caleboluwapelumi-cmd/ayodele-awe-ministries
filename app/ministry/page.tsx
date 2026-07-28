import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
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
      />

      {/* ── 2. The Three Expressions ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {EXPRESSIONS.map((card, i) => {
              const programmes = MINISTRY_PROGRAMMES.filter(
                (p) => p.category === card.category,
              );

              return (
                <AnimateIn key={card.title} delay={i * 0.1} className="h-full">
                  <div className="flex h-full flex-col border-t-2 border-blue-sky bg-white p-8">
                    <span className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-wine">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mb-4 font-serif text-xl font-bold leading-tight text-blue-navy sm:text-2xl">
                      {card.title}
                    </h2>
                    <p className="font-sans text-base leading-relaxed text-muted">
                      {card.desc}
                    </p>

                    {/* Scannable index of the named programmes behind the prose */}
                    <ul className="mt-8 flex flex-wrap gap-2 border-t border-blue-sky/20 pt-6">
                      {programmes.map((p) => (
                        <li
                          key={p.name}
                          className="border border-blue-sky/40 px-3 py-1 font-sans text-xs text-muted"
                        >
                          {p.acronym ? `${p.name} (${p.acronym})` : p.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. The Vision Behind It ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">The Vision</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            One Burden, Three Expressions
          </h2>
          <div className="mx-auto mb-8 h-0.5 w-16 bg-blue-sky" />
          <p className="font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            {EXPRESSIONS_CLOSING}
          </p>
        </AnimateIn>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Invite Pastor Awe
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            For a revival gathering, a teaching series, a healing crusade, or an
            outreach in your city.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" variant="wine" size="lg">
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
