import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import YouTubeIcon from "@/components/icons/YouTubeIcon";

export const metadata: Metadata = {
  title: "Media — Ayodele Oladapo Awe Ministries",
  description:
    "Access teachings, music, and messages from Minister Ayodele Oladapo Awe.",
};

export default function MediaPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
          Media
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          The Word &amp; The Worship
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto">
          Access teachings, music, and messages from Minister Ayodele Oladapo
          Awe anywhere in the world
        </p>
      </section>

      {/* ── 2. Teachings Section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
              Teachings
            </p>
            <h2 className="font-serif text-3xl text-blue-navy mb-6">
              Word of God on Telegram
            </h2>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Minister Awe&apos;s teachings are made available through our
              Telegram channel — a growing library of sermons, Bible studies,
              and prophetic messages.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-4">
              Whether you are looking for foundational truths or deep prophetic
              insights, the Telegram channel is your access point to the Word
              taught with clarity and fire.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              Join the channel, share with your community, and let the Word of
              God transform your life.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-sans text-sm font-semibold bg-blue text-white px-10 py-4 rounded-lg hover:bg-blue-deep transition-colors"
            >
              Join Telegram Channel
            </a>
            <p className="font-sans text-xs text-muted mt-3">
              Free to join. New teachings posted regularly.
            </p>
          </div>
          <div className="relative bg-cream rounded-lg p-12 text-center border border-blue/10 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
              alt="Open Bible devotional"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-white/85" />
            <div className="relative z-10">
            <div className="mx-auto mb-6">
              <TelegramIcon size={64} />
            </div>
            <h3 className="font-serif text-xl text-blue-navy mb-2">
              Telegram Teachings
            </h3>
            <p className="font-sans text-sm text-muted mb-6">
              Sermons · Bible Studies · Prophetic Messages
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-blue-sky hover:text-blue transition-colors"
            >
              Join Now →
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Music Section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative bg-blue-deep/50 rounded-lg p-12 text-center border border-white/5 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80"
              alt="Worship band on stage"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-navy/80" />
            <div className="relative z-10">
            <div className="mx-auto mb-6">
              <SpotifyIcon size={64} />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">
              Music on Spotify
            </h3>
            <p className="font-sans text-sm text-white/50 mb-6">
              Worship · Gospel · Prophetic Songs
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-blue-sky hover:text-white transition-colors"
            >
              Listen Now →
            </a>
            </div>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
              Music
            </p>
            <h2 className="font-serif text-3xl text-white mb-6">
              Worship on Spotify
            </h2>
            <p className="font-sans text-white/70 leading-relaxed mb-4">
              Minister Awe&apos;s music is a vessel of encounter — crafted to
              usher believers into the presence of God through worship,
              prophetic songs, and gospel anthems.
            </p>
            <p className="font-sans text-white/70 leading-relaxed mb-4">
              His discography spans worship, gospel, and prophetic music, each
              song carrying a message of hope, revival, and the glory of God.
            </p>
            <p className="font-sans text-white/70 leading-relaxed mb-8">
              Stream his music on Spotify, add it to your worship playlists,
              and let the songs minister to you in your personal devotion and
              corporate gatherings.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors"
            >
              Stream on Spotify
            </a>
            <p className="font-sans text-xs text-white/40 mt-3">
              Available on all major streaming platforms.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Quick Access ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
            Quick Access
          </p>
          <h2 className="font-serif text-3xl text-blue-navy mb-16">
            Everything in One Place
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: SpotifyIcon, title: "Music", desc: "Stream worship & gospel songs", link: "Listen →" },
              { Icon: TelegramIcon, title: "Teachings", desc: "Access sermons & Bible studies", link: "Join →" },
              { Icon: YouTubeIcon, title: "Videos", desc: "Watch live sessions & messages", link: "Watch →" },
              { Icon: SpotifyIcon, title: "Podcast", desc: "Listen on the go", link: "Listen →" },
            ].map((card) => (
              <a
                key={card.title}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-cream rounded-lg p-8 text-center block border border-blue/10 hover:border-blue/20 transition-all"
              >
                <div className="mx-auto mb-4 flex items-center justify-center">
                  <card.Icon size={48} />
                </div>
                <h3 className="font-serif text-lg text-blue-navy group-hover:text-blue transition-colors mb-1">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-muted mb-4">{card.desc}</p>
                <span className="font-sans text-sm text-blue-sky group-hover:text-blue transition-colors">
                  {card.link}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Newsletter CTA ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-navy to-blue-deep text-center">
        <div className="mx-auto max-w-lg">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
            Stay Updated
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            New Content, Straight to Your Inbox
          </h2>
          <p className="font-sans text-white/70 mb-10">
            Subscribe to get notified when new teachings and music are released.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Invite Minister Awe to Minister
          </h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">
            Book Minister Ayodele Oladapo Awe for your church, conference, or
            event.
          </p>
          <Link
            href="/contact"
            className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
