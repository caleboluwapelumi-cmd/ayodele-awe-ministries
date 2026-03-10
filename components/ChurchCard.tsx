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
    <Link href={href} className="group block bg-blue-deep/50 rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-all">
      {/* Image */}
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}

      <div className="p-8">
        {/* Acronym */}
        <span className="font-serif text-4xl font-bold text-white/30 group-hover:text-white/50 transition-colors">
          {acronym}
        </span>

        {/* Name */}
        <h3 className="font-serif text-xl text-white mt-4 mb-1 group-hover:text-white/80 transition-colors">
          {name}
        </h3>

        {/* Location */}
        <p className="font-sans text-xs uppercase tracking-wider text-muted mb-4">
          {location}
        </p>

        {/* Description */}
        <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
          {description}
        </p>

        {/* Link */}
        <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">
          Learn more →
        </span>
      </div>
    </Link>
  );
}
