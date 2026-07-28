"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

const LINK_BASE =
  "font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors";

/* Thin rule that marks the current section */
function Indicator({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-1.5 block h-0.5 w-4 bg-blue-sky transition-opacity duration-200 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

/**
 * Header brand lockup.
 *
 * The full logo's two-line wordmark is unreadable at header scale — at a 40px
 * logo height the type lands under 6px — so the navbar carries the mark alone
 * with the ministry name set in Clash Display beside it. The footer, which has
 * the room, uses the complete lockup. The mark is decorative here because the
 * text next to it already names the ministry.
 */
function Brand({ onClick }: { onClick: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-3">
      <Image
        src="/images/awe-min-mark.png"
        alt=""
        aria-hidden
        width={702}
        height={662}
        priority
        className="h-9 w-auto"
      />
      <span className="font-serif text-lg font-bold tracking-wide text-white">
        AOA Ministries
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expressionsOpen, setExpressionsOpen] = useState(false);
  const [mobileExpressionsOpen, setMobileExpressionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ── Scroll listener ── */
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExpressionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Active link helper ── */
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function linkClasses(href: string) {
    return `${LINK_BASE} ${
      isActive(href) ? "text-white" : "text-white/70 hover:text-white"
    }`;
  }

  function closeMobile() {
    setMobileOpen(false);
    setMobileExpressionsOpen(false);
  }

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-blue-navy/95 backdrop-blur-md shadow-lg transition-all duration-300 lg:shadow-none ${
        solid
          ? "lg:border-white/10 lg:bg-blue-navy/95 lg:shadow-lg lg:backdrop-blur-md"
          : "lg:border-transparent lg:bg-transparent lg:backdrop-blur-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-16">
        {/* Logo */}
        <Brand onClick={closeMobile} />

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-start gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative flex flex-col items-center"
                ref={dropdownRef}
                onMouseEnter={() => setExpressionsOpen(true)}
                onMouseLeave={() => setExpressionsOpen(false)}
              >
                <button
                  onClick={() => setExpressionsOpen((prev) => !prev)}
                  className={`flex items-center gap-1 ${linkClasses(link.href)}`}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${expressionsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <Indicator active={isActive(link.href)} />

                {/* Dropdown */}
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                    expressionsOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="max-h-[70vh] w-[280px] min-w-[220px] overflow-y-auto border border-white/10 bg-blue-navy/95 py-2 shadow-xl backdrop-blur-md">
                    {link.children?.map((item) =>
                      item.label.startsWith("—") ? (
                        <p
                          key={item.label}
                          className="select-none px-5 pb-1 pt-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/30"
                        >
                          {item.label}
                        </p>
                      ) : (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          onClick={() => setExpressionsOpen(false)}
                          className={`block px-5 py-2 font-sans text-sm transition-colors hover:bg-white/10 ${
                            pathname === item.href
                              ? "text-white"
                              : "text-white/80 hover:text-white"
                          }`}
                        >
                          {item.label}
                          {item.desc && (
                            <span className="mt-0.5 block font-sans text-xs text-white/50">
                              {item.desc}
                            </span>
                          )}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={link.label} className="flex flex-col items-center">
                <Link href={link.href} className={linkClasses(link.href)}>
                  {link.label}
                </Link>
                <Indicator active={isActive(link.href)} />
              </div>
            )
          )}
        </nav>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="p-2 text-white transition-colors hover:text-white/80 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile full-screen slide-down ── */}
      <div
        /* h-dvh, not `top-0 bottom-0`: the parent <header> has backdrop-blur,
           which makes it the containing block for its fixed descendants, so
           inset-based sizing here resolves against the ~80px header rather than
           the viewport. overflow-y-auto is then load-bearing — with the
           Expressions accordion open the list is ~476px tall and does not fit a
           phone in landscape. overscroll-contain stops scroll chaining to the
           page behind. */
        className={`fixed inset-x-0 top-0 z-40 h-dvh overflow-y-auto overscroll-contain bg-blue-navy/98 backdrop-blur-md transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <Brand onClick={closeMobile} />
          <button
            onClick={closeMobile}
            className="p-2 text-white transition-colors hover:text-white/80"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile links */}
        <nav className="space-y-1 px-4 pb-16 pt-6 sm:px-6">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileExpressionsOpen((prev) => !prev)}
                  className={`flex w-full items-center justify-between py-4 font-sans text-sm font-semibold uppercase tracking-[0.15em] transition-colors ${
                    isActive("/churches") ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${mobileExpressionsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Inline expanded expressions */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileExpressionsOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 space-y-1 border-l border-white/10 pb-2 pl-4">
                    {link.children?.map((item) =>
                      item.label.startsWith("—") ? (
                        <p
                          key={item.label}
                          className="select-none pb-1 pt-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/30"
                        >
                          {item.label}
                        </p>
                      ) : (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          onClick={closeMobile}
                          className={`block py-2 font-sans text-sm transition-colors ${
                            pathname === item.href
                              ? "text-white"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className={`block py-4 font-sans text-sm font-semibold uppercase tracking-[0.15em] transition-colors ${
                  isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
