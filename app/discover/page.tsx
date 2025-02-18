import Image from "next/image";
import SeeAllButton from "@/src/components/SeeAllButton/SeeAllButton";
import { Bebas_Neue } from "next/font/google";
import { Athiti } from "next/font/google";
import DiscoverFocusCards from "@/src/components/DiscoverFocusCards/DiscoverFocusCards";
const athiti = Athiti({ subsets: ["latin"], weight: ["400"] });

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Discover() {
  return (
    <>
      <main className="w-full min-h-screen h-full flex flex-col items-center bg-discover bg-repeat bg-top">
        <div className="flex flex-col items-center justify-center gap-6 mt-20 mb-40 z-10">
          <Image src="/bussola.png" alt="bussola" width={100} height={100} />
          <h1
            className={`${bebasNeue.className} text-purple text-[5.6em] tracking-[0.6em] mr-[-0.6em]`}
          >
            EXPLORAR
          </h1>
          <div className="relative mt-10">
            <input
              type="text"
              placeholder="PESQUISAR TÍTULOS"
              className={`${athiti.className} w-[51rem] text-[1.5em] tracking-[0.3em] px-4 py-2 rounded-full text-center border-2 border-purple focus:border-white bg-gray-700 text-white focus:outline-none`}
              aria-label="Search User"
              tabIndex={0}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple transition-colors duration-300"
              aria-label="Search"
              tabIndex={0}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.5 10.5A6 6 0 1110.5 4.5a6 6 0 016 6z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-[80%] flex flex-col items-center justify-center gap-6 mt-20">
          <h2
            className={`${bebasNeue.className} relative bg-white rounded-3xl rounded-tr-none bg-opacity-70 h-[5.5rem] pl-8 text-purple text-[4em] tracking-[0.3em] mb-10 `}
          >
            <Image
              src="/clapperboard.png"
              className="absolute top-[-3rem] left-[-4rem] z-10"
              width={100}
              height={100}
              alt="Clapperboard"
            />
            FILMES - LANÇAMENTOS
          </h2>
          <DiscoverFocusCards type="movie" />
          <SeeAllButton />
        </div>
        <div className="w-[80%] flex flex-col items-center justify-center gap-6 mt-20">
          <h2
            className={`${bebasNeue.className} relative bg-white rounded-3xl rounded-tr-none bg-opacity-70 h-[5.5rem] pl-8 text-purple text-[4em] tracking-[0.3em] mb-10`}
          >
            <Image
              src="/clapperboard.png"
              className="absolute top-[-3rem] left-[-4rem] z-10"
              width={100}
              height={100}
              alt="Clapperboard"
            />
            SÉRIES - LANÇAMENTOS
          </h2>
          <DiscoverFocusCards type="tv" />
          <SeeAllButton />
        </div>
      </main>
    </>
  );
}
