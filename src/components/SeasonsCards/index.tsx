import { SwipperFocusCards } from "@/src/components/ui/swipper-focus-cards";

import { GiTv } from "react-icons/gi";

import { Bebas_Neue, Athiti } from "next/font/google";
const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});


export default function SeasonsCards({ seasons, type, idTvshow }: { seasons: Array<object>, type: string, idTvshow: string }) {
   
      return (
          <div className="lg-max:max-w-[85vw] 3xl:max-w-[90vw] p-6 flex flex-row flex-wrap items-center gap-4 justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
            <h2
              className={`${bebasNeue.className} w-[95%] flex flex-row bg-opacity-70 text-primary 3xl:text-[4em] 3xl:tracking-[0.3em] 3xl:mb-10 lg-max:text-[2em] lg-max:tracking-[0.3em] lg-max:mb-5 border-b-4 border-primary`}
            >
              <GiTv className="mt-1 mr-3"/>
              Temporadas
            </h2>

            <div className="w-[95%]">
                {   
                    seasons?.length > 0 ? (
                        <SwipperFocusCards cards={seasons} type={type} isSeason='true' idTvshow={idTvshow}/>
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