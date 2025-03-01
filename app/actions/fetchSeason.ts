"use server";

export async function fetchSeason(
  id: string,
  season_number: string,
  lang: string = "pt-BR"
) {

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${process.env.TMDB_API_KEY}&language=${lang}`,
    {
      method: "GET",
    }
  );
  
  const data = await response.json();
  return data;
}
