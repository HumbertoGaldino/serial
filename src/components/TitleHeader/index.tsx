import Image from 'next/image'
import dayjs from "dayjs"
import StarRating from '@/src/components/StarRatingProps';
import ApprovalCircle from '@/src/components/ApprovalCircle';

import { Bebas_Neue, Athiti } from "next/font/google";
const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function TitleHeader({ type }: { type: object }){
    let runTime;
    if(type.runtime){
      const hours = parseInt((type.runtime / 60) % 24);
      const minutes = parseInt(type.runtime % 24);
      runTime = `${hours}h ${minutes}m`;
    }else{
      const hours = parseInt((type.last_episode_to_air.runtime / 60) % 24);
      const minutes = parseInt(type.last_episode_to_air.runtime % 24);
      runTime = type.last_episode_to_air.runtime > 60 ? `${hours}h${minutes}m` : `${type.last_episode_to_air.runtime}m`
    } 

    const formatData = (dateString: string) => {
      return dayjs(dateString).format("DD/MM/YYYY");
    };
     
    
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
              <div className='flex flex-col items-center justify-center w-[100%] text-white text-center mb-4'>
                <ApprovalCircle voteAverage={type.vote_average}/>
                <StarRating voteAverage={type.vote_average} />
                <h1 className={`${bebasNeue.className} w-[60%] text-6xl mt-4`}>
                  {type.title ? type.title : type.name}
                </h1>
                <div className={`${athiti.className} flex flex-row gap-2 items-center justify-center font-medium`}>
                  <span>{type.release_date ? formatData(type.release_date) + ' (BR) |' : ''}</span>
                  <span>{type.genres.map(
                    (genre: { name: string }) => genre.name + " | "
                  )}</span>
                  <span>
                    {runTime}
                  </span>
                </div>                
              </div>

              <h3 className={`${bebasNeue.className}  text-white text-center text-xl`}>Sinopse</h3>
              <p className={`${athiti.className} w-[80%]  text-white text-center text-lg leading-tight`}>{type.overview}</p>
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