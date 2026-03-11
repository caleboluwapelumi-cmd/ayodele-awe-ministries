import Link from "next/link";
import { SITE_NAME, SOCIALS } from "@/lib/constants";
import NewsletterForm from "./NewsletterForm";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import YouTubeIcon from "@/components/icons/YouTubeIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Expressions", href: "/churches" },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_ICONS = [
  { name: "Instagram", href: SOCIALS.instagram, Icon: InstagramIcon },
  { name: "Facebook", href: SOCIALS.facebook, Icon: FacebookIcon },
  { name: "YouTube", href: SOCIALS.youtube, Icon: YouTubeIcon },
  { name: "Telegram", href: SOCIALS.telegram, Icon: TelegramIcon },
  { name: "Spotify", href: SOCIALS.spotify, Icon: SpotifyIcon },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-navy to-blue-deep">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-xl text-white">
              AOA Ministries
            </Link>
            <p className="mt-4 font-sans text-sm text-white/50 leading-relaxed">
              Raising Voices, Building Houses, Transforming Nations across the
              United Kingdom &amp; Nigeria.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs uppercase tracking-wide text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-6">
              Connect
            </h4>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              {SOCIAL_ICONS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  <Icon
                    size={24}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-6">
              Stay Connected
            </h4>
            <p className="font-sans text-sm text-white/50 mb-6">
              Ministry updates and teachings delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 text-center">
          <p className="font-sans text-xs text-white/40">
            &copy; 2025 {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
