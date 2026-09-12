import { Metadata } from "next";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import AmazonIcon from "@/components/icons/AmazonIcon";
import SectionLabel from "@/components/SectionLabel";
import {
  AMAZON_BOOK_URL,
  SELAR_BOOK_URL,
  SOCIALS,
  THRIVING_PREORDER_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Books & Publications — Ayodele Oladapo Awe Ministries",
  description:
    "Books by Ayodele Oladapo Awe — Thriving in the Midst of Famine, coming soon, and Walking with the Holy Spirit: Insights for Supernatural Living, available on Selar and Amazon.",
};

/**
 * Title and subtitle are split so the heading stays at a readable size — the
 * full title is recomposed where it needs to read as one string (alt text).
 *
 * ⚠️ `status` drives the badge and the buttons, and "coming-soon" is a real
 * state rather than a placeholder: a book with no retailer link renders its
 * blurb and a "Coming soon" badge and **no buy button at all**. Don't give it
 * a dead or stand-in CTA — see the note on `THRIVING_PREORDER_URL`.
 *
 * ⚠️ Order matters: the newest book leads, because it is what a returning
 * visitor has come for. The hero background deliberately does NOT follow that
 * order — see the note on the hero below.
 */
type Book = {
  title: string;
  subtitle: string;
  description: string[];
  cover: string;
  coverWidth: number;
  coverHeight: number;
  status: "available" | "coming-soon";
  selar?: string | null;
  amazon?: string | null;
  preorder?: string | null;
};

const BOOKS: Book[] = [
  {
    title: "Thriving in the Midst of Famine",
    subtitle: "Biblical Keys to Flourishing in Difficult Times",
    /* The publisher's own "About the Book" copy, transcribed from the back
       cover of the supplied hardcover mockup — not written to brief. Left in
       its own words; only the selection of paragraphs is ours. */
    description: [
      "When most people hear the word famine, they think of empty fields and a lack of food. But famine is much more than that. It is any season when scarcity, uncertainty, and pressure seem to shape the course of life.",
      "The Bible tells a different story. Again and again, God showed that famine never had the final word over His people. He preserved them in seasons of lack, provided for them in impossible circumstances, and proved that His covenant is not limited by the conditions of this world.",
      "That is the heartbeat of Thriving in the Midst of Famine. Through the truths of Scripture, this book shows how believers can live with confidence in God's Word, follow the leading of the Holy Spirit, and walk in the reality of His covenant, even when everything around them points in the opposite direction. It is a call to live by what God has said instead of by what circumstances suggest.",
      "The question is not whether famine will come. The question is how God's people will live when it does.",
    ],
    cover: "/images/thriving-book-cover.jpg",
    coverWidth: 1156,
    coverHeight: 1600,
    status: "coming-soon",
    preorder: THRIVING_PREORDER_URL,
  },
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
    status: "available",
    selar: SELAR_BOOK_URL,
    amazon: AMAZON_BOOK_URL,
  },
];

/** The hero backdrop. See the note at the `PageHero` call below. */
const HERO_BOOK =
  BOOKS.find((book) => book.title === "Walking with the Holy Spirit") ?? BOOKS[0];

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
                  {/* The badge carries the only signal that one of these is
                      not yet purchasable, so it sits above the title rather
                      than beside the buttons where it could be scrolled past.
                      `brand-orange-deep` on the tint is 4.7:1 — the brand
                      orange would be 3.3:1 and fail AA at this size. */}
                  <p className="mb-3 inline-flex items-center gap-2 border border-brand-orange-deep/30 bg-white px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-orange-deep">
                    {book.status === "available" ? "Available now" : "Coming soon"}
                  </p>
                  <h3 className="mb-3 font-serif text-2xl font-bold leading-tight text-brand-blue sm:text-3xl">
                    {book.title}
                  </h3>
                  <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange-deep">
                    {book.subtitle}
                  </p>
                  <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                    {book.description.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                  {/* ⚠️ A book with no retailer link gets NO button. There is
                      nowhere honest to send a pre-order click yet: /contact and
                      the newsletter are both `console.log` stubs, so a CTA
                      pointing at either would look like it registered interest
                      and silently discard it. Set `THRIVING_PREORDER_URL` and
                      the button below appears. */}
                  {book.status === "coming-soon" && !book.preorder && (
                    <p className="font-sans text-sm leading-relaxed text-muted">
                      Pre-orders open shortly. Follow the ministry on{" "}
                      <a
                        href={SOCIALS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-orange-deep underline underline-offset-4 hover:text-brand-orange-dark"
                      >
                        Instagram
                      </a>{" "}
                      for the announcement.
                    </p>
                  )}

                  {book.preorder && (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button href={book.preorder} variant="primary" external>
                        Pre-order now
                      </Button>
                    </div>
                  )}

                  {book.selar && book.amazon && (
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
                      className="text-brand-blue"
                      external
                    >
                      <AmazonIcon size={20} />
                      Buy on Amazon
                    </Button>
                  </div>
                  )}
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
      <section className="border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
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
