"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sub-navigation for the media section, sitting directly under each media page
 * hero.
 *
 * It exists because the Expressions dropdown used to list Teachings and Music
 * as separate items alongside the churches, which put three media destinations
 * into a menu that is otherwise about the ministry's expressions. The dropdown
 * now carries one "Media" entry; this bar is how a visitor gets from there to
 * the two sub-pages, so it must be mounted on **all three** media routes — drop
 * it from one and that page becomes a dead end within its own section.
 *
 * ⚠️ Not a row of CTAs, so not `Button`. It is a navigation list, the same
 * exemption the Navbar and Footer lists take from the "every call to action is
 * a Button" rule.
 */
const TABS = [
  { label: "Overview", href: "/media" },
  { label: "Teachings", href: "/media/teachings" },
  { label: "Music", href: "/media/music" },
];

export default function MediaTabs() {
  const pathname = usePathname();

  return (
    /* Mid-blue on the accent-band idiom. ⚠️ The orange rule goes on TOP, not
       the bottom: this bar always follows a dark hero, and blue against blue
       has no seam of its own — exactly the case the rule exists for. Below it
       every media page opens on a light section, which separates itself. */
    <nav
      aria-label="Media sections"
      className="border-t-2 border-brand-orange bg-gradient-to-r from-brand-blue to-brand-navy px-4 sm:px-6 lg:px-16"
    >
      <ul className="mx-auto flex max-w-7xl items-center justify-center gap-2 py-4 sm:gap-3">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                /* min-h-[40px] guarantees the tap target; the label alone is
                   ~34px tall at this type size. */
                className={`inline-flex min-h-[40px] items-center rounded-full px-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.15em] transition-colors sm:px-6 sm:text-xs ${
                  active
                    ? // White on orange-deep is 5.1:1 — the brand orange would
                      // be 3.3:1 and fail AA for a label this size.
                      "bg-brand-orange-deep text-white"
                    : "border border-white/25 text-white/75 hover:border-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
