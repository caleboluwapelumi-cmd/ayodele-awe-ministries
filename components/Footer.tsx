import Link from "next/link";
import Image from "next/image";
import { Link2 as LinkIcon } from "lucide-react";
import { SITE_NAME, SOCIALS, TAGLINE } from "@/lib/constants";
import NewsletterForm from "./NewsletterForm";
import SectionLabel from "./SectionLabel";
import Button from "./Button";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import YouTubeIcon from "@/components/icons/YouTubeIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import ThreadsIcon from "@/components/icons/ThreadsIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministry", href: "/ministry" },
  { label: "Expressions", href: "/churches" },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_ICONS = [
  { name: "Instagram", href: SOCIALS.instagram, Icon: InstagramIcon },
  { name: "Threads", href: SOCIALS.threads, Icon: ThreadsIcon },
  { name: "Facebook", href: SOCIALS.facebook, Icon: FacebookIcon },
  { name: "YouTube", href: SOCIALS.youtube, Icon: YouTubeIcon },
  { name: "Telegram", href: SOCIALS.telegram, Icon: TelegramIcon },
  { name: "Spotify", href: SOCIALS.spotify, Icon: SpotifyIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-brand-navy to-brand-blue">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* Brand */}
          <div>
            {/* Full lockup — the footer has the width for the wordmark to read,
                unlike the navbar, which uses the mark on its own. */}
            <Link href="/" className="inline-block">
              <Image
                src="/images/awe-min-logo.png"
                alt={SITE_NAME}
                width={1200}
                height={662}
                sizes="192px"
                className="h-auto w-48"
              />
            </Link>
            <p className="mt-6 max-w-xs font-sans text-base leading-relaxed text-white/50">
              {TAGLINE} — across the United Kingdom &amp; Nigeria.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {SOCIAL_ICONS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-orange hover:text-brand-orange-light"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <Button
              href={SOCIALS.linktree}
              variant="outline"
              external
              className="mt-6 text-white"
            >
              <LinkIcon size={16} />
              All links
            </Button>
          </div>

          {/* Navigation */}
          <div>
            <SectionLabel tone="dark" className="mb-6">
              Navigation
            </SectionLabel>
            {/* gap-y is small because each link carries its own py-2 — the text
                is 14px tall, so without it the tap target is unusably short. */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <SectionLabel tone="dark" className="mb-6">
              Stay Connected
            </SectionLabel>
            <p className="mb-8 font-sans text-base leading-relaxed text-white/50">
              Ministry updates and teachings delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="font-sans text-xs text-white/40">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/30">
            Built with purpose
          </p>
        </div>
      </div>
    </footer>
  );
}
