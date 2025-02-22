import { useEffect, useState } from "react";
import LoadingSpinner from "@/src/components/LoadingSpinner/LoadingSpinner";
import { useParams } from "next/navigation";
import { fetchCasting } from "@/app/actions/fetchCasting";
import { FaArrowCircleRight } from "react-icons/fa";
import Image from "next/image";

import { Bebas_Neue, Athiti } from "next/font/google";
const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function CastingCards() {
    const { id } = useParams();
    const type ='movie';
    const [isLoading, setIsLoading] = useState(true);
    const [cast, setCast] = useState<object>();

    useEffect(() => {
        const fetchCastData = async () => {
          try {              
            const data = await fetchCasting(id,type);
            console.log(data)
            setCast(data);
          } catch (error) {
            console.error("Erro ao buscar o filme:", error);
          }
          setIsLoading(false);
        };
    
        fetchCastData();
      }, []);
    
    return isLoading ? (
        <div className="flex flex-col lg-max:w-[85vw] 3xl:w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
            <LoadingSpinner />
        </div>
      ):(
        <div className="lg-max:max-w-[85vw] 3xl:max-w-[90vw] p-6 flex flex-row flex-wrap items-center gap-4 justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
            {cast.cast.slice(0, 10).map((cast, index) => {
                return (
                    <div className="w-[150px] flex flex-col items-center justify-center cursor-pointer" key={index}>
                        <Image                             
                            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                            alt={cast.name}
                            width={1000}
                            height={1000}
                            className="rounded-t-2xl w-[150px] h-[150px] object-cover"
                        />
                        <div className="h-[70px] w-[150px] pt-2 rounded-b-2xl bg-slate-900">
                            <h4 className={`${bebasNeue.className} text-xl text-white text-center leading-5`}>{cast.name}</h4>
                            <h5 className={`${athiti.className}text-xl text-bold text-white text-center -mt-1`}>{cast.character}</h5>
                        </div>
                        
                    </div>                    
                )
            })}
            <div className="w-[150px] h-[220px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center cursor-pointer">
                <span className={`${bebasNeue.className} text-xl text-white text-center leading-5`}>
                    Mostrar Mais
                </span>
                <FaArrowCircleRight className="text-xl text-white text-center mt-2" />
            </div>
        </div>
    )
}