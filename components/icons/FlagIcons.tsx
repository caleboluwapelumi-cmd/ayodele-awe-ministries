/**
 * Country flags as inline SVG — UK and Nigeria only.
 *
 * ⚠️ These replaced the 🇬🇧 / 🇳🇬 emoji, and the reason is a real rendering bug,
 * not a preference. Regional-indicator flag emoji have no glyphs in the fonts
 * Windows ships: Segoe UI Emoji deliberately omits them, so Chrome, Edge and
 * Firefox on Windows render the two letter codes ("GB", "NG") in a box — or
 * nothing — while iOS, Android and macOS show the flag. The account labels on
 * /birthday are exactly the place that must not look broken, since they sit
 * beside bank details someone is about to act on. No web font fixes it either
 * (loading a colour emoji font for two glyphs is ~10 MB); drawing the two flags
 * is the proportionate fix.
 *
 * Two flags is two components. Do NOT reach for `flag-icons` or a similar
 * package — it ships ~260 flags and a stylesheet for a page that needs two.
 *
 * ⚠️ Both are decorative and marked `aria-hidden`. Every call site already
 * names the country in adjacent text ("United Kingdom Account", "Norwich,
 * United Kingdom"), so announcing the flag would only repeat it. If one is ever
 * used where nothing else names the country, that call site needs its own
 * visually-hidden label.
 *
 * Both use a 60×30 viewBox — the 1:2 ratio both flags are officially specified
 * at — so callers must pass a 2:1 class pair (`h-3 w-6`, `h-5 w-10`) or the
 * artwork letterboxes inside its own box.
 */

type FlagProps = {
  /** Must resolve to a 2:1 box, e.g. `h-4 w-8`. */
  className?: string;
};

const OUTLINE = "rgba(0,0,0,0.18)";

/**
 * The Union Flag.
 *
 * The white saltire and both crosses are plain strokes. The red saltire cannot
 * be: it is *counterchanged*, hugging the lower side of each diagonal in the
 * hoist half and the upper side in the fly half, so it is drawn as four
 * explicit polygons instead.
 *
 * ⚠️ The usual construction for that counterchange is a `<clipPath>`, and it is
 * avoided here on purpose — an SVG id must be unique per document, and these
 * flags render more than once per page (two giving cards, two church cards).
 * A duplicated `id` makes the second instance clip against the first. The
 * polygons below are that clip resolved by hand: the red band is 4 units wide
 * about each diagonal, so its edges are y = x/2 ± √5 and y = 30 − x/2 ± √5,
 * cut at the flag edges. Nothing here needs a unique id.
 */
export function UnitedKingdomFlag({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="60" height="30" fill="#012169" />

      {/* St Andrew — white saltire, 6 wide */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />

      {/* St Patrick — red saltire, counterchanged (see the note above) */}
      <g fill="#C8102E">
        <polygon points="0,0 0,2.236 25.528,15 30,15" />
        <polygon points="30,15 34.472,15 60,27.764 60,30" />
        <polygon points="0,30 30,15 30,17.236 4.472,30" />
        <polygon points="30,15 30,12.764 55.528,0 60,0" />
      </g>

      {/* St George — white ground, 10 wide, then the red cross, 6 wide */}
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />

      {/* Hairline, so the white arms of the cross do not bleed into a white
          card at the flag's edge. Painted last, half of it clipped by the
          viewBox, so it reads as a 0.5-unit inner border. */}
      <rect
        width="60"
        height="30"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="1"
      />
    </svg>
  );
}

/** Nigeria — green / white / green, equal thirds. Green is #008751. */
export function NigeriaFlag({ className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="60" height="30" fill="#FFFFFF" />
      <rect width="20" height="30" fill="#008751" />
      <rect x="40" width="20" height="30" fill="#008751" />
      <rect
        width="60"
        height="30"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * ISO 3166-1 alpha-2, so data files can carry a plain string rather than a
 * component reference — which matters for anything that crosses the
 * server/client boundary as a prop, since a component is not serialisable.
 */
export type CountryCode = "GB" | "NG";

export function CountryFlag({
  code,
  className,
}: FlagProps & { code: CountryCode }) {
  return code === "GB" ? (
    <UnitedKingdomFlag className={className} />
  ) : (
    <NigeriaFlag className={className} />
  );
}
