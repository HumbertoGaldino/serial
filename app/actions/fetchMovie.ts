"use server";

export async function fetchMovie(
  id: string,
  lang: string = "pt-BR"
) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=${lang}`,
    {
      method: "GET",
    }
  );
  
  const data = await response.json();
  return data;
}
