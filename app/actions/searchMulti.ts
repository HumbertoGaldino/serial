"use server"

export async function SearchMulti(searchTerm: string, page: number, lang: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=${lang}&query=${searchTerm}&page=${page}&include_adult=false`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data: " + res.statusText);
  }
  return res.json();
}