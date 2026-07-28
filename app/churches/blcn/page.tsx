import { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import YouTubeIcon from "@/components/icons/YouTubeIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { BLCN_SOCIALS, CHURCHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "BLCN — Bethel Livingstone Christian Network",
  description: "Bethel Livingstone Christian Network — a thriving church network in Nigeria.",
};

const BELIEFS = [
  { title: "The Bible", desc: "We believe the Bible is the infallible Word of God, the final authority in all matters of faith and conduct." },
  { title: "Salvation", desc: "We believe in the death and resurrection of Jesus Christ as the only means of salvation for all mankind." },
  { title: "The Holy Spirit", desc: "We believe in the person and work of the Holy Spirit, including the gifts and power for ministry today." },
];

const BLCN = CHURCHES.find((church) => church.acronym === "BLCN");

const FOUNDATION = [
  {
    title: "Vision",
    desc: "To be a global apostolic platform that stewards the supernatural, empowers believers to manifest God's presence, and transforms nations through the gospel of Christ and the reality of His kingdom.",
  },
  {
    title: "Mission",
    desc: "We are committed to preaching the gospel, making disciples in nations, and the presence of God in every sphere of influence.",
  },
];

const VALUES = [
  "God's Word",
  "Discipleship",
  "Effective Leadership",
  "Excellence",
];

const SERVICES = [
  { title: "Sunday Service", time: "9:00 AM", desc: "Main weekly gathering for worship, Word, and fellowship." },
  { title: "Tuesday Service", time: "5:30 PM", desc: "Midweek gathering for prayer and the Word." },
];

const BLCN_SOCIAL_LINKS = [
  {
    name: "YouTube",
    label: "BLCN Global",
    href: BLCN_SOCIALS.youtube,
    Icon: YouTubeIcon,
  },
  {
    name: "Instagram",
    label: "BLCN Ekiti",
    href: BLCN_SOCIALS.instagramEkiti,
    Icon: InstagramIcon,
  },
  {
    name: "Instagram",
    label: "BLCN Global",
    href: BLCN_SOCIALS.instagramGlobal,
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    label: "BLCN Global",
    href: BLCN_SOCIALS.facebook,
    Icon: FacebookIcon,
  },
];

const NETWORK_STATS = [
  { stat: "Ado Ekiti", label: "Ekiti State, Nigeria" },
  { stat: "One Network", label: "One Vision" },
  { stat: "Thousands Reached", label: "And Growing" },
];

export default function BLCNPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* The emblem is the hero image — no stock photography here. At 828×647
            it is far too small to hold a full-bleed crop sharply, so it is blown
            up and blurred to read as texture; the crisp badge below carries the
            actual mark. The overflow-hidden wrapper keeps the blur's soft edge
            from bleeding past the section. */}
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/blcn-logo.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-125 object-cover blur-2xl"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-navy/90 via-transparent to-blue-navy/40" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <div className="relative mx-auto mb-10 h-40 w-40 sm:h-48 sm:w-48">
              {/* Soft glow — the logo's own backdrop is near-black, so it needs
                  separation from the dark hero behind it */}
              <div
                aria-hidden
                className="absolute -inset-10 bg-[radial-gradient(circle,rgba(74,144,217,0.4),transparent_70%)] blur-2xl"
              />
              <div className="relative h-full w-full overflow-hidden shadow-2xl ring-1 ring-white/15">
                <Image
                  src="/images/blcn-logo.jpg"
                  alt="Bethel Livingstone Christian Network logo"
                  fill
                  priority
                  sizes="(min-width: 640px) 192px, 160px"
                  className="object-cover"
                />
              </div>
            </div>
            <SectionLabel tone="dark">Nigeria</SectionLabel>
            <h1 className="font-serif text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              Bethel Livingstone Christian Network
            </h1>
            <p className="mt-5 font-serif text-2xl font-bold tracking-[0.3em] text-blue-sky sm:text-3xl">
              BLCN
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-blue-sky" />
            <p className="mx-auto mb-10 mt-8 max-w-lg font-sans text-lg leading-relaxed text-white/60 sm:text-xl">
              Raising Believers, Transforming Nigeria
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Join Us
            </Button>
          </AnimateIn>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
      </section>

      {/* ── 2. Church Order — vision, mission & values ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* White mat separates the graphic's own dark-blue top from the mid-blue
              section. Width stays well under the 432px native width of the source
              so the browser scales down rather than up. */}
          <AnimateIn direction="left" className="lg:col-span-2">
            <div className="mx-auto max-w-[280px] bg-white p-4 shadow-xl sm:max-w-[320px]">
              <Image
                src="/images/blcn-church-order.jpg"
                alt="BLCN &quot;Welcome Home&quot; church order card, presenting the vision, mission and values set out alongside."
                width={432}
                height={1080}
                quality={100}
                sizes="(min-width: 640px) 288px, 248px"
                className="h-auto w-full rounded-none"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="right" className="lg:col-span-3">
            <SectionLabel tone="dark">Our Foundation</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Vision, Mission &amp; Values
            </h2>
            <div className="mb-10 h-0.5 w-16 bg-blue-sky" />

            <div className="space-y-8">
              {FOUNDATION.map((item) => (
                <div key={item.title}>
                  <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-blue-sky">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                    {item.desc}
                  </p>
                </div>
              ))}

              <div>
                <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-blue-sky">
                  Values
                </h3>
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-base text-white/70 sm:text-lg">
                  {VALUES.map((value, i) => (
                    <li key={value} className="flex items-center gap-x-3">
                      {i > 0 && (
                        <span aria-hidden className="text-blue-sky">
                          &middot;
                        </span>
                      )}
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. About ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"
                alt="BLCN church gathering"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">About BLCN</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              A Network Ablaze
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Bethel Livingstone Christian Network (BLCN) is a thriving church
                network in Nigeria, birthed out of the apostolic mandate of
                Pastor Ayodele Oladapo Awe.
              </p>
              <p>
                BLCN exists to raise a generation of believers who are grounded
                in the Word, empowered by the Spirit, and sent into the world as
                ambassadors of Christ.
              </p>
              <p>
                Through vibrant worship, sound teaching, and intentional
                discipleship, BLCN is building a community of kingdom-minded
                believers across Nigeria.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Beliefs ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Our Beliefs</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              What We Stand For
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {BELIEFS.map((card, i) => (
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

      {/* ── 5. Services ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Join Us</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Service Times
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
            {SERVICES.map((svc, i) => (
              <AnimateIn key={svc.title} delay={i * 0.1} className="h-full">
                <div className="h-full border-t-2 border-blue-sky bg-cream p-8 text-center">
                  <h3 className="mb-2 font-serif text-lg font-bold leading-tight text-blue-navy">
                    {svc.title}
                  </h3>
                  <p className="mb-4 font-sans text-xs uppercase tracking-widest text-wine">
                    {svc.time}
                  </p>
                  <p className="font-sans text-base leading-relaxed text-muted">
                    {svc.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn direction="up" className="mx-auto mt-12 max-w-4xl">
            <div className="border-l-4 border-blue-sky bg-cream p-8 text-left">
              <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-blue-navy">
                Visit Us
              </h3>
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden
                  className="mt-1 h-5 w-5 shrink-0 text-blue-sky"
                />
                <p className="font-sans text-base leading-relaxed text-muted">
                  {BLCN?.address}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 6. Follow BLCN ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Connect</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Follow BLCN
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Catch services, testimonies, and updates from the network on our
              own channels.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {BLCN_SOCIAL_LINKS.map((social, i) => (
              <AnimateIn
                key={`${social.name}-${social.label}`}
                delay={i * 0.1}
                className="h-full"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col items-center justify-center border border-white/10 bg-blue-deep/50 p-8 text-center transition-colors hover:border-white/30"
                >
                  <social.Icon size={28} />
                  <span className="mt-4 font-serif text-base font-bold leading-tight text-white transition-colors group-hover:text-blue-sky">
                    {social.name}
                  </span>
                  <span className="mt-1 font-sans text-xs uppercase tracking-[0.15em] text-white/50">
                    {social.label}
                  </span>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Network Vision ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <AnimateIn direction="up">
            <SectionLabel tone="dark">The Network</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Beyond a Church, A Movement
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              BLCN is not just a local church — it is a network of believers
              connected by a shared vision to see Nigeria transformed by the
              power of the gospel. We are building, growing, and expanding.
            </p>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {NETWORK_STATS.map((item, i) => (
              <AnimateIn key={item.stat} delay={i * 0.1} className="h-full">
                <div className="h-full border-t-2 border-blue-sky bg-blue-deep/50 px-8 py-8 text-center">
                  <p className="font-serif text-xl font-bold leading-tight text-blue-sky">
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

      {/* ── 8. CTA ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Be Part of the Family
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            BLCN is a family in Ado Ekiti. Come as you are — there is a place
            here for you.
          </p>
          <Button href="/contact" variant="wine" size="lg">
            Contact Us
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
