'use client'

import { useState, useEffect } from "react";
import { FocusCards } from "@/src/components/ui/focus-cards";
import { fetchDiscoverMovies } from "@/app/actions/fetchDiscoverMovies";

export default function DiscoverFocusCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await fetchDiscoverMovies(1);
      setCards(data.results);
    };
    fetchCards();
  }, []);
  return <FocusCards cards={cards} />;
}
