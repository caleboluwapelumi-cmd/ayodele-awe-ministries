export const SITE_NAME = "Ayodele Oladapo Awe Ministries";
export const MINISTER_NAME = "Ayodele Oladapo Awe";
export const TAGLINE =
  "Raising Voices, Building Houses, Transforming Nations";

export const SOCIALS = {
  instagram: "#",
  youtube: "#",
  facebook: "#",
  telegram: "#",
  spotify: "#",
} as const;

export interface ServiceTime {
  day: string;
  time: string;
}

export interface Church {
  name: string;
  acronym: string;
  location: string;
  href: string;
  address?: string;
  serviceTimes?: ServiceTime[];
  email?: string;
}

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
