# CLAUDE.md — AOA Ministries Project Context

## What This Project Is
A full ministry website for **Ayodele Oladapo Awe Ministries** — a Pastor based in the UK with churches in both the UK and Nigeria. Built in Next.js App Router + Tailwind CSS, deployed on Vercel, source on GitHub.

⚠️ **The title is "Pastor", never "Minister".** All user-facing copy was migrated
in one pass — headings, alt text, metadata, section labels and the `/contact`
subject option ("Book Pastor Awe"). The **variable** `MINISTER_NAME` in
`lib/constants.ts` deliberately keeps its old name (renaming would touch every
import); only its rendered context changed. Two occurrences of "Minister" survive
on purpose because they are the **verb**, not the title: "Invite Pastor Awe to
Minister" (`/media`) and "Let the Worship Minister to You" (`/media/music`).
Don't "fix" those.

---

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS **v4** — there is **no `tailwind.config.ts`**. The theme lives in `app/globals.css` under `@theme inline { … }`.
- **Fonts:** Clash Display only (400/500/600/700) — one face for headings and body alike. Self-hosted from `app/fonts/*.woff2` via `next/font/local`; not a Google font. Playfair Display and Inter were removed.
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

- Sizes: `size="default"` (`px-8 py-3.5 text-sm`) or `size="lg"` (`px-10 py-4 text-base`).
- All buttons are **pills** (`rounded-full`), **sentence case**, no letter-spacing.
  There is no `uppercase` in `Button.tsx` any more, so labels render exactly as
  authored — write them properly at the call site.
- Wine is NEVER used as button bg on dark blue backgrounds.

### No text-link CTAs
**Every call to action is a `Button`.** There are no bare text links with a
trailing arrow (`&rarr;`) anywhere — "Learn more →", "Open →", "Listen →" and
friends were all converted. Inside cards, use `variant="outline"` with a colour
passed via `className` (`text-white` on dark, `text-blue`/`text-wine` on light)
so the CTA reads as a button without the weight of a solid fill.

Exception: **Navbar and Footer navigation lists are not CTAs** — they stay plain
links.

⚠️ A `Button` with `href` renders an `<a>`, so a card whose CTA is a Button
**cannot itself be a link** — nested anchors are invalid HTML. `ChurchCard`,
`MediaLinks`, the `/media` quick-access grid and the `/media/music` platform
grid were each changed from a wrapping `<a>`/`<Link>` to a plain `<div>` for
exactly this reason. Keep the `group` class on that div so the image/heading
hover effects still fire.

---

## Typography Rules
> ⚠️ `font-serif` no longer means a serif. Both `--font-serif` and `--font-sans`
> in `globals.css` now point at Clash Display — the alias was kept so the ~15
> pages using `font-serif` on headings needed no edits. To change the site's
> face, edit the `next/font/local` block in `layout.tsx` and those two lines.
> Nothing else names a font.
>
> ⚠️ **Clash Display stops at 700.** Never use `font-black` or `font-extrabold`
> — there is no 800/900 file, so the browser fakes one and it looks smeared.
> `font-bold` is the heaviest legitimate weight.

- All headings: `font-serif` (→ Clash Display), `leading-tight`
- `h1`: `font-serif font-bold tracking-tight` — 700 is the heaviest weight the font ships
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

## Responsive rules (audited — don't regress these)
The layout was swept with a headless-Chrome probe across 320/360/390/414/768/
1024/1100/1280px on every route, measuring real horizontal overflow (with the
`overflow-x-hidden` band-aid disabled) and tap-target sizes. It currently comes
back clean. The findings that produced these rules:

- **Three-column card grids start at `md:`, never `sm:`.** At the `sm` breakpoint
  (640px) a `sm:grid-cols-3` gave 165px text columns — roughly 20 characters a
  line, far below a readable measure. Every text-bearing 3-col grid is
  `grid-cols-1 md:grid-cols-3`. Icon/stat tiles with a word or two are the
  exception and may go narrower (the BLCN "Follow" grid is `grid-cols-2
  sm:grid-cols-4` on purpose).
- **`AnimateIn` degrades `left`/`right` to `up` below `lg`.** The 40px horizontal
  offset pushed full-width blocks ~24px past a 320px viewport — that overflow,
  not anything in the page markup, is why `<body>` carries `overflow-x-hidden`.
  Below `lg` the columns have stacked anyway, so a sideways reveal is meaningless.
  It also honours `prefers-reduced-motion` by falling back to `fade`.
  ⚠️ Both media queries are read in an **effect**, with `false` as the initial
  state, because `initial="hidden"` is serialised into the SSR markup as an
  inline transform — resolving them during render is a hydration mismatch.
- **`overflow-x-hidden` on `<body>` is now a safety net, not load-bearing.** The
  probe finds zero overflow with it removed. Leave it, but if new overflow ever
  appears, fix the source rather than trusting this to hide it.
- **The mobile menu panel is `top-0 h-dvh`, never `top-0 bottom-0`.** Its parent
  `<header>` has `backdrop-blur-md`, and a backdrop filter makes an element the
  containing block for its `fixed` descendants — so inset-based sizing resolves
  against the ~80px header, not the viewport. The panel also needs
  `overflow-y-auto overscroll-contain`: with the Expressions accordion open the
  list is ~476px tall and does not fit a phone in landscape.
- **Tap targets:** interactive controls get ≥40px. The hero slideshow dots keep
  their 8px visual size inside an `h-11 w-11` button; social icon circles are
  `h-10 w-10 shrink-0` everywhere (Footer and `/contact`). ⚠️ The `shrink-0`
  matters — in a `flex` row those circles were being squeezed to 28px wide and
  rendering as ovals. Inline email links in prose are left at text height, which
  is the standard exemption.

---

## Project Structure
```
app/
  layout.tsx              ← Navbar + Footer wrap
  page.tsx                ← Homepage
  about/page.tsx          ← Bio, mandate, ministry teaser, life & family, stats
  ministry/page.tsx       ← "Three Expressions of Ministry" in full — the three
                            cards, their MINISTRY_PROGRAMMES tag rows, the vision
                            close and an invite CTA
  churches/
    page.tsx              ← "All Expressions" overview page
    bhcc/page.tsx         ← Building House Christian Centre (UK) — British English
    blcn/page.tsx         ← Bethel Livingstone Christian Network (Nigeria)
  events/page.tsx
  media/
    page.tsx
    teachings/page.tsx    ← Telegram teachings page
    music/page.tsx        ← Spotify music page
  books/page.tsx          ← Book showcase + Selar/Amazon buy buttons. ⚠️ The only
                            inner page with a bespoke hero — the cover is the hero
                            (see the /books note under Assets Status)
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
  PageHero.tsx            ← Shared hero for all inner pages. variant: dark | light.
                            Optional `backgroundImage` (+ `imageAlt`,
                            `imagePosition`) puts a photo behind the copy under
                            the standard navy/wine scrim; it forces the dark
                            treatment, so `variant` is ignored when set. Omit
                            `imageAlt` for a purely decorative backdrop (the
                            image is then `aria-hidden`); pass it when the photo
                            is part of the page's subject, as on `/about`
  Navbar.tsx              ← Transparent on desktop hero, solid on scroll; always solid
                            on mobile. Its local `Brand` component is used by both the
                            desktop bar and the mobile menu header: `awe-min-mark.png`
                            at `h-9` plus "AOA Ministries" in text. ⚠️ The full lockup
                            is NOT used here — its two-line wordmark falls under 6px at
                            header scale. Mark in the header, lockup in the footer.
  Footer.tsx              ← Brand column carries the full `awe-min-logo.png` at `w-48`
  HeroSection.tsx         ← 'use client' — homepage full-screen hero (left-aligned,
                            editorial). Crossfading background slideshow: slides
                            stacked absolutely, 6s interval, opacity-only
                            transition, clickable dots. `useState(0)` initial
                            index keeps SSR and first client render identical —
                            never seed the index from Date.now()/random.
  CountdownTimer.tsx      ← 'use client', renders a 'pending' placeholder first so SSR/client hydration match
  NewsletterForm.tsx
  EventCard.tsx
  ChurchCard.tsx        ← Two image modes. `logoUrl` (what both callers use) →
                          the emblem contained on a light plate, no scrim, and
                          the acronym moves into the body. `imageUrl` → the old
                          full-bleed crop + scrim + acronym overlay, reserved
                          for a real photo of that congregation
  MediaLinks.tsx
  SpotifyEmbed.tsx        ← Spotify iframe player. Props: kind ('artist'|'show'|
                            'album'|'track'|'episode'), id (bare ID or a pasted
                            share URL), title, size ('compact' 152px | 'full' 352px)
  icons/AmazonIcon.tsx    ← Amazon "a + smile", currentColor (Simple Icons, CC0)
  icons/SelarIcon.tsx     ← Drawn "S" badge — Selar ships no public SVG mark
  YouTubeEmbed.tsx        ← youtube-nocookie player. Takes videoId OR playlistId
  icons/
    SpotifyIcon.tsx
    TelegramIcon.tsx
    YouTubeIcon.tsx
    InstagramIcon.tsx
    ThreadsIcon.tsx
    FacebookIcon.tsx

lib/
  constants.ts            ← SITE_NAME, MINISTER_NAME, TAGLINE, NAV_LINKS, CHURCHES,
                            SOCIALS (the Pastor's), BLCN_SOCIALS (church),
                            MINISTRY_PROGRAMMES, media/book URLs.
                            `Church` carries address / serviceTimes / email /
                            vision / mission / founded / logo / leadership /
                            socials —
                            all optional, so pages read them with `?.` and render
                            nothing when a field is absent. Both BHCC and BLCN are
                            fully populated; page copy sources address, email,
                            vision, mission and founding date from here rather
                            than hard-coding them.
  telegram.ts             ← Server-side scrape of the public channel preview.
                            getLatestSermons(n) → the n newest audio posts,
                            revalidated hourly. Returns [] on any failure —
                            callers MUST render an empty state
  prayer-surge.ts         ← PRAYER_SURGE (title, location, schedule wording,
                            time range, Isaiah 32:15) + nextPrayerSurge(),
                            which derives the next last-Saturday-of-month
                            10:00 Europe/London occurrence. See below
```

---

## Navbar Behaviour
- **Desktop (lg+):** transparent over hero, `bg-blue-navy/95 backdrop-blur-md` on scroll
- **Mobile (<lg):** always `bg-blue-navy` — no transparency
- **Active links:** `usePathname()` from `next/navigation`
- **Expressions dropdown** (replaces "Churches"):
  - Ministry → `/ministry`  ← the overview the rest of the list outworks
  - All Expressions → `/churches`
  - BHCC → `/churches/bhcc`
  - BLCN → `/churches/blcn`
  - Teachings → `/media/teachings`
  - Music → `/media/music`
  - Books → `/books`
  - Itinerary → `/itinerary`

---

## Ministry Context
- **Pastor:** Ayodele Oladapo Awe (RDP) — Nigerian-born, UK-based. **RDP** =
  **R**evivalist, **D**iscipler, **P**ointer, the tagline set as a pull-quote
  directly under his name on `/about` so the acronym reads without a gloss.
  Called into ministry in **2014**; founder and president of the ministry.
  He is married to **Iyanuoluwa** — the family line on `/about` is deliberately
  brief and mentions no children. Client-supplied; don't expand it.
- **BHCC** = Building House Christian **Centre** — Norwich, UK. Use **British English** for all BHCC content. Founded 9 February 2025; led by Ayodele Oladapo Awe (Lead Pastor) and Iyanuoluwa Ayodele-Awe (Co-Pastor). The founding-story section on `/churches/bhcc` retells a testimony the client supplied — it is a real account of a trance at a 2023 end-of-year retreat, so keep it reverent and don't embellish it.
- **BLCN** = Bethel Livingstone Christian Network (Nigeria) — standard English
- **Key event:** Norwich Prayer Surge (UK) — **recurring**, last Saturday of every
  month, 10:00 AM–5:00 PM (7 hours), Norwich. Vision text is built on Isaiah 32:15
  ("until the Spirit is poured upon us from on high…"), quoted on `/events`. There
  is no fixed date to hard-code — see `lib/prayer-surge.ts`
- **Media:** Spotify music + the "Babylonian Legends" podcast ("Everything Faith and Family") + Telegram teachings — all live, see Assets Status
- **Books:** "Walking with the Holy Spirit: Insights for Supernatural Living" — on sale via Selar and Amazon. Title and subtitle are separate fields on `/books` so the heading stays readable; subtitle uses the small-caps `blue-sky` treatment.
- **Tagline:** "Raising Voices, Building Houses, Transforming Nations"

⚠️ **"Building Houses" is plural only in the tagline and the matching mandate
pillar on `/about`.** The church is **Building House Christian Centre**
(singular) — confirmed by the client. Client copy has arrived with the plural
church name before; correct it to singular on sight.

---

## Content Integrity Notes
⚠️ **Never invent an event, a date, or a testimony as scaffolding.** A
placeholder photo is obviously a placeholder; a placeholder *event* is
indistinguishable from a real one, and on a ministry site it becomes a false
claim about what God has done. Use an honest empty state instead — every one of
them on this site is deliberate, not an unfinished section.

- **The Norwich Prayer Surge is the ONLY confirmed real event on the site.**
  Everything else in `MINISTRY_PROGRAMMES` is a *named programme* with no date
  attached — real, but not scheduled. Don't promote one to a dated event.
- **Its banner image is still an Unsplash placeholder** (`photo-1524368535928…`,
  used on both `/` and `/events`). Needs a real photo or banner from the client.
- **Its vision paragraphs are written-to-brief copy**, not a verbatim client
  statement — the three paragraphs under "Until the wilderness becomes a
  fruitful field" on `/events` were composed from the client's description of
  the gathering. The Isaiah 32:15 quotation itself is scripture and is fine.
  **Flag the surrounding prose for client review/approval.**
- **Past events, other upcoming events and itinerary entries were fabricated as
  UI scaffolding and were removed on 28 July 2026.** For the record, so they are
  not mistaken for lost real content if they surface in git history:
  - `/events` past events — "Kingdom Advancement Conference" (2024), "Night of
    Encounter" (2024), "Building House Prayer Summit" (2023), each captioned
    "God moved powerfully at this gathering." All invented. The 2023 date was
    also impossible: BHCC was founded 9 February 2025.
  - `/events` upcoming — "BHCC Special Service" and "BLCN Revival Meeting",
    both `date: "TBA"` with `registerLink: "#"`. The churches are real; these
    specific services were not.
  - `/itinerary` — "BHCC Sunday Service", "International Ministry Engagement"
    and "BLCN Revival Night", all `date: "TBA"`. The middle one had location
    "TBA" too and so carried no information at all.
- **Do NOT reintroduce invented events or dates as placeholder content.** The
  empty states now in place:
  - `/events` "All Events" — an announcement band, no grid. The featured
    section directly above already carries the Prayer Surge in full, so a
    one-card grid would only repeat it. Kept as a section so the page keeps its
    light → dark → light rhythm.
  - `/events` "What God Has Done" — heading and subtitle retained, with
    "Photos and testimonies from past gatherings will be shared here soon."
  - `/itinerary` "Upcoming Engagements" — heading retained, with the
    check-back-soon message and a "Request an invitation" Button.
  `ENGAGEMENT_TYPES` on `/itinerary` (Church Services, Conferences, Prayer
  Gatherings) **stays** — those describe what the Pastor is available for, they
  are not claimed bookings.

---

## The three ministry expressions (`/ministry`)
`MINISTRY_PROGRAMMES` in `lib/constants.ts` is the list of named programmes the
ministry runs, each tagged with one of three `ProgrammeCategory` values —
`"Apostolic & Prophetic"`, `"Pastoral & Teaching"`, `"Evangelistic"`. It has two
consumers:

- **`/ministry`** renders three expression cards and filters the constant by
  `category` to build the tag row under each card's prose.
- **`/events`** renders the whole list flat in its "Ongoing Programmes" section
  (see below) — a *description of what the ministry runs*, explicitly not a
  schedule.

- **Add a programme to the constant and it appears on both pages** — no page
  edit. That is the whole point of it living in `constants.ts` rather than inline.
- The programme names are also written into the card prose (client-supplied
  copy), so the tag row **intentionally duplicates** them. The tags exist to make
  three dense paragraphs scannable; don't "de-duplicate" by deleting them.
- **Fire Fest Europe Tour** and the **Great Light Campaign (GLC)** are the two
  most likely to want their own landing pages later — both read as recurring
  flagship events. Holyghost Convocation (an annual anchor) is next in line, and
  Partnership Conference would sit naturally under `/partners`. The rest (SHM,
  OTIN, Discipleship Retreats, Special Apostolic Visits, Healing Ministry,
  Summer Harvest Campaign UK) are better served by an `/events` filter than by
  pages of their own. **None of these have pages yet — the data is captured and
  listed, not routed.**

### "Ongoing Programmes" on `/events`
The section sits between the "All Events" band and "What God Has Done", and its
whole job is to say *what the ministry runs regularly* without implying *when*.
Everything about the treatment is load-bearing on that distinction — a programme
name rendered like an event is exactly the failure the Content Integrity Notes
exist to prevent. So:

- **No date field, no image, no per-item CTA.** Each tile is name + optional
  acronym badge + category label, and that is all. One `Button` serves the whole
  section ("Interested in any of these?" → `/contact`).
- **Never render these through `EventCard`.** That component's shape — image,
  date badge, location, Register button — is the visual grammar of a scheduled
  event. The tiles use `border-t-2 border-blue-sky`, the same idiom `/ministry`
  uses for its expression cards and `/itinerary` for `ENGAGEMENT_TYPES`, i.e.
  the site's established "this describes what we do" treatment.
- The subtitle ends "join us as dates are announced" — the one place the absence
  of dates is stated outright. Keep it.
- ⚠️ **The stagger is `(i % 3) * 0.1`, not `i * 0.1`.** `AnimateIn` fires on each
  element's own scroll-in, so with ten tiles a flat index stagger would leave the
  last one invisible for 0.9s after it was already on screen. This is the one
  documented exception to the `delay={index * 0.1}` grid rule; it applies to any
  grid long enough for the accumulated delay to outrun the scroll.
- Adding the section took the light slot before "What God Has Done", so that
  empty state moved to the mid-blue treatment (`from-blue-deep to-blue`,
  `tone="dark"`, `border-l-4 border-blue-sky bg-white/5` panel). `/events` now
  alternates light → mid → light → mid → navy → wine. Two identical light
  gradients stacked have no visible seam, which is why it was restyled rather
  than left alone.

⚠️ **`/about` is written in the first person — it is the one page in the
Pastor's own voice.** The hero reads "Let Me Introduce Myself" over
`apostle-key.jpg`, and `BIO`, `FAMILY` and the "How I Live This Out" heading all
say "I"/"we". Every fact in `BIO` is still the client-supplied biography
verbatim in substance; only the person of the verbs changed. Don't revert it to
third person, and keep new copy added to this page in the same voice. The
`metadata` description stays third person — it is for search results, not for
the reader. Every **other** page (including `/ministry`, which carries the
expression copy) remains third person.

**`/about` was restructured around this split.** It now runs: page hero → bio
(portrait + RDP pull-quote + the real two-paragraph biography) → the mandate
(the umbrella vision, unchanged) → a short "How the Mandate Is Lived Out" teaser
with a Button to `/ministry` → "Life & Family" (family line, stats, Partner CTA,
mid-blue) → churches teaser → CTA banner. The full expression cards live **only**
on `/ministry`; `/about` carries a summary paragraph (`EXPRESSIONS_TEASER`).
⚠️ Don't re-import the card copy into `/about` — keep the summary a summary or
the two pages drift.

"Ministry" is the first item in the Navbar's **Expressions** dropdown (above
"All Expressions") and sits between About and Expressions in the Footer nav. It
is not a top-level nav item: eight top-level links overflow the `lg` breakpoint.

---

## Assets Status
Real assets received (all in `public/images/`, all JPEG):
- `apostle-portrait.jpg` — 640×640 minister portrait. Used on `/`, `/about`, `/itinerary`.
- `apostle-1.jpg` — 2560×1696 landscape, minister preaching with mic; subject
  right of centre. Homepage hero slide 1.
- `apostle-2.jpg` — 1928×2560 **portrait**, minister at a lectern; subject high
  and left of frame. Homepage hero slide 2 — needs `object-[30%_25%]` so the
  full-bleed hero crop doesn't cut his head off.
- `apostle-key.jpg` — 720×960 **portrait**, the Pastor at a keyboard, head bowed;
  face at roughly 45% across and 30% down. The `/about` `PageHero` background.
  Needs `object-[50%_22%]`: a ~2:1 hero crop of a 0.75 portrait shows only ~38%
  of its height, and centring lands on the keys. Verified by simulating the
  `object-cover` maths at 1280×644 — at 22% the crop runs source rows 132–494,
  face centred with headroom. It is only 720px wide, so it upscales ~2× at
  desktop; that is acceptable **because** it sits under the full navy + wine
  scrim and reads as texture (same reasoning as the BLCN blurred-logo hero).
  Don't reuse it anywhere it would render unscrimmed at width.

⚠️ Two lessons from how these arrived, both worth repeating for future assets:

1. **Filenames.** They came in as `apostle-1.jpeg.JPG` / `apostle-2.jpeg.jpg`
   (double extension, one uppercase) and were renamed. Keep image filenames
   lowercase single-extension — Vercel's filesystem is case-sensitive, Windows
   is not, so a casing mismatch builds locally and 404s in production.

   ⚠️ That same case-insensitivity destroys files. `awe-min-logo.PNG` arrived
   uppercase; a `sharp` script read it and wrote its processed output to
   `awe-min-logo.png`, which on Windows **is the same file** — the 5610×4807
   master was overwritten in place by the 1200px derivative, and being untracked
   it was unrecoverable. When processing an asset, always write to a filename
   that differs by more than case (`-mark`, `-2560`, a temp directory), and
   `git add` the original before running anything over it.
2. **Downscale before committing.** They were 4928×3264 (5.2 MB) and 3072×4080
   (2.1 MB) camera originals. Pushing them blew past GitHub's request window
   and the push failed with HTTP 408. Cap the long edge at 2560px and re-encode
   at quality ~82 (`sharp` is already a dependency) — that took the pair from
   7.3 MB to 586 KB with no visible quality loss. Next.js resizes on serve, so
   oversized sources buy nothing and bloat the repo permanently.
- `walking-with-the-holy-spirit.**jpeg**` — 800×1135 book cover. Note the
  `.jpeg` extension; every other image in the folder is `.jpg`. It **is** the
  `/books` hero (see the `/books` note further down), rendered twice within
  that one section: whole and crisp beside the copy, and as its own blurred
  backdrop (`scale-110 opacity-25 blur-3xl`, the BLCN logo-hero idiom) so the
  field carries the cover's colour. ⚠️ It appears nowhere else on the page.
- `blcn-logo.jpg` — 828×647, shofar emblem on a dark charcoal background (**not**
  transparent). Used three ways on `/churches/blcn`: the crisp badge in the hero,
  the **hero background image itself** (`scale-125 object-cover blur-2xl` inside an
  `overflow-hidden` wrapper, under a `bg-black/40` scrim — 828px cannot hold a
  full-bleed crop sharply, so it reads as texture, not as a photo), and the BLCN
  card on `/churches`. There is no stock photo in that hero any more.
- `awe-min-logo.png` — 1200×662 **transparent** ministry lockup: cross + arc +
  mountains beside a two-line "Ayodele Awe Ministries" wordmark, all white. Trimmed
  flush to the artwork, so all padding is the caller's job. Used in the Footer at
  `w-48`. ⚠️ White-on-transparent — it is invisible on a light background; every
  placement must be dark.
- `awe-min-mark.png` — 702×662, the same lockup's **mark only** (cross, arc,
  mountains; wordmark removed), white on transparent. Used in the Navbar at `h-9`.
  Derived by connected-component analysis: the three mark shapes each span >25% of
  the lockup height while no wordmark letter exceeds 12%, which separates them
  cleanly — the mark and wordmark overlap horizontally, so no column crop works.
- `app/icon.png` (512×512) + `app/apple-icon.png` (180×180) — the mark, padded 13%,
  on a solid `#0A1628` navy plate. App Router file conventions, so Next emits the
  `<link rel="icon">` / `apple-touch-icon` tags itself; there is **no** `<head>`
  markup and no `icons` key in `metadata`. The create-next-app `app/favicon.ico`
  was deleted, so `/favicon.ico` now 404s by design.
  ⚠️ The navy plate is deliberate: the mark is white, so a transparent icon would
  vanish in a light browser tab. ⚠️ `sharp` applies `flatten` **before** `extend`,
  so extending with a transparent background and then flattening leaves the padding
  clear — the plate is made by compositing the mark onto an opaque navy canvas.
- `blcn-church-order.jpg` — 432×1080 portrait graphic with BLCN vision/mission/values text baked in. Full text lives in its `alt`; do not duplicate it as body copy.
- `bhcc-logo.jpg` — 1080×1080, the supplied BHCC lockup. ⚠️ **The artwork is not
  square.** It is an 810×243 horizontal lockup (emblem 242×243 at x109/y425, a
  38px gap, then a 530×98 two-line wordmark) floating in a mostly-white 1080px
  square. Dropped into a square slot it renders as a near-blank tile with a
  sub-4px "CHRISTIAN CENTRE" line. **Nothing renders this file directly** — it is
  the master the mark is cut from. Use it only where there is real width.
- `bhcc-mark.png` — 640×640, the emblem alone (orange arc + navy house + hammer),
  cropped from the lockup and padded to ~14% margins, exactly as `awe-min-mark.png`
  was cut from `awe-min-logo.png`. This is BHCC's counterpart to `blcn-logo.jpg`
  and the file every square slot uses: the `/churches/bhcc` hero badge
  (`h-40 w-40 sm:h-48 sm:w-48`) and the BHCC card's `h-9 w-9` badge on `/churches`.
  ⚠️ **White plate, deliberately not transparent** — the emblem is navy and
  orange, so a transparent mark would vanish against the dark hero. That is the
  inverse of `awe-min-mark.png`, which is white-on-transparent and needs a dark
  background. ⚠️ Regenerating it takes **two `sharp` passes**: the pipeline order
  is extract → resize → extend, so chaining `.extend()` before `.resize()` scales
  the padding too and yields 718×717. Pad in one pass, resize in the next. Palette
  PNG (`palette: true`) — flat two-colour art, 85 KB against 409 KB truecolour.

Still Unsplash placeholders — pending from client:
- The `/churches/bhcc` hero background (see below for why the logo can't stand
  in for it). This is the **only** stock image left anywhere on the site that
  represents a church — see "No stock imagery stands for a church" below.
- Event banners

### ⚠️ No stock imagery stands for a church
A placeholder photo is obviously a placeholder *only when nothing labels it*. A
stock photo inside a card headed "BHCC", or captioned `alt="BHCC church
gathering"`, is read by every visitor as a photograph of BHCC — the same failure
mode the Content Integrity Notes describe for invented events. Where an image is
needed to carry a church's identity, **use that church's own emblem**, never a
photograph of strangers. Cleared on 28 July 2026:

- `CHURCHES[].logo` in `constants.ts` holds each church's square emblem
  (`bhcc-mark.png`, `blcn-logo.jpg`). It is the single source — `/` and `/about`
  both read `church.logo` straight through to `ChurchCard`, so neither page
  names an image path.
- `ChurchCard`'s `logoUrl` mode is **contained on a light plate**
  (`from-white to-[#EEF3FA]`, `object-contain p-8`), not cropped full-bleed. A
  light plate because the two emblems carry opposite grounds — BHCC is
  navy/orange on white, BLCN sits on near-black — and only a light panel keeps
  both legible in the same grid row. There is no scrim in this mode (nothing is
  set over the artwork), so the acronym moves out of the image overlay and into
  the body line beside the location.
- The "About BHCC" / "About BLCN" sections on the two church pages use the same
  idea at panel scale: `aspect-square` white mat, `shadow-xl ring-1
  ring-blue-navy/10`, `object-contain`. The mat is the idiom already used by the
  `blcn-church-order.jpg` card further up `/churches/blcn`.
- ⚠️ **The BHCC "About" panel is the one place `bhcc-logo.jpg` renders
  directly.** At `max-w-lg` the lockup lands ~380px across and the "CHRISTIAN
  CENTRE" line stays legible; every smaller square slot must keep using
  `bhcc-mark.png` (see the warning on the file above).
- `ChurchCard.imageUrl` was kept, not deleted — it is the path a real
  congregation photo takes when one arrives. Nothing passes it today.
- Removed in this pass: `photo-1470116945706…` (BHCC) and
  `photo-1583743814966…` (BLCN), which appeared four times between them —
  `/` and `/about` church cards, and the About sections of both church pages.
  Neither depicted the church.
- `/churches` already used the emblems (as 36px badges) and needed no visual
  change, but its `EXPRESSIONS` literal had the two paths written out again.
  They now come from a `logoFor(acronym)` helper reading `CHURCHES`, so every
  **cross-page** consumer of a church emblem (`/`, `/about`, `/churches`) goes
  through `CHURCHES[].logo`. The array's seven non-church entries stay literal;
  they have no counterpart in constants.ts.
- ⚠️ **A church's own page is the exception and still names files directly.**
  `/churches/bhcc` renders `bhcc-mark.png` in the hero badge but
  `bhcc-logo.jpg` in the About panel, and `/churches/blcn` renders
  `blcn-logo.jpg` three ways (blurred backdrop, crisp badge, About panel).
  These are page-specific renditions of different assets, so one `logo` field
  cannot express them — don't try to route them through constants.ts.
- **Not affected:** the decorative Unsplash textures behind the `/about`
  mandate, the `/` and `/partners` partnership bands and the `/media` Telegram
  card. Those are `aria-hidden` backdrops under a heavy scrim, labelled as
  nothing — they carry no claim about a church.

⚠️ **BLCN's blurred-logo hero background has no BHCC equivalent, on purpose.**
`/churches/blcn` uses `blcn-logo.jpg` as its own hero backdrop (`scale-125
blur-2xl` under a `bg-black/40` scrim) because that emblem sits on near-black and
blurs into usable dark texture. BHCC's mark is on white: blurred full-bleed it
washes to a flat grey field under the same scrim, losing both the artwork and the
imagery. The BHCC hero keeps a photo. Don't "finish the mirror" by porting it.

⚠️ **The ministry logo master is lost.** Only the 1200×662 derivative survives (see
the filename warning above). Ask the client to re-supply the original if a larger
rendition is ever needed — print, an og:image, or a light-background variant, none
of which the current white-on-transparent file can serve.

Pending, **not** on a placeholder image: a portrait of **Iyanuoluwa Ayodele-Awe**
for the BHCC leadership grid. `ChurchLeader.image` is left undefined for her, and
`/churches/bhcc` renders an initials block ("IA" on the dark gradient) plus a
"Photo coming soon" caption instead. Drop the file in `public/images/` and set
`image` in `CHURCHES` — no page edit needed. Never point `image` at a stock photo
of a stranger to fill the gap.

Live links (in `lib/constants.ts`):
- `SOCIALS.spotify` — Spotify artist page
- `SOCIALS.telegram` — Telegram channel
- `SOCIALS.instagram` — Instagram
- `SOCIALS.threads` — Threads (`ThreadsIcon` is `currentColor`, unlike the other
  brand icons which carry hardcoded fills — the wrapping anchor sets its colour)
- `SOCIALS.linktree` — Linktree hub ("All Links" in Footer + Contact)
- `SPOTIFY_PODCAST_URL` — Spotify podcast show ("Babylonian Legends")
- `SPOTIFY_PODCAST_NAME` / `SPOTIFY_PODCAST_TAGLINE` — podcast title + "Everything Faith and Family"
- `SOCIALS.youtube` — YouTube channel (@ayodeleawelive)
- `SOCIALS.facebook` — the minister's Facebook (`web.facebook.com/awe.ayo`)
- `SELAR_BOOK_URL` / `AMAZON_BOOK_URL` — book purchase links
- `ANCHOR_FM_URL` — Anchor.fm podcast host, in the `/media/music` platform grid

`BLCN_SOCIALS` (also hung off the BLCN entry in `CHURCHES` as `socials`) holds
the church's **own** accounts — separate from the minister's `SOCIALS`:
YouTube @blcnglobal, Instagram @blcnekiti + @blcnglobal, Facebook /blcnglobal.
Surfaced on `/churches/blcn` ("Follow BLCN") and the BLCN card on `/contact`.

Both Facebook URLs use the `web.facebook.com` host as supplied by the client,
not `www.` — leave them as given.

Every social icon in the Footer and on `/contact` is now live, so the
`href === "#"` dimming guard was removed from both rows — `SOCIALS` is `as
const`, so TypeScript rejects the comparison once no value is `"#"`. If a link
ever needs pulling again, re-add the guard alongside the placeholder.

Still `#` placeholders — real URLs pending:
- Apple Music, Audiomack (music page platform grid)

`/events` has no `#` links left — the two placeholder events that carried them
were removed (see Content Integrity Notes). The Prayer Surge never needed one:
it is an open monthly meeting, so its CTA points at `/contact` (and `/` points
at `/events`).

## The Norwich Prayer Surge countdown
`lib/prayer-surge.ts` computes the next occurrence instead of storing a date,
because the gathering recurs on the **last Saturday of every month at 10:00**.

⚠️ **Call `nextPrayerSurge()` inside the component, never at module scope.**
Module constants are evaluated once when the module loads and would survive
every revalidation, re-freezing the date. Both `/` and `/events` therefore set
`export const revalidate = 3600` — the build output shows `Revalidate 1h` on
them, alongside `/media/teachings`.

- The 10:00 start is **Europe/London wall-clock**, resolved to a UTC instant via
  `Intl.DateTimeFormat` offset lookup, so it stays 10:00 through BST and GMT
  alike. One offset correction suffices: 10:00 is nowhere near a DST boundary.
- A gathering in progress still counts as "next" until its 7 hours are up, so
  the countdown reads "This event has started!" rather than jumping to next
  month mid-meeting.
- `EventCard` takes an optional `ctaLabel` (default `"Register"`) for events
  with no registration to complete.

## On-site players
- **Spotify** — `SPOTIFY_ARTIST_ID` / `SPOTIFY_PODCAST_ID` feed `SpotifyEmbed` on
  `/media` and `/media/music`. ⚠️ Visitors not logged into Spotify get **30-second
  previews**; full playback needs a Spotify login. Platform rule, not fixable here.
- **Telegram** — **live, no embed, no hosted audio.** `/media/teachings` lists the
  5 most recent sermons by scraping the channel's public preview server-side via
  `lib/telegram.ts`, refreshed hourly (`next: { revalidate: 3600 }`, so the route
  is ISR — the build output shows `Revalidate 1h`). Each row is title, date and a
  "Listen on Telegram" Button. **Sermons no longer need adding by hand** — posting
  to Telegram is enough. The old hand-curated `SERMONS` array and the
  `TelegramPost` embed component are both deleted.

  ⚠️ **There is no on-site playback, by design, and Telegram cannot provide it.**
  The `?embed=1` response for an audio post is static markup — a
  `tgme_widget_message_document` card wrapped in a plain `<a>` to t.me. Verified
  against the live endpoint: zero `<audio>` elements, no voice-player markup, no
  media URL, no play control; `mode=tme` makes no difference. Don't reintroduce
  the embed hoping for a player, and never write copy promising one.

  **How the scrape works** (`lib/telegram.ts`):
  - `t.me/s/<channel>` is server-rendered HTML holding the last 20 posts;
    `?before=<id>` pages backwards. No bot token, no API key.
  - A post counts as a sermon when its document icon carries the `audio`
    modifier (`tgme_widget_message_document_icon … audio`). Text devotionals,
    cover images and link previews are skipped.
  - ⚠️ **Paging back is essential, not an optimisation.** The channel posts daily
    text devotionals, so the newest page is routinely *all* text — a single fetch
    returns zero sermons. `MAX_PAGES = 8` (~160 posts) walks back far enough.
  - ⚠️ **No duration is available.** Audio-document markup carries only title and
    performer. `Sermon.duration` is wired up (it reads a `_duration` node, which
    voice notes and video do expose) but is empty for every post on this channel.
    It renders only when present — never synthesise a value.
  - Untagged uploads inherit their filename as the title, e.g. post 1331 is just
    "Audio". `isGenericTitle` catches those and falls back to the first sentence
    of the post caption.
  - **This is scraping, not an API contract.** If Telegram restyles the preview,
    the parser silently matches nothing and `getLatestSermons` returns `[]`. The
    page renders "New teachings coming soon" plus a channel link in that case —
    keep that fallback in place.
- **YouTube** — `YOUTUBE_UPLOADS_PLAYLIST_ID` is `null`, so `/media/teachings`
  renders a link-out card instead of a player. YouTube cannot embed a channel by
  @handle. To switch the player on: take the channel ID (`UC…`), swap the leading
  `UC` for `UU` (that is the auto-generated all-uploads playlist), paste it in.

Anything still on `#` is rendered dimmed + `pointer-events-none`, with a
"Coming Soon" badge where the card has room. Never give a `#` href
`target="_blank"` — it opens an empty tab.

`/books` is fully populated — real title, subtitle, two-paragraph description
and cover artwork are all in place. Nothing outstanding on that page.

### ⚠️ `/books` is the one inner page that does NOT use `PageHero`
The cover **is** the hero: a two-column section (copy + buy Buttons left, the
cover right at `lg`), over a blurred enlargement of the cover itself. This is a
deliberate exception to the "don't hand-roll inner-page heroes" rule, because
`PageHero`'s backdrop is `object-cover` full-bleed and the cover is a 0.705
portrait — a ~2:1 crop shows barely a third of its height and slices the title
lettering, which then sits directly under the `h1`. The section copies
`PageHero`'s rhythm, type scale and `w-16 h-0.5 bg-blue-sky` rule verbatim so
the page still reads as part of the set; keep them in step if `PageHero`
changes. Everything else on the site still goes through `PageHero`.

- The cover renders at its **intrinsic** 800×1135 with no aspect box and no
  `object-cover`, so it is uncropped — the point of giving it the hero. It is
  also the one image on the site outside an `overflow-hidden` hover-scale
  container: it is the subject, not a card thumbnail.
- **The cover is not repeated below the hero.** The section under it ("Inside
  the Book") is text only — title, subtitle, description, buy Buttons on a
  `border-t-2 border-blue-sky` block. A second full-size rendition one scroll
  later reads as a mistake, not emphasis. It previously sat in an
  `aspect-[2/3]` `object-cover` box there; that block is gone.
- `FEATURED = BOOKS[0]` drives the hero, while the section below still maps the
  whole `BOOKS` array. Add a second title and it appears below while the hero
  keeps carrying the first.

---

## What Still Needs Building
- [ ] Newsletter API wired to Brevo or Mailchimp
- [ ] Contact form wired to Resend (emails to minister). The subject → church-inbox
      routing is already resolved in `app/api/contact/route.ts` (`CHURCH_INBOXES`
      maps "Church Information (BHCC)" → `Info.buildinghousecc@gmail.com` and
      "(BLCN)" → `blcnglobal@gmail.com`) and passed through as `cc`; nothing is
      sent yet, so wiring Resend is a one-line change at that call site.
- [ ] SEO metadata per page (title, description, og:image)
- [ ] Custom 404 page
- [x] Favicon — `app/icon.png` + `app/apple-icon.png`, the ministry mark on navy
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
- **Corners are mixed by design.** Buttons are pills (`rounded-full`); single-line form fields are pills, the contact textarea is `rounded-3xl`; embedded players are `rounded-2xl`. Cards, panels and image containers stay **sharp** (`rounded-none`) — that structural contrast is deliberate, don't round them. Social icon circles and hero dots remain round as before.
- Wrap every card, heading block and column in `AnimateIn`. Grid children get a staggered `delay={index * 0.1}` and `className="h-full"` so the wrapper inherits the grid cell height.
- Images live in an `overflow-hidden` container with `object-cover transition-transform duration-700 group-hover:scale-105`.
- Any photo carrying text over it needs a scrim (`bg-gradient-to-b from-black/70 via-transparent to-black/80` or similar).
- Don't hand-roll section labels, buttons or inner-page heroes — use `SectionLabel`, `Button`, `PageHero`. The single exception is the `/books` hero, where the book cover is the subject and `PageHero`'s full-bleed backdrop crop would destroy it — see the `/books` note above.
