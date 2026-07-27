interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Selar mark.
 *
 * Selar publishes no public SVG brand asset — their logo is a typographic
 * wordmark — so rather than trace a low-fidelity copy or ship a raster, this is
 * a drawn badge mark: a rounded tile carrying an "S", built from paths only.
 * No font dependency, so it renders identically everywhere and stays crisp at
 * any size, and it keeps the Selar button visually symmetrical with the Amazon
 * one (mark + label) on `/books`.
 *
 * Stroked in `currentColor`, so it inherits the Button variant's text colour.
 */
export default function SelarIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M15.2 9.2c0-1.6-2.4-2-4-1.3-1.8.8-1.8 2.9.2 3.7l1.4.6c2.2.9 2.2 3.2.2 4-1.7.7-4.1.3-4.2-1.4" />
    </svg>
  );
}
