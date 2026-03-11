import { Metadata } from "next";
import Link from "next/link";
import { BookMarked } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Books & Publications — Ayodele Oladapo Awe Ministries",
  description:
    "Written resources from Minister Awe to equip believers and strengthen the local church. Coming soon.",
};

export default function BooksPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="bg-gradient-to-br from-[#EEF3FA] to-white pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
          Resources
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-blue-navy mb-4">
          Books &amp; Publications
        </h1>
        <p className="font-sans text-lg text-muted max-w-xl mx-auto">
          Written to equip, strengthen, and build the believer
        </p>
      </section>

      {/* ── 2. Coming Soon ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-lg text-center">
          <BookMarked size={80} className="mx-auto text-blue mb-8" />
          <h2 className="font-serif text-3xl text-blue-navy mb-6">
            Books Coming Soon
          </h2>
          <p className="font-sans text-muted leading-relaxed mb-12">
            Minister Ayodele Oladapo Awe is currently working on written
            resources to equip believers and strengthen the local church. Stay
            connected to be notified when they are available.
          </p>
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-6">
            Be the first to know
          </p>
          <div className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep rounded-lg p-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ── 3. In the Meantime CTA ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            In the Meantime
          </h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">
            Access teachings, sermons, and messages on our Telegram channel.
          </p>
          <Link
            href="/media/teachings"
            className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors"
          >
            Join Telegram →
          </Link>
        </div>
      </section>
    </>
  );
}
