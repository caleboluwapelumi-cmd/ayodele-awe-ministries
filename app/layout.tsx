import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Clash Display (Indian Type Foundry, free via Fontshare) — one face across the
 * whole site, headings and body alike.
 *
 * Self-hosted from ./fonts rather than loaded off Fontshare's CDN: no
 * third-party request on every page view, no extra DNS/TLS round trip, and the
 * files are version-pinned so an upstream change can't alter the site.
 *
 * ⚠️ It ships 200–700 only. There is NO 800 or 900, so never use `font-black`
 * — the browser would synthesise a fake bold. `font-bold` (700) is the ceiling.
 */
const clashDisplay = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "./fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
});

/**
 * `metadataBase` resolves relative `openGraph.images` paths to absolute URLs —
 * WhatsApp, Facebook and X will not fetch a relative one. Set
 * NEXT_PUBLIC_SITE_URL to the custom domain once it is pointed at Vercel;
 * VERCEL_URL covers preview and production deploys in the meantime, and the
 * localhost fallback keeps `next build` quiet.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ayodele Oladapo Awe Ministries",
  description:
    "Raising Voices, Building Houses, Transforming Nations — The official ministry of Ayodele Oladapo Awe, serving communities across the United Kingdom and Nigeria.",
};

/**
 * The root layout carries `<html>`/`<body>`, the font and `metadataBase` — and
 * nothing else. Chrome lives one level down:
 *
 *   app/(site)/layout.tsx  → Navbar + Footer, wraps the whole main site
 *   app/birthday/layout.tsx → no chrome at all
 *
 * `/birthday` is a standalone shareable sent by direct link while the main site
 * is still unlaunched, so it must not offer any route out of itself. Route
 * groups are the App Router's way of giving one branch of the tree different
 * chrome without changing any URL — `(site)` is parenthesised, so `/about` is
 * still `/about`. See CLAUDE.md → "The birthday page".
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${clashDisplay.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
