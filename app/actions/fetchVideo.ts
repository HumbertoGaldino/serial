"use server";

export async function fetchVideo(
  id: string,
  type: string,
  lang: string = "pt-BR"
) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=${lang}`,
    {
      method: "GET",
    }
  );
  
  const data = await response.json();
  return data;
}
