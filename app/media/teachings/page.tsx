import { Metadata } from "next";
import TelegramIcon from "@/components/icons/TelegramIcon";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Telegram Teachings — Ayodele Oladapo Awe Ministries",
  description:
    "Access sermons, Bible studies, and prophetic messages from Minister Awe via Telegram.",
};

const CONTENT_TYPES = [
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
];

export default function TeachingsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <PageHero
        label="Teachings"
        title="Telegram Teachings"
        subtitle="The Word of God — accessible anywhere, anytime"
      />

      {/* ── 2. About the Channel ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimateIn direction="left">
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep p-16 shadow-xl">
              <TelegramIcon size={120} />
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <SectionLabel tone="light">About the Channel</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              A Library of the Word
            </h2>
            <div className="mb-8 space-y-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Minister Ayodele Oladapo Awe&apos;s Telegram channel is a
                growing library of sermons, Bible studies, and prophetic
                messages — curated to build faith and equip believers wherever
                they are.
              </p>
              <p>
                Whether you&apos;re a new believer seeking foundation or a
                seasoned Christian hungry for deeper truths, the teachings
                shared on this channel are designed to bring the Word of God to
                life in your everyday walk.
              </p>
              <p>
                Join thousands of believers across the UK, Nigeria, and beyond
                who are being transformed by the consistent ministry of the Word
                through this platform.
              </p>
            </div>
            <Button href="#" variant="primary" size="lg" external>
              Join Telegram Channel
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. What to Expect ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">What to Expect</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Content on the Channel
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {CONTENT_TYPES.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-4 font-serif text-xl font-bold leading-tight text-blue-sky">
                  {card.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-white/70">
                  {card.desc}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Start Today
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Join the channel today and let the Word transform your life.
          </p>
          <Button href="#" variant="wine" size="lg" external>
            Join Telegram Channel
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
