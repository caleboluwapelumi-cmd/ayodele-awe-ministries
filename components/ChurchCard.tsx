import Image from "next/image";
import Button from "./Button";

interface ChurchCardProps {
  name: string;
  acronym: string;
  description: string;
  location: string;
  /**
   * The church's own emblem. Preferred over `imageUrl` and rendered as a
   * contained brand plate rather than a full-bleed crop, so the artwork is
   * never cut and nothing generic stands in for the church's identity.
   */
  logoUrl?: string;
  /**
   * A real photograph of this congregation, rendered full-bleed with a scrim
   * and the acronym set over it. Never point this at stock imagery — a stock
   * photo of strangers reads as a photo of the church. Use `logoUrl` until a
   * genuine photo arrives.
   */
  imageUrl?: string;
  href: string;
}

export default function ChurchCard({
  name,
  acronym,
  description,
  location,
  logoUrl,
  imageUrl,
  href,
}: ChurchCardProps) {
  return (
    // The card is a plain container, not a link — the CTA below is the single
    // interactive target, so the Button can be a real anchor without nesting.
    <div className="group flex h-full flex-col border border-white/5 bg-white/[0.07] transition-colors hover:border-white/20">
      <div className="relative aspect-video w-full overflow-hidden">
        {logoUrl ? (
          // Light plate: both emblems carry their own ground (BHCC navy/orange
          // on white, BLCN on charcoal), so a light panel keeps each legible
          // and reads as a brand plate rather than a cropped photo. No scrim
          // and no acronym overlay here — nothing is set over the artwork, so
          // the acronym moves into the body below.
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white to-brand-tint p-8">
            <div className="relative h-full w-full">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        ) : imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Scrim keeps the acronym legible against any photo */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

            <span className="absolute left-4 top-4 font-serif text-4xl font-bold leading-none text-white">
              {acronym}
            </span>
          </>
        ) : (
          <div className="h-full w-full bg-brand-navy" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="mt-4 font-serif text-xl font-bold leading-tight text-white">
          {name}
        </h3>

        <p className="mt-2 font-sans text-xs uppercase tracking-widest text-brand-orange-light">
          {logoUrl && (
            <span className="mr-2 font-semibold text-white">{acronym}</span>
          )}
          {location}
        </p>

        <p className="mb-8 mt-4 flex-1 font-sans text-base leading-relaxed text-white/60">
          {description}
        </p>

        <Button
          href={href}
          variant="outline"
          className="self-start text-white"
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}
