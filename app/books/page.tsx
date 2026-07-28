import { Metadata } from "next";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import AmazonIcon from "@/components/icons/AmazonIcon";
import SelarIcon from "@/components/icons/SelarIcon";
import SectionLabel from "@/components/SectionLabel";
import { AMAZON_BOOK_URL, SELAR_BOOK_URL, SOCIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Books & Publications — Ayodele Oladapo Awe Ministries",
  description:
    "Walking with the Holy Spirit: Insights for Supernatural Living — a book by Ayodele Oladapo Awe for anyone seeking a deeper, more intimate relationship with God. Available on Selar and Amazon.",
};

// Title and subtitle are split so the heading stays at a readable size — the
// full title is recomposed where it needs to read as one string (alt text).
const BOOKS = [
  {
    title: "Walking with the Holy Spirit",
    subtitle: "Insights for Supernatural Living",
    description: [
      "Walking with the Holy Spirit: Insights for Supernatural Living is a book for anyone seeking a deeper and more intimate relationship with God. The personal experiences and biblical insights shared in the book compel readers to walk closely with the Holy Spirit and experience His presence in their daily lives.",
      "Walking with the Holy Spirit encourages readers to be sensitive to God's voice, yield to His promptings, and live a life empowered by prayer and intimacy with Him. Filled with deep revelations and personal stories, each chapter is designed to inspire and equip believers to walk confidently in their faith, and more importantly, understand the role of the Holy Spirit in their lives.",
    ],
    cover: "/images/walking-with-the-holy-spirit.jpeg",
    coverWidth: 800,
    coverHeight: 1135,
    selar: SELAR_BOOK_URL,
    amazon: AMAZON_BOOK_URL,
  },
];

/**
 * The hero features one title. With a second book the hero keeps carrying this
 * one and the new title appears in the section below — swap the index (or add
 * a `featured` flag) if that ever needs to change.
 */
const FEATURED = BOOKS[0];

export default function BooksPage() {
  return (
    <>
      {/* ── 1. Hero — the cover IS the hero ── */}
      {/* The one inner page that does not use `PageHero`: the cover is 800×1135
          portrait and `PageHero` crops its backdrop full-bleed, which at ~2:1
          would show a third of the artwork and slice the title lettering. Here
          it renders whole, beside the copy, with a blurred enlargement of
          itself as the backdrop (the BLCN logo-hero idiom) so the field carries
          the cover's own colour. Rhythm, type scale and the blue-sky rule are
          copied from `PageHero` so the page still reads as part of the set. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <Image
          src={FEATURED.cover}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-25 blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-navy/85 via-blue-deep/60 to-wine-deep/85" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateIn direction="left">
            <SectionLabel tone="dark">Books &amp; Publications</SectionLabel>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              {FEATURED.title}
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-blue-sky" />
            <p className="mt-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              {FEATURED.subtitle} — written to equip, strengthen, and build the
              believer.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={FEATURED.selar} variant="secondary" external>
                <SelarIcon size={20} />
                Buy on Selar
              </Button>
              <Button
                href={FEATURED.amazon}
                variant="outline"
                className="text-white"
                external
              >
                <AmazonIcon size={20} />
                Buy on Amazon
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            {/* No aspect box and no `object-cover` — the intrinsic 800×1135
                ratio renders the artwork uncropped, which is the whole point of
                giving it the hero. */}
            <Image
              src={FEATURED.cover}
              alt={`Cover of ${FEATURED.title}: ${FEATURED.subtitle} by Ayodele Oladapo Awe`}
              width={FEATURED.coverWidth}
              height={FEATURED.coverHeight}
              priority
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 80vw"
              className="mx-auto w-full max-w-[280px] shadow-2xl ring-1 ring-white/10 sm:max-w-sm lg:mx-0 lg:ml-auto lg:max-w-md"
            />
          </AnimateIn>
        </div>
      </section>

      {/* ── 2. The Books ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="light">Available Now</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Inside the Book
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              Written resources from Pastor Ayodele Oladapo Awe — order your
              copy on Selar or Amazon and let the Word take root.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          {/* The cover is not repeated here — it carries the hero above at full
              size, and a second rendition one scroll later reads as a mistake
              rather than as emphasis. */}
          <div className="mt-16 space-y-16">
            {BOOKS.map((book) => (
              <AnimateIn
                key={book.title}
                direction="up"
                className="mx-auto max-w-3xl border-t-2 border-blue-sky pt-10"
              >
                <h3 className="mb-3 font-serif text-2xl font-bold leading-tight text-blue-navy sm:text-3xl">
                  {book.title}
                </h3>
                <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-blue-sky">
                  {book.subtitle}
                </p>
                <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {book.description.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button href={book.selar} variant="primary" external>
                    <SelarIcon size={20} />
                    Buy on Selar
                  </Button>
                  <Button
                    href={book.amazon}
                    variant="outline"
                    className="text-blue-navy"
                    external
                  >
                    <AmazonIcon size={20} />
                    Buy on Amazon
                  </Button>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Newsletter ── */}
      <section className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">New Releases</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Be the First to Know
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Subscribe to get notified as soon as new titles are published.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Go Deeper in the Word
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Access teachings, sermons, and messages on our Telegram channel.
          </p>
          <Button href={SOCIALS.telegram} variant="wine" size="lg" external>
            Join Telegram
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
