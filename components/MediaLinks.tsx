import { SOCIALS } from "@/lib/constants";
import AnimateIn from "@/components/AnimateIn";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import YouTubeIcon from "@/components/icons/YouTubeIcon";

const MEDIA_CARDS = [
  {
    title: "Listen on Spotify",
    description:
      "Stream sermons, worship sessions, and devotional content on the go.",
    href: SOCIALS.spotify,
    Icon: SpotifyIcon,
    comingSoon: false,
  },
  {
    title: "Join on Telegram",
    description:
      "Stay connected with daily devotionals, announcements, and live event updates.",
    href: SOCIALS.telegram,
    Icon: TelegramIcon,
    comingSoon: false,
  },
  {
    title: "Watch on YouTube",
    description:
      "Watch live sessions, messages, and worship recordings from our services.",
    href: SOCIALS.youtube,
    Icon: YouTubeIcon,
    comingSoon: false,
  },
] as const;

const CARD_BASE =
  "group flex h-full min-h-[200px] flex-col items-center justify-center border border-white/5 bg-blue-deep/50 p-8 text-center transition-colors";

export default function MediaLinks() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {MEDIA_CARDS.map((card, i) => {
        const body = (
          <>
            <div className="mb-4">
              <card.Icon size={48} className="lg:hidden" />
              <card.Icon size={64} className="hidden lg:block" />
            </div>

            <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-white transition-colors group-hover:text-blue-sky">
              {card.title}
            </h3>

            <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">
              {card.description}
            </p>
          </>
        );

        return (
          <AnimateIn key={card.title} delay={i * 0.1} className="h-full">
            {card.comingSoon ? (
              <div className={`${CARD_BASE} opacity-60`}>
                {body}
                <span className="mt-6 inline-flex items-center border border-white/20 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  Coming Soon
                </span>
              </div>
            ) : (
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CARD_BASE} hover:border-white/20`}
              >
                {body}
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-blue-sky transition-colors group-hover:text-white">
                  Open
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </a>
            )}
          </AnimateIn>
        );
      })}
    </div>
  );
}
