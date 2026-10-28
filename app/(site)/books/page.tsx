import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import BookBuyButtons from "@/components/BookBuyButtons";
import BookDescription from "@/components/BookDescription";
import SectionLabel from "@/components/SectionLabel";
import SectionPhoto from "@/components/SectionPhoto";
import { SOCIALS } from "@/lib/constants";
import { BOOKS, bookHref, coverAlt } from "@/lib/books";

export const metadata: Metadata = {
  title: "Books & Publications — Ayodele Oladapo Awe Ministries",
  description:
    "Books by Ayodele Oladapo Awe — Thriving in the Midst of Famine: Biblical Keys to Flourishing in Difficult Times, and Walking with the Holy Spirit: Insights for Supernatural Living. Available on Selar and Amazon.",
};

/* The books themselves live in lib/books.ts, shared with the per-book
   landing pages at /books/[slug]. */

/** The hero backdrop. See the note at the `PageHero` call below. */
const HERO_BOOK =
  BOOKS.find((book) => book.slug === "walking-with-the-holy-spirit") ?? BOOKS[0];

export default function BooksPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      {/* Standard `PageHero`, with a book cover as its background image.
          ⚠️ Pinned to the published book by name, NOT `BOOKS[0]`. The array is
          ordered newest-first, so an index here would have quietly swapped the
          hero to the new cover the moment a second book was added. The
          published cover is also the sharper source: the "Thriving" cover is a
          crop out of a 3D render (see CLAUDE.md). Change this deliberately if
          the new book should front the page. */}
      <PageHero
        label="Resources"
        title={<>Books &amp; Publications</>}
        subtitle="Written to equip, strengthen, and build the believer"
        backgroundImage={HERO_BOOK.cover}
      />

      {/* ── 2. The Books ── */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
            <SectionLabel tone="light">The Library</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              Books &amp; Publications
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              Written resources from Pastor Ayodele Oladapo Awe — order your
              copy and let the Word take root.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <div className="mt-16 space-y-16">
            {BOOKS.map((book) => (
              <div
                key={book.slug}
                className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 sm:grid-cols-2"
              >
                <AnimateIn direction="left">
                  {/* The cover and the title both link to the book's landing
                      page. The card itself is NOT a link: it holds Buttons,
                      which render anchors, and nested anchors are invalid. */}
                  <Link
                    href={bookHref(book)}
                    className="group mx-auto block aspect-[2/3] w-full max-w-xs overflow-hidden rounded-none shadow-xl"
                  >
                    <Image
                      src={book.cover}
                      alt={coverAlt(book)}
                      width={book.coverWidth}
                      height={book.coverHeight}
                      sizes="(min-width: 640px) 320px, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                </AnimateIn>

                <AnimateIn direction="right">
                  {/* `brand-orange-deep` on the tint is 4.7:1 — the brand
                      orange would be 3.3:1 and fail AA at this size. */}
                  <p className="mb-3 inline-flex items-center gap-2 border border-brand-orange-deep/30 bg-white px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-orange-deep">
                    Available now
                  </p>
                  <h3 className="mb-3 font-serif text-2xl font-bold leading-tight text-brand-blue sm:text-3xl">
                    <Link
                      href={bookHref(book)}
                      className="transition-colors hover:text-brand-orange-deep"
                    >
                      {book.title}
                    </Link>
                  </h3>
                  <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-deep">
                    {book.subtitle}
                  </p>
                  <BookDescription
                    blocks={book.description.slice(0, book.excerpt)}
                    className="mb-8 space-y-4"
                  />
                  <BookBuyButtons
                    selar={book.selar}
                    amazon={book.amazon}
                    tone="light"
                  />
                  <Button
                    href={bookHref(book)}
                    variant="outline"
                    className="mt-3 w-full text-brand-orange-deep sm:w-auto"
                  >
                    Read more
                  </Button>
                </AnimateIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Newsletter ── */}
      <section className="bg-gradient-to-b from-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
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
      <section className="relative isolate overflow-hidden border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <SectionPhoto src="/images/apostle-key.jpg" position="object-[50%_22%]" />
        <AnimateIn direction="up" className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Go Deeper in the Word
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Access teachings, sermons, and messages on our Telegram channel.
          </p>
          <Button href={SOCIALS.telegram} variant="secondary" size="lg" external>
            Join Telegram
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
