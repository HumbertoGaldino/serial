import { Bebas_Neue } from "next/font/google";
import { Athiti } from "next/font/google";
import { GiCompass } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import DiscoverFocusCards from "@/src/components/DiscoverFocusCards/DiscoverFocusCards";
const athiti = Athiti({ subsets: ["latin"], weight: ["400"] });

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Discover() {
  return (
    <main className="lg-max:max-w-[85vw] 3xl:max-w-[90vw] min-h-screen h-full flex flex-col items-center bg-discover bg-repeat bg-top bg-slate-950">
      <div className="flex flex-col items-center justify-center gap-6 mt-20 lg-max:mb-30 3xl:mb-40 z-10">
        <GiCompass className="lg-max:w-[70px] lg-max:h-[70px] 3xl:w-[100px] 3xl:h-[100px] text-[#6b41b6]" />
        <h1
          className={`${bebasNeue.className} text-[#6b41b6] lg-max:text-[3.6em] lg-max:tracking-[0.4em] lg-max:mr-[-0.4em] 3xl:text-[5.6em] 3xl:tracking-[0.6em] 3xl:mr-[-0.6em]`}
        >
          EXPLORAR
        </h1>
      </div>
      <div className="w-[80%] flex flex-col items-center justify-center gap-6 mt-20">
        <h2
          className={`${bebasNeue.className} w-full flex flex-row bg-opacity-70 text-[#6b41b6] 3xl:text-[4em] 3xl:tracking-[0.3em] 3xl:mb-10 lg-max:text-[2em] lg-max:tracking-[0.3em] lg-max:mb-8 border-b-4 border-[#6b41b6]`}
        >
          <MdLocalMovies className="mt-1 mr-3"/>
          Tendências em Filmes
        </h2>
        <DiscoverFocusCards type="movie" />
      </div>

      <div className="w-[80%] flex flex-col items-center justify-center gap-6 mt-20 mb-40">
        <h2
          className={`${bebasNeue.className} w-full flex flex-row bg-opacity-70 text-[#6b41b6] 3xl:text-[4em] 3xl:tracking-[0.3em] 3xl:mb-10 lg-max:text-[2em] lg-max:tracking-[0.3em] lg-max:mb-8 border-b-4 border-[#6b41b6]`}
        >
          <TbDeviceTvOldFilled className="mt-1 mr-3"/>
          Tendências em Séries
        </h2>
        <DiscoverFocusCards type="tv" />
      </div>
    </main>
  );
}
