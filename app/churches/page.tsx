import { Metadata } from "next";
import Link from "next/link";
import { Building2, BookOpen, MapPin, Handshake, BookMarked, Plane } from "lucide-react";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import NewsletterForm from "@/components/NewsletterForm";

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
  location?: string;
  description: string;
  cta: string;
  href: string;
  accent: "blue" | "wine" | "sky";
};

const EXPRESSIONS: Expression[] = [
  {
    category: "Church",
    icon: "building2",
    title: "Building House Christian Centre",
    acronym: "BHCC",
    location: "🇬🇧 United Kingdom",
    description:
      "A Spirit-filled church community in the UK committed to building lives, raising leaders, and establishing the house of God through the Word and worship.",
    cta: "Visit BHCC →",
    href: "/churches/bhcc",
    accent: "blue",
  },
  {
    category: "Church",
    icon: "building2",
    title: "Bethel Livingstone Christian Network",
    acronym: "BLCN",
    location: "🇳🇬 Nigeria",
    description:
      "A thriving network of believers across Nigeria dedicated to community-driven ministry, discipleship, and gospel outreach.",
    cta: "Visit BLCN →",
    href: "/churches/blcn",
    accent: "blue",
  },
  {
    category: "Teachings",
    icon: "bookOpen",
    title: "Telegram Teachings",
    description:
      "A growing library of sermons, Bible studies, and prophetic messages from Minister Awe — accessible to believers anywhere in the world.",
    cta: "Join Channel →",
    href: "/media/teachings",
    accent: "sky",
  },
  {
    category: "Music",
    icon: "spotify",
    title: "Music on Spotify",
    description:
      "Worship, gospel, and prophetic songs crafted to usher believers into the presence of God. Stream on Spotify and all major platforms.",
    cta: "Stream Now →",
    href: "/media/music",
    accent: "sky",
  },
  {
    category: "Events",
    icon: "mapPin",
    title: "Outreaches & Prayer Gatherings",
    description:
      "From the Norwich Prayer Surge to community outreaches in Nigeria — the ministry takes the gospel beyond the four walls into cities and nations.",
    cta: "See Events →",
    href: "/events",
    accent: "wine",
  },
  {
    category: "Partnership",
    icon: "handshake",
    title: "Partners for the Ministry",
    description:
      "A community of believers co-labouring with the vision — sowing financially and in prayer to see the gospel advance across the UK and Nigeria.",
    cta: "Become a Partner →",
    href: "/partners",
    accent: "wine",
  },
  {
    category: "Books",
    icon: "bookMarked",
    title: "Books & Publications",
    description:
      "Written resources from Minister Awe to equip believers, strengthen the local church, and advance the kingdom. Coming soon.",
    cta: "Coming Soon",
    href: "/books",
    accent: "sky",
  },
  {
    category: "Itinerary",
    icon: "plane",
    title: "Ministry Itinerary",
    description:
      "Stay updated on where Minister Awe is ministering next — conferences, church visits, and international engagements across the UK, Nigeria, and beyond.",
    cta: "See Schedule →",
    href: "/itinerary",
    accent: "wine",
  },
];

/* ─── Icon renderer ─── */
const ICON_SIZE = 28;

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
  blue: "text-blue-sky",
  wine: "text-wine",
  sky: "text-blue-sky",
};

/* ─── Page ─── */
export default function ExpressionsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
          The Full Picture
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Ministry Expressions
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto">
          Every dimension of the mandate — churches, outreaches, teachings, music, and more
        </p>
      </section>

      {/* ── 2. Expressions Grid ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPRESSIONS.map((expr) => (
              <div
                key={expr.title}
                className={`bg-white rounded-lg border-l-4 ${ACCENT_BORDER[expr.accent]} p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col`}
              >
                {/* Icon + category */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={ACCENT_CATEGORY[expr.accent]}>
                    <ExpressionIcon type={expr.icon} />
                  </div>
                  <span
                    className={`font-sans text-[0.65rem] uppercase tracking-widest font-semibold ${ACCENT_CATEGORY[expr.accent]}`}
                  >
                    {expr.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-blue-navy mb-1">
                  {expr.title}
                </h3>

                {/* Acronym + location */}
                {(expr.acronym || expr.location) && (
                  <p className="font-sans text-xs text-muted mb-3">
                    {expr.acronym && (
                      <span className="font-semibold text-wine mr-2">{expr.acronym}</span>
                    )}
                    {expr.location}
                  </p>
                )}

                {/* Description */}
                <p className="font-sans text-sm text-muted leading-relaxed mb-6 flex-1">
                  {expr.description}
                </p>

                {/* CTA */}
                <Link
                  href={expr.href}
                  className={`inline-flex items-center font-sans text-sm font-semibold transition-colors ${
                    expr.cta === "Coming Soon"
                      ? "text-muted/50 cursor-default"
                      : "text-wine hover:text-wine-light"
                  }`}
                >
                  {expr.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Shared Vision ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            One Vision
          </p>
          <h2 className="font-serif text-3xl text-white mb-16">What Unites Every Expression</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "The Word", desc: "Rooted in Scripture, every ministry expression is built on the Word of God." },
              { title: "Worship", desc: "Cultivating atmospheres of genuine encounter with God." },
              { title: "Discipleship", desc: "Making and maturing disciples across both nations." },
              { title: "Mission", desc: "Taking the gospel to the ends of the earth." },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-serif text-lg text-blue-sky mb-3">{card.title}</h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. More Expressions Coming + Newsletter ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-navy to-blue-deep">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Stay Updated
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            More Expressions Coming
          </h2>
          <p className="font-sans text-white/70 mb-10">
            The mandate is expanding. Books, training programmes, and more ministry expressions are being added. Stay updated as we grow.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
