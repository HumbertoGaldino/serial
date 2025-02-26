"use server";

export async function fetchVideoSeason(
  id: string,
  season_number: string,
  lang: string = "pt-BR"
) {

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/videos?api_key=${process.env.TMDB_API_KEY}&language=${lang}`,
    {
      method: "GET",
    }
  );
  
  const data = await response.json();
  
  if(data.results?.length > 0){
    return data;
  } else {

    const response2 = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/videos?api_key=${process.env.TMDB_API_KEY}`,
      {
        method: "GET",
      }
    );

    const data2 = await response2.json();

    return data2;
  }

  
}
