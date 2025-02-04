"use server";

export async function fetchDiscoverMovies(page: number = 1) {
  const response = await fetch(
    `${process.env.API_URL}/api/discover/movies/${page}`
  );
  const data = await response.json();
  return data;
}
