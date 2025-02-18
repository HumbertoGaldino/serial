'use client'

import { useState, useEffect } from "react";
import { fetchMovie } from "@/app/actions/fetchMovie";

export default function MoviePage() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovie();
        console.log("Dados recebidos:", data);
        setMovie(data?.results || []); 
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
      <div>
        <h1 className="text-white text-4xl">
          {movie.length > 0 ? movie[0]?.title : "Carregando..."}
        </h1>
      </div>
    </main>
  );
}
