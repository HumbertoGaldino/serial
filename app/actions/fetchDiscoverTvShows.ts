"use server"

export async function fetchDiscoverTvShows(
  page: number = 1,
  lang: string = "pt-BR"
) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=${lang}&page=${page}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}