import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/src/components/LoadingSpinner/LoadingSpinner";
import { fetchRecommendations } from "@/app/actions/fetchRecommendations";
import { SwipperFocusCards } from "@/src/components/ui/swipper-focus-cards";

import Image from "next/image";

import { SiQlik } from "react-icons/si";

import { Bebas_Neue, Athiti } from "next/font/google";
const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});


export default function RecommendedTitles({ type }: { type: string }) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [titles, setTitles] = useState<object>();

    useEffect(() => {
        const fetchRecommendationsData = async () => {
          try {              
            const data = await fetchRecommendations(id,type);
            setTitles(data);
          } catch (error) {
            console.error("Erro ao buscar o filme:", error);
          }
          setIsLoading(false);
        };

        fetchRecommendationsData();
      }, []);

      return isLoading ? (
          <div className="flex flex-col lg-max:max-w-[85vw] 3xl:max-w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
              <LoadingSpinner />
          </div>
        ):(
          <div className="lg-max:max-w-[85vw] 3xl:max-w-[90vw] p-6 flex flex-row flex-wrap items-center gap-4 justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
            <h2
              className={`${bebasNeue.className} w-[95%] flex flex-row bg-opacity-70 text-primary 3xl:text-[4em] 3xl:tracking-[0.3em] 3xl:mb-10 lg-max:text-[2em] lg-max:tracking-[0.3em] lg-max:mb-5 border-b-4 border-primary`}
            >
              <SiQlik className="mt-1 mr-3"/>
              Títulos Recomendados
            </h2>

            <div className="w-[95%] h-[50vh]">
                {   
                    titles?.results?.length > 0 ? (
                        <SwipperFocusCards cards={titles.results} type={type} />
                    ) : ( 
                    <div className="h-[40vh] text-white flex flex-col items-center justify-center">
                        <p>Nenhuma recomendação encontrada.</p>
                    </div>
                    )
                }
            </div>
            
            
            
          </div>
      )
}