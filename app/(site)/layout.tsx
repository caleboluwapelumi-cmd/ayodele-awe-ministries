import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Chrome for the main site. Everything under `app/(site)/` gets the Navbar and
 * Footer; `/birthday` deliberately sits outside this group and gets neither.
 *
 * `(site)` is a route group, so it contributes nothing to any URL —
 * `app/(site)/about/page.tsx` is still `/about`.
 *
 * The `pt-[72px] lg:pt-0` is the mobile navbar's height: the bar is fixed and
 * solid below `lg`, transparent-over-hero at `lg` and up.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] lg:pt-0">{children}</main>
      <Footer />
    </>
  );
}
