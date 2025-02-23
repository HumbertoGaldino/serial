"use client";

import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  type: "movie" | "tv";
  id: number;
  title: string;
  poster_path: string;
  date: string;
}

export default function MediaCard({ type, id, title, poster_path, date }: MediaCardProps) {
  const year = new Date(date).getFullYear();
  const href = type === "movie" ? `/movie/${id}` : `/tv/${id}`;

  return (
    <Link href={href}>
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden group">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-sm font-medium line-clamp-2">{title}</h3>
            <p className="text-gray-300 text-xs mt-1">{year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
