import { Metadata } from "next";
import Link from "next/link";
import TelegramIcon from "@/components/icons/TelegramIcon";

export const metadata: Metadata = {
  title: "Telegram Teachings — Ayodele Oladapo Awe Ministries",
  description:
    "Access sermons, Bible studies, and prophetic messages from Minister Awe via Telegram.",
};

export default function TeachingsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
          Teachings
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Telegram Teachings
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
          The Word of God — accessible anywhere, anytime
        </p>
      </section>

      {/* ── 2. About the Channel ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Icon card */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep rounded-lg p-16 flex items-center justify-center shadow-xl">
              <TelegramIcon size={120} />
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
              About the Channel
            </p>
            <h2 className="font-serif text-3xl text-blue-navy mb-6">
              A Library of the Word
            </h2>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Minister Ayodele Oladapo Awe&apos;s Telegram channel is a growing
              library of sermons, Bible studies, and prophetic messages — curated
              to build faith and equip believers wherever they are.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Whether you&apos;re a new believer seeking foundation or a seasoned
              Christian hungry for deeper truths, the teachings shared on this
              channel are designed to bring the Word of God to life in your
              everyday walk.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              Join thousands of believers across the UK, Nigeria, and beyond who
              are being transformed by the consistent ministry of the Word
              through this platform.
            </p>
            <Link
              href="#"
              className="inline-flex items-center font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors"
            >
              Join Telegram Channel →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. What to Expect ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            What to Expect
          </p>
          <h2 className="font-serif text-3xl text-white mb-16">
            Content on the Channel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                title: "Sermons",
                desc: "Weekly messages from Minister Awe rooted in the Word and delivered with prophetic insight.",
              },
              {
                title: "Bible Studies",
                desc: "Deep dives into Scripture — verse by verse, book by book — for a richer understanding of God's truth.",
              },
              {
                title: "Prophetic Messages",
                desc: "Words of encouragement, direction, and prophetic insight to strengthen your faith and sharpen your walk.",
              },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-serif text-xl text-blue-sky mb-4">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Start Today
          </h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">
            Join the channel today and let the Word transform your life.
          </p>
          <Link
            href="#"
            className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors"
          >
            Join Telegram Channel →
          </Link>
        </div>
      </section>
    </>
  );
}
