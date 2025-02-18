"use server";

export async function fetchMovie(
  lang: string = "pt-BR"
) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/5?api_key=${process.env.TMDB_API_KEY}&language=${lang}`,
    {
      method: "GET",
    }
  );
  
  const data = await response.json();
  return data;
}
