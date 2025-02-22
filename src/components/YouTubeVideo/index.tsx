import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaYoutube } from "react-icons/fa";
import { Bebas_Neue } from "next/font/google";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { fetchVideo } from "@/app/actions/fetchVideo";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function YouTubeVideo({ type }: { type: string }){
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [video, setVideo] = useState<object>();

    useEffect(() => {
        const fetchVideoData = async () => {
          try {              
            const data = await fetchVideo(id,type);
            setVideo(data);
          } catch (error) {
            console.error("Erro ao buscar o filme:", error);
          }
          setIsLoading(false);
        };

        fetchVideoData();
      }, []);



    return isLoading ? (
        <div className="flex flex-col lg-max:max-w-[85vw] 3xl:max-w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
            <LoadingSpinner />
        </div>
      ):(
        <div className="flex flex-col lg-max:w-[85vw] 3xl:w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1 p-4">
            
            <h2
              className={`${bebasNeue.className} w-[95%] flex flex-row bg-opacity-70 text-primary 3xl:text-[4em] 3xl:tracking-[0.3em] 3xl:mb-10 lg-max:text-[2em] lg-max:tracking-[0.3em] lg-max:mb-5 border-b-4 border-primary`}
            >
              <FaYoutube  className="mt-1 mr-3"/>
              Trailer
            </h2>
            {
                video ? 
                    <iframe className="w-[90%] h-[80vh] rounded-lg" height="315" src={`https://www.youtube.com/embed/${video.results[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                : 
                <div>
                    <p>Nenhum trailer encontrado.</p>
                </div>
            }

            
        </div>
        
    )
}