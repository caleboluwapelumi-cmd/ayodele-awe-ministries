type SpotifyKind = "artist" | "show" | "album" | "track" | "episode";

type SpotifyEmbedProps = {
  /** Which kind of Spotify resource this is. */
  kind: SpotifyKind;
  /** The bare Spotify ID, or a full open.spotify.com URL — both are accepted. */
  id: string;
  title: string;
  /** `compact` is the 152px single-row player; `full` shows a track list. */
  size?: "compact" | "full";
  className?: string;
};

const HEIGHTS = { compact: 152, full: 352 } as const;

/**
 * Spotify's official iframe player.
 *
 * Note on playback: visitors who are not logged into Spotify in that browser
 * get 30-second previews. Full-length playback requires a Spotify login. That
 * is a platform rule and cannot be worked around from our side.
 */
export default function SpotifyEmbed({
  kind,
  id,
  title,
  size = "full",
  className = "",
}: SpotifyEmbedProps) {
  // Accept a pasted share URL as well as a bare ID, so updating a link later
  // doesn't require knowing which format the component wants.
  const bareId = id.includes("open.spotify.com")
    ? (id.split(`/${kind}/`)[1] ?? "").split(/[?/]/)[0]
    : id;

  return (
    <iframe
      src={`https://open.spotify.com/embed/${kind}/${bareId}?utm_source=generator&theme=0`}
      title={title}
      height={HEIGHTS[size]}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      className={`w-full rounded-2xl border-0 ${className}`}
    />
  );
}
