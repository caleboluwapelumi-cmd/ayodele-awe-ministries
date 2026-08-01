import { NextResponse, type NextRequest } from "next/server";

/**
 * ⚠️ TEMPORARY — delete this file when the main site launches.
 *
 * `ayodeleaweministries.com` is pointed at this Vercel project, but the main
 * site is not ready to be seen. `/birthday` is the only thing being shared, so
 * on the custom domain that is the only page reachable:
 *
 *   /              → rewritten to /birthday   (URL stays clean, no redirect)
 *   /about, /…     → redirected to /birthday
 *   /birthday[/…]  → served normally (includes /birthday/admin)
 *   /api/…         → untouched (the testimony form depends on these)
 *
 * The `.vercel.app` deployment URL is deliberately NOT affected — the full site
 * keeps working there for internal review. That is the whole reason this is a
 * host check rather than a `redirects()` entry in next.config.ts, which cannot
 * see the request host.
 *
 * See CLAUDE.md → "The custom domain serves /birthday only".
 */

/**
 * Matched against the request host with the port stripped, so `.com` and the
 * `www.` variant both hit. Anything else — `*.vercel.app`, localhost, a preview
 * URL — falls straight through to the full site.
 *
 * ⚠️ Exact hosts, not a substring test. `host.includes("ayodeleaweministries")`
 * would also swallow a `ayodeleaweministries.com.evil.example` style host, and
 * a Host header is attacker-controlled.
 */
const LOCKED_DOMAINS = new Set([
  "ayodeleaweministries.com",
  "www.ayodeleaweministries.com",
]);

const PUBLIC_PATH = "/birthday";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (!LOCKED_DOMAINS.has(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // The testimony form posts to /api/birthday-testimony and the admin gate to
  // /api/birthday-admin. Both must work on the custom domain.
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // /birthday and everything under it (i.e. /birthday/admin) load normally.
  // Compared exactly rather than with a bare `startsWith("/birthday")` so a
  // stray path like /birthdays is still sent home instead of 404ing.
  if (pathname === PUBLIC_PATH || pathname.startsWith(`${PUBLIC_PATH}/`)) {
    return NextResponse.next();
  }

  // The root serves the birthday page without changing the address bar — the
  // link people are given is the bare domain, and it should stay that way.
  if (pathname === "/") {
    return NextResponse.rewrite(new URL(PUBLIC_PATH, request.url));
  }

  // ⚠️ 307, the NextResponse.redirect default — deliberately NOT 301/308.
  // A permanent redirect is cached by the browser indefinitely, so every
  // visitor who touched the domain pre-launch would keep landing on /birthday
  // after this file is deleted, with no way for us to clear it.
  return NextResponse.redirect(new URL(PUBLIC_PATH, request.url));
}

export const config = {
  /**
   * Everything except `_next/*` (the build output: JS, CSS and the self-hosted
   * Clash Display woff2 files) and any path carrying a file extension.
   *
   * ⚠️ The extension exclusion is load-bearing, not tidiness. `/birthday`'s
   * og:image resolves to `/images/apostle-portrait.jpg` on this domain via
   * `metadataBase`, and the WhatsApp/Facebook crawlers fetch it directly —
   * redirect it and every shared link loses its preview image. It also covers
   * `/icon.png` and `/apple-icon.png`, which Next serves from the app dir.
   */
  matcher: ["/((?!_next/|.*\\.).*)"],
};
