"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { fetchMovie } from "@/app/actions/fetchMovie";
import LoadingSpinner from "@/src/components/LoadingSpinner/LoadingSpinner";
import TitleHeader from "@/src/components/TitleHeader";
import CastingCards from "@/src/components/CastingCards";
import YouTubeVideo from "@/src/components/YouTubeVideo";
import RecommendedTitles from "@/src/components/RecommendedTitles";

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function MoviePage() {

  const { id } = useParams();

  const t = useTranslations("Movie");
   
  const [movie, setMovie] = useState<Movie>({
    adult: false,
    backdrop_path: "",
    belongs_to_collection: null,
    budget: 0,
    genres: [],
    homepage: "",
    id: 0,
    imdb_id: "",
    origin_country: [],
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    production_companies: [],
    production_countries: [],
    release_date: "",
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: "",
    tagline: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {              
        const data = await fetchMovie(id);
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
      }
      setIsLoading(false);
    };

    fetchMovieData();
  }, []);


  return isLoading ? (
      <div className="flex flex-col lg-max:w-[85vw] 3xl:w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
          <LoadingSpinner />
      </div>
    ):(
      <div className="lg-max:w-[85vw] 3xl:w-[90vw]">
        <TitleHeader type={movie}/>
        <CastingCards type='movie'/>
        <YouTubeVideo type='movie'/>
        <RecommendedTitles type='movie'/>
      </div>
  );
}
