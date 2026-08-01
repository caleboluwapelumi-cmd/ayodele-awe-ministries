import type { Metadata } from "next";
import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import BirthdayConfetti from "@/components/BirthdayConfetti";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import BirthdayTestimonyForm from "@/components/BirthdayTestimonyForm";
import { CopyField, SharePage } from "@/components/CopyToClipboard";
import { BIRTHDAY, BIRTHDAY_DATE_SHORT } from "@/lib/birthday";
import { MINISTER_NAME } from "@/lib/constants";

/**
 * The birthday page — a one-off, deliberately the most dramatic page on the
 * site. It is NOT in the Navbar: it is shared by direct link and is expected to
 * fall out of use after the day itself. See CLAUDE.md → "The birthday page".
 *
 * British English throughout ("honour"), matching the ministry's UK base.
 */

export const metadata: Metadata = {
  title: "Celebrating Pastor Ayodele Oladapo Awe 🎉",
  description:
    "Join us in celebrating Pastor Ayodele's birthday — share a testimony and sow a seed of honour",
  openGraph: {
    type: "website",
    title: "Celebrating Pastor Ayodele Oladapo Awe 🎉",
    description:
      "Join us in celebrating Pastor Ayodele's birthday — share a testimony and sow a seed of honour",
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
    description:
      "Join us in celebrating Pastor Ayodele's birthday — share a testimony and sow a seed of honour",
    images: ["/images/apostle-portrait.jpg"],
  },
};

/**
 * Real account details, client-supplied 1 August 2026. Nothing else reads this
 * array and no CMS is involved — to change an account, edit the string here.
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
 * `mono` sets `tabular-nums` so digits line up. Use it for numbers only.
 */
const GIVING = [
  {
    flag: "🇬🇧",
    region: "United Kingdom",
    fields: [
      { label: "Bank Name", value: "HSBC Bank", mono: false },
      { label: "Account Name", value: "Ayodele Awe", mono: false },
      { label: "Account Number", value: "24572580", mono: true },
      { label: "Sort Code", value: "40-34-18", mono: true },
    ],
  },
  {
    flag: "🇳🇬",
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
    <>
      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-wine-deep via-blue-navy to-blue-deep px-4 py-24 sm:px-6 lg:px-16">
        {/* Soft radial glows — wine behind the copy, blue-sky behind the
            portrait — so the gradient does not read as a flat wash. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(139,35,70,0.45),transparent_55%),radial-gradient(circle_at_78%_60%,rgba(74,144,217,0.35),transparent_55%)]"
        />
        <BirthdayConfetti />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <SectionLabel tone="dark">{BIRTHDAY.fullDate}</SectionLabel>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl md:text-8xl">
              Celebrating{" "}
              <span className="shimmer-text">Pastor {MINISTER_NAME}</span>
            </h1>
            <div className="mb-8 h-0.5 w-16 bg-blue-sky" />
            <p className="mb-10 max-w-xl font-sans text-lg leading-relaxed text-white/70 sm:text-xl">
              A Life of Revival, Discipleship, and Pointing Others to Christ
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#testimony" variant="secondary" size="lg">
                Share your testimony
              </Button>
              <Button
                href="#honour"
                variant="outline"
                size="lg"
                className="text-white"
              >
                Sow a seed of honour
              </Button>
            </div>
          </AnimateIn>

          {/* Portrait medallion. ⚠️ Circular on purpose — the site's image
              containers are otherwise sharp-cornered, but a celebratory
              portrait under a glow ring is the one place that rule is set
              aside. See CLAUDE.md. */}
          <AnimateIn direction="right" className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(74,144,217,0.35),transparent_70%)] blur-2xl"
              />
              <div className="relative h-64 w-64 overflow-hidden rounded-full ring-4 ring-white/20 ring-offset-4 ring-offset-transparent sm:h-80 sm:w-80 md:h-96 md:w-96">
                <Image
                  src="/images/apostle-portrait.jpg"
                  alt={`Pastor ${MINISTER_NAME}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 384px, (min-width: 640px) 320px, 256px"
                  className="object-cover"
                />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 2. Countdown ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(107,21,48,0.5),transparent_60%)]"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto mb-16 max-w-3xl text-center">
            <SectionLabel tone="dark">{BIRTHDAY_DATE_SHORT}</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Counting Down to His Special Day
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <AnimateIn direction="fade">
            <BirthdayCountdown />
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Testimonies ────────────────────────────────────────────────── */}
      <section
        id="testimony"
        className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-3xl">
          <AnimateIn direction="up" className="mb-12 text-center">
            <SectionLabel tone="light">Testimonies</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Share How He&rsquo;s Blessed Your Life
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              Your words are a gift — share a testimony, a memory, or a word of
              appreciation for Pastor Ayodele&rsquo;s life and ministry.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1}>
            <BirthdayTestimonyForm />
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Giving ─────────────────────────────────────────────────────── */}
      <section
        id="honour"
        className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto mb-16 max-w-3xl text-center">
            <SectionLabel tone="dark">Giving</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Sow a Seed of Honour
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              As we celebrate his life, you may also sow a birthday seed of
              appreciation and honour.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {GIVING.map((account, i) => (
              <AnimateIn key={account.region} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col border-t-2 border-blue-sky bg-blue-navy/40 p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <span aria-hidden className="text-3xl leading-none">
                      {account.flag}
                    </span>
                    <h3 className="font-serif text-xl font-bold leading-tight text-white">
                      {account.region} Account
                    </h3>
                  </div>

                  <div className="flex-1">
                    {account.fields.map((f) => (
                      <CopyField
                        key={f.label}
                        label={f.label}
                        value={f.value}
                        mono={f.mono}
                      />
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn direction="up" className="mx-auto mt-16 max-w-2xl text-center">
            <p className="font-serif text-lg font-bold italic leading-relaxed text-white/80">
              &ldquo;Honour the Lord with your possessions, and with the
              firstfruits of all your increase.&rdquo;
            </p>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-blue-sky">
              Proverbs 3:9
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 5. Closing ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-serif text-[200px] leading-none text-white/5"
        >
          &ldquo;
        </span>

        <AnimateIn direction="fade" className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionLabel tone="onAccent">With Thanksgiving</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Happy Birthday, Pastor Ayodele
          </h2>
          <p className="mx-auto mb-10 max-w-2xl font-sans text-base leading-relaxed text-white/75 sm:text-lg">
            From Norwich to Ado Ekiti and far beyond, we thank God for a life
            given to revival, to discipleship, and to pointing people to Christ.
            May the years ahead be fuller still.
          </p>

          <p className="mx-auto mb-3 max-w-2xl font-serif text-lg font-bold italic leading-relaxed text-white sm:text-xl">
            &ldquo;Remember those who rule over you, who have spoken the word of
            God to you, whose faith follow, considering the outcome of their
            conduct.&rdquo;
          </p>
          <p className="mb-12 font-sans text-xs uppercase tracking-[0.2em] text-white/60">
            Hebrews 13:7
          </p>

          <p className="mb-6 font-sans text-base font-semibold text-white">
            Know someone who should celebrate with us?
          </p>
          <SharePage />
        </AnimateIn>
      </section>
    </>
  );
}
