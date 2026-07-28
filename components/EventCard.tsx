import Image from "next/image";
import Button from "./Button";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl?: string;
  registerLink: string;
  /** Overrides the CTA wording for events with no registration to complete. */
  ctaLabel?: string;
}

export default function EventCard({
  title,
  date,
  location,
  imageUrl,
  registerLink,
  ctaLabel = "Register",
}: EventCardProps) {
  return (
    <div className="group flex h-full flex-col bg-gradient-to-br from-white to-[#EEF3FA] shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Image + date badge */}
      <div className="relative aspect-video w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-cream">
            <span className="font-sans text-xs uppercase tracking-widest text-muted">
              Event Image
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 bg-wine px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest text-white">
          {date}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="mt-4 font-serif text-xl font-bold leading-tight text-blue-navy transition-colors group-hover:text-blue">
          {title}
        </h3>
        <p className="mb-8 mt-2 flex-1 font-sans text-xs uppercase tracking-widest text-muted">
          {location}
        </p>
        <Button href={registerLink} variant="primary" className="self-start">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
