 
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { fetchMovie } from "@/app/actions/fetchMovie";
import { Bebas_Neue } from "next/font/google";
import { Athiti } from "next/font/google";
const athiti = Athiti({ subsets: ["latin"], weight: ["400"] });

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});
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

  useEffect(() => {
    const fetchMovieData = async () => {
      try {              
        const data = await fetchMovie(id);
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
      }
    };

    fetchMovieData();
  }, []);


  return (
    <main className="flex flex-col lg-max:w-[85vw] 3xl:w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt=""
        className="absolute w-full h-full z-2 object-cover blur-sm bg-slate-950 opacity-50" 
      />

      <div className="flex flex-row w-full h-full items-center justify-center relative z-4 p-4">
        <div className="relative z-3 p-4 w-[70%] flex flex-col items-center justify-center gap-3">
          <h1 className={`${bebasNeue.className} w-[40%] text-white text-center text-4xl mb-12`}>
            {movie.title}
          </h1>

          <h3 className={`${bebasNeue.className}  text-white text-center text-xl`}>Sinopse</h3>
          <p className={`${athiti.className} w-[60%]  text-white text-center text-sm`}>{movie.overview}</p>
        </div>

        <div className="w-[30%] ">
          <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" className="w-[16rem] h-[24rem] rounded-lg object-cover"/>
        </div>
      </div>
    </main>
  );
}
