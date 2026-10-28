import Image from "next/image";
import Button from "./Button";
import AmazonIcon from "./icons/AmazonIcon";

/**
 * The "Buy on Selar" / "Buy on Amazon" pair, shared by /books and every
 * /books/[slug] landing page so the two cannot drift.
 *
 * Selar takes the orange `primary` fill, so it works on any ground. Amazon is
 * an `outline` pill, which takes its colour from `className`, so `tone` picks
 * it: `brand-blue` on a light section, white on a dark one.
 *
 * Both open in a new tab (`external` → `target="_blank" rel="noopener
 * noreferrer"`).
 */
export default function BookBuyButtons({
  selar,
  amazon,
  tone,
  className = "",
}: {
  selar: string;
  amazon: string;
  tone: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`.trim()}>
      <Button href={selar} variant="primary" external>
        {/* The all-white rendition, so the mark sits straight on the orange
            pill with no plate behind it. Decorative: the label beside it
            already says Selar. */}
        <Image
          src="/images/selar-wordmark-white.png"
          alt=""
          aria-hidden
          width={138}
          height={73}
          className="h-4 w-auto"
        />
        Buy on Selar
      </Button>
      <Button
        href={amazon}
        variant="outline"
        className={tone === "dark" ? "text-white" : "text-brand-blue"}
        external
      >
        <AmazonIcon size={20} />
        Buy on Amazon
      </Button>
    </div>
  );
}
