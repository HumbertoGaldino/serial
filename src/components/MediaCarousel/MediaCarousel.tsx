"use client";

import { useState, useEffect } from "react";
import MediaCard from "../MediaCard/MediaCard";
import { fetchDiscoverMovies } from "@/app/actions/fetchDiscoverMovies";
type Media = {
  id: number;
  title: string;
  poster_path: string;
};

export default function MediaCarousel() {
  const [medias, setMedias] = useState<Media[]>([]);

  useEffect(() => {
    const fetchMedias = async () => {
      const data = await fetchDiscoverMovies(1);
      setMedias(data.results);
    };
    fetchMedias();
  }, []);

  return (
    <div className="max-w-[1200px] overflow-x-auto flex flex-row gap-4 flex-nowrap">
      {medias &&
        medias.map((media) => (
          <MediaCard
            key={media.id}
            media_image={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            media_title={media.title}
          />
        ))}
    </div>
  );
}
