export const SITE_NAME = "Ayodele Oladapo Awe Ministries";
export const MINISTER_NAME = "Ayodele Oladapo Awe";
export const TAGLINE =
  "Raising Voices, Building Houses, Transforming Nations";

export const SOCIALS = {
  instagram: "https://www.instagram.com/official_ayodeleawe",
  threads: "https://www.threads.com/@official_ayodeleawe",
  telegram: "https://t.me/bethelencounterlib",
  spotify:
    "https://open.spotify.com/artist/5WpAgkKg8zUcHp806EQ8LW?si=AZb7UmEcRPuB9TLBbDOQcQ",
  linktree: "https://linktr.ee/official_ayodeleawe",
  youtube: "https://www.youtube.com/@ayodeleawelive",
  facebook: "https://web.facebook.com/awe.ayo",
} as const;

export const SPOTIFY_PODCAST_URL =
  "https://open.spotify.com/show/7g3Ft514KFHvK57KFlWgNh?si=a3bb9917b35a4fc1";
export const SPOTIFY_PODCAST_NAME = "Babylonian Legends";
export const SPOTIFY_PODCAST_TAGLINE = "Everything Faith and Family";

export const ANCHOR_FM_URL = "https://anchor.fm/ayodele-awe";

/** Bare Spotify IDs for the embedded players (SOCIALS.spotify is the share link). */
export const SPOTIFY_ARTIST_ID = "5WpAgkKg8zUcHp806EQ8LW";
export const SPOTIFY_PODCAST_ID = "7g3Ft514KFHvK57KFlWgNh";

export const TELEGRAM_CHANNEL = "bethelencounterlib";

/**
 * YouTube cannot embed a channel by @handle, only by playlist. To switch this
 * on: open the channel, take its channel ID (starts `UC…`), replace the leading
 * `UC` with `UU` — that is the auto-generated "all uploads" playlist — and paste
 * it here. While this is null the YouTube section renders as a link-out card.
 */
export const YOUTUBE_UPLOADS_PLAYLIST_ID: string | null = null;

/*
 * The hand-curated SERMONS array lived here. It is gone: `/media/teachings` now
 * scrapes the channel's public preview at request time — see lib/telegram.ts.
 * Sermons no longer need adding by hand; posting to Telegram is enough.
 */

/*
 * ⚠️ These must be the retailers' own URLs, never a `tr.ee/…` link.
 * `tr.ee` is Linktree's shortener, not a redirector: both book links were
 * `tr.ee` shortlinks and each one rendered the full Linktree profile
 * (linktr.ee/official_ayodeleawe), so "Buy on Selar" and "Buy on Amazon"
 * landed on the same link-hub page instead of the book. Resolved 7 August 2026
 * by reading the destinations out of that Linktree's own link list.
 *
 * selar.co/f12uu6 302s to selar.com; the canonical host is used directly.
 * The Amazon link is the clean /dp/ URL — the shortlink carried a
 * `cm_sw_r_mwn_dp_…` share-tracking query string. ASIN B0DMLXN64T is the
 * Kindle edition of "Walking with the Holy Spirit" on Amazon.co.uk.
 */
export const SELAR_BOOK_URL = "https://selar.com/f12uu6";
export const AMAZON_BOOK_URL = "https://www.amazon.co.uk/dp/B0DMLXN64T";

/**
 * "Thriving in the Midst of Famine" — the second book, live since October 2026.
 * Kept as separate constants so the "Walking with the Holy Spirit" pair above
 * is never overwritten by a new title.
 *
 * Verified 21 October 2026 by fetching each URL logged out:
 *  - Selar: 200, no redirect, page titled "Buy Thriving in the Midst of Famine
 *    by Ayodele Awe on Selar".
 *  - Amazon: the client supplied a KDP author-dashboard link
 *    (kdp.amazon.com/amazon-dp-action/uk/dualbookshelf.marketplacelink/…),
 *    which 302s twice to this clean /dp/ URL. The public URL is used directly
 *    so no visitor passes through KDP. ASIN B0HH6W7H5K is the Kindle edition.
 *
 * ⚠️ **Amazon lists it under a different title**: "THRIVING IN FAMINE:
 * Carrying God's Presence, Walking in His Word, and Thriving When Everything
 * Else Fails". It is the same book: the product description is word for word
 * the one on Selar, and it names the book "Thriving in the Midst of Famine".
 * The site keeps the cover's title and subtitle. If the client wants the two
 * to agree, that is a KDP metadata change, not a site change.
 *
 * ⚠️ Never a `tr.ee/…` URL — see the note on the two constants above.
 */
export const BOOK2_SELAR_URL = "https://selar.com/6s9o4z5173";
export const BOOK2_AMAZON_URL = "https://www.amazon.co.uk/dp/B0HH6W7H5K";

/**
 * The homepage's "What's New" band.
 *
 * A list so announcements can be added and removed without touching the page.
 * Rendered as stacked rows, so one item reads as well as three.
 *
 * ⚠️ **No item may carry a date that has not been confirmed by the client.**
 * `date` is optional precisely so an announcement can run without one — an
 * invented launch date is the exact failure the Content Integrity Notes exist
 * to prevent, and "we just need something there" is how it gets in. The book
 * below has no date because no release date has been given.
 *
 * ⚠️ `href` is an internal route. These are announcements, not outbound links.
 */
export interface Highlight {
  /** Small eyebrow above the title, e.g. "New book". */
  label: string;
  title: string;
  blurb: string;
  /** Optional thumbnail. Omit and the row renders text-only. */
  image?: string;
  imageAlt?: string;
  /** Confirmed dates only. Omit when there isn't one. */
  date?: string;
  href: string;
  cta: string;
}

export const HIGHLIGHTS: Highlight[] = [
  {
    label: "New book",
    title: "Thriving in the Midst of Famine",
    blurb:
      "Biblical Keys to Flourishing in Difficult Times — the new book from Pastor Ayodele Oladapo Awe. Available now on Selar and Amazon.",
    image: "/images/thriving-book-cover.jpg",
    imageAlt:
      "Cover of Thriving in the Midst of Famine: Biblical Keys to Flourishing in Difficult Times by Ayodele Oladapo Awe",
    /* The book's landing page. Written out rather than read from lib/books.ts,
       which imports this file — keep it in step with that entry's `slug`. */
    href: "/books/thriving-in-the-midst-of-famine",
    cta: "Read more",
  },
];

export interface ServiceTime {
  day: string;
  time: string;
}

export interface ChurchSocials {
  youtube?: string;
  instagramEkiti?: string;
  instagramGlobal?: string;
  facebook?: string;
}

export interface ChurchLeader {
  name: string;
  role: string;
  /**
   * Portrait in `public/images/`. Omitted while the photo is still pending —
   * pages fall back to an initials block, so never point this at a placeholder.
   */
  image?: string;
  /**
   * `object-position` utility for the portrait inside the `aspect-[3/4]` card.
   * Only needed when the source is a different shape from the card — a tall
   * phone portrait cropped centre-on loses the top of the head.
   */
  imagePosition?: string;
}

export interface Church {
  name: string;
  acronym: string;
  location: string;
  href: string;
  address?: string;
  serviceTimes?: ServiceTime[];
  email?: string;
  vision?: string;
  mission?: string;
  /** Human-readable founding date, e.g. "9 February 2025". */
  founded?: string;
  /**
   * The church's own square emblem in `public/images/`. Never a photograph —
   * this is the church's identity, so it is the one image allowed to stand for
   * the church before real photos arrive. BHCC points at the `-mark`
   * derivative, not its horizontal lockup, because every consumer is a square
   * or near-square slot.
   */
  logo?: string;
  leadership?: ChurchLeader[];
  /** Church-run accounts — distinct from the minister's own SOCIALS. */
  socials?: ChurchSocials;
}

/**
 * BLCN's own channels. Exported separately so pages that don't already look up
 * CHURCHES (e.g. /contact) can import them directly.
 */
export const BLCN_SOCIALS: ChurchSocials = {
  youtube: "https://www.youtube.com/@blcnglobal",
  instagramEkiti: "https://www.instagram.com/blcnekiti/",
  instagramGlobal: "https://www.instagram.com/blcnglobal/",
  facebook: "https://web.facebook.com/blcnglobal",
};

// NOTE: More expressions (books, outreaches, itineraries) will be added later.
export const CHURCHES: Church[] = [
  {
    name: "Building House Christian Centre",
    acronym: "BHCC",
    location: "Norwich, United Kingdom",
    href: "/churches/bhcc",
    address:
      "Frere Community Centre, Frere Road, Norwich NR7 9UT, United Kingdom",
    serviceTimes: [
      { day: "Sunday", time: "12:00 PM" },
      { day: "Thursday", time: "8:00 PM" },
    ],
    email: "Info.buildinghousecc@gmail.com",
    vision:
      "Raising Saints that would host the presence and the power of God in every Nation.",
    mission:
      "We exist to Equip saints that would worship God accurately, sound in doctrine and bear witness with power to the resurrected Christ.",
    founded: "9 February 2025",
    logo: "/images/bhcc-mark.png",
    leadership: [
      {
        name: "Ayodele Oladapo Awe",
        role: "Lead Pastor",
        image: "/images/apostle-portrait.jpg",
      },
      {
        name: "Iyanuoluwa Ayodele-Awe",
        role: "Co-Pastor",
        // 1134×2016 (0.5625) in a 3:4 card shows 75% of the height. Centred,
        // the window starts at row 252 and cuts through her hair (top ≈ row
        // 170); 8% starts it at row 40, leaving headroom above the head.
        image: "/images/iyanu-awe.jpg",
        imagePosition: "object-[50%_8%]",
      },
    ],
  },
  {
    name: "Bethel Livingstone Christian Network",
    acronym: "BLCN",
    location: "Ado Ekiti, Nigeria",
    href: "/churches/blcn",
    address:
      "BETHEL Centre, Kajola Street, adjacent Olukayode Stadium, Ado Ekiti, Ekiti State, Nigeria",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM" },
      { day: "Tuesday", time: "5:30 PM" },
    ],
    email: "blcnglobal@gmail.com",
    logo: "/images/blcn-logo.jpg",
    /**
     * BLCN lists its resident Lead Pastor only. Pastor Awe is BLCN's founder
     * and apostolic covering, but he is deliberately not repeated here: the
     * /churches/blcn About copy already says the network was "birthed out of
     * the apostolic mandate of Pastor Ayodele Oladapo Awe", and a second
     * "Lead Pastor" line beside the resident pastor reads as a shared
     * pastorate rather than a covering. BHCC lists him because he actually
     * pastors that congregation.
     * ⚠️ If the client wants the covering stated as a leadership entry, give
     * it a role that says so ("Founder & Apostolic Covering"), never a
     * second "Lead Pastor".
     */
    leadership: [
      { name: "Toluwalope Fash", role: "Lead Pastor", image: "/images/pastor-fash.jpg" },
    ],
    socials: BLCN_SOCIALS,
  },
];

export type ProgrammeCategory =
  | "Apostolic & Prophetic"
  | "Pastoral & Teaching"
  | "Evangelistic";

export interface MinistryProgramme {
  name: string;
  /** Short form the ministry uses in speech, e.g. "SHM". `null` when it has none. */
  acronym: string | null;
  category: ProgrammeCategory;
}

/**
 * The named programmes through which the ministry's three expressions are
 * carried out. `/ministry` is the only consumer today — it groups them by
 * `category` into the tag row under each expression card. Captured here
 * (rather than inline in the page) so any of these can graduate to its own
 * page or an /events filter without the copy having to be re-sourced.
 *
 * Fire Fest Europe Tour and the Great Light Campaign are the two most likely
 * to want dedicated landing pages — both read as recurring flagship events.
 */
export const MINISTRY_PROGRAMMES: MinistryProgramme[] = [
  { name: "Special Apostolic Visits", acronym: null, category: "Apostolic & Prophetic" },
  { name: "Special Holyghost Meetings", acronym: "SHM", category: "Apostolic & Prophetic" },
  { name: "Holyghost Convocation", acronym: "HC", category: "Apostolic & Prophetic" },
  { name: "One Thing Is Needful", acronym: "OTIN", category: "Pastoral & Teaching" },
  { name: "Discipleship Retreats", acronym: null, category: "Pastoral & Teaching" },
  { name: "Partnership Conference", acronym: null, category: "Pastoral & Teaching" },
  { name: "Great Light Campaign", acronym: "GLC", category: "Evangelistic" },
  { name: "Summer Harvest Campaign UK", acronym: null, category: "Evangelistic" },
  { name: "Healing Ministry", acronym: null, category: "Evangelistic" },
  { name: "Fire Fest Europe Tour", acronym: null, category: "Evangelistic" },
];

export type NavLink = {
  label: string;
  href: string;
  dropdown?: boolean;
  children?: { label: string; href: string; desc?: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Expressions",
    href: "/churches",
    dropdown: true,
    children: [
      // The Pastor's ministry overview sits above the church/media groupings —
      // it is what the rest of the list is an outworking of.
      { label: "Ministry", href: "/ministry" },
      { label: "All Expressions", href: "/churches" },
      { label: "\u2014 Churches \u2014", href: "/churches", desc: "" },
      { label: "BHCC \u2014 Building House Christian Centre", href: "/churches/bhcc" },
      { label: "BLCN \u2014 Bethel Livingstone Christian Network", href: "/churches/blcn" },
      { label: "\u2014 More \u2014", href: "/churches", desc: "" },
      // \u26a0\ufe0f ONE media entry, not three. Teachings and Music used to sit here
      // under a "\u2014 Media \u2014" group header; they now live behind `MediaTabs`, the
      // sub-nav under every /media page hero. The dropdown is about the
      // ministry's expressions, and three media destinations in it made the
      // media section look like three unrelated pages rather than one.
      // Anything added to the media section belongs in MediaTabs, not here.
      { label: "Media", href: "/media" },
      { label: "Books", href: "/books" },
      { label: "Itinerary", href: "/itinerary" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];
