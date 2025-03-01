import Image from "next/image";
import { GiCompass } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import DiscoverFocusCards from "@/src/components/DiscoverFocusCards/DiscoverFocusCards";
import { getRandomBackdropPath } from "@/src/utils/getRandomBackdropPath";
import { type } from "os";

import { Bebas_Neue, Athiti } from "next/font/google";
const athiti = Athiti({ subsets: ["latin"], weight: ["400"] });

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Discover() {
  const backdropPath = await getRandomBackdropPath();

  return (
    <main className="lg-max:max-w-[85vw] 3xl:max-w-[90vw] min-h-screen h-full flex flex-col items-center bg-discover bg-repeat bg-[center_top_20rem] bg-slate-950 relative">
      <div className="flex flex-col h-[90vh] relative w-full items-center justify-center">
        <div className="absolute top-0 z-10 w-full bg-gradient-to-b from-[#030718] to-transparent h-20"></div>
        
        <Image
          src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
          alt=""
          width={1500}
          height={1500}
          className="object-cover absolute inset-0 z-0 w-full h-full grayscale opacity-90 contrast-125 brightness-125"
        />
         
         <div className="absolute inset-0 bg-[#311078] mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-[#040819] mix-blend-screen"></div>


          <div className="relative flex flex-col items-center justify-center mt-20 lg-max:mb-20 3xl:mb-30 z-20">
            <GiCompass className="lg-max:w-[70px] lg-max:h-[70px] 3xl:w-[100px] 3xl:h-[100px] text-secondary" />
            <h1
              className={`${bebasNeue.className} text-secondary lg-max:text-[5.6em] lg-max:tracking-[0.2em] lg-max:mr-[-0.4em] 3xl:text-[5.6em] 3xl:tracking-[0.6em] 3xl:mr-[-0.6em] -mb-5`}
            >
              EXPLORAR
            </h1>
            <h3
              className={`${bebasNeue.className} text-secondary lg-max:text-[1.6em] lg-max:tracking-[0.1em] lg-max:mr-[-0.4em] 3xl:text-[5.6em] 3xl:tracking-[0.2em] 3xl:mr-[-0.6em]`}
            >
             Milhões de histórias te esperam. Explore agora.
            </h3>
          </div>

        <div className="absolute bottom-0 z-10 w-full bg-gradient-to-t from-[#030718] to-transparent h-40"></div>
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
