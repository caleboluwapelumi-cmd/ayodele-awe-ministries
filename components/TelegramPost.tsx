"use client";

import { useEffect, useRef, useState } from "react";

type TelegramPostProps = {
  /** "channel/messageId", e.g. "bethelencounterlib/1344". */
  post: string;
  /** Reserve space before the widget loads so nothing jumps. */
  minHeight?: number;
  className?: string;
};

/**
 * Renders a single public Telegram post via Telegram's official widget. Audio
 * posts come back with a working play button, which is what makes the sermon
 * library playable on-site.
 *
 * The widget ships as a self-replacing <script>, so it can't be written as JSX
 * — React would render the tag without executing it. We inject it into a ref'd
 * container instead, and clear that container on cleanup so React 18 StrictMode
 * (which runs effects twice in dev) doesn't leave two copies behind.
 */
export default function TelegramPost({
  post,
  minHeight = 180,
  className = "",
}: TelegramPostProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    setFailed(false);

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-post", post);
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-dark", "1");
    script.onerror = () => setFailed(true);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [post]);

  return (
    <div className={className}>
      <div ref={containerRef} style={{ minHeight }} />
      {failed && (
        <p className="font-sans text-sm text-white/60">
          This teaching could not be loaded.{" "}
          <a
            href={`https://t.me/${post}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-sky underline-offset-4 hover:underline"
          >
            Open it on Telegram
          </a>
          .
        </p>
      )}
    </div>
  );
}
