import { fetchDiscoverMovies } from "@/app/actions/fetchDiscoverMovies";
import { fetchDiscoverTvShows } from "@/app/actions/fetchDiscoverTvShows";

// Função para escolher aleatoriamente entre "movie" e "tv"
function getRandomType(): "movie" | "tv" {
    const types = ["movie", "tv"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex] as "movie" | "tv";
}

// Função principal para obter um backdrop_path aleatório (executada no servidor)
export async function getRandomBackdropPath(): Promise<string | null> {
    try {
        // Escolhe aleatoriamente o tipo ("movie" ou "tv")
        const type = getRandomType();

        let data;
        if (type === "movie") {
            data = await fetchDiscoverMovies(1);
        } else if (type === "tv") {
            data = await fetchDiscoverTvShows(1);
        } else {
            throw new Error("Invalid type");
        }

        // Filtra apenas os resultados com backdrop_path válido
        const validCards = data.results.filter((item: any) => item.backdrop_path);

        // Se não houver cards válidos, retorna null
        if (validCards.length === 0) {
            return null;
        }

        // Escolhe aleatoriamente um índice dentro do array validCards
        const randomIndex = Math.floor(Math.random() * validCards.length);
        return validCards[randomIndex].backdrop_path;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}