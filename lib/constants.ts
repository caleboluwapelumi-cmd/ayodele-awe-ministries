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

export interface Church {
  name: string;
  acronym: string;
  location: string;
  href: string;
}

export const CHURCHES: Church[] = [
  {
    name: "Building House Christian Center",
    acronym: "BHCC",
    location: "United Kingdom",
    href: "/churches/bhcc",
  },
  {
    name: "Bethel Livingstone Christian Network",
    acronym: "BLCN",
    location: "Nigeria",
    href: "/churches/blcn",
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
    label: "Churches",
    href: "/churches",
    dropdown: true,
    children: [
      { label: "BHCC", href: "/churches/bhcc", desc: "Building House Christian Center" },
      { label: "BLCN", href: "/churches/blcn", desc: "Bethel Livingstone Christian Network" },
      { label: "All Churches", href: "/churches" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];
