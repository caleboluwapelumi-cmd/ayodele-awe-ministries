import {
  AMAZON_BOOK_URL,
  BOOK2_AMAZON_URL,
  BOOK2_SELAR_URL,
  SELAR_BOOK_URL,
} from "./constants";

/**
 * Every book, newest first. Read by /books (the library) and by
 * /books/[slug] (one landing page per book), so copy lives in one place.
 *
 * Title and subtitle are split so the heading stays at a readable size. The
 * full title is put back together where it has to read as one string (alt
 * text, metadata).
 *
 * ⚠️ `slug` is the URL, so treat it as permanent once published. It is written
 * out rather than computed from `title`, so editing a title cannot break a link
 * that has already been shared. The homepage highlight in lib/constants.ts
 * hard-codes the Thriving slug (constants.ts cannot import this file without a
 * cycle), so keep the two in step.
 *
 * `description` is a list of blocks: a string is a paragraph, and
 * `{ lead, items }` is a bulleted list with its lead-in line. Render it with
 * `BookDescription`, never by mapping strings, or a list block breaks.
 *
 * `excerpt` is how many leading blocks the /books card shows before its
 * "Read more" button; the full description lives on the landing page. Keep it
 * to a few paragraphs that stand on their own.
 *
 * ⚠️ Order matters: the newest book leads on /books, because it is what a
 * returning visitor has come for.
 */
export type DescriptionBlock = string | { lead: string; items: string[] };

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  description: DescriptionBlock[];
  /** Leading blocks of `description` shown on /books. */
  excerpt: number;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  selar: string;
  amazon: string;
};

export const BOOKS: Book[] = [
  {
    slug: "thriving-in-the-midst-of-famine",
    title: "Thriving in the Midst of Famine",
    subtitle: "Biblical Keys to Flourishing in Difficult Times",
    /* The client-supplied "About" text, 21 October 2026, verbatim. It is the
       same copy as the Selar and Amazon listings. It replaced a selection of
       paragraphs transcribed from the back of the hardcover mockup. */
    description: [
      "What do you do when everything around you seems to be drying up?",
      "When opportunities become scarce, the economy is unstable, resources are limited, and the future feels uncertain, how do you keep going without losing hope?",
      "Thriving in the Midst of Famine is a timely and faith-filled book that addresses how to navigate seasons of scarcity without allowing scarcity to define your life.",
      "Drawing lessons from powerful biblical accounts, including Elijah, the four lepers at the gate of Samaria, Shadrach, Meshach and Abednego, and the children of Israel, this book reveals that famine is not always the end of the story. Sometimes, it is a season that requires a different level of faith, wisdom, obedience, courage and action.",
      {
        lead: "This book will help you:",
        items: [
          "Understand how to respond when resources and opportunities become limited.",
          "Develop the faith and mindset required to navigate difficult seasons.",
          "Recognise opportunities that may be hidden in seasons of scarcity.",
          "Avoid allowing fear and uncertainty to dictate your decisions.",
          "Learn practical spiritual principles for surviving and thriving in challenging times.",
          "Trust God while taking responsibility for the opportunities and resources within your reach.",
        ],
      },
      "Whether you are facing financial pressure, career uncertainty, business challenges, or simply trying to make sense of a difficult season, Thriving in the Midst of Famine offers biblical wisdom and encouragement for the journey.",
      "You may be in a season of famine, but famine does not have to be the final chapter.",
      "You can survive the season. You can grow through it. And by God’s grace, you can thrive in the midst of it.",
    ],
    // The two opening questions and the line that says what the book is.
    excerpt: 3,
    cover: "/images/thriving-book-cover.jpg",
    coverWidth: 1156,
    coverHeight: 1600,
    selar: BOOK2_SELAR_URL,
    amazon: BOOK2_AMAZON_URL,
  },
  {
    slug: "walking-with-the-holy-spirit",
    title: "Walking with the Holy Spirit",
    subtitle: "Insights for Supernatural Living",
    description: [
      "Walking with the Holy Spirit: Insights for Supernatural Living is a book for anyone seeking a deeper and more intimate relationship with God. The personal experiences and biblical insights shared in the book compel readers to walk closely with the Holy Spirit and experience His presence in their daily lives.",
      "Walking with the Holy Spirit encourages readers to be sensitive to God's voice, yield to His promptings, and live a life empowered by prayer and intimacy with Him. Filled with deep revelations and personal stories, each chapter is designed to inspire and equip believers to walk confidently in their faith, and more importantly, understand the role of the Holy Spirit in their lives.",
    ],
    excerpt: 1,
    cover: "/images/walking-with-the-holy-spirit.jpeg",
    coverWidth: 800,
    coverHeight: 1135,
    selar: SELAR_BOOK_URL,
    amazon: AMAZON_BOOK_URL,
  },
];

export function getBook(slug: string): Book | undefined {
  return BOOKS.find((book) => book.slug === slug);
}

export function bookHref(book: Book): string {
  return `/books/${book.slug}`;
}

export function coverAlt(book: Book): string {
  return `Cover of ${book.title}: ${book.subtitle} by Ayodele Oladapo Awe`;
}
