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

/**
 * BLCN's one named leader, rendered as a dedicated Leadership section matching
 * BHCC's (section 4 below).
 *
 * ⚠️ This was a small credit line inside "About BLCN" until 12 September 2026,
 * on the reasoning that a card built for a single person reads as a section
 * waiting to be filled. The client asked for the dedicated section instead, so
 * that reasoning is superseded — don't reinstate the credit line. See the note
 * on `leadership` in lib/constants.ts for why Pastor Awe is not listed here too.
 */
const BLCN_LEAD = BLCN?.leadership?.[0];
/**
 * "Toluwalope Fash" → "TF". Only reached if a leader has no portrait; BLCN's
 * does, so this is the same defensive fallback the BHCC grid uses rather than
 * something this page renders today. Duplicated from /churches/bhcc rather
 * than shared: two call sites, eight lines, and no lib module exists for it.
 */
function initialsOf(name: string) {
  return name
    .split(/[s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}


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
 * ⚠️ This set is client-chosen and was cut from four slides to three on
 * 12 September 2026, when the client removed seven gallery frames and
 * `blcn-hero-2.jpg` from the folder. All three are phone photographs from the
 * gallery set, capped at 1800px on the long edge rather than 2560 — so they
 * upscale roughly 1.4x at a desktop full-bleed width. That is affordable here
 * for the same reason `apostle-key.jpg` records in CLAUDE.md and for no other:
 * the slideshow's own two scrims (`bg-black/60` plus the navy wash) have
 * already taken the fine detail out before anyone sees it. Don't reuse these
 * anywhere they would render unscrimmed.
 *
 * ⚠️ No professionally-shot frame is in the hero any more. `blcn-hero-1`, `-3`
 * and `-4` survive on disk as the Nikon set but nothing renders them now that
 * `-4` has left this array. They are the first place to look if a sharper hero
 * is ever wanted.
 *
 * ⚠️ All three slides are group photographs, where the previous set opened on
 * a preaching frame. A congregation lined up for the camera reads differently
 * from a service in progress — that is the client's call, noted here only so
 * it is not "corrected" back later.
 *
 * `position` keeps each subject's face inside the crop — a full-bleed hero on
 * a phone shows barely a third of a 1.33 frame's width, so `object-center` is
 * not a safe default here. ⚠️ These values do NOT travel with a file: `-09`
 * and `-18` are new to the hero and were measured by simulating the
 * `object-cover` crop at both 1280x800 and 390x844 before being set. `-07`
 * keeps the value it was already measured at for this same hero.
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
    src: "/images/blcn/blcn-gallery-07.jpg",
    position: "object-[40%_34%]",
    alt: "Members of the BLCN congregation standing together during a service",
  },
  {
    src: "/images/blcn/blcn-gallery-09.jpg",
    position: "object-[50%_36%]",
    alt: "Families of the BLCN congregation gathered for a photograph after service",
  },
  {
    src: "/images/blcn/blcn-gallery-18.jpg",
    position: "object-[45%_32%]",
    alt: "The BLCN family photographed together outside after a service",
  },
];

/**
 * The rest of the client's photographs.
 *
 * ⚠️ The numbering has GAPS (05, 07-11, 14-19) and they are deliberate. The
 * client removed seven frames on 12 September 2026; the survivors keep the
 * filenames they were given rather than being renumbered to close up, because
 * those numbers are how the client refers to individual pictures ("rework the
 * hero to 07, 09, 18"). Renumbering would silently repoint every one of those
 * references at a different photograph. A missing number here means a deleted
 * file, not a bug.
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
  { src: "/images/blcn/blcn-gallery-05.jpg", width: 1800, height: 1355, alt: "The congregation at prayer, seen from the back of the hall at BLCN" },
  { src: "/images/blcn/blcn-gallery-07.jpg", width: 1800, height: 1355, alt: "Members of the BLCN family gathered at the front of the church" },
  { src: "/images/blcn/blcn-gallery-08.jpg", width: 1800, height: 1355, alt: "Preaching with the nations backdrop behind, at a BLCN service" },
  { src: "/images/blcn/blcn-gallery-09.jpg", width: 1800, height: 1355, alt: "Families of the BLCN congregation gathered for a photograph after service" },
  { src: "/images/blcn/blcn-gallery-10.jpg", width: 1800, height: 1355, alt: "The BLCN church family, young and old, photographed together after a service" },
  { src: "/images/blcn/blcn-gallery-11.jpg", width: 1800, height: 1355, alt: "Ministering the Word at a BLCN gathering" },
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
            {/* `photo`, not `dark`: this label sits on a photograph, where the
                dark tone measured 3.09:1. See SectionLabel. */}
            <SectionLabel tone="photo">Nigeria</SectionLabel>
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

      {/* ── 4. Leadership ──
          A dedicated section, matching BHCC's, rather than the credit line
          this used to be inside "About BLCN".

          ⚠️ It is DARK where BHCC's Leadership is light, and that is forced by
          the page, not a preference. This page alternates mid → light → mid →
          light the whole way down, so any section inserted between the light
          "About" and the mid "Beliefs" must take a third treatment or it
          stacks against one of its neighbours with no seam. Dark is that third
          treatment; the card idiom below is the site's standard dark-section
          card (`bg-white/[0.07]` + an orange top rule), not a recolour of
          BHCC's cream one. ⚠️ Beliefs directly below gained
          `border-t-2 border-brand-orange` to seam dark-against-mid — don't
          remove it while this section sits above it.

          ⚠️ The role sits on `brand-orange-light`, where BHCC's is
          `brand-orange-deep`. That is the light/dark accent split, not an
          inconsistency: the deep tone is a light-section colour and the brand
          orange is 3.3:1 on white, far under AA for a 12px uppercase label.

          One leader, so the card is a single centred column rather than a
          grid — see the note on `leadership` in lib/constants.ts for why
          Pastor Awe is not listed beside him. ⚠️ If a second leader is ever
          added, this needs to become a grid; `max-w-sm` on one card is what
          keeps a lone portrait from running the full width. */}
      {BLCN_LEAD && (
        <section className="bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
          <div className="mx-auto max-w-7xl text-center">
            <AnimateIn direction="up" className="mx-auto max-w-3xl">
              <SectionLabel tone="dark">Leadership</SectionLabel>
              <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Meet the Pastor
              </h2>
              <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1} className="mx-auto mt-16 max-w-sm">
              <div className="group flex h-full flex-col border-t-2 border-brand-orange bg-white/[0.07]">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  {BLCN_LEAD.image ? (
                    <Image
                      src={BLCN_LEAD.image}
                      alt={BLCN_LEAD.name}
                      fill
                      sizes="(min-width: 640px) 384px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    /* Same contract as BHCC's grid: initials stand in rather
                       than a stock-photo stranger. */
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy">
                      <span
                        aria-hidden
                        className="font-serif text-5xl font-bold leading-none tracking-tight text-white/90"
                      >
                        {initialsOf(BLCN_LEAD.name)}
                      </span>
                      <span className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                        Photo coming soon
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-lg font-bold leading-tight text-white">
                    {BLCN_LEAD.name}
                  </h3>
                  <p className="mt-2 font-sans text-xs uppercase tracking-widest text-brand-orange-light">
                    {BLCN_LEAD.role}
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ── 5. Beliefs ──
          ⚠️ The orange top rule seams this against the dark Leadership band
          above it — blue on blue has no edge of its own. See the note on
          section 4. */}
      <section className="border-t-2 border-brand-orange bg-gradient-to-r from-brand-blue to-brand-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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

      {/* ── 6. Services ── */}
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

      {/* ── 7. Follow BLCN ── */}
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

      {/* ── 8. Gallery ──
          Placed here rather than up against "About BLCN" for rhythm: a gallery
          section directly after About would have put two light bands together
          with no seam between them. This slot sits between the mid-blue
          "Follow BLCN" and the dark "Network Vision", so it keeps the
          alternation intact and lands the pictures just before the closing
          pair.

          ⚠️ Seven of the nineteen frames were removed by the client on
          12 September 2026, leaving twelve. The grid is `lg:grid-cols-4`, so
          twelve fills three full rows exactly — if this count changes again,
          check the last row isn't left with a single orphan tile. */}
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

      {/* ── 9. Network Vision ── */}
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

      {/* ── 10. CTA ── */}
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
