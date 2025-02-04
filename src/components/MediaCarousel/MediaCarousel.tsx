"use client";

import { useState, useEffect, useCallback } from "react";
import MediaCard from "../MediaCard/MediaCard";
import { fetchDiscoverMovies } from "@/app/actions/fetchDiscoverMovies";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type Media = {
  id: number;
  title: string;
  poster_path: string;
};

const VISIBLE_CARDS = 3; // Number of cards visible at once

export default function MediaCarousel() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMedias = async () => {
      const data = await fetchDiscoverMovies(1);
      setMedias(data.results);
    };
    fetchMedias();
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < medias.length - VISIBLE_CARDS) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, medias.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <div className="relative max-w-[1200px] flex items-center">
      <button
        onClick={handlePrevious}
        onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
        disabled={currentIndex === 0}
        className="absolute left-[-50px] z-10 p-2 rounded-full bg-purple text-white hover:bg-purple/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous movies"
        tabIndex={0}
      >
        <IconChevronLeft className="w-6 h-6" />
      </button>

      <div className="overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (354 + 16)}px)` }} // 354px is card width, 16px is gap
        >
          {medias.map((media) => (
            <MediaCard
              key={media.id}
              media_image={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              media_title={media.title}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        onKeyDown={(e) => handleKeyDown(e, handleNext)}
        disabled={currentIndex >= medias.length - VISIBLE_CARDS}
        className="absolute right-[-50px] z-10 p-2 rounded-full bg-purple text-white hover:bg-purple/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next movies"
        tabIndex={0}
      >
        <IconChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
