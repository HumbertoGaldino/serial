"use client";

import { useState, useEffect } from "react";
import { fetchMovie } from "@/app/actions/fetchMovie";

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

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovie();
        console.log("Dados recebidos:", data);
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
      }
    };

    fetchMovieData();
  }, []);

  useEffect(() => {
    console.log("Estado atualizado:", movie);
  }, [movie]);

  return (
    <main className="flex flex-col lg-max:w-[85vw] 3xl:w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950">
      <div className={`flex flex-row bg-[url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')] w-full h-full`}>
        <div>
          <h1 className="text-white text-4xl">
            {movie.title}
          </h1>
        </div>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" className="w-[300px] h-[450px] rounded-lg"/>
      </div>
    </main>
  );
}
