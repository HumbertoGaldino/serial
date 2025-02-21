 
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { fetchTvShow } from "@/app/actions/fetchTvShow";
import LoadingSpinner from "@/src/components/LoadingSpinner/LoadingSpinner";
import TitleHeader from "@/src/components/TitleHeader";

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

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface TVShow {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export default function TvShowPage() {

  const { id } = useParams();

  const t = useTranslations("TvShow");
   
  const [tvShow, setTvShow] = useState<TVShow>({
    backdrop_path: "",
    created_by: [],
    episode_run_time: [],
    first_air_date: "",
    genres: [],
    homepage: "",
    id: 0,
    in_production: false,
    languages: [],
    last_air_date: "",
    last_episode_to_air: null,
    name: "",
    next_episode_to_air: null,
    networks: [],
    number_of_episodes: 0,
    number_of_seasons: 0,
    origin_country: [],
    original_language: "",
    original_name: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    production_companies: [],
    production_countries: [],
    seasons: [],
    spoken_languages: [],
    status: "",
    tagline: "",
    type: "",
    vote_average: 0,
    vote_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTvShowData = async () => {
      try {              
        const data = await fetchTvShow(id);
        setTvShow(data);
      } catch (error) {
        console.error("Erro ao buscar a série:", error);
      }
      setIsLoading(false);
    };

    fetchTvShowData();
  }, []);


  return isLoading ? (
      <div className="flex flex-col lg-max:w-[85vw] 3xl:w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
          <LoadingSpinner />
      </div>
    ):(
      <TitleHeader type={tvShow}/>
  );
}
