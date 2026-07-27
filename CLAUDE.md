# CLAUDE.md — AOA Ministries Project Context

## What This Project Is
A full ministry website for **Ayodele Oladapo Awe Ministries** — a minister of the Gospel based in the UK with churches in both the UK and Nigeria. Built in Next.js App Router + Tailwind CSS, deployed on Vercel, source on GitHub.

---

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS **v4** — there is **no `tailwind.config.ts`**. The theme lives in `app/globals.css` under `@theme inline { … }`.
- **Fonts:** Playfair Display (serif, headings — 400/700/900) + Inter (sans, body — 400/500/600/700)
- **Animation:** Framer Motion, via the `AnimateIn` wrapper (see Components)
- **Images:** Next.js `<Image>` — Unsplash placeholders until real assets arrive
- **Icons:** Custom SVG components in `components/icons/` (Spotify, Telegram, YouTube, Instagram, Facebook) + `lucide-react`
- **Forms:** Plain React `useState` (no React Hook Form) — API routes at `/api/newsletter`, `/api/contact`, `/api/partner`
- **Hosting:** Vercel (auto-deploys on push to main)
- **Repo:** https://github.com/caleboluwapelumi-cmd/ayodele-awe-ministries

---

## Color System (`app/globals.css` → `@theme inline`)
```
--color-white: #FFFFFF
--color-cream: #F8F9FC
--color-blue-sky:  #4A90D9   ← labels, accent rules, links
--color-blue:      #1B4F8A   ← primary buttons on light bg
--color-blue-deep: #0F2D5A   ← mid sections
--color-blue-navy: #0A1628   ← dark sections, navbar, footer
--color-wine-light: #8B2346
--color-wine:       #6B1530  ← CTAs on light bg, accent banners
--color-wine-deep:  #4A0D20  ← hero overlays, dark accent sections
--color-muted:      #6B7A99
```

### ⚠️ Class naming (Tailwind v4)
There is **no `-DEFAULT` suffix** in Tailwind v4. Use `bg-blue` / `text-wine`, **never** `bg-blue-DEFAULT` / `bg-wine-DEFAULT` — those silently produce no styles.

### Background Gradient Rules
- **Dark hero/feature:** `bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep`
- **Mid sections:** `bg-gradient-to-r from-blue-deep to-blue-DEFAULT`
- **Light sections:** `bg-gradient-to-br from-white to-[#EEF3FA]`
- **Accent/CTA:** `bg-gradient-to-br from-wine-deep via-wine-DEFAULT to-wine-light`
- **Footer/Newsletter:** `bg-gradient-to-b from-blue-navy to-blue-deep`
- **Never use flat solid backgrounds — always gradients**

### Button Rules
**Never write inline button styles.** Use `components/Button.tsx` and pick the variant for the section background:
| Section background | `variant` | Renders |
|---|---|---|
| Light (white/cream) | `primary` | `bg-blue text-white hover:bg-blue-deep` |
| Dark blue (navy/deep) | `secondary` | `bg-white text-blue-navy hover:bg-cream` |
| Wine / accent | `wine` | `bg-white text-wine hover:bg-cream` |
| Any (secondary action) | `outline` | `border border-current hover:bg-white/10` — pass `className="text-white"` on dark |

- Sizes: `size="default"` (`px-7 py-3.5 text-xs`) or `size="lg"` (`px-8 py-4 text-sm`).
- All buttons are **sharp-cornered** (`rounded-none`), uppercase, `tracking-widest`.
- Wine is NEVER used as button bg on dark blue backgrounds.

---

## Typography Rules
- All headings: `font-serif` (Playfair Display), `leading-tight`
- `h1`: `font-serif font-black tracking-tight` — never `font-bold` or lighter
- `h2`/`h3`: `font-serif font-bold` — **never** `font-medium` or lighter on a heading
- Section labels above headings: use `components/SectionLabel.tsx` (`font-sans text-xs font-semibold uppercase tracking-[0.2em]`), `tone="light"` on light sections, `tone="dark"` on dark, `tone="onAccent"` on wine
- Body copy: `font-sans text-base sm:text-lg leading-relaxed`
- Body text on dark: `text-white/70` · on light: `text-muted`
- Heading size scale — h1 (page hero): `text-4xl sm:text-6xl`; h1 (full-screen hero): `text-5xl sm:text-7xl md:text-8xl`; h2: `text-3xl sm:text-4xl md:text-5xl`

---

## Spacing & Rhythm
- Sections: `px-4 py-24 sm:px-6 sm:py-32 lg:px-16`
- Inner container: `mx-auto max-w-7xl`
- Centred/single-column blocks: `mx-auto max-w-3xl text-center`
- Vertical rhythm inside a block: label `mb-3` → heading `mb-6` → body `mb-8`
- Full-screen heroes: `relative flex min-h-screen items-center overflow-hidden`
- Inner page heroes: use `components/PageHero.tsx` (`py-36 sm:py-48` + the `w-16 h-0.5 bg-blue-sky` rule)
- Decorative rule under centred headings: `mx-auto h-0.5 w-16 bg-blue-sky`

---

## Project Structure
```
app/
  layout.tsx              ← Navbar + Footer wrap
  page.tsx                ← Homepage
  about/page.tsx
  churches/
    page.tsx              ← "All Expressions" overview page
    bhcc/page.tsx         ← Building House Christian Centre (UK) — British English
    blcn/page.tsx         ← Bethel Livingstone Christian Network (Nigeria)
  events/page.tsx
  media/
    page.tsx
    teachings/page.tsx    ← Telegram teachings page
    music/page.tsx        ← Spotify music page
  books/page.tsx          ← Coming soon
  itinerary/page.tsx
  partners/page.tsx
  contact/page.tsx
  api/
    newsletter/route.ts
    contact/route.ts
    partner/route.ts

components/
  AnimateIn.tsx           ← 'use client' — Framer Motion scroll reveal. Props: direction 'up'|'left'|'right'|'fade', delay, className
  Button.tsx              ← THE button. Variants: primary | secondary | outline | wine. Sizes: default | lg
  SectionLabel.tsx        ← The small-caps eyebrow above every heading. tone: dark | light | onAccent
  PageHero.tsx            ← Shared hero for all inner pages. variant: dark | light
  Navbar.tsx              ← Transparent on desktop hero, solid on scroll; always solid on mobile
  Footer.tsx
  HeroSection.tsx         ← Homepage full-screen hero (left-aligned, editorial)
  CountdownTimer.tsx      ← 'use client', renders a 'pending' placeholder first so SSR/client hydration match
  NewsletterForm.tsx
  EventCard.tsx
  ChurchCard.tsx
  MediaLinks.tsx
  icons/
    SpotifyIcon.tsx
    TelegramIcon.tsx
    YouTubeIcon.tsx
    InstagramIcon.tsx
    FacebookIcon.tsx

lib/
  constants.ts            ← SITE_NAME, MINISTER_NAME, TAGLINE, NAV_LINKS, CHURCHES, SOCIALS
```

---

## Navbar Behaviour
- **Desktop (lg+):** transparent over hero, `bg-blue-navy/95 backdrop-blur-md` on scroll
- **Mobile (<lg):** always `bg-blue-navy` — no transparency
- **Active links:** `usePathname()` from `next/navigation`
- **Expressions dropdown** (replaces "Churches"):
  - All Expressions → `/churches`
  - BHCC → `/churches/bhcc`
  - BLCN → `/churches/blcn`
  - Teachings → `/media/teachings`
  - Music → `/media/music`
  - Books → `/books`
  - Itinerary → `/itinerary`

---

## Ministry Context
- **Minister:** Ayodele Oladapo Awe — Nigerian-born, UK-based
- **BHCC** = Building House Christian **Centre** (UK) — use **British English** for all BHCC content
- **BLCN** = Bethel Livingstone Christian Network (Nigeria) — standard English
- **Key event:** Norwich Prayer Surge (UK) — date TBA, placeholder countdown active
- **Media:** Spotify music + Telegram teachings (links are `#` placeholders — real URLs pending)
- **Tagline:** "Raising Voices, Building Houses, Transforming Nations"

---

## Assets Status
Real assets received (all in `public/images/`, all JPEG):
- `apostle-portrait.jpg` — 640×640 minister portrait. Used on `/`, `/about`, `/itinerary`.
- `blcn-logo.jpg` — 828×647, shofar emblem on a dark charcoal background (**not** transparent). Used on `/churches/blcn` hero + the BLCN card on `/churches`.
- `blcn-church-order.jpg` — 432×1080 portrait graphic with BLCN vision/mission/values text baked in. Full text lives in its `alt`; do not duplicate it as body copy.

Still Unsplash placeholders — pending from client:
- BHCC logo + BHCC/BLCN church photos (BHCC stays acronym-only until its assets arrive)
- Event banners
- Ministry logo + favicon

All social/platform links are `#` placeholders — real URLs pending:
- Spotify artist URL
- Telegram channel URL
- YouTube channel URL
- Instagram, Facebook

---

## What Still Needs Building
- [ ] Newsletter API wired to Brevo or Mailchimp
- [ ] Contact form wired to Resend (emails to minister)
- [ ] SEO metadata per page (title, description, og:image)
- [ ] Custom 404 page
- [ ] Favicon (AOA initials)
- [ ] Page transition animations (Framer Motion)
- [ ] Real assets swapped in when client provides them
- [ ] Custom domain pointed to Vercel
- [ ] Google Analytics

---

## Coding Rules for This Project
- Always use `'use client'` on components with useState, useEffect, usePathname
- Always use Next.js `<Link>` not `<a>` for internal routes (or `Button` with `href`, which picks the right one)
- Always use Next.js `<Image>` not `<img>` for images
- Add `images.unsplash.com` to `next.config.ts` remotePatterns if adding new Unsplash images
- British English for ALL BHCC-related content (centre, honour, organise, programme, etc.)
- No flat solid backgrounds — always use gradient pairs
- No gold — that was the old design system. Current system is blue/wine/white
- Responsive grid rule: always `grid-cols-1` base, scale up with `sm:` and `lg:`
- **Sharp corners everywhere** — buttons, cards and panels are `rounded-none`. The only rounded elements are the social icon circles in the Footer/Contact page.
- Wrap every card, heading block and column in `AnimateIn`. Grid children get a staggered `delay={index * 0.1}` and `className="h-full"` so the wrapper inherits the grid cell height.
- Images live in an `overflow-hidden` container with `object-cover transition-transform duration-700 group-hover:scale-105`.
- Any photo carrying text over it needs a scrim (`bg-gradient-to-b from-black/70 via-transparent to-black/80` or similar).
- Don't hand-roll section labels, buttons or inner-page heroes — use `SectionLabel`, `Button`, `PageHero`.
