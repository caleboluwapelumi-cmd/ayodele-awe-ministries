import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl?: string;
  registerLink: string;
}

export default function EventCard({
  title,
  date,
  location,
  imageUrl,
  registerLink,
}: EventCardProps) {
  return (
    <div className="group bg-gradient-to-br from-white to-[#EEF3FA] rounded-lg overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-cream">
            <span className="font-sans text-xs text-muted uppercase tracking-wider">
              Event Image
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-sans text-xs uppercase tracking-widest text-wine mb-2">
          {date}
        </p>
        <h3 className="font-serif text-xl text-blue-navy group-hover:text-blue transition-colors mb-1">
          {title}
        </h3>
        <p className="font-sans text-sm text-muted mb-4">{location}</p>
        <Link
          href={registerLink}
          className="inline-flex items-center font-sans text-sm font-semibold bg-blue text-white px-6 py-2.5 rounded-lg hover:bg-blue-deep transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
