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
