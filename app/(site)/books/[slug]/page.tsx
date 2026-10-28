import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import BookBuyButtons from "@/components/BookBuyButtons";
import BookDescription from "@/components/BookDescription";
import HeroAtmosphere from "@/components/HeroAtmosphere";
import SectionLabel from "@/components/SectionLabel";
import { BOOKS, coverAlt, getBook } from "@/lib/books";

/**
 * One landing page per book, at /books/<slug>. Every word on it comes from the
 * book's entry in lib/books.ts; nothing here is written per book.
 *
 * Rhythm: dark hero → light description → accent CTA band back to /books.
 */

type Params = { slug: string };

// Every slug is known at build time, so each page prerenders and an unknown
// slug is a 404 rather than a server render.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return BOOKS.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};

  const title = `${book.title} — Ayodele Oladapo Awe Ministries`;
  const description = `${book.title}: ${book.subtitle}, by Pastor Ayodele Oladapo Awe. Available on Selar and Amazon.`;
  const image = {
    url: book.cover,
    width: book.coverWidth,
    height: book.coverHeight,
    alt: coverAlt(book),
  };

  return {
    title,
    description,
    openGraph: {
      type: "book",
      title: book.title,
      description,
      images: [image],
    },
    // `summary`, not `summary_large_image`: the cover is portrait, and the
    // large card crops to 2:1, which would show only a strip of it.
    twitter: {
      card: "summary",
      title: book.title,
      description,
      images: [book.cover],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <>
      {/* ── 1. Hero ── */}
      {/* Built by hand rather than with `PageHero`, which is a single centred
          column with no room for a cover beside the title. It uses the same
          shared parts: the dark gradient, `HeroAtmosphere`, and the one-pass
          `.hero-shimmer` on an inline span inside the h1. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy px-4 pb-24 pt-36 sm:px-6 sm:pb-32 sm:pt-44 lg:px-16">
        <HeroAtmosphere surface="dark" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <AnimateIn direction="left" className="text-center lg:text-left">
            <SectionLabel tone="dark">By Pastor Ayodele Oladapo Awe</SectionLabel>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              <span className="hero-shimmer">{book.title}</span>
            </h1>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-brand-orange lg:mx-0" />
            <p className="mt-8 font-sans text-xl leading-snug text-white/80 sm:text-2xl">
              {book.subtitle}
            </p>
            <BookBuyButtons
              selar={book.selar}
              amazon={book.amazon}
              tone="dark"
              className="mt-10 sm:justify-center lg:justify-start"
            />
          </AnimateIn>

          {/* The cover leads on a phone. The h1 stays first in the DOM because
              it is the page heading; only the visual order flips. Shown whole
              at its own ratio, not cropped to a fixed aspect. */}
          <AnimateIn direction="right" className="order-first lg:order-last">
            <div className="mx-auto w-full max-w-[15rem] shadow-2xl ring-1 ring-white/10 sm:max-w-xs">
              <Image
                src={book.cover}
                alt={coverAlt(book)}
                width={book.coverWidth}
                height={book.coverHeight}
                priority
                sizes="(min-width: 640px) 320px, 240px"
                className="h-auto w-full"
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 2. Description ── */}
      <section className="bg-gradient-to-br from-white to-brand-tint px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <AnimateIn direction="up" className="text-center">
            <SectionLabel tone="light">About the Book</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl md:text-5xl">
              What This Book Is About
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-brand-orange" />
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1}>
            <BookDescription
              blocks={book.description}
              className="mt-12 space-y-5"
            />
          </AnimateIn>

          <AnimateIn direction="up" delay={0.2}>
            <BookBuyButtons
              selar={book.selar}
              amazon={book.amazon}
              tone="light"
              className="mt-12 sm:justify-center"
            />
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. CTA band ── */}
      <section className="border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Explore the Library
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            See every book from Pastor Ayodele Oladapo Awe.
          </p>
          <Button href="/books" variant="secondary" size="lg">
            Back to all books
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
