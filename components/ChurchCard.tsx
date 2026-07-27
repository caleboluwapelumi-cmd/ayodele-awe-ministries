import Link from "next/link";
import Image from "next/image";

interface ChurchCardProps {
  name: string;
  acronym: string;
  description: string;
  location: string;
  imageUrl?: string;
  href: string;
}

export default function ChurchCard({
  name,
  acronym,
  description,
  location,
  imageUrl,
  href,
}: ChurchCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-white/5 bg-blue-deep/50 transition-colors hover:border-white/20"
    >
      {/* Image with the acronym set over it */}
      <div className="relative aspect-video w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-blue-navy" />
        )}

        {/* Scrim keeps the acronym legible against any photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

        <span className="absolute left-4 top-4 font-serif text-4xl font-bold leading-none text-white">
          {acronym}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="mt-4 font-serif text-xl font-bold leading-tight text-white">
          {name}
        </h3>

        <p className="mt-2 font-sans text-xs uppercase tracking-widest text-blue-sky">
          {location}
        </p>

        <p className="mb-8 mt-4 flex-1 font-sans text-base leading-relaxed text-white/60">
          {description}
        </p>

        <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-white/70 underline-offset-4 transition-colors group-hover:text-white group-hover:underline">
          Learn more
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
