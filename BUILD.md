# BUILD.md — AOA Ministries Build Log

## Project
**Ayodele Oladapo Awe Ministries**
Live: https://ayodele-awe-ministries.vercel.app
Repo: https://github.com/caleboluwapelumi-cmd/ayodele-awe-ministries

---

## Phase 1 — Scaffold ✅
- [x] Next.js 14 App Router + TypeScript + Tailwind CSS installed
- [x] Custom color system defined (blue/wine/white — see CLAUDE.md)
- [x] Playfair Display + Inter fonts configured
- [x] All route pages created
- [x] All shared components created
- [x] lib/constants.ts with site data
- [x] Root layout with Navbar + Footer

---

## Phase 2 — Pages Built ✅
- [x] Homepage (all sections)
- [x] About page
- [x] Expressions overview page (`/churches`)
- [x] BHCC page (`/churches/bhcc`) — British English
- [x] BLCN page (`/churches/blcn`)
- [x] Events page (Norwich Prayer Surge featured)
- [x] Media page
- [x] Teachings page (`/media/teachings`)
- [x] Music page (`/media/music`)
- [x] Books page (`/books`) — coming soon state
- [x] Itinerary page (`/itinerary`)
- [x] Partners page (3 tiers: Supporter, Partner, Covenant Partner)
- [x] Contact page (form + church contacts + booking)

---

## Phase 3 — Design System ✅
- [x] Color system: blue-navy/deep/sky + wine-deep/DEFAULT/light + white/cream
- [x] Gradient backgrounds (no flat solid colors)
- [x] Typography hierarchy (Playfair Display headings, Inter body)
- [x] Real SVG brand icons (Spotify, Telegram, YouTube, Instagram, Facebook)
- [x] Unsplash ministry-appropriate placeholder images
- [x] Button rules per background type
- [x] Navbar: transparent desktop, solid mobile, active link states
- [x] Expressions dropdown in Navbar (replaces "Churches")
- [x] British English for all BHCC content

---

## Phase 4 — Responsiveness ✅
- [x] Mobile navbar (hamburger, solid bg, flat dropdown)
- [x] All grids: grid-cols-1 base → scale up
- [x] All font sizes scale across breakpoints
- [x] No horizontal scroll at any breakpoint
- [x] Forms full width on mobile
- [x] Footer stacks on mobile
- [x] CountdownTimer flex-wrap on mobile
- [x] Navbar transparency disabled on mobile

---

## Phase 5 — UI Upgrade Pass ✅
- [x] Shared primitives: `Button`, `SectionLabel`, `AnimateIn`, `PageHero`
- [x] Typography refinement (h1 `font-black`, h2 `font-bold`, `tracking-[0.2em]` labels, `text-base sm:text-lg` body)
- [x] Spacing rhythm standardised (`py-24 sm:py-32`, `lg:px-16`, label/heading/body `mb-3`/`mb-6`/`mb-8`)
- [x] Homepage hero rebuilt left-aligned editorial with accent rule
- [x] All inner page heroes unified via `PageHero` (`py-36 sm:py-48` + accent rule)
- [x] Cards rebuilt: ChurchCard (acronym over image), EventCard (date badge), MediaLinks, countdown, forms
- [x] Navbar: active underline indicator, scroll border, dropdown dividers
- [x] Footer: 3-column, circular social icons, bottom bar
- [x] Framer Motion scroll reveals on every page
- [x] Sharp corners site-wide (`rounded-none`) — premium/editorial feel
- [x] Image treatment: hover scale + gradient scrims for text legibility
- [x] Fixed pre-existing `set-state-in-effect` lint error in CountdownTimer

## Phase 5b — Still Outstanding 🔧
- [ ] SEO metadata per page (homepage, books, itinerary, partners, contact still inherit root)
- [ ] Newsletter API (Brevo or Mailchimp)
- [ ] Contact form → Resend (email delivery)
- [ ] Custom 404 page
- [ ] Favicon
- [ ] Page transitions (route-level Framer Motion)

---

## Phase 6 — Pending Client Assets ⏳
- [ ] Minister's real photos (portrait, preaching, casual)
- [ ] BHCC church photos
- [ ] BLCN church photos
- [ ] Ministry logo (AOA Ministries)
- [ ] BHCC logo
- [ ] BLCN logo
- [ ] Event banners (Norwich Prayer Surge)
- [ ] Spotify artist URL
- [ ] Telegram channel URL
- [ ] YouTube channel URL
- [ ] Social media handles
- [ ] Norwich Prayer Surge date + venue + registration link
- [ ] BHCC full address + service times
- [ ] BLCN full address + service times
- [ ] Minister's official biography
- [ ] Partnership vision letter
- [ ] Donation/giving link
- [ ] Ministry email address
- [ ] Custom domain name

---

## Phase 7 — Launch Checklist
- [ ] All assets swapped in
- [ ] All placeholder links replaced with real URLs
- [ ] Contact form tested end-to-end
- [ ] Newsletter form tested end-to-end
- [ ] All pages reviewed by Apostle Ayodele
- [ ] Custom domain connected to Vercel
- [ ] Google Analytics added
- [ ] Final mobile + desktop QA
- [ ] Go live

---

## Design Decisions Log
| Decision | Reason |
|----------|--------|
| Blue/wine/white palette | Premium, ministerial, non-generic |
| Playfair Display headings | Authoritative, editorial feel |
| Gradient backgrounds only | Avoids flat/AI-generated look |
| "Expressions" not "Churches" | Broader — covers churches, media, books, outreaches |
| British English for BHCC | BHCC is UK-based |
| Transparent navbar desktop only | Mobile transparent navbar broke page layouts |
| Unsplash placeholders | Ministry-appropriate until real assets arrive |
| SVG icons not emojis | Professional, brand-accurate |
| Sharp corners (`rounded-none`) | Editorial/premium; matches daghewardmills.org & revival.com reference feel |
| Left-aligned homepage hero | Editorial magazine layout; gives the 8xl name room to land |
| White buttons on dark sections (not `bg-blue`) | `bg-blue → blue-deep` on hover nearly vanishes against navy |
| Countdown in a full-width band | 7xl numerals overflow a half-width column |
| Ghosted quote mark in `blue-navy/5` not `white/5` | Scripture banners sit on light backgrounds |
| Shared `Button`/`SectionLabel`/`PageHero` | ~60 inline button styles and 9 duplicated heroes collapsed to one source of truth |
