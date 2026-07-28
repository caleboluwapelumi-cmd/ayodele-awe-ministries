import { Metadata } from "next";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import AmazonIcon from "@/components/icons/AmazonIcon";
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

export default function BooksPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      {/* Standard `PageHero`, with the book cover as its background image. */}
      <PageHero
        label="Resources"
        title={<>Books &amp; Publications</>}
        subtitle="Written to equip, strengthen, and build the believer"
        backgroundImage={BOOKS[0].cover}
      />

      {/* ── 2. The Books ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="light">Available Now</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Books &amp; Publications
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              Written resources from Pastor Ayodele Oladapo Awe — order your
              copy on Selar or Amazon and let the Word take root.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 space-y-16">
            {BOOKS.map((book) => (
              <div
                key={book.title}
                className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 sm:grid-cols-2"
              >
                <AnimateIn direction="left">
                  <div className="group mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-none shadow-xl">
                    <Image
                      src={book.cover}
                      alt={`Cover of ${book.title}: ${book.subtitle} by Ayodele Oladapo Awe`}
                      width={book.coverWidth}
                      height={book.coverHeight}
                      sizes="(min-width: 640px) 320px, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </AnimateIn>

                <AnimateIn direction="right">
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
                      {/* The all-white rendition, so the mark sits straight on
                          the blue pill with no plate behind it. Decorative:
                          the label beside it already says Selar. */}
                      <Image
                        src="/images/selar-wordmark-white.png"
                        alt=""
                        aria-hidden
                        width={138}
                        height={73}
                        className="h-4 w-auto"
                      />
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
              </div>
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
