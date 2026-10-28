import type { DescriptionBlock } from "@/lib/books";

/**
 * A book's description, from `Book.description` in lib/books.ts. A string is
 * a paragraph and `{ lead, items }` is a bulleted list under its lead-in line.
 * Used by /books and /books/[slug]; light sections only (`text-muted` body).
 *
 * Bullets are small sharp orange squares rather than browser discs, which
 * matches the site's square-cornered panels. They are decoration, so they're
 * `aria-hidden`; the `<ul>` still tells a screen reader it is a list.
 */
export default function BookDescription({
  blocks,
  className = "",
}: {
  blocks: DescriptionBlock[];
  className?: string;
}) {
  return (
    <div
      className={`font-sans text-base leading-relaxed text-muted sm:text-lg ${className}`.trim()}
    >
      {blocks.map((block) =>
        typeof block === "string" ? (
          <p key={block}>{block}</p>
        ) : (
          <div key={block.lead}>
            <p className="font-semibold text-brand-blue">{block.lead}</p>
            <ul className="mt-3 space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-brand-orange"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      )}
    </div>
  );
}
