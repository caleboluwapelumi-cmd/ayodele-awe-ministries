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

export const SELAR_BOOK_URL = "https://tr.ee/VJOapqf39_";
export const AMAZON_BOOK_URL = "https://tr.ee/uiJj6WRE9Q";

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
      // Photo pending from the client — renders as an initials block until then.
      { name: "Iyanuoluwa Ayodele-Awe", role: "Co-Pastor" },
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
