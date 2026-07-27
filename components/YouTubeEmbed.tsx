type YouTubeEmbedProps = {
  /** A single video ID, or a playlist ID (use one or the other). */
  videoId?: string;
  playlistId?: string;
  title: string;
  className?: string;
};

/**
 * YouTube's privacy-enhanced player (youtube-nocookie.com — no tracking cookie
 * until the visitor actually presses play).
 *
 * YouTube cannot embed a channel by its @handle. To show a channel's uploads,
 * pass its uploads-playlist ID: take the channel ID (UCxxxx…) and swap the
 * leading "UC" for "UU" — see YOUTUBE_UPLOADS_PLAYLIST_ID in lib/constants.ts.
 */
export default function YouTubeEmbed({
  videoId,
  playlistId,
  title,
  className = "",
}: YouTubeEmbedProps) {
  const src = playlistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`
    : `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl ${className}`}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
