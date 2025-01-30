import Header from "@/src/components/Header/Header";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { Athiti } from "next/font/google";
import MediaCarousel from "@/src/components/MediaCarousel/MediaCarousel";

const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Discover() {
  return (
    <>
      <Header />
      <main className="min-h-screen h-full flex flex-col items-center bg-black">
        <div className="flex flex-col items-center justify-center gap-6 mt-20">
          <Image src="/bussola.png" alt="bussola" width={100} height={100} />
          <h1
            className={`${bebasNeue.className} text-purple text-[5.6em] tracking-[0.6em] mr-[-0.6em]`}
          >
            EXPLORAR
          </h1>
          <div className="relative mt-10">
            <input
              type="text"
              placeholder="PESQUISAR SÉRIES"
              className={`${athiti.className} w-[51rem] text-[1.5em] tracking-[0.4em] px-4 py-2 rounded-full text-center bg-gray-800 text-white focus:outline-none`}
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
        <div className="flex flex-col items-center justify-center gap-6 mt-20">
          <h2 className={`${bebasNeue.className} text-purple text-[5.6em] tracking-[0.6em] mr-[-0.6em]`}>
            FILMES
          </h2>
          <MediaCarousel />
        </div>
      </main>
    </>
  );
}
