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
- **Images:** Next.js `<Image>`, AVIF→WebP, **all local** — no remote image host
  is used any more. Gradient placeholders stand in where real photography is
  still pending (see Assets Status)
- **Icons:** Custom SVG components in `components/icons/` (Spotify, Telegram, YouTube, Instagram, Facebook) + `lucide-react`
- **Forms:** Plain React `useState` (no React Hook Form) — API routes at `/api/newsletter`, `/api/contact`, `/api/partner`, `/api/birthday-testimony`
- **Storage:** `@vercel/kv` — **only** `/api/birthday-testimony` uses it. Nothing else on the site has a datastore
- **Email:** `resend` — **only** `/api/birthday-testimony` uses it. ⚠️ `/api/contact`, `/api/newsletter` and `/api/partner` are still `console.log` stubs; installing Resend did **not** wire them up
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

### ⚠️ `/birthday` has its own palette — these tokens are additive
The birthday page is a standalone shareable and runs on white / deep blue /
orange, not the site's blue/wine. Its tokens live in the same `@theme inline`
block, prefixed `bday-`, and **nothing above changed** — the main site is
untouched for launch.

```
--color-bday-navy:         #011E3C  ← gradient dark end
--color-bday-blue:         #013161  ← secondary; headings on white
--color-bday-blue-mid:     #024A8F  ← gradient light end, glows, confetti
--color-bday-orange:       #EB6434  ← THE brand accent
--color-bday-orange-deep:  #BC4820  ← solid CTA fill; accent text on light
--color-bday-orange-dark:  #9C3A18  ← CTA hover
--color-bday-orange-light: #FF9A70  ← accent text on dark
--color-bday-ink:          #45566B  ← body copy on the light sections
```

⚠️ **The three oranges are not interchangeable, and picking by eye will fail
contrast.** #EB6434 is 3.3:1 on white and 4.0:1 on the deep blue — that clears
AA *large* (3:1) so it is right for a 60px countdown numeral, a glow, a rule or
a border, and wrong for every piece of small text on the page. Each figure
below is measured against the ground the tone actually renders on:

| Tone | Use | Measured |
|---|---|---|
| `bday-orange-deep` | CTA fill (white label); 12px accent text on light | 5.1:1 under white, 4.7:1 on the `#F1F5FA` tint |
| `bday-orange-dark` | CTA hover | 6.9:1 under white |
| `bday-orange-light` | 12px accent text on **dark only** | 4.8:1 at the brightest point of the hero glow; **2.2:1 on white** |

⚠️ **Measure against the card, not the section.** The countdown tiles and the
giving cards are `bg-white/[0.07]`, which lifts their ground appreciably. White
text at `/50` is 4.4:1 on the flat deep blue but only **3.6:1** on the card — the
label opacities in `CopyField` (`/70`) and `BirthdayCountdown` (`/65`) are set
from the card figure and are not free to be dialled back down.

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
| **`/birthday` only** | `birthday` | `bg-bday-orange-deep text-white hover:bg-bday-orange-dark` |

⚠️ The `birthday` fill is `bday-orange-deep` (#BC4820), **not** the brand
`bday-orange` (#EB6434) — white on the brand orange is 3.3:1 and fails AA for a
16px label. It reads as the same orange. Don't "correct" it to the brand token.

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
- Section labels above headings: use `components/SectionLabel.tsx` (`font-sans text-xs font-semibold uppercase tracking-[0.2em]`), `tone="light"` on light sections, `tone="dark"` on dark, `tone="onAccent"` on wine. `/birthday` adds `tone="bdayDark"` / `tone="bdayLight"` — see the birthday palette above for why each takes a different orange
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
⚠️ **The tree has two chrome branches.** `app/layout.tsx` carries `<html>`,
`<body>`, the font and `metadataBase` — and no chrome at all. The Navbar and
Footer live in `app/(site)/layout.tsx`, and `/birthday` sits **outside** that
group with its own minimal layout so it renders neither. See "The birthday
page" below for why. `(site)` is a route group, so it contributes nothing to
any URL — `app/(site)/about/page.tsx` is still `/about`, and the build output
is unchanged route for route.

```
vercel.json               ← `regions: ["lhr1"]` only. See "Deployment region"
app/
  layout.tsx              ← <html>/<body>, font, metadataBase. NO chrome
  (site)/                 ← route group: everything that gets Navbar + Footer
    layout.tsx            ← Navbar + <main className="pt-[72px] lg:pt-0"> + Footer
    page.tsx              ← Homepage
    about/page.tsx        ← Bio, mandate, ministry teaser, life & family, stats
    ministry/page.tsx     ← "Three Expressions of Ministry" in full — the three
                            cards, their MINISTRY_PROGRAMMES tag rows, the vision
                            close and an invite CTA
    churches/
      page.tsx            ← "All Expressions" overview page
      bhcc/page.tsx       ← Building House Christian Centre (UK) — British English
      blcn/page.tsx       ← Bethel Livingstone Christian Network (Nigeria)
    events/page.tsx
    media/
      page.tsx
      teachings/page.tsx  ← Telegram teachings page
      music/page.tsx      ← Spotify music page
    books/page.tsx        ← Book showcase + Selar/Amazon buy buttons
    itinerary/page.tsx
    partners/page.tsx
    contact/page.tsx
  birthday/               ← OUTSIDE (site): standalone, no Navbar, no Footer
    layout.tsx            ← bare <main className="bg-white">
    page.tsx              ← One-off birthday page, 3 August 2026. Shared by
                            direct link only. See below
    admin/page.tsx        ← Password-gated testimony reader. Utility page,
                            no hero, no reveals, not linked from anywhere.
                            Inherits the birthday layout, so no chrome either
  api/
    newsletter/route.ts
    contact/route.ts
    partner/route.ts
    birthday-testimony/route.ts  ← POST stores to KV + emails via Resend;
                                   GET lists (`?include=active|archived|all`,
                                   default active); PATCH archives/restores one.
                                   ⚠️ GET is unauthenticated; PATCH is NOT
    birthday-admin/route.ts      ← POST { password } → { ok }. Exists because a
                                   client component cannot read a non-
                                   NEXT_PUBLIC env var

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
                            ⚠️ Slides after the first are NOT rendered until
                            2.5s after hydration — see "The hero slideshow
                            defers slide 2" below. Don't collapse that back to
                            a plain `.map()`.
  CountdownTimer.tsx      ← 'use client', renders a 'pending' placeholder first so SSR/client hydration match
  BirthdayCountdown.tsx   ← 'use client' — the /birthday centrepiece. Same 'pending'
                            hydration contract as CountdownTimer, but resolves the
                            before/during/after phase too and swaps the clock for a
                            celebration message. Larger type, sharp bordered tiles
  BirthdayConfetti.tsx    ← 'use client' — decorative drifting dots for the /birthday
                            hero. ⚠️ Positions are a hard-coded table, NEVER
                            Math.random() (hydration). Honours prefers-reduced-motion
                            by rendering the dots still, not by removing them
  BirthdayTestimonyForm.tsx ← 'use client' — posts to /api/birthday-testimony.
                            ⚠️ Fields are `text-base` (16px) and that is not a
                            style choice: iOS Safari zooms the viewport on focus
                            for anything smaller and never zooms back out.
                            Its success state is also where giving is offered —
                            see "Giving is a modal" below
  BirthdayGiving.tsx      ← 'use client' — `GivingProvider` (owns the account
                            data + the modal), `useGiving()` and `GiveButton`.
                            The ONLY route to the account details; there is no
                            giving section on the page. See below
  icons/FlagIcons.tsx     ← `UnitedKingdomFlag`, `NigeriaFlag`, `CountryFlag`.
                            Drawn SVG, because 🇬🇧/🇳🇬 emoji have no glyph on
                            Windows. See "Country flags" below
  CopyToClipboard.tsx     ← 'use client' — exports `CopyField` (labelled account row
                            + copy icon button) and `SharePage` (native share sheet
                            where supported, else copy, plus a WhatsApp link).
                            `navigator.clipboard` needs a secure context, so there
                            is an execCommand fallback for in-app browsers
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
                            (`SelarIcon`, the drawn stand-in "S" badge, is gone —
                            the real wordmark arrived, see Assets Status)
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
  london-time.ts          ← londonOffsetMs() / londonInstant(), the Europe/London
                            wall-clock → UTC helpers. Extracted from
                            prayer-surge.ts when /birthday needed the same maths;
                            prayer-surge.ts now imports them rather than
                            defining its own. Behaviour is unchanged
  birthday.ts             ← The 3 August 2026 birthday: BIRTHDAY_STARTS_AT /
                            BIRTHDAY_ENDS_AT (ISO), birthdayPhase(), the shared
                            `Testimony` shape and `testimonyId()`. See below
  admin-auth.ts           ← `checkAdminPassword()`, the timing-safe compare
                            against BIRTHDAY_ADMIN_PASSWORD. Server-only —
                            shared by /api/birthday-admin and the PATCH on
                            /api/birthday-testimony
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
- **Its banner is a gradient placeholder** on both `/` and `/events`. It was an
  Unsplash crowd shot carrying `alt="Norwich Prayer Surge"` — a photo of
  strangers presented as a photo of this gathering — removed 2 August 2026.
  Needs a real photo or banner from the client; don't put stock back.
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
  `.jpeg` extension; every other image in the folder is `.jpg`. Used on
  `/books`, twice: as the `PageHero` background image and, crisp, in the book
  block below it.
- `selar-logo.png` — 188×148 **transparent** Selar wordmark, deep plum
  (~#601050) script. ⚠️ **Nothing renders this file** — the artwork is a 138×73
  horizontal wordmark floating in a 188×148 canvas (35px of clear space above,
  40px below), so dropped into any slot it renders at roughly half the height
  it should. It is the master, kept as supplied.
- `selar-wordmark-white.png` — 138×73, the same wordmark trimmed flush to its
  ink and recoloured **all white**. This is the file that renders: the "Buy on
  Selar" button on `/books`, sitting directly on the blue `primary` pill with
  no plate behind it. All padding is the caller's job. Replaced
  `components/icons/SelarIcon.tsx`, the drawn "S" badge that stood in while
  Selar had no usable mark; that component is deleted.
  ⚠️ **White on transparent — every placement must be dark**, same constraint
  as `awe-min-logo.png`. If the mark is ever needed on a light section, cut a
  plum rendition from the master rather than putting a plate behind this one.
  The `alt` is empty and it is `aria-hidden` because the button label already
  reads "Buy on Selar".
  ⚠️ Regenerate it from the **alpha channel**, not by filling the plum: extract
  the ink box, then drive R/G/B to 255 across every pixel and leave alpha
  untouched. The alpha carries the glyph shape *and* its antialiased edges, so
  a colour-key or threshold approach leaves a plum fringe on the curves.
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
- `app/icon.png` (512×512) + `app/apple-icon.png` (180×180) + `app/favicon.ico`
  (16/32/48) — the mark, padded 13%, on a solid `#0A1628` navy plate. App Router
  file conventions, so Next emits the `<link rel="icon">` / `apple-touch-icon`
  tags itself; there is **no** `<head>` markup and no `icons` key in `metadata`.
  ⚠️ **`favicon.ico` is required, not redundant — restored 2 August 2026.** The
  create-next-app one had been deleted on the reasoning that `icon.png` covers
  it. It does not: browsers request `/favicon.ico` at the origin root regardless
  of the `<link>` tags, for bookmarks, history entries, new-tab tiles and in-app
  browsers that never parse the head. With the file absent that request 404s,
  and a 404 is what gets cached. See "Why the favicon looked broken" below.
  ⚠️ It is a **PNG-compressed ICO** built from `icon.png` — `sharp` cannot write
  ICO, so the container is assembled by hand (6-byte ICONDIR + one 16-byte
  ICONDIRENTRY per size + the PNG blobs). PNG-in-ICO keeps the alpha channel and
  avoids hand-rolling a BMP/DIB encoder with its bottom-up rows and AND mask.
  Regenerate it the same way if `icon.png` ever changes.
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

### ⚠️ There are no Unsplash images left on the site (2 August 2026)
**Nothing on any page fetches a remote image.** Every `<Image>` now points at a
file in `public/images/`. The seven Unsplash placeholders were replaced with CSS
gradients — see "Gradient placeholders" below for the list and the reasoning.

Still pending real photography from the client — now on **gradient
placeholders**, not stock photos:
- The `/churches/bhcc` hero background (see below for why the logo can't stand
  in for it).
- The Norwich Prayer Surge banner, on `/events` and in the `/` event card.

### Gradient placeholders (replaced Unsplash, 2 August 2026)
All seven were `aria-hidden` decorative backdrops under heavy scrims, or — worse
— stock photos labelled as something real. Each cost every visitor a cross-origin
fetch through the image optimiser, and four were `priority`, so they blocked LCP
for imagery the scrim had already all but erased. They are now pure CSS:

| Where | Was | Now |
|---|---|---|
| `/` partnership band | `photo-1529156069898…` | `from-wine-deep via-blue-navy to-blue-navy` + a cross gradient |
| `/partners` hero | `photo-1529156069898…` (`priority`) | standard dark hero + navy wash |
| `/churches/bhcc` hero | `photo-1438232992991…` (`priority`) | standard dark hero + navy wash |
| `/about` mandate | `photo-1500530855697…` | standard dark hero + navy wash |
| `/events` featured | `photo-1524368535928…` | dark hero gradient + `awe-min-mark.png` at `opacity-25` |
| `/` event card | same, via `EventCard imageUrl` | `EventCard`'s no-image branch |
| `/media` Telegram card | `photo-1529070538774…` | `from-white to-[#EEF3FA]` |

- ⚠️ **Two of these were content-integrity problems, not just performance
  ones.** The Prayer Surge photo carried `alt="Norwich Prayer Surge"` and the
  BHCC hero sat behind a heading naming BHCC — both presented photographs of
  strangers as pictures of a real gathering and a real church, exactly what
  "No stock imagery stands for a church" and the Content Integrity Notes rule
  out. **Do not restore a stock photo to either slot.** Only a real photograph
  from the client belongs there.
- **`EventCard`'s no-image branch is now load-bearing** and was restyled to
  match: it was a flat `bg-cream` plate reading "Event Image", which broke the
  no-flat-backgrounds rule. It is now the dark hero gradient with the ministry
  mark at `opacity-25`. `imageUrl` is still supported — nothing passes it today.
- The gradients reuse the palette each section already resolved to under its
  scrim, so the visual change is close to nil. `images.unsplash.com` stays in
  `next.config.ts` `remotePatterns` so a future real Unsplash image needs no
  config change; it grants nothing on its own.

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
- **Not affected at the time:** the decorative Unsplash textures behind the
  `/about` mandate, the `/` and `/partners` partnership bands and the `/media`
  Telegram card. Those were `aria-hidden` backdrops under a heavy scrim,
  labelled as nothing — they carried no claim about a church. They were removed
  later anyway, on performance grounds — see "Gradient placeholders" above.

⚠️ **BLCN's blurred-logo hero background has no BHCC equivalent, on purpose.**
`/churches/blcn` uses `blcn-logo.jpg` as its own hero backdrop (`scale-125
blur-2xl` under a `bg-black/40` scrim) because that emblem sits on near-black and
blurs into usable dark texture. BHCC's mark is on white: blurred full-bleed it
washes to a flat grey field under the same scrim, losing both the artwork and the
imagery. Don't "finish the mirror" by porting it — the BHCC hero is on a
gradient placeholder awaiting a real congregation photo (see "Gradient
placeholders"), and a washed-out blurred mark is not an improvement on that.

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

## The birthday page (`/birthday`)
A one-off page for Pastor Awe's birthday, **Monday 3 August 2026**, built 1
August 2026 to be shared by direct link that evening. Four sections: hero →
countdown → testimony form → closing + share.

⚠️ **It was five.** A giving section carrying the UK and Nigeria account details
sat between the testimony form and the close until 3 August 2026; it is now a
modal. See "Giving is a modal" below before adding anything to this page that
asks for money.

### ⚠️ It is a standalone site, not a page of this one
**The main site has not launched.** `/birthday` is the only URL being shared,
so the page is isolated from the rest of the tree and offers **no route out of
itself**. Isolated on 1 August 2026:

- `app/layout.tsx` was stripped to `<html>`/`<body>` + font + `metadataBase`.
  The Navbar and Footer moved into **`app/(site)/layout.tsx`**, and every main
  site route moved under `app/(site)/`. `/birthday` stays outside the group
  with `app/birthday/layout.tsx`, a bare `<main className="bg-white">`.
- Route groups change no URLs — the build output before and after is identical,
  route for route. This was the cheapest way to give one branch different
  chrome; there is no other App Router mechanism for it short of a second root
  layout, which would duplicate `<html>`.
- **The ministry lockup at the top of the hero links to `/birthday` — itself.**
  `awe-min-logo.png` at `h-11 sm:h-14` inside a `<Link href="/birthday">`
  (`aria-label="Back to top"`), added 2 August 2026 as a back-to-top affordance.
  ⚠️ **It must never become `<Link href="/">`.** The isolation rule is unchanged:
  no anchor on this page may leave it while the main site is unlaunched.
  ⚠️ Known cosmetic side effect: on the custom domain `/` is *rewritten* to
  `/birthday`, so a visitor sitting on the bare domain who clicks the lockup has
  the address bar change from `ayodeleaweministries.com` to
  `…/birthday`. Same page, same content — only the URL cosmetics. If that ever
  matters more than the affordance, swap the `Link` for a small client component
  calling `window.scrollTo`, which changes no URL at all.
- The only hrefs the page emits are `/birthday` and `#testimony`. Verified
  against the built HTML. (`#give` went with the giving section — giving is a
  button that opens a modal now, not an anchor.) `SharePage` shares
  `window.location.href`, i.e. `/birthday` itself, never the site root.
- `/birthday/admin` inherits the birthday layout and so also lost its chrome,
  which is correct — it never wanted it. It still uses the **main site**
  palette, deliberately: it is a private utility, not part of the shareable.
- **Don't "fix" its absence from the nav.** It was never in the Navbar or
  Footer; now it cannot reach them either.

### ⚠️ The custom domain serves `/birthday` only (`middleware.ts`)
**ayodeleaweministries.com currently only serves `/birthday` via middleware
redirect. Full site remains on the `.vercel.app` URL until ready to launch
properly. Remove this middleware when the full site is ready to go live on the
custom domain.**

`middleware.ts` at the project root does a host check and nothing else. On
`ayodeleaweministries.com` / `www.ayodeleaweministries.com`:

| Path | Behaviour |
|---|---|
| `/` | **Rewritten** to `/birthday` — the address bar keeps the bare domain |
| anything else (`/about`, `/partners`, `/churches/bhcc`, …) | **307** redirect to `/birthday` |
| `/birthday`, `/birthday/admin` | untouched |
| `/api/*` | untouched — the testimony form depends on `/api/birthday-testimony` |

Every other host — the `.vercel.app` deployment URL, previews, localhost —
falls through untouched and gets the full site. That host check is the whole
reason this is middleware and not a `redirects()` entry in `next.config.ts`,
which cannot see the request host.

- ⚠️ **The matcher excludes any path with a file extension**, and that is
  load-bearing rather than tidiness. `/birthday`'s `og:image` resolves through
  `metadataBase` to `https://ayodeleaweministries.com/images/apostle-portrait.jpg`,
  which the WhatsApp and Facebook crawlers fetch **directly** — redirect it and
  every shared link loses its preview image. The same exclusion covers
  `/icon.png` and `/apple-icon.png`. `_next/*` (JS, CSS, the Clash Display
  woff2 files) is excluded alongside it.
- ⚠️ **The redirect is 307, never 301/308.** A permanent redirect is cached by
  the browser indefinitely, so every visitor who touched the domain pre-launch
  would keep landing on `/birthday` after the file is deleted — with no way to
  clear it from our side. `NextResponse.redirect` defaults to 307; leave it.
- ⚠️ **The host list is an exact-match `Set`, not `host.includes(...)`.** A
  `Host` header is attacker-controlled, and a substring test also matches
  `ayodeleaweministries.com.example.org`.
- ⚠️ **Next 16 deprecates the `middleware.ts` filename in favour of `proxy.ts`**
  (`next build` warns: "The `middleware` file convention is deprecated"). It
  still works — Next renames `proxy.js` → `middleware.js` in the build output
  for compatibility. Silencing the warning is a pure file rename, no code
  change. Kept as `middleware.ts` because the file is temporary.
- ⚠️ **The domain here is `.com`; the ministry's email addresses in this file
  are `.org`** (`contact@ayodeleaweministries.org`). That is as supplied — if
  both TLDs are pointed at this project, add the `.org` hosts to
  `LOCKED_DOMAINS` or they will serve the whole unlaunched site.

### Palette and treatment
It runs on its own **white / deep blue / orange** palette — see the `bday-*`
tokens in the Color System section, and read the three-oranges warning there
before touching any orange on this page.

- **It is the one page allowed to be more dramatic than the rest of the site.**
  Full-viewport hero on `from-bday-navy via-bday-blue to-bday-navy`, layered
  radial glows (orange behind the copy, blue behind the portrait), drifting
  confetti dots, and the site's only animated type (the `.shimmer-text` sweep
  in `globals.css`, now an orange sweep).
- **Section rhythm is dark → dark → light → light.** White carries the two
  longest sections (testimonies, closing) so it reads as the dominant base; deep
  blue takes the hero and the countdown band. Ending on white is why the layout
  sets `bg-white` — otherwise an iOS overscroll bounce at the foot shows the
  navy `<body>`. The two light sections meet at `#F1F5FA` (testimonies run
  `white → #F1F5FA`, the close runs `#F1F5FA → white`), so there is no seam
  where the giving section used to break them up. The deep-blue treatment did
  not disappear with it — it moved to the giving modal's panel.
- ⚠️ **The hero portrait is a circle**, `rounded-full` with a glow ring. Every
  other image container on the site is sharp-cornered — this is a deliberate
  one-page exception for a celebratory medallion, not a slip.
- ⚠️ **`.shimmer-text` lives in `globals.css`, not Framer Motion**, so the `h1`
  stays in the server-rendered markup where link-preview crawlers read it.
  Under `prefers-reduced-motion` the sweep stops and the text returns to solid
  white.
- **British English** ("honour"), matching the ministry's UK base.
- The giving **modal** is headed **"Give to God's Servant"**. It was a page
  section headed "Sow a Seed of Honour" (`id="honour"`) until 1 August 2026 —
  the seed language went then, from the subtitle, the hero CTA, the page
  metadata and the native-share text — and stopped being a section at all on 3
  August 2026. Nothing outside this page ever linked to `#honour` or `#give`.
- Scripture: 1 Timothy 5:17 closes the giving modal (it was Proverbs 3:9 until
  1 August 2026 — changed with the "Give to God's Servant" heading, since the
  double-honour verse is about the servant rather than the firstfruits),
  Hebrews 13:7 the page. Both are quoted scripture, not written-to-brief copy.
  ⚠️ Both follow the same convention: **NKJV wording, British spelling** —
  "double honour", "labour", where NKJV prints "honor"/"labor". Don't
  Americanise them back to match a printed NKJV.

### ⚠️ Giving is a modal, and the page never asks for it first
Changed 3 August 2026. Account details used to be a full section in plain view;
they are now behind `components/BirthdayGiving.tsx` and reachable from exactly
two places, in this order:

1. **The testimony form's success state** — after someone has actually shared
   something, under a rule, headed "If you would love to give to Pastor Ayodele,
   please kindly use the button below." This is the intended path.
2. **One quiet `outline` button in the closing section**, for anyone who wants
   to give without writing a testimony. Deliberately a size down from the share
   CTA beside it.

⚠️ **The hero's second CTA is gone.** It read "Give to God's servant" and
pointed at `#give`. Giving asked for in the first screenful is what this change
exists to undo — don't put a give button back in the hero, and don't restore the
section. If a visible giving section is ever wanted again that is a conversation
with the client, not a refactor.

- `GIVING` still lives in `app/birthday/page.tsx` and is handed to
  `GivingProvider` as a prop. ⚠️ That means `flag` must be a **serialisable**
  country code (`"GB"`/`"NG"`), never a component — see "Country flags" below.
- ⚠️ **The details are still in the page source**, in the RSC payload, because
  they cross to a client component as a prop. The change is about what the page
  *asks* of a visitor, not about hiding public bank details. Don't add a fetch
  to "protect" them.
- ⚠️ **The modal is rendered by the provider, as a sibling of the page — never
  beside a trigger.** Both triggers sit inside an `AnimateIn`, whose
  `motion.div` carries a transform, and a transformed ancestor becomes the
  containing block for its `fixed` descendants. A modal mounted in there sizes
  itself against that card. Exactly the trap the mobile menu panel hit.
- The panel reuses the old section's treatment verbatim —
  `from-bday-blue via-bday-navy to-bday-blue`, `border-t-2 border-bday-orange`,
  `bg-white/[0.07]` cards, `CopyField` — so every contrast figure in the palette
  notes still holds. Sharp corners, like every other panel on the site.
- Escape closes it, so does the backdrop, so does either close control; `<body>`
  scroll is frozen while it is open; Tab is trapped inside the panel; focus
  returns to whatever opened it. `useReducedMotion()` collapses the animation to
  a plain fade.
- `GiveButton` renders **nothing** outside a `GivingProvider`, and the testimony
  form gates its whole CTA block on `useGiving()` being non-null. That is what
  lets `BirthdayTestimonyForm` stay mountable anywhere.

### ⚠️ Country flags are drawn SVG, never emoji
`components/icons/FlagIcons.tsx`. Reported 3 August 2026 as "the flags show on
my phone but not on my PC", and it is a real platform gap rather than a font
preference: **Segoe UI Emoji ships no regional-indicator glyphs**, so Chrome,
Edge and Firefox on Windows render 🇬🇧 as the bare letters "GB" — or an empty
box — while iOS, Android and macOS show the flag. On a page whose account
details someone is about to act on, that reads as broken.

- Two flags, two components, `CountryFlag({ code })` to pick between them. ⚠️
  **Don't install `flag-icons` or similar** — ~260 flags and a stylesheet for a
  site that needs two.
- Replaced in both places emoji flags appeared: the `/birthday` account cards
  and the BHCC/BLCN location lines on `/churches`. `Expression.flag` on
  `/churches` is now a separate field from `location`, which is plain text again.
- ⚠️ **Both use a 60×30 viewBox (1:2, the official ratio for both flags), so
  every call site must pass a 2:1 class pair** — `h-3 w-6`, `h-5 w-10`.
  Otherwise the artwork letterboxes inside its own box.
- ⚠️ **The Union Flag's red saltire is four hand-computed polygons, not a
  `clipPath`.** The usual construction clips a stroke, which needs an SVG `id` —
  and an id must be unique per document, while these render twice per page (two
  giving cards, two church cards). A duplicate id makes the second instance clip
  against the first. The polygons are that clip resolved by hand; the maths is
  in the file. Verified by rasterising with `sharp`.
- Both are `aria-hidden`. Every call site names the country in adjacent text
  ("United Kingdom", "Norwich, United Kingdom"), so announcing the flag would
  only repeat it. A call site where nothing else names the country needs its own
  visually-hidden label.

### ⚠️ Mobile is the primary target, not a fallback
This link travels by WhatsApp; effectively everyone arrives on a phone. The
decisions below are load-bearing at 375–430px:

- **The hero is `min-h-[100svh]`, never `min-h-screen`.** `vh` on mobile Safari
  is the viewport *without* browser chrome, so a full-height hero is clipped top
  and bottom until the address bar collapses.
- **The portrait medallion leads on mobile** — `order-first lg:order-last`. The
  `h1` stays first in the DOM (it is the page heading and the preview crawlers
  read it); only the visual order flips. A phone's first screenful should read
  as a celebration.
- **The `h1` base step is `text-[2.5rem]`, not `text-5xl`.** At 48px
  "Celebrating" alone fills a 375px line. `text-balance` on every heading.
- **The countdown is `grid-cols-2 sm:grid-cols-4`.** Four tiles across 375px
  leaves ~80px each and caps the numerals near 36px; 2×2 gives ~165px and lets
  them run at 60px, which is the point of a countdown. It also replaced a
  `flex-wrap` + `min-w` shell that could wrap into a ragged 3+1.
- **Buttons are `w-full sm:w-auto`** inside a `max-w-sm` column.
- **Touch targets:** the `CopyField` copy buttons are `h-11 w-11` (44px) — they
  are tapped mid-transfer on a phone more than anything else on the page. Form
  fields are `py-4`, ~56px.
- ⚠️ **No confetti dot sits past 94% left.** Dots are positioned by their
  top-left corner and are up to 8px wide; the layer's `overflow-hidden` clips
  an overhanging one, but the margin keeps the artwork whole rather than
  half-cut.

### The countdown
`lib/birthday.ts` resolves midnight 3 August 2026 **Europe/London** to a UTC
instant via `london-time.ts`, the same way the Prayer Surge resolves its 10:00.
Verified: `BIRTHDAY_STARTS_AT` is `2026-08-02T23:00:00.000Z` — BST is UTC+1, so
the clock hits zero at midnight in Norwich, not midnight UTC.

⚠️ **The phase is resolved on the client, in an effect — never on the server.**
`/birthday` is statically prerendered (the build output shows it as `○`, with no
`revalidate`), so a server-side phase check would bake in whichever side of
midnight the build ran on and never move. This is the opposite of the Prayer
Surge pages, which *do* set `revalidate = 3600` because their date is computed
server-side. Three phases, all handled, so the page never needs a code change to
move past the day:

- `before` → the countdown
- `during` (the whole of 3 August, London) → "Today We Celebrate Him! 🎉"
- `after` → "We Celebrated Him! 🎉" plus a thanksgiving line; the testimony form
  stays open

### Testimonies
`POST /api/birthday-testimony` validates (name + message required, all fields
trimmed and length-capped), `LPUSH`es JSON to the KV key `birthday-testimonies`,
then emails the ministry via Resend. `GET` returns the list, newest first —
`LPUSH` + `LRANGE 0 -1` gives that ordering with no sorting.

- **KV is the record; the email is a convenience.** A Resend failure is logged
  and swallowed, never surfaced as a failed submission. A KV failure *is*
  surfaced — the form says so rather than pretending to have saved.
- ⚠️ **The KV credentials use a custom `AYODELE_` prefix** that `@vercel/kv`
  cannot auto-detect. See the Environment variables section — this is the
  likeliest thing to break.
- ⚠️ **The KV client is created per-request inside the handler, never at module
  scope.** `createClient` throws when the credentials are absent, and at module
  scope that would take the whole route down at import time, during the build.
  Same reason `resend` is imported dynamically. A top-level
  `const kv = createClient(...)` is the obvious-looking refactor and it breaks
  `next build` on any machine without the credentials.
- Upstash deserialises JSON on some clients and not others, so the GET maps over
  both parsed objects and raw strings. Don't "simplify" that to a bare
  `JSON.parse`.
- Verified end-to-end against a mock Upstash REST server: round-trip, newest-
  first ordering, newlines preserved, empty optional fields. With no env vars
  set every endpoint degrades honestly (503 + a readable message), which is the
  state a fresh clone is in.

### Archiving — what the admin's "Delete" actually does
Added 3 August 2026. **Nothing is ever removed from KV.** The testimonies are
wanted for a possible public testimony wall on the main site later, so "delete"
means "take out of the admin's active list" and no more.

- `birthday-testimonies` stays append-only. A second key,
  **`birthday-testimonies-archived`, is a Redis SET of ids**; the GET handler
  subtracts one from the other.
- ⚠️ **A set of ids, not an `archived` flag on the record.** A Redis list cannot
  be updated by identity — flipping a flag means `LSET` at an index, and the
  index of every record shifts each time someone submits, because the list is
  `LPUSH`ed. Read-modify-write on the whole list is worse still: a submission
  landing mid-flight would be overwritten. `SADD` is one atomic write that
  touches nothing else. **Verified**: archiving a record, then posting a new
  testimony, leaves the archive pinned to the right record.
- ⚠️ **`testimonyId()` in `lib/birthday.ts` is the only way to get a
  testimony's id, and it must never be the list index** — see above. Records
  written from 3 August carry a `crypto.randomUUID()`; older ones fall back to
  `` `${submittedAt}::${name}` ``, which is stable for a record that is never
  rewritten. **A record with no `id` is a legacy record, not a broken one** —
  verified that one archives and restores exactly like a current one.
- `id` and `archived` are **resolved by the GET handler, never stored**, so a
  legacy record reads back identically to a current one for every consumer.
- `GET ?include=` takes `active` (default), `archived` or `all`. The default
  keeps every pre-existing caller behaving as it did.
- `PATCH { password, id, archived }` moves one record between the two states.
  Anything other than an explicit `archived: false` archives — restoring has to
  be asked for.
- ⚠️ **PATCH takes the admin password; the GET deliberately does not.** Reading
  everything by URL is an accepted exposure on a page with a ~48-hour life
  (below). Letting anyone who finds the URL hide testimonies from the ministry
  is not the same trade. `lib/admin-auth.ts` holds the timing-safe compare that
  both this and `/api/birthday-admin` use.

### ⚠️ Admin page security — read this before extending it
`/birthday/admin` is a **utility page, not linked from anywhere**, and its gate
is **obscurity, not security**. Accepted deliberately for a page with a ~48-hour
useful life. Specifically:

- **`GET /api/birthday-testimony` is unauthenticated.** Anyone who knows or
  guesses that URL reads every testimony, including submitters' email
  addresses, without ever seeing the password screen. This is the real exposure
  — the password screen is not what protects the data.
- The password itself is checked **server-side**, by `POST /api/birthday-admin`.
  ⚠️ This is not gold-plating: a client component **cannot** read
  `BIRTHDAY_ADMIN_PASSWORD`. Next only inlines `NEXT_PUBLIC_`-prefixed vars into
  the browser bundle, and anything inlined — or passed down from a server
  component, which lands in the RSC payload — is readable by every visitor. A
  literal client-side comparison would have meant publishing the password. The
  env var keeps the name, the gate behaves identically, the secret stays server-
  side.
- ⚠️ **Unlock state is the password itself**, held in `sessionStorage` under
  `birthday-admin-key` (it was a bare `"true"` flag under `birthday-admin-ok`
  until 3 August 2026). The archive PATCH is authenticated and the page has to
  be able to send the password with it. That is a deliberate trade:
  `sessionStorage` is same-origin, dies with the tab, and is readable only by
  script already running on this page — whereas an unauthenticated PATCH would
  let anyone who found the URL hide testimonies from the ministry.
- The page has **Active / Archived** views. Deleting archives; the Archived view
  is the undo, with a Restore button per row. A `window.confirm` guards the
  delete, and a standing note at the foot of the list says archiving is not
  destruction — so nobody working the page has to have read this file.

**If this page outlives the birthday**, the fix is two changes: require the
password on the GET handler too (send it as a header from the admin page), and
replace the `sessionStorage` password with a real session cookie. Until then,
treat the URL as the secret and don't publish it.

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

The cover renders in an `aspect-[2/3]` box with `object-cover`. The source is
800×1135 (0.705), so ~23px is trimmed from each side. Checked against the
artwork: the nearest text sits ~78px in, so nothing is clipped. If the cover
is ever replaced with tighter margins, switch the container to
`aspect-[800/1135]` (or the new image's ratio) to show it uncropped.

The cover is also the `/books` `PageHero` background image (`backgroundImage`
on `PageHero`, under the standard navy + wine scrim).

---

## Why the favicon looked broken on the custom domain (2 August 2026)
Reported as "the favicon shows on `.vercel.app` but not on
ayodeleaweministries.com". **Neither `middleware.ts` nor `metadataBase` was
involved** — both were checked against the live domain and both were fine:

```
https://www.ayodeleaweministries.com/icon.png        200  image/png  31145 B
https://www.ayodeleaweministries.com/apple-icon.png  200  image/png   8791 B
https://www.ayodeleaweministries.com/favicon.ico     404              <-- the bug
https://ayodeleaweministries.com/icon.png            308 -> www.
```

⚠️ **`metadataBase` cannot affect a favicon, so don't go looking there.** Icons
produced by the App Router file conventions are emitted as **root-relative**
hrefs — `<link rel="icon" href="/icon.png?icon.41466375.png">` — and are never
resolved against `metadataBase`. Only `openGraph`/`twitter` image paths are.

⚠️ **The middleware matcher was already correct.** `/icon.png`, `/apple-icon.png`
and `/favicon.ico` all contain a `.`, so the `(?!_next/|.*\.)` lookahead
excludes them. Verified live: `/icon.png` returns the actual PNG on the custom
domain, not a redirect to `/birthday`.

The three real contributors, in order:

1. **`/favicon.ico` 404'd** because the file had been deleted deliberately. That
   is the fix — the file is back. See the Assets Status entry above.
2. **The apex 308s to `www.`**, so `ayodeleaweministries.com` and
   `www.ayodeleaweministries.com` are **separate origins for favicon caching**.
   An icon learned on one does not populate the other, and the link being shared
   is the bare apex. This is a Vercel domain setting, not something in the repo;
   it is fine to leave, but it is why a first visit can look iconless.
3. **Browsers cache favicons far more aggressively than pages**, in a store the
   normal reload path does not clear — Chrome keeps a separate favicon database.
   A 404 learned during the pre-launch window persists well past the fix, so
   **expect the icon not to appear immediately even now that it is correct.**
   Verify with a hard-reload in a fresh profile, or by requesting
   `/favicon.ico` directly, rather than by looking at a tab that has already
   cached the miss.

⚠️ Because of (3), **do not treat a still-missing tab icon as evidence the fix
failed.** Check the HTTP status of `/favicon.ico`, which is the thing actually
under our control.

---

## Performance decisions (audited 2 August 2026 — don't regress these)
A build-output and asset audit produced the four changes below. Measured
baseline before the pass: ~693–714 KB First Load JS per route (uncompressed),
seven cross-origin Unsplash fetches, and 586 KB of hero artwork downloaded at
once on `/`.

### Deployment region
`vercel.json` sets `regions: ["lhr1"]` (London) and contains nothing else.
Vercel's default is `iad1` (Washington DC), which is the wrong side of an ocean
from a UK/Nigeria audience. Static assets are edge-cached either way, but the
**image optimiser runs in the function region** — so on a cache miss a Norwich
visitor was routing through Virginia and back. Don't drop this file.

### The hero slideshow defers slide 2
⚠️ **`loading="lazy"` does not defer an in-viewport image, and that was the
bug.** All hero slides are stacked at `inset-0`, so slide 2 was on screen from
first paint; lazy loading only defers images that are *off* screen. Both slides
therefore downloaded together — 586 KB, with `apostle-2.jpg` (417 KB, the
largest file in the repo) competing against the LCP image for bandwidth while
being invisible for the first six seconds.

`HeroSection` now returns `null` for slide index > 0 until a 2.5s timer fires
after hydration. **An `<img>` that is not in the document is never fetched** —
that is the whole mechanism, and hinting at the loader cannot substitute for it.
Verified against the built HTML: `apostle-2` appears nowhere in the server
markup for `/`.

- The flag starts `false` on both server and first client render, so hydration
  still matches — the same contract `AnimateIn` keeps for its media queries.
- 2.5s clears first paint and still leaves 3.5s before the 6s crossfade.
- ⚠️ **The dots set the flag too.** A tap inside the first 2.5s would otherwise
  select a slide that is not mounted and leave the hero blank.
- `priority` and `loading` are passed as a spread, never both at once — Next
  throws if it sees both on one `<Image>`.

### Image format and cache TTL (`next.config.ts`)
- `formats: ["image/avif", "image/webp"]` — AVIF is ~20–30% smaller. The cost
  is slower encoding on a cache **miss**, paid once per (image, width).
- `minimumCacheTTL: 2678400` (31 days, up from Next's 4-hour default). Every
  optimised image is now a build-time asset, so nothing can change behind a URL
  without a redeploy — and a deploy busts the cache anyway, since the cache key
  includes the build ID. The short default was buying repeated AVIF encodes of
  files that never change.

### Known, deliberately not fixed
- **framer-motion is ~118 KB on all 15 content routes.** It is imported by only
  three components, but `AnimateIn` is used ~134 times, so it lands in the
  shared chunk everywhere. Removing it means reimplementing `AnimateIn` on
  IntersectionObserver + CSS across every call site — a real win, but a much
  larger change than this pass.
- **The Telegram scrape is ~5s per page, up to `MAX_PAGES = 8` sequentially.**
  Not currently user-facing: `/media/teachings` is ISR, so the cost lands on a
  background regeneration, not a request. It would become user-facing if the
  channel's recent posts go all-text and the walk-back deepens.

---

## Environment variables
`.env*` is gitignored **except `.env.local.example`**, which is committed via a
negation in `.gitignore` and holds placeholders only. That file is the canonical
list; this table is the summary. Everything here is consumed by `/birthday`
alone — the rest of the site needs no configuration at all.

| Variable | Needed for | If missing |
|---|---|---|
| `AYODELE_KV_REST_API_URL` | Storing + reading testimonies | POST returns 503, GET 500, both with a readable message |
| `AYODELE_KV_REST_API_TOKEN` | ditto (read/write) | ditto |
| `AYODELE_KV_REST_API_READ_ONLY_TOKEN` | Used by GET only | Falls back to the read/write token |
| `BIRTHDAY_ADMIN_PASSWORD` | The `/birthday/admin` gate | Admin returns 503, "not configured" — nobody can get in |
| `RESEND_API_KEY` | Emailing each testimony on arrival | Silently skipped; the testimony is still stored |
| `BIRTHDAY_NOTIFY_EMAIL` | Where those emails go | Defaults to `contact@ayodeleaweministries.org` |
| `BIRTHDAY_EMAIL_FROM` | The verified sender | Defaults to `AOA Ministries <onboarding@resend.dev>` |
| `NEXT_PUBLIC_SITE_URL` | `metadataBase` → absolute `og:image` URLs | Falls back to `VERCEL_URL`, then localhost |

### ⚠️ The KV variables carry a custom `AYODELE_` prefix
This is the single most breakable thing about the setup, so it is worth being
precise about:

- `@vercel/kv` **auto-detects only the unprefixed** `KV_REST_API_URL` /
  `KV_REST_API_TOKEN`. This project's store is provisioned with an `AYODELE_`
  prefix, so **auto-detection finds nothing**. `getKv()` in
  `app/api/birthday-testimony/route.ts` therefore passes `url` and `token` to
  `createClient` explicitly. Do not "simplify" that back to the bare `kv`
  singleton — it will silently fail to connect.
- **There is deliberately no fallback to the unprefixed names.** A silent
  fallback turns a misconfigured deploy into a mystery; the clean 503 says
  exactly what is wrong in the server log.
- Vercel also exposes `AYODELE_KV_URL` and `AYODELE_REDIS_URL`. Both are
  `redis://` connection strings for a **TCP** client, and `@vercel/kv` speaks
  the **REST** protocol — so neither is used. They are documented as unused in
  `.env.local.example` so nobody loses time wondering why.
- The GET handler passes `readOnly = true`, which picks
  `AYODELE_KV_REST_API_READ_ONLY_TOKEN` so a read cannot mutate the list.
  Verified against a mock REST server: `LPUSH` carries the read/write token,
  `LRANGE` the read-only one.
- ⚠️ **A wrong read-only token is worse than no read-only token.** The fallback
  to the read/write token is `?? `, which only fires when the variable is
  **unset**. A placeholder value is "set", so it wins, and every read fails with
  `WRONGPASS invalid or missing auth token` — a 500 on GET and an empty admin
  page, while POST keeps working perfectly. This bit during setup and is
  genuinely confusing, because writes look healthy. `.env.local.example` now
  ships the line **commented out** for exactly this reason: leave it commented
  unless you are pasting the real token.
- **Verified against the live store** (1 August 2026): write → read-back →
  delete all succeeded, and the admin gate accepted the configured password.
- Pull the real values locally with `vercel env pull .env.local` (it overwrites
  the placeholders). ⚠️ With the placeholders left in place the route resolves a
  host that does not exist — POST 503, GET 500, page still renders 200. That is
  expected, not a bug.
- ⚠️ **Resend only sends from a domain you have verified.** Until
  `ayodeleaweministries.org` is verified in Resend, the sole usable sender is
  `onboarding@resend.dev`, and in that mode Resend delivers **only** to the
  address that owns the Resend account. Either verify the domain, or point
  `BIRTHDAY_NOTIFY_EMAIL` at the account owner.
- ⚠️ `contact@ayodeleaweministries.org` is the address `/contact` advertises,
  but the custom domain is not pointed at Vercel yet, so that mailbox may not
  exist. Confirm it receives mail before relying on the default.
- `metadataBase` was added to `app/layout.tsx` for the birthday page's
  `og:image`, but it benefits every page — WhatsApp and Facebook will not fetch
  a relative image path.
- ⚠️ **Production no longer depends on `NEXT_PUBLIC_SITE_URL` being set.**
  `VERCEL_URL` is the *deployment-specific* host
  (`ayodele-awe-ministries-<hash>.vercel.app`), never the custom domain, so
  while it was the production fallback every live `og:image` pointed at a
  deployment URL. The chain is now
  `NEXT_PUBLIC_SITE_URL` → **`https://www.ayodeleaweministries.com` when
  `VERCEL_ENV === "production"`** → `VERCEL_URL` (right for previews, where the
  deployment host *is* the address being shared) → localhost.
- ⚠️ **`www.`, not the apex.** Vercel 308s the apex to `www.`; naming the apex
  would put a redirect in front of every link-preview crawler.
- ⚠️ **`metadataBase` has nothing to do with the favicon** — see "Why the
  favicon looked broken on the custom domain".

## What Still Needs Building
- [ ] Newsletter API wired to Brevo or Mailchimp
- [ ] Contact form wired to Resend (emails to minister). The subject → church-inbox
      routing is already resolved in `app/api/contact/route.ts` (`CHURCH_INBOXES`
      maps "Church Information (BHCC)" → `Info.buildinghousecc@gmail.com` and
      "(BLCN)" → `blcnglobal@gmail.com`) and passed through as `cc`; nothing is
      sent yet, so wiring Resend is a one-line change at that call site.
- [x] Real UK/Nigeria account details in the `GIVING` array in
      `app/birthday/page.tsx` — client-supplied 1 August 2026, placeholders
      gone. The two account **names** differ by bank on purpose; see the
      comment on the array
- [ ] SEO metadata per page (title, description, og:image). `metadataBase` is
      now set in `layout.tsx`; `/birthday` is the first page with full
      `openGraph` + `twitter` blocks and is the pattern to copy
- [ ] Custom 404 page
- [x] Favicon — `app/icon.png` + `app/apple-icon.png` + `app/favicon.ico`, the
      ministry mark on navy. ⚠️ The `.ico` is required; see "Why the favicon
      looked broken on the custom domain"
- [ ] Page transition animations (Framer Motion)
- [ ] Real assets swapped in when client provides them
- [ ] Custom domain pointed to Vercel — in progress. `ayodeleaweministries.com`
      is being connected, but `middleware.ts` locks it to `/birthday` only
      while the main site is unlaunched. **Delete `middleware.ts` at launch.**
      See "The custom domain serves `/birthday` only"
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
- Don't hand-roll section labels, buttons or inner-page heroes — use `SectionLabel`, `Button`, `PageHero`.
