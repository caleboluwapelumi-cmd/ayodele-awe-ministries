"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [churchesOpen, setChurchesOpen] = useState(false);
  const [mobileChurchesOpen, setMobileChurchesOpen] = useState(false);
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
        setChurchesOpen(false);
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
    const active = isActive(href);
    return `font-sans text-xs uppercase tracking-widest transition-colors ${
      active
        ? "text-white font-semibold underline underline-offset-4"
        : "text-white/70 hover:text-white"
    }`;
  }

  function closeMobile() {
    setMobileOpen(false);
    setMobileChurchesOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-blue-navy/95 backdrop-blur-md shadow-lg lg:shadow-none ${
        scrolled || mobileOpen
          ? "lg:bg-blue-navy/95 lg:backdrop-blur-md lg:shadow-lg"
          : "lg:bg-transparent lg:backdrop-blur-none"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <Link href="/" onClick={closeMobile} className="font-serif text-xl text-white tracking-wide">
          AOA Ministries
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setChurchesOpen(true)}
                onMouseLeave={() => setChurchesOpen(false)}
              >
                <button
                  onClick={() => setChurchesOpen((prev) => !prev)}
                  className={`flex items-center gap-1 ${linkClasses(link.href)}`}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${churchesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                    churchesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="w-64 bg-blue-navy/95 backdrop-blur-md rounded-lg p-2 shadow-xl border border-white/10">
                    {link.children?.map((church) => (
                      <Link
                        key={church.href + church.label}
                        href={church.href}
                        onClick={() => setChurchesOpen(false)}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        <span className="block font-sans font-medium">{church.label}</span>
                        {church.desc && (
                          <span className="block font-sans text-xs text-white/50 mt-0.5">{church.desc}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href} className={linkClasses(link.href)}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 text-white hover:text-white/80 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile full-screen slide-down ── */}
      <div
        className={`lg:hidden fixed inset-x-0 top-0 bottom-0 bg-blue-navy/98 backdrop-blur-md z-40 transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/" onClick={closeMobile} className="font-serif text-xl text-white tracking-wide">
            AOA Ministries
          </Link>
          <button
            onClick={closeMobile}
            className="p-2 text-white hover:text-white/80 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile links */}
        <nav className="px-6 pt-6 space-y-1">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileChurchesOpen((prev) => !prev)}
                  className={`flex items-center justify-between w-full py-4 font-sans text-lg transition-colors ${
                    isActive("/churches")
                      ? "text-white font-semibold"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${mobileChurchesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Inline expanded churches */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileChurchesOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 space-y-1 border-l border-white/10 pl-4 pb-2">
                    {link.children?.map((church) => (
                      <Link
                        key={church.href + church.label}
                        href={church.href}
                        onClick={closeMobile}
                        className={`block py-2 font-sans text-base transition-colors ${
                          pathname === church.href
                            ? "text-white font-semibold"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {church.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className={`block py-4 font-sans text-lg transition-colors ${
                  isActive(link.href)
                    ? "text-white font-semibold"
                    : "text-white/70 hover:text-white"
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
