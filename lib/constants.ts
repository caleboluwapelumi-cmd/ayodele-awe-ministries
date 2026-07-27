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

export interface Sermon {
  /** Telegram message ID of the audio post. */
  messageId: number;
  title: string;
}

/**
 * Curated sermon audio from the Telegram channel, newest first.
 *
 * Telegram offers no way to list a channel's posts without a bot token, so this
 * is maintained by hand. To add a new sermon: open the audio post in Telegram,
 * copy its link (t.me/bethelencounterlib/1344), and add the trailing number
 * plus its title to the TOP of this array. Nothing else needs changing.
 *
 * Each sermon posts as three messages — description, audio, cover image. The ID
 * needed here is the middle one (the audio itself).
 */
export const SERMONS: Sermon[] = [
  { messageId: 1344, title: "The Shout Of Joy 1" },
  { messageId: 1341, title: "Scent Of Water (Pt 2)" },
  { messageId: 1338, title: "Scent Of Water (Pt 1)" },
  { messageId: 1333, title: "The Kingdom Agenda" },
  { messageId: 1317, title: "Understanding Faith: The Law Of Conversion (Pt 3)" },
  { messageId: 1314, title: "Understanding Faith: The Law Of Conversion (Pt 2)" },
  { messageId: 1312, title: "Understanding Faith: The Law Of Conversion (Pt 1)" },
  { messageId: 1308, title: "Strengthen Yourself For Destiny" },
  { messageId: 1294, title: "Functioning From Rest" },
  { messageId: 1280, title: "Faith That Overcomes" },
];

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

export interface Church {
  name: string;
  acronym: string;
  location: string;
  href: string;
  address?: string;
  serviceTimes?: ServiceTime[];
  email?: string;
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
    location: "United Kingdom",
    href: "/churches/bhcc",
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
    socials: BLCN_SOCIALS,
  },
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
      { label: "All Expressions", href: "/churches" },
      { label: "\u2014 Churches \u2014", href: "/churches", desc: "" },
      { label: "BHCC \u2014 Building House Christian Centre", href: "/churches/bhcc" },
      { label: "BLCN \u2014 Bethel Livingstone Christian Network", href: "/churches/blcn" },
      { label: "\u2014 Media \u2014", href: "/media", desc: "" },
      { label: "Teachings", href: "/media/teachings" },
      { label: "Music", href: "/media/music" },
      { label: "\u2014 More \u2014", href: "/churches", desc: "" },
      { label: "Books", href: "/books" },
      { label: "Itinerary", href: "/itinerary" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];
