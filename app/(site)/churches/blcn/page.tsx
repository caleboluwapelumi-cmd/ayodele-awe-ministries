import { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import HeroAtmosphere from "@/components/HeroAtmosphere";
import HeroSlideshow, { type HeroSlide } from "@/components/HeroSlideshow";
import ImageGallery, { type GalleryImage } from "@/components/ImageGallery";
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

/**
 * Hero backdrop — real photographs of the congregation, supplied by the client.
 *
 * ⚠️ These replaced the blurred `blcn-logo.jpg` backdrop that stood here while
 * there was no photography of BLCN at all. That treatment existed *because* the
 * alternative would have been a stock photo of strangers under a heading naming
 * the church; with real pictures in hand it has no reason to stay, and a real
 * congregation is a better hero than an abstraction of its emblem. The crisp
 * emblem badge in the hero body stays — that is the identity mark, and it was
 * never the thing the blurred layer was doing.
 *
 * ⚠️ This set is client-chosen, and only one of the four (`blcn-hero-4.jpg`) is
 * from the professionally-shot Nikon frames. The other three are phone
 * photographs from the gallery set, capped at 1800px on the long edge rather
 * than 2560 — so they upscale roughly 1.4x at a desktop full-bleed width. That
 * is affordable here for the same reason `apostle-key.jpg` records in
 * CLAUDE.md and for no other: the slideshow's own two scrims (`bg-black/60`
 * plus the navy wash) have already taken the fine detail out before anyone
 * sees it. Don't reuse these three anywhere they would render unscrimmed.
 *
 * The request named `blcn-hero-07.jpg` and `blcn-hero-10.jpg`; neither exists.
 * The hero files on disk are `blcn-hero-1` … `-4` (single digit, four of them)
 * and only the gallery is zero-padded to two, so 07 and 10 can only have meant
 * `blcn-gallery-07` / `-10`, which is what they resolve to here.
 *
 * `position` keeps each subject's face inside the crop — a full-bleed hero on
 * a phone shows barely a third of a 1.33 frame's width, so `object-center` is
 * not a safe default here. Each value is read off the subject in the frame.
 *
 * ⚠️ Unlike the homepage's slides these carry real `alt` text and are exposed
 * to screen readers: the homepage photographs are decoration behind a heading
 * that already names the Pastor, whereas these ARE what this page is about.
 * `HeroSlideshow` announces only whichever one is on screen. As everywhere
 * else in this folder, the captions name nobody and date nothing — see the
 * note on GALLERY below.
 */
const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/blcn/blcn-gallery-08.jpg",
    position: "object-[46%_30%]",
    alt: "Preaching with the nations backdrop behind, at a BLCN service",
  },
  {
    src: "/images/blcn/blcn-hero-4.jpg",
    position: "object-[48%_38%]",
    alt: "A woman singing in worship at a BLCN gathering",
  },
  {
    src: "/images/blcn/blcn-gallery-07.jpg",
    position: "object-[40%_34%]",
    alt: "Members of the BLCN congregation standing together during a service",
  },
  {
    src: "/images/blcn/blcn-gallery-10.jpg",
    position: "object-[50%_36%]",
    alt: "The BLCN church family, young and old, photographed together after a service",
  },
];

/**
 * The rest of the client's photographs.
 *
 * ⚠️ Alt text describes what is visible and nothing more. Nobody in these
 * frames has been identified to us, so none of them names a person, and none
 * attaches a date or an event — the Content Integrity Notes rule out inventing
 * either, and a caption is exactly where that would slip in. If the client
 * later tells us who or what these are, the captions can say so.
 *
 * `width`/`height` are the real encoded sizes, so the lightbox lays each one
 * out without guessing at its orientation.
 */
const GALLERY: GalleryImage[] = [
  { src: "/images/blcn/blcn-gallery-01.jpg", width: 1800, height: 1192, alt: "A minister praying over a member of the congregation at a BLCN gathering" },
  { src: "/images/blcn/blcn-gallery-02.jpg", width: 1800, height: 1355, alt: "Ministering to a young member of the congregation on stage at BLCN" },
  { src: "/images/blcn/blcn-gallery-03.jpg", width: 1800, height: 1355, alt: "A moment of ministry on stage at BLCN, the nations backdrop behind" },
  { src: "/images/blcn/blcn-gallery-04.jpg", width: 1355, height: 1800, alt: "Hands raised in worship as the congregation faces the stage at BLCN" },
  { src: "/images/blcn/blcn-gallery-05.jpg", width: 1800, height: 1355, alt: "The congregation at prayer, seen from the back of the hall at BLCN" },
  { src: "/images/blcn/blcn-gallery-06.jpg", width: 1355, height: 1800, alt: "Praying with a member of the church at a BLCN service" },
  { src: "/images/blcn/blcn-gallery-07.jpg", width: 1800, height: 1355, alt: "Members of the BLCN family gathered at the front of the church" },
  { src: "/images/blcn/blcn-gallery-08.jpg", width: 1800, height: 1355, alt: "Preaching with the nations backdrop behind, at a BLCN service" },
  { src: "/images/blcn/blcn-gallery-09.jpg", width: 1800, height: 1355, alt: "Families of the BLCN congregation gathered for a photograph after service" },
  { src: "/images/blcn/blcn-gallery-10.jpg", width: 1800, height: 1355, alt: "The BLCN church family, young and old, photographed together after a service" },
  { src: "/images/blcn/blcn-gallery-11.jpg", width: 1800, height: 1355, alt: "Ministering the Word at a BLCN gathering" },
  { src: "/images/blcn/blcn-gallery-12.jpg", width: 1800, height: 1355, alt: "Teaching from the lectern at a BLCN service" },
  { src: "/images/blcn/blcn-gallery-13.jpg", width: 1800, height: 1355, alt: "A member of the congregation holding his Bible during a BLCN service" },
  { src: "/images/blcn/blcn-gallery-14.jpg", width: 1355, height: 1800, alt: "Preaching to the congregation at an evening BLCN service" },
  { src: "/images/blcn/blcn-gallery-15.jpg", width: 1355, height: 1800, alt: "The congregation listening as the Word is preached at BLCN" },
  { src: "/images/blcn/blcn-gallery-16.jpg", width: 1355, height: 1800, alt: "Teaching from a whiteboard during a BLCN session" },
  { src: "/images/blcn/blcn-gallery-17.jpg", width: 1355, height: 1800, alt: "Teaching the Word at a BLCN gathering" },
  { src: "/images/blcn/blcn-gallery-18.jpg", width: 1800, height: 1355, alt: "The BLCN family photographed together outside after a service" },
  { src: "/images/blcn/blcn-gallery-19.jpg", width: 1355, height: 1800, alt: "Members of the BLCN family after a Sunday service" },
];

export default function BLCNPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Real photographs of the congregation, crossfading — the same
            component the homepage hero uses, so the deferred mount of slides
            2-4 and the 44px dot targets come with it. Both scrims are the
            slideshow's own. See HERO_SLIDES for why the blurred emblem this
            replaced is gone.

            ⚠️ The fast pace is THIS page only, which is why it is passed here
            rather than changed in the component: `HeroSlideshow` is shared
            with the homepage, whose hero is left at the 6s default.

            ⚠️ `fadeMs` is not free to leave at its 1000ms default alongside a
            980ms interval — the fade would outlast the slide it belongs to and
            every image would start appearing before the last had gone, so the
            stack would never settle on one photograph. 420ms holds each frame
            clear for ~560ms and then moves, which reads as quick rather than
            as a blur. */}
        <HeroSlideshow slides={HERO_SLIDES} intervalMs={980} fadeMs={420} />
        {/* The shared hero glow, over the slideshow's scrims so it tints rather
            than being washed out by them. No particles — the dot field is kept
            to the homepage, /events and /ministry. */}
        <HeroAtmosphere />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <div className="relative mx-auto mb-10 h-40 w-40 sm:h-48 sm:w-48">
              {/* Soft glow — the logo's own backdrop is near-black, so it needs
                  separation from the dark hero behind it */}
              <div
                aria-hidden
                className="absolute -inset-10 bg-[radial-gradient(circle,rgba(235,100,52,0.40),transparent_70%)] blur-2xl"
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
              <span className="hero-shimmer">
                Bethel Livingstone Christian Network
              </span>
            </h1>
            <p className="mt-5 font-serif text-2xl font-bold tracking-[0.3em] text-brand-orange sm:text-3xl">
              BLCN
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-brand-orange" />
            <p className="mx-auto mb-10 mt-8 max-w-lg font-sans text-lg leading-relaxed text-white/60 sm:text-xl">
              Raising Believers, Transforming Nigeria
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Join Us
            </Button>
          </AnimateIn>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-navy to-transparent" />
      </section>

      {/* ── 2. Church Order — vision, mission & values ── */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
            <div className="mb-10 h-0.5 w-16 bg-brand-orange" />

            <div className="space-y-8">
              {FOUNDATION.map((item) => (
                <div key={item.title}>
                  <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-brand-orange-light">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                    {item.desc}
                  </p>
                </div>
              ))}

              <div>
                <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-brand-orange-light">
                  Values
                </h3>
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-base text-white/70 sm:text-lg">
                  {VALUES.map((value, i) => (
                    <li key={value} className="flex items-center gap-x-3">
                      {i > 0 && (
                        <span aria-hidden className="text-brand-orange-light">
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
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* The church's own emblem, not a stock photograph — a generic photo
              captioned "BLCN church gathering" reads as a photo of BLCN. The
              same white mat + shadow the church-order card uses above, so the
              emblem's near-black ground has an edge against the light section.
              Swap in a real photo of the congregation when one arrives. */}
          <AnimateIn direction="left">
            <div className="mx-auto aspect-square w-full max-w-lg bg-gradient-to-br from-white to-brand-tint p-6 shadow-xl ring-1 ring-brand-blue/10 sm:p-10">
              <div className="relative h-full w-full">
                <Image
                  src="/images/blcn-logo.jpg"
                  alt="Bethel Livingstone Christian Network logo"
                  fill
                  sizes="(min-width: 1024px) 512px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">About BLCN</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
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

      {/* ── 5. Services ── */}
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
      <section className="bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
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
                  className="group flex h-full flex-col items-center justify-center border border-white/10 bg-white/[0.07] p-8 text-center transition-colors hover:border-white/30"
                >
                  <social.Icon size={28} />
                  <span className="mt-4 font-serif text-base font-bold leading-tight text-white transition-colors group-hover:text-brand-orange-light">
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

      {/* ── 7. Gallery ──
          Placed here rather than up against "About BLCN" for rhythm: the page
          runs mid → light → mid → light → mid, and a gallery section directly
          after About would have put two light bands together with no seam
          between them. This slot sits between the mid-blue "Follow BLCN" and
          the dark "Network Vision", so it keeps the alternation intact and
          lands the pictures just before the closing pair. */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="light">Gallery</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              BLCN in Pictures
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              Moments from the Bethel Livingstone Christian Network family.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mt-16">
            <ImageGallery images={GALLERY} />
          </div>
        </div>
      </section>

      {/* ── 8. Network Vision ── */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
                <div className="h-full border-t-2 border-brand-orange bg-white/[0.07] px-8 py-8 text-center">
                  <p className="font-serif text-xl font-bold leading-tight text-brand-orange-light">
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

      {/* ── 9. CTA ── */}
      <section className="border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Be Part of the Family
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            BLCN is a family in Ado Ekiti. Come as you are — there is a place
            here for you.
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
