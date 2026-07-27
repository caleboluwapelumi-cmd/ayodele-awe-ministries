import { Metadata } from "next";
import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "BHCC — Building House Christian Centre",
  description: "Building House Christian Centre — a Spirit-filled church in the United Kingdom.",
};

const BELIEFS = [
  { title: "The Bible", desc: "We believe the Bible is the infallible Word of God, the final authority in all matters of faith and conduct." },
  { title: "Salvation", desc: "We believe in the death and resurrection of Jesus Christ as the only means of salvation for all mankind." },
  { title: "The Holy Spirit", desc: "We believe in the person and work of the Holy Spirit, including the gifts and power for ministry today." },
];

const SERVICES = [
  { title: "Sunday Service", time: "Time TBC", desc: "Main weekly gathering for worship, Word, and fellowship." },
  { title: "Midweek Bible Study", time: "Time TBC", desc: "Deep dive into the Word of God." },
  { title: "Prayer Meeting", time: "Time TBC", desc: "Corporate prayer and intercession." },
];

export default function BHCCPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-navy/90 via-transparent to-blue-navy/40" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="dark">United Kingdom</SectionLabel>
            <h1 className="font-serif text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              Building House Christian Centre
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

      {/* ── 2. About ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80"
                alt="BHCC church gathering"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
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
                community in the United Kingdom, established under the ministry
                of Ayodele Oladapo Awe.
              </p>
              <p>
                At BHCC, we are committed to building believers through the
                Word, worship, and fellowship. We believe the local church is
                God&apos;s primary vehicle for transformation in society.
              </p>
              <p>
                From our weekly services to our prayer gatherings and community
                outreaches, BHCC is a place where lives are changed and
                destinies are shaped by the power of the gospel.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Beliefs ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Our Beliefs</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              What We Stand For
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
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

      {/* ── 4. Services ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Join Us</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Service Times
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
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

          <AnimateIn direction="up">
            <p className="mt-12 font-sans text-base leading-relaxed text-muted">
              Contact us for exact times and location details.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 5. CTA ── */}
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
