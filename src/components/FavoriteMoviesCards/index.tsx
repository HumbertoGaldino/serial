"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/src/components/LoadingSpinner/LoadingSpinner";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import Image from "next/image";

import { Bebas_Neue } from "next/font/google";
import { SwipperFocusCards } from "../ui/swipper-focus-cards";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  originalName: string;
  posterPath: string;
  firstAirDate: string;
  runtime: number;
  genres: Genre[];
}

export default function FavoriteMoviesCards({ movies }: { movies: Array<Movie> }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="flex flex-col lg-max:max-w-[85vw] 3xl:max-w-[90vw] items-center justify-center flex-1 z-9999 bg-slate-950 relative z-1">
      <LoadingSpinner />
    </div>
  ) : (
    <SwipperFocusCards cards={movies} type="movie" isProfile={true} />
  );
}
