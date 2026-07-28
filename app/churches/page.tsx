import { Metadata } from "next";
import Image from "next/image";
import { Building2, BookOpen, MapPin, Handshake, BookMarked, Plane } from "lucide-react";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";
import { CHURCHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ministry Expressions — Ayodele Oladapo Awe Ministries",
  description:
    "Every dimension of the mandate — churches, outreaches, teachings, music, and more.",
};

/* ─── Expression data ─── */
type Expression = {
  category: string;
  icon: "building2" | "bookOpen" | "spotify" | "mapPin" | "handshake" | "bookMarked" | "plane";
  title: string;
  acronym?: string;
  /**
   * Real church logo, shown beside the acronym. Rendered in a 36px square, so
   * point it at a square emblem — BHCC uses the `-mark` derivative, not its
   * horizontal lockup. Omitted for the non-church expressions.
   */
  logo?: string;
  location?: string;
  description: string;
  cta: string;
  href: string;
  accent: "blue" | "wine" | "sky";
};

/**
 * Emblem paths are never written out here — `CHURCHES[].logo` in constants.ts
 * is the single source, so a renamed asset changes in one place. The rest of
 * this list has no counterpart in constants.ts and stays literal.
 */
const logoFor = (acronym: string) =>
  CHURCHES.find((church) => church.acronym === acronym)?.logo;

const EXPRESSIONS: Expression[] = [
  {
    category: "Church",
    icon: "building2",
    title: "Building House Christian Centre",
    acronym: "BHCC",
    logo: logoFor("BHCC"),
    location: "🇬🇧 Norwich, United Kingdom",
    description:
      "A Spirit-filled church in Norwich committed to building lives, raising leaders, and establishing the house of God through the Word and worship.",
    cta: "Visit BHCC",
    href: "/churches/bhcc",
    accent: "blue",
  },
  {
    category: "Church",
    icon: "building2",
    title: "Bethel Livingstone Christian Network",
    acronym: "BLCN",
    logo: logoFor("BLCN"),
    location: "🇳🇬 Ado Ekiti, Nigeria",
    description:
      "A thriving network of believers across Nigeria dedicated to community-driven ministry, discipleship, and gospel outreach.",
    cta: "Visit BLCN",
    href: "/churches/blcn",
    accent: "blue",
  },
  {
    category: "Teachings",
    icon: "bookOpen",
    title: "Telegram Teachings",
    description:
      "A growing library of sermons, Bible studies, and prophetic messages from Pastor Awe — accessible to believers anywhere in the world.",
    cta: "Join channel",
    href: "/media/teachings",
    accent: "sky",
  },
  {
    category: "Music",
    icon: "spotify",
    title: "Music on Spotify",
    description:
      "Worship, gospel, and prophetic songs crafted to usher believers into the presence of God. Stream on Spotify and all major platforms.",
    cta: "Stream now",
    href: "/media/music",
    accent: "sky",
  },
  {
    category: "Events",
    icon: "mapPin",
    title: "Outreaches & Prayer Gatherings",
    description:
      "From the Norwich Prayer Surge to community outreaches in Nigeria — the ministry takes the gospel beyond the four walls into cities and nations.",
    cta: "See events",
    href: "/events",
    accent: "wine",
  },
  {
    category: "Partnership",
    icon: "handshake",
    title: "Partners for the Ministry",
    description:
      "A community of believers co-labouring with the vision — sowing financially and in prayer to see the gospel advance across the UK and Nigeria.",
    cta: "Become a partner",
    href: "/partners",
    accent: "wine",
  },
  {
    category: "Books",
    icon: "bookMarked",
    title: "Books & Publications",
    description:
      "Written resources from Pastor Awe to equip believers, strengthen the local church, and advance the kingdom — available now on Selar and Amazon.",
    cta: "Browse books",
    href: "/books",
    accent: "sky",
  },
  {
    category: "Itinerary",
    icon: "plane",
    title: "Ministry Itinerary",
    description:
      "Stay updated on where Pastor Awe is ministering next — conferences, church visits, and international engagements across the UK, Nigeria, and beyond.",
    cta: "See schedule",
    href: "/itinerary",
    accent: "wine",
  },
];

const UNITING_VALUES = [
  { title: "The Word", desc: "Rooted in Scripture, every ministry expression is built on the Word of God." },
  { title: "Worship", desc: "Cultivating atmospheres of genuine encounter with God." },
  { title: "Discipleship", desc: "Making and maturing disciples across both nations." },
  { title: "Mission", desc: "Taking the gospel to the ends of the earth." },
];

/* ─── Icon renderer ─── */
const ICON_SIZE = 20;

function ExpressionIcon({ type }: { type: Expression["icon"] }) {
  const cls = "shrink-0";
  switch (type) {
    case "building2":
      return <Building2 size={ICON_SIZE} className={cls} />;
    case "bookOpen":
      return <BookOpen size={ICON_SIZE} className={cls} />;
    case "spotify":
      return <SpotifyIcon size={ICON_SIZE} className={cls} />;
    case "mapPin":
      return <MapPin size={ICON_SIZE} className={cls} />;
    case "handshake":
      return <Handshake size={ICON_SIZE} className={cls} />;
    case "bookMarked":
      return <BookMarked size={ICON_SIZE} className={cls} />;
    case "plane":
      return <Plane size={ICON_SIZE} className={cls} />;
  }
}

const ACCENT_BORDER: Record<Expression["accent"], string> = {
  blue: "border-l-blue",
  wine: "border-l-wine",
  sky: "border-l-blue-sky",
};

const ACCENT_CATEGORY: Record<Expression["accent"], string> = {
  blue: "text-blue",
  wine: "text-wine",
  sky: "text-blue-sky",
};

/* ─── Page ─── */
export default function ExpressionsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <PageHero
        label="The Full Picture"
        title="Ministry Expressions"
        subtitle="Every dimension of the mandate — churches, outreaches, teachings, music, and more"
      />

      {/* ── 2. Expressions Grid ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {EXPRESSIONS.map((expr, i) => {
              const comingSoon = expr.cta === "Coming Soon";
              return (
                <AnimateIn key={expr.title} delay={(i % 3) * 0.1} className="h-full">
                  <div
                    className={`flex h-full flex-col border-l-4 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg ${ACCENT_BORDER[expr.accent]}`}
                  >
                    {/* Category label */}
                    <span
                      className={`mb-5 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-widest ${ACCENT_CATEGORY[expr.accent]}`}
                    >
                      <ExpressionIcon type={expr.icon} />
                      {expr.category}
                    </span>

                    <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-blue-navy">
                      {expr.title}
                    </h3>

                    {(expr.acronym || expr.location) && (
                      <div className="mb-4 flex items-center gap-3">
                        {expr.logo && (
                          /* Decorative — the acronym beside it already names the church */
                          <span className="relative block h-9 w-9 shrink-0 overflow-hidden">
                            <Image
                              src={expr.logo}
                              alt=""
                              aria-hidden
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </span>
                        )}
                        <p className="font-sans text-xs uppercase tracking-widest text-muted">
                          {expr.acronym && (
                            <span className="mr-2 font-semibold text-wine">
                              {expr.acronym}
                            </span>
                          )}
                          {expr.location}
                        </p>
                      </div>
                    )}

                    <p className="mb-8 flex-1 font-sans text-base leading-relaxed text-muted">
                      {expr.description}
                    </p>

                    {comingSoon ? (
                      <span className="font-sans text-xs font-semibold uppercase tracking-widest text-muted/50">
                        {expr.cta}
                      </span>
                    ) : (
                      <Button
                        href={expr.href}
                        variant="outline"
                        className="self-start text-wine"
                      >
                        {expr.cta}
                      </Button>
                    )}
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Shared Vision ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">One Vision</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              What Unites Every Expression
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {UNITING_VALUES.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-3 font-serif text-lg font-bold leading-tight text-blue-sky">
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

      {/* ── 4. More Expressions Coming + Newsletter ── */}
      <section className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Stay Updated</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            More Expressions Coming
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            The mandate is expanding. Books, training programmes, and more
            ministry expressions are being added. Stay updated as we grow.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>
    </>
  );
}
