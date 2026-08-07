import { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import HeroAtmosphere from "@/components/HeroAtmosphere";
import { CHURCHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "BHCC — Building House Christian Centre",
  description: "Building House Christian Centre — a Spirit-filled church in Norwich, United Kingdom.",
};

const BELIEFS = [
  { title: "The Bible", desc: "We believe the Bible is the infallible Word of God, the final authority in all matters of faith and conduct." },
  { title: "Salvation", desc: "We believe in the death and resurrection of Jesus Christ as the only means of salvation for all mankind." },
  { title: "The Holy Spirit", desc: "We believe in the person and work of the Holy Spirit, including the gifts and power for ministry today." },
];

const BHCC = CHURCHES.find((church) => church.acronym === "BHCC");

const FOUNDATION = [
  { title: "Vision", desc: BHCC?.vision },
  { title: "Mission", desc: BHCC?.mission },
];

const SERVICES = [
  { title: "Sunday Service", time: "12:00 PM", desc: "Main weekly gathering for worship, Word, and fellowship." },
  { title: "Thursday Midweek Service", time: "8:00 PM", desc: "Midweek gathering for prayer and the Word." },
];

/** "Iyanuoluwa Ayodele-Awe" → "IA". Used for the leaders whose photo is pending. */
function initialsOf(name: string) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function BHCCPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      {/* ⚠️ STILL PENDING a real photograph of the BHCC congregation — this is a
          gradient placeholder, not the finished hero. It replaced a stock church
          interior: that image was `priority`, so it blocked LCP, and a stock
          photo behind a heading that names BHCC is read as a photo *of* BHCC,
          which "No stock imagery stands for a church" rules out. A gradient
          claims nothing. Swap in the real photo when the client supplies it. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-blue-navy via-transparent to-blue-navy/50"
        />
        {/* The shared hero glow. This hero builds its own gradient rather than
            using `PageHero`, so it opts in by hand. No particles — the dot
            field is kept to the homepage, /events and /ministry. */}
        <HeroAtmosphere />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            {/* Emblem only, not the supplied lockup: `bhcc-logo.jpg` is a 810×243
                horizontal lockup floating in a 1080×1080 white square, so in this
                square slot its "CHRISTIAN CENTRE" line would land under 4px. The
                h1 directly below already spells the name out. See `bhcc-mark.png`
                in Assets Status. */}
            <div className="relative mx-auto mb-10 h-40 w-40 sm:h-48 sm:w-48">
              {/* Soft glow — matches BLCN's hero badge. The white plate carries
                  most of the separation here; the glow keeps the two heroes
                  reading as a pair. */}
              <div
                aria-hidden
                className="absolute -inset-10 bg-[radial-gradient(circle,rgba(74,144,217,0.4),transparent_70%)] blur-2xl"
              />
              <div className="relative h-full w-full overflow-hidden shadow-2xl ring-1 ring-white/15">
                <Image
                  src="/images/bhcc-mark.png"
                  alt="Building House Christian Centre logo"
                  fill
                  priority
                  sizes="(min-width: 640px) 192px, 160px"
                  className="object-cover"
                />
              </div>
            </div>
            <SectionLabel tone="dark">United Kingdom</SectionLabel>
            <h1 className="font-serif text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="hero-shimmer">
                Building House Christian Centre
              </span>
            </h1>
            <p className="mt-5 font-serif text-2xl font-bold tracking-[0.3em] text-blue-sky sm:text-3xl">
              BHCC
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-blue-sky" />
            <p className="mx-auto mb-10 mt-8 max-w-lg font-sans text-lg leading-relaxed text-white/60 sm:text-xl">
              Building the House of God in the United Kingdom
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Join Us
            </Button>
          </AnimateIn>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
      </section>

      {/* ── 2. Vision & Mission ──
          BLCN carries the same block as a two-column layout beside its printed
          church-order card. BHCC has no such graphic, so this is text-only. */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Our Foundation</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Vision &amp; Mission
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 text-left sm:grid-cols-2">
            {FOUNDATION.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1} className="h-full">
                <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-blue-sky">
                  {item.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                  {item.desc}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. About ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* The church's own lockup, not a stock photograph — a generic photo
              captioned "BHCC church gathering" reads as a photo of BHCC. This
              is the one slot that renders `bhcc-logo.jpg` rather than the mark:
              the plate is ~512px wide, so the lockup lands ~380px across and
              the "CHRISTIAN CENTRE" line stays legible (see Assets Status for
              why small square slots must use `bhcc-mark.png` instead). White
              mat + ring separates the logo's own white ground from the light
              section. Swap in a real photo of the congregation when one
              arrives. */}
          <AnimateIn direction="left">
            <div className="mx-auto aspect-square w-full max-w-lg bg-gradient-to-br from-white to-[#EEF3FA] p-6 shadow-xl ring-1 ring-blue-navy/10 sm:p-10">
              <div className="relative h-full w-full">
                <Image
                  src="/images/bhcc-logo.jpg"
                  alt="Building House Christian Centre logo"
                  fill
                  sizes="(min-width: 1024px) 512px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">About BHCC</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              A House Being Built
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Building House Christian Centre (BHCC) is a Spirit-filled church
                in Norwich, United Kingdom, established under the ministry of
                Ayodele Oladapo Awe.
              </p>
              <p>
                At BHCC, we are committed to building believers through the
                Word, worship, and fellowship. We believe the local church is
                God&apos;s primary vehicle for transformation in society.
              </p>
              <p>
                We gather twice each week — on Sunday and on Thursday — and BHCC
                is a place where lives are changed and destinies are shaped by
                the power of the gospel. New programmes and ministries are being
                developed &mdash; stay connected for updates.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Our Story ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Our Story</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            How It Began
          </h2>
          <div className="mx-auto mb-8 h-0.5 w-16 bg-blue-sky" />
          <div className="space-y-4 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            <p>
              At an end-of-year retreat in 2023, Pastor Ayodele Oladapo Awe was
              taken in a trance and saw himself travelling to the city of
              Norwich. There the Lord spoke to him, instructing him to begin a
              work and calling it &ldquo;The Building House.&rdquo;
            </p>
            <p>
              That word became the mandate the church carries today. Building
              House Christian Centre fully began on {BHCC?.founded}.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ── 5. Leadership ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Leadership</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Meet the Team
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
            {BHCC?.leadership?.map((leader, i) => (
              <AnimateIn key={leader.name} delay={i * 0.1} className="h-full">
                <div className="group flex h-full flex-col border-t-2 border-blue-sky bg-cream">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    {leader.image ? (
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      /* Photo pending from the client — initials stand in so the
                         grid keeps its rhythm without a stock-photo stranger. */
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep">
                        <span
                          aria-hidden
                          className="font-serif text-5xl font-bold leading-none tracking-tight text-white/90"
                        >
                          {initialsOf(leader.name)}
                        </span>
                        <span className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                          Photo coming soon
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="font-serif text-lg font-bold leading-tight text-blue-navy">
                      {leader.name}
                    </h3>
                    <p className="mt-2 font-sans text-xs uppercase tracking-widest text-wine">
                      {leader.role}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Beliefs ── */}
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

      {/* ── 7. Services ── */}
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
                  {BHCC?.address}
                </p>
              </div>
              {BHCC?.email && (
                <a
                  href={`mailto:${BHCC.email}`}
                  className="mt-4 inline-block font-sans text-sm text-wine underline-offset-4 transition-colors hover:text-wine-light hover:underline"
                >
                  {BHCC.email}
                </a>
              )}
            </div>

            <p className="mt-12 font-sans text-base leading-relaxed text-muted">
              New programmes and ministries are being developed &mdash; stay
              connected for updates.
            </p>

            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            You Are Welcome Here
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            BHCC is a family. Come as you are and encounter the living God.
          </p>
          <Button href="/contact" variant="wine" size="lg">
            Contact Us
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
