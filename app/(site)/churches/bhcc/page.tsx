import { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import HeroAtmosphere from "@/components/HeroAtmosphere";
import ImageGallery, { type GalleryImage } from "@/components/ImageGallery";
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

/**
 * BHCC's own congregation photography, from two services in August 2026.
 *
 * ⚠️ Alt text describes what is visible and nothing more. Nobody in these
 * frames has been identified to us, so none of them names a person and none
 * attaches a date or an event — the same rule the BLCN gallery runs under,
 * and for the same reason: a caption is exactly where an invented event or a
 * misattributed name slips onto a ministry site. If the client tells us who
 * or what these are, the captions can say so.
 *
 * ⚠️ Ten are portrait and one (`-05`) is landscape. `width`/`height` are the
 * real encoded sizes so the lightbox lays each out without guessing.
 */
const GALLERY: GalleryImage[] = [
  { src: "/images/bhcc/bhcc-gallery-01.jpg", width: 1012, height: 1800, alt: "A member of the congregation reading her Bible before a service at BHCC" },
  { src: "/images/bhcc/bhcc-gallery-02.jpg", width: 1012, height: 1800, alt: "A mother holding her child during a gathering at BHCC" },
  { src: "/images/bhcc/bhcc-gallery-03.jpg", width: 1012, height: 1800, alt: "Speaking from the lectern at a BHCC service" },
  { src: "/images/bhcc/bhcc-gallery-04.jpg", width: 1012, height: 1800, alt: "Addressing the congregation at BHCC, the welcome banner behind" },
  { src: "/images/bhcc/bhcc-gallery-05.jpg", width: 1800, height: 1012, alt: "The BHCC family photographed together outside the centre after a service" },
  { src: "/images/bhcc/bhcc-gallery-06.jpg", width: 1012, height: 1800, alt: "Members of the BHCC family outside after a Sunday service" },
  { src: "/images/bhcc/bhcc-gallery-07.jpg", width: 1012, height: 1800, alt: "Members of the BHCC family, young and old, gathered outside after a service" },
  { src: "/images/bhcc/bhcc-gallery-08.jpg", width: 1012, height: 1800, alt: "Two members of the BHCC congregation outside the centre" },
  { src: "/images/bhcc/bhcc-gallery-09.jpg", width: 1012, height: 1800, alt: "A moment of worship during a BHCC gathering" },
  { src: "/images/bhcc/bhcc-gallery-10.jpg", width: 1012, height: 1800, alt: "Sharing with the congregation at a BHCC gathering" },
  { src: "/images/bhcc/bhcc-gallery-11.jpg", width: 1012, height: 1800, alt: "Hands raised in worship at a BHCC service" },
];


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
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/50"
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
                className="absolute -inset-10 bg-[radial-gradient(circle,rgba(235,100,52,0.40),transparent_70%)] blur-2xl"
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
            <p className="mt-5 font-serif text-2xl font-bold tracking-[0.3em] text-brand-orange sm:text-3xl">
              BHCC
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-brand-orange" />
            <p className="mx-auto mb-10 mt-8 max-w-lg font-sans text-lg leading-relaxed text-white/60 sm:text-xl">
              Building the House of God in the United Kingdom
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Join Us
            </Button>
          </AnimateIn>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-navy to-transparent" />
      </section>

      {/* ── 2. Vision & Mission ──
          BLCN carries the same block as a two-column layout beside its printed
          church-order card. BHCC has no such graphic, so this is text-only. */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Our Foundation</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Vision &amp; Mission
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 text-left sm:grid-cols-2">
            {FOUNDATION.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1} className="h-full">
                <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-brand-orange-light">
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
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
            <div className="mx-auto aspect-square w-full max-w-lg bg-gradient-to-br from-white to-brand-tint p-6 shadow-xl ring-1 ring-brand-blue/10 sm:p-10">
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
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
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
      <section className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Our Story</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            How It Began
          </h2>
          <div className="mx-auto mb-8 h-0.5 w-16 bg-brand-orange" />
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
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Leadership</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              Meet the Team
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
            {BHCC?.leadership?.map((leader, i) => (
              <AnimateIn key={leader.name} delay={i * 0.1} className="h-full">
                <div className="group flex h-full flex-col border-t-2 border-brand-orange bg-cream">
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
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy">
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
                    <h3 className="font-serif text-lg font-bold leading-tight text-brand-blue">
                      {leader.name}
                    </h3>
                    <p className="mt-2 font-sans text-xs uppercase tracking-widest text-brand-orange-deep">
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
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Our Beliefs</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              What We Stand For
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {BELIEFS.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-brand-orange-light">
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
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Join Us</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              Service Times
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
            {SERVICES.map((svc, i) => (
              <AnimateIn key={svc.title} delay={i * 0.1} className="h-full">
                <div className="h-full border-t-2 border-brand-orange bg-cream p-8 text-center">
                  <h3 className="mb-2 font-serif text-lg font-bold leading-tight text-brand-blue">
                    {svc.title}
                  </h3>
                  <p className="mb-4 font-sans text-xs uppercase tracking-widest text-brand-orange-deep">
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
            <div className="border-l-4 border-brand-orange bg-cream p-8 text-left">
              <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-brand-blue">
                Visit Us
              </h3>
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden
                  className="mt-1 h-5 w-5 shrink-0 text-brand-orange-deep"
                />
                <p className="font-sans text-base leading-relaxed text-muted">
                  {BHCC?.address}
                </p>
              </div>
              {BHCC?.email && (
                <a
                  href={`mailto:${BHCC.email}`}
                  className="mt-4 inline-block font-sans text-sm text-brand-orange-deep underline-offset-4 transition-colors hover:text-brand-orange-dark hover:underline"
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

      {/* ── 8. Gallery ──
          ⚠️ Mid-blue, where the BLCN gallery is light, and the slot is why.
          This page alternates mid → light → dark → light → mid → light all
          the way to the CTA, so the only place a section can be added without
          restyling a neighbour is here, between the light "Services" and the
          CTA — and it has to be blue, because a light band would stack against
          Services with no seam. The CTA below already carries its own orange
          rule, so nothing else needed changing.

          ⚠️ It does NOT get a `border-t-2 border-brand-orange`: the section
          above it is light, which separates itself. The rule is for blue
          against blue only.

          Thumbnails, `sizes`, quality and the lightbox all live in
          `ImageGallery` — see the BLCN gallery notes in CLAUDE.md for why the
          `lg` size is a fixed 280px rather than a `vw` figure. */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="dark">Gallery</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              BHCC in Pictures
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Moments from the Building House Christian Centre family in Norwich.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mt-16">
            <ImageGallery images={GALLERY} />
          </div>
        </div>
      </section>

      {/* ── 9. CTA ── */}
      <section className="border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            You Are Welcome Here
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            BHCC is a family. Come as you are and encounter the living God.
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
