/**
 * `/birthday` is a standalone experience, not a page of the main site.
 *
 * The main site has not launched — this link is the only thing being shared —
 * so the page renders with **no Navbar and no Footer** and offers no route out
 * of itself. The ministry lockup at the top of the hero is a brand mark, not a
 * link, for exactly that reason.
 *
 * That isolation is what `app/(site)/` exists for: the root layout now carries
 * only `<html>`/`<body>`, the site chrome lives in the `(site)` route group,
 * and this branch of the tree opts out simply by sitting outside it.
 *
 * `bg-white` because the page now closes on a white section — without it an
 * iOS overscroll bounce at the foot shows the navy `<body>` background.
 * `/birthday/admin` inherits this layout too, which is correct: it is a
 * utility page and never wanted the chrome either.
 */
export default function BirthdayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-white">{children}</main>;
}
