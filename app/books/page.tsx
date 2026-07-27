import { Metadata } from "next";
import { BookMarked } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Books & Publications — Ayodele Oladapo Awe Ministries",
  description:
    "Written resources from Minister Awe to equip believers and strengthen the local church. Coming soon.",
};

export default function BooksPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <PageHero
        label="Resources"
        title={<>Books &amp; Publications</>}
        subtitle="Written to equip, strengthen, and build the believer"
        variant="light"
      />

      {/* ── 2. Coming Soon ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-2xl text-center">
          <BookMarked size={72} className="mx-auto mb-8 text-blue" />
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
            Books Coming Soon
          </h2>
          <p className="mb-12 font-sans text-base leading-relaxed text-muted sm:text-lg">
            Minister Ayodele Oladapo Awe is currently working on written
            resources to equip believers and strengthen the local church. Stay
            connected to be notified when they are available.
          </p>

          <div className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep p-8 sm:p-12">
            <SectionLabel tone="dark" className="mb-6">
              Be the first to know
            </SectionLabel>
            <NewsletterForm />
          </div>
        </AnimateIn>
      </section>

      {/* ── 3. In the Meantime CTA ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            In the Meantime
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Access teachings, sermons, and messages on our Telegram channel.
          </p>
          <Button href="/media/teachings" variant="secondary" size="lg">
            Join Telegram
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
