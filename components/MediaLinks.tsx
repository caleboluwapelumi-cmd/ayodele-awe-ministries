import { SOCIALS } from "@/lib/constants";
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
  },
  {
    title: "Join on Telegram",
    description:
      "Stay connected with daily devotionals, announcements, and live event updates.",
    href: SOCIALS.telegram,
    Icon: TelegramIcon,
  },
  {
    title: "Watch on YouTube",
    description:
      "Watch live sessions, messages, and worship recordings from our services.",
    href: SOCIALS.youtube,
    Icon: YouTubeIcon,
  },
] as const;

export default function MediaLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {MEDIA_CARDS.map((card) => (
        <a
          key={card.title}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-blue-deep/50 rounded-lg p-8 border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="mb-6">
            <card.Icon size={64} />
          </div>
          <h3 className="font-serif text-xl text-white group-hover:text-blue-sky transition-colors mb-3">
            {card.title}
          </h3>
          <p className="font-sans text-sm text-white/60 leading-relaxed mb-4">
            {card.description}
          </p>
          <span className="font-sans text-sm text-blue-sky group-hover:text-white transition-colors">
            Open →
          </span>
        </a>
      ))}
    </div>
  );
}
