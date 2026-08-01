import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import BirthdayConfetti from "@/components/BirthdayConfetti";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import BirthdayTestimonyForm from "@/components/BirthdayTestimonyForm";
import {
  GiveButton,
  GivingProvider,
  type GivingAccount,
} from "@/components/BirthdayGiving";
import { SharePage } from "@/components/CopyToClipboard";
import { BIRTHDAY, BIRTHDAY_DATE_SHORT } from "@/lib/birthday";
import { MINISTER_NAME } from "@/lib/constants";

/**
 * The birthday page — a standalone, one-off experience.
 *
 * ⚠️ It is NOT part of the main site. The main site has not launched; this
 * link is the only thing being shared. So the page sits outside the `(site)`
 * route group and renders with no Navbar, no Footer and **no link to any
 * other route** — the ministry lockup at the top of the hero is a brand mark,
 * deliberately not an anchor. The only navigation is the two on-page hash
 * jumps below. See app/birthday/layout.tsx and CLAUDE.md.
 *
 * ⚠️ It also has its own palette — white primary, deep blue secondary, orange
 * accent — carried by the `bday-*` tokens in globals.css. None of the site's
 * blue/wine classes appear here. Section rhythm alternates dark → dark →
 * light → light, so white carries the two longest sections.
 *
 * ⚠️ There is no giving section. Account details used to be a fifth section
 * sitting in plain view between the testimony form and the close; they now live
 * in a modal (components/BirthdayGiving.tsx) reachable only from the testimony
 * form's success state and one quiet link in the closing section. The page asks
 * for a testimony first and offers a way to give second — putting bank details
 * back on the page inverts that. Don't.
 *
 * British English throughout ("honour"), matching the ministry's UK base.
 */

const SHARE_DESCRIPTION =
  "Join us in celebrating Pastor Ayodele's birthday — share a testimony and honour God's servant";

export const metadata: Metadata = {
  title: "Celebrating Pastor Ayodele Oladapo Awe 🎉",
  description: SHARE_DESCRIPTION,
  openGraph: {
    type: "website",
    title: "Celebrating Pastor Ayodele Oladapo Awe 🎉",
    description: SHARE_DESCRIPTION,
    images: [
      {
        // 640×640. Square previews render fine on WhatsApp, which is where this
        // link will mostly travel; there is no 1200×630 crop of him to use.
        url: "/images/apostle-portrait.jpg",
        width: 640,
        height: 640,
        alt: "Pastor Ayodele Oladapo Awe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebrating Pastor Ayodele Oladapo Awe 🎉",
    description: SHARE_DESCRIPTION,
    images: ["/images/apostle-portrait.jpg"],
  },
};

/**
 * Real account details, client-supplied 1 August 2026. Nothing else reads this
 * array and no CMS is involved — to change an account, edit the string here.
 * It is handed to `GivingProvider`, which renders it inside the modal; nothing
 * on the page itself shows it.
 *
 * ⚠️ The two account NAMES differ on purpose: "Ayodele Awe" on the UK account,
 * "Ayodele Oladapo Awe" on the Nigerian one. That is how each bank holds them.
 * A transfer can be rejected when the name does not match the bank's record, so
 * do not "tidy" them into one form.
 *
 * ⚠️ `value` is what the Copy button puts on the clipboard, character for
 * character — it is the same string that renders. The sort code keeps its
 * hyphens because that is the form people check against their banking app; UK
 * banks accept it with or without them.
 *
 * ⚠️ `flag` is an ISO country code, not the 🇬🇧/🇳🇬 emoji it replaced — those
 * have no glyph on Windows desktop browsers and rendered as "GB"/"NG" or an
 * empty box. See components/icons/FlagIcons.tsx.
 *
 * `mono` sets `tabular-nums` so digits line up. Use it for numbers only.
 */
const GIVING: GivingAccount[] = [
  {
    flag: "GB",
    region: "United Kingdom",
    fields: [
      { label: "Bank Name", value: "HSBC Bank", mono: false },
      { label: "Account Name", value: "Ayodele Awe", mono: false },
      { label: "Account Number", value: "24572580", mono: true },
      { label: "Sort Code", value: "40-34-18", mono: true },
    ],
  },
  {
    flag: "NG",
    region: "Nigeria",
    fields: [
      { label: "Bank Name", value: "Access Bank", mono: false },
      { label: "Account Name", value: "Ayodele Oladapo Awe", mono: false },
      { label: "Account Number", value: "1602532494", mono: true },
    ],
  },
];

export default function BirthdayPage() {
  return (
    /* The provider owns the giving modal and renders it as a sibling of the
       page, outside every `AnimateIn` — see the note in BirthdayGiving.tsx for
       why that placement is not optional. */
    <GivingProvider accounts={GIVING}>
      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      {/* `min-h-[100svh]`, not `min-h-screen`: `vh` on mobile Safari is the
          viewport *without* browser chrome, so a full-height hero is clipped
          top and bottom until the address bar collapses. */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-br from-bday-navy via-bday-blue to-bday-navy px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-16">
        {/* Soft radial glows — orange behind the copy, blue behind the
            portrait — so the gradient does not read as a flat wash. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(235,100,52,0.30),transparent_58%),radial-gradient(circle_at_78%_22%,rgba(2,74,143,0.65),transparent_60%)]"
        />
        <BirthdayConfetti />

        {/* The ministry lockup — links to `/birthday`, i.e. back to the top of
            this page. ⚠️ It must NEVER point at `/`: the page still offers no
            route to the rest of the site, which has not launched. This is a
            back-to-top affordance only. White on transparent, so it only ever
            sits on a dark section. */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl shrink-0 justify-center lg:justify-start">
          <Link href="/birthday" aria-label="Back to top">
            <Image
              src="/images/awe-min-logo.png"
              alt="Ayodele Awe Ministries"
              width={1200}
              height={662}
              priority
              className="h-11 w-auto sm:h-14"
            />
          </Link>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center py-10 sm:py-14">
          <div className="grid w-full grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Portrait medallion. ⚠️ Circular on purpose — the site's image
                containers are otherwise sharp-cornered, but a celebratory
                portrait under a glow ring is the one place that rule is set
                aside. See CLAUDE.md.

                ⚠️ `order-first lg:order-last`: the h1 stays first in the DOM
                (it is the page's heading, and the preview crawlers read it),
                but on a phone the medallion should lead — it is what makes the
                page read as a celebration in the first screenful. */}
            <AnimateIn
              direction="right"
              className="order-first flex justify-center lg:order-last"
            >
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(235,100,52,0.40),transparent_70%)] blur-2xl sm:-inset-8"
                />
                <div className="relative h-56 w-56 overflow-hidden rounded-full ring-4 ring-bday-orange/40 ring-offset-4 ring-offset-transparent sm:h-72 sm:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
                  <Image
                    src="/images/apostle-portrait.jpg"
                    alt={`Pastor ${MINISTER_NAME}`}
                    fill
                    priority
                    sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 640px) 288px, 224px"
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="left" className="text-center lg:text-left">
              <SectionLabel tone="bdayDark">{BIRTHDAY.fullDate}</SectionLabel>
              {/* The name runs to 26 characters, so the base step is 40px, not
                  48px — at 48px "Celebrating" alone fills a 375px line. */}
              <h1 className="mb-6 text-balance font-serif text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Celebrating{" "}
                <span className="shimmer-text">Pastor {MINISTER_NAME}</span>
              </h1>
              <div className="mx-auto mb-8 h-0.5 w-16 bg-bday-orange lg:mx-0" />
              <p className="mx-auto mb-10 max-w-xl text-balance font-sans text-lg leading-relaxed text-white/75 sm:text-xl lg:mx-0">
                A Life of Revival, Discipleship, and Pointing Others to Christ
              </p>
              {/* ⚠️ One CTA, and it is the testimony. There was a second
                  button here pointing at `#give`; it went with the giving
                  section. Giving is now offered after a testimony has been
                  shared, and quietly in the closing section — putting it back
                  in the hero would make it the first thing the page asks for,
                  which is the opposite of the intent. */}
              <div className="mx-auto flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
                <Button
                  href="#testimony"
                  variant="birthday"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Share your testimony
                </Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 2. Countdown ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bday-navy via-bday-blue to-bday-navy px-4 py-20 sm:px-6 sm:py-28 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(235,100,52,0.28),transparent_62%)]"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <SectionLabel tone="bdayDark">{BIRTHDAY_DATE_SHORT}</SectionLabel>
            <h2 className="mb-6 text-balance font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Counting Down to His Special Day
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-bday-orange" />
          </AnimateIn>

          <AnimateIn direction="fade">
            <BirthdayCountdown />
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Testimonies ────────────────────────────────────────────────── */}
      <section
        id="testimony"
        className="bg-gradient-to-b from-white to-[#F1F5FA] px-4 py-20 sm:px-6 sm:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-3xl">
          <AnimateIn direction="up" className="mb-10 text-center sm:mb-12">
            <SectionLabel tone="bdayLight">Testimonies</SectionLabel>
            <h2 className="mb-6 text-balance font-serif text-3xl font-bold leading-tight text-bday-blue sm:text-4xl md:text-5xl">
              Share How He&rsquo;s Blessed Your Life
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-bday-ink sm:text-lg">
              Your words are a gift — share a testimony, a memory, or a word of
              appreciation for Pastor Ayodele&rsquo;s life and ministry.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-bday-orange" />
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1}>
            <BirthdayTestimonyForm />
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Closing ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F1F5FA] to-white px-4 py-20 sm:px-6 sm:py-28 lg:px-16">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-serif text-[140px] leading-none text-bday-blue/[0.06] sm:text-[200px]"
        >
          &ldquo;
        </span>

        <AnimateIn direction="fade" className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionLabel tone="bdayLight">With Thanksgiving</SectionLabel>
          <h2 className="mb-6 text-balance font-serif text-3xl font-bold leading-tight text-bday-blue sm:text-4xl md:text-5xl">
            Happy Birthday, Pastor Ayodele
          </h2>
          <p className="mx-auto mb-10 max-w-2xl font-sans text-base leading-relaxed text-bday-ink sm:text-lg">
            From Norwich to Ado Ekiti and far beyond, we thank God for a life
            given to revival, to discipleship, and to pointing people to Christ.
            May the years ahead be fuller still.
          </p>

          <div className="mx-auto mb-12 max-w-2xl border-t-2 border-bday-orange bg-white p-6 shadow-sm sm:p-8">
            <p className="text-balance font-serif text-lg font-bold italic leading-relaxed text-bday-blue sm:text-xl">
              &ldquo;Remember those who rule over you, who have spoken the word
              of God to you, whose faith follow, considering the outcome of
              their conduct.&rdquo;
            </p>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-bday-orange-deep">
              Hebrews 13:7
            </p>
          </div>

          {/* The second, quieter way into the giving modal — for anyone who
              wants to give without writing a testimony first. Deliberately an
              `outline` button and one size down from the share CTA below it:
              the page's ask is the testimony, this is an aside.
              ⚠️ `bday-orange-deep` (5.1:1 on white), never the brand
              `bday-orange` — that is 3.3:1 and fails AA at this size. */}
          <div className="mx-auto mb-14 max-w-md">
            <p className="mb-5 font-sans text-base leading-relaxed text-bday-ink">
              You may also honour him with a birthday gift of appreciation.
            </p>
            <GiveButton
              variant="outline"
              size="default"
              className="w-full text-bday-orange-deep hover:bg-bday-orange-deep/5 sm:w-auto"
            >
              Give to Pastor Ayodele
            </GiveButton>
          </div>

          <p className="mb-6 font-sans text-base font-semibold text-bday-blue">
            Know someone who should celebrate with us?
          </p>
          <SharePage />
        </AnimateIn>
      </section>
    </GivingProvider>
  );
}
