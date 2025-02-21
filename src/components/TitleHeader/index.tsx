import Image from 'next/image'
import { Bebas_Neue } from "next/font/google";
import { Athiti } from "next/font/google";
const athiti = Athiti({ subsets: ["latin"], weight: ["400"] });

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function TitleHeader({ type }: { type: object }){
    return (
        <main className="flex flex-col lg-max:w-[85vw] 3xl:w-[90vw] items-center justify-center flex-1 relative z-9999 bg-slate-950 relative z-1">
              
          <Image
            src={`https://image.tmdb.org/t/p/original/${type.backdrop_path}`}
            alt=""
            width={1000}
            height={1000}
            className="absolute w-full h-full z-2 object-cover blur-sm bg-slate-950 opacity-50" 
          />

          <div className="flex flex-row w-full h-full items-center justify-center relative z-4 p-4">
            <div className="relative z-3 p-4 w-[70%] flex flex-col items-center justify-center gap-3">
              <h1 className={`${bebasNeue.className} w-[40%] text-white text-center text-4xl mb-12`}>
                {type.title ? type.title : type.name}
              </h1>

              <h3 className={`${bebasNeue.className}  text-white text-center text-xl`}>Sinopse</h3>
              <p className={`${athiti.className} w-[60%]  text-white text-center text-sm`}>{type.overview}</p>
            </div>

            <div className="w-[30%]">
              <Image
                src={`https://image.tmdb.org/t/p/original/${type.poster_path}`}
                alt=""
                width={1000}
                height={1000}
                className="w-[16rem] h-[24rem] rounded-lg object-cover"
              />
            </div>
          </div>     
      </main>
    )
}