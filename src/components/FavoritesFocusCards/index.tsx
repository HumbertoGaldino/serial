'use client'

import { useState, useEffect } from "react";
import { FavoritesCards } from "@/src/components/ui/favorites-cards";
import { fetchDiscoverMovies } from "@/app/actions/fetchDiscoverMovies";

export default function FavoritesFocusCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await fetchDiscoverMovies(1);
      setCards(data.results);
    };
    fetchCards();
  }, []);
  return <FavoritesCards cards={cards} />;
}
