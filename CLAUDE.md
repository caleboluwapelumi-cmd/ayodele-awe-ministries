# CLAUDE.md — AOA Ministries Project Context

## What This Project Is
A full ministry website for **Ayodele Oladapo Awe Ministries** — a minister of the Gospel based in the UK with churches in both the UK and Nigeria. Built in Next.js App Router + Tailwind CSS, deployed on Vercel, source on GitHub.

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
  books/page.tsx          ← Book showcase + Selar/Amazon buy buttons
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
  ChurchCard.tsx
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
                            SOCIALS (minister), BLCN_SOCIALS (church), media/book URLs.
                            `Church` carries address / serviceTimes / email /
                            vision / mission / founded / leadership / socials —
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
- **BHCC** = Building House Christian **Centre** — Norwich, UK. Use **British English** for all BHCC content. Founded 9 February 2025; led by Ayodele Oladapo Awe (Lead Pastor) and Iyanuoluwa Ayodele-Awe (Co-Pastor). The founding-story section on `/churches/bhcc` retells a testimony the client supplied — it is a real account of a trance at a 2023 end-of-year retreat, so keep it reverent and don't embellish it.
- **BLCN** = Bethel Livingstone Christian Network (Nigeria) — standard English
- **Key event:** Norwich Prayer Surge (UK) — **recurring**, last Saturday of every
  month, 10:00 AM–5:00 PM (7 hours), Norwich. Vision text is built on Isaiah 32:15
  ("until the Spirit is poured upon us from on high…"), quoted on `/events`. There
  is no fixed date to hard-code — see `lib/prayer-surge.ts`
- **Media:** Spotify music + the "Babylonian Legends" podcast ("Everything Faith and Family") + Telegram teachings — all live, see Assets Status
- **Books:** "Walking with the Holy Spirit: Insights for Supernatural Living" — on sale via Selar and Amazon. Title and subtitle are separate fields on `/books` so the heading stays readable; subtitle uses the small-caps `blue-sky` treatment.
- **Tagline:** "Raising Voices, Building Houses, Transforming Nations"

---

## Assets Status
Real assets received (all in `public/images/`, all JPEG):
- `apostle-portrait.jpg` — 640×640 minister portrait. Used on `/`, `/about`, `/itinerary`.
- `apostle-1.jpg` — 2560×1696 landscape, minister preaching with mic; subject
  right of centre. Homepage hero slide 1.
- `apostle-2.jpg` — 1928×2560 **portrait**, minister at a lectern; subject high
  and left of frame. Homepage hero slide 2 — needs `object-[30%_25%]` so the
  full-bleed hero crop doesn't cut his head off.

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
  `.jpeg` extension; every other image in the folder is `.jpg`. Used on `/books`.
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

Still Unsplash placeholders — pending from client:
- BHCC logo + BHCC/BLCN church photos (BHCC stays acronym-only until its assets arrive)
- Event banners

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
- `registerLink` for "BHCC Special Service" and "BLCN Revival Meeting" on
  `/events` — both still TBA. The Prayer Surge no longer uses one: it is an open
  monthly meeting, so its CTA points at `/contact` (and `/` points at `/events`).

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

The cover renders in an `aspect-[2/3]` box with `object-cover`. The source is
800×1135 (0.705), so ~23px is trimmed from each side. Checked against the
artwork: the nearest text sits ~78px in, so nothing is clipped. If the cover
is ever replaced with tighter margins, switch the container to
`aspect-[800/1135]` (or the new image's ratio) to show it uncropped.

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
- Don't hand-roll section labels, buttons or inner-page heroes — use `SectionLabel`, `Button`, `PageHero`.
