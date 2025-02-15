"use client";

import { useState, useEffect } from "react";
import { FocusCards } from "@/src/components/ui/focus-cards";
import { fetchDiscoverMovies } from "@/app/actions/fetchDiscoverMovies";
import { fetchDiscoverTvShows } from "@/app/actions/fetchDiscoverTvShows";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type DiscoverFocusCardsType = "movie" | "tv";

export default function DiscoverFocusCards({
  type,
}: {
  type: DiscoverFocusCardsType;
}) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      if (type === "movie") {
        const data = await fetchDiscoverMovies(1);
        setCards(data.results);
      } else if (type === "tv") {
        const data = await fetchDiscoverTvShows(1);
        setCards(data.results);
      } else {
        console.error("Invalid type");
      }
      setIsLoading(false);
    };
    fetchCards();
  }, [type]);
  return isLoading ? (
    <div className="flex items-center justify-center flex-wrap gap-10 w-full">
      <LoadingSpinner />
      <LoadingSpinner />
      <LoadingSpinner />
      <LoadingSpinner />
      <LoadingSpinner />
    </div>
  ) : (
    <FocusCards cards={cards} type={type} />
  );
}
