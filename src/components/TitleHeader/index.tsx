import Image from 'next/image'
import dayjs from "dayjs"
import StarRating from '@/src/components/StarRatingProps';
import ApprovalCircle from '@/src/components/ApprovalCircle';
import { MdImageNotSupported } from "react-icons/md";

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
    let runTime = null;
    let runtimeValue = null;
    if(type.episodes?.length > 0) {
      runtimeValue = type.episodes[0].runtime;
    } else {
      runtimeValue = type.runtime ?? type.last_episode_to_air?.runtime;
    }

    if (runtimeValue) {
      const hours = Math.floor(runtimeValue / 60);
      const minutes = runtimeValue % 60;
      runTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    const formatData = (dateString: string) => {
      return dayjs(dateString).format("DD/MM/YYYY");
    };
   
    return (
        <main className="lg-max:w-[85vw] 3xl:w-[90vw] h-[90vh] flex flex-col items-center justify-center relative z-9999 bg-slate-950 relative z-1">
            
            {
              type.backdrop_path ? 
                <Image
                  src={ `https://image.tmdb.org/t/p/original/${type.backdrop_path}` }
                  alt=""
                  width={1000}
                  height={1000}
                  className="absolute w-full h-full z-2 object-cover blur-sm bg-slate-950 opacity-50" 
                />
              : <div className='absolute w-full h-[90vh] z-2 bg-gradient-to-r from-primaryBlack to-slate-950 opacity-50"'>
              </div>
            }
            
            <div className="flex flex-row w-full items-center justify-center relative z-4 p-4">
              <div className="relative z-3 p-4 w-[70%] flex flex-col items-center justify-center gap-3">
                <div className='flex flex-col items-center justify-center w-full text-white text-center mb-4'>
                  <ApprovalCircle voteAverage={type.vote_average}/>
                  <StarRating voteAverage={type.vote_average} />
                  <h1 className={`${bebasNeue.className} w-[60%] text-6xl mt-4`}>
                    {type.title ? type.title : type.name}
                  </h1>
                  <div className={`${athiti.className} flex flex-row gap-2 items-center justify-center font-medium`}>
                    <span>{type.release_date ? formatData(type.release_date) + ' (BR) |' : ''}</span>
                    {
                      type.genres ?
                      <span>{type.genres.map(
                        (genre: { name: string }) => genre.name + " | "
                      )}</span>
                      : ''
                    }
                    <span>
                      {runTime}
                    </span>
                  </div>                
                </div>

                <h3 className={`${bebasNeue.className}  text-white text-center text-xl`}>Sinopse</h3>
                <p className={`${athiti.className} w-[80%] h-20 text-white text-center text-lg leading-tight overflow-auto`}>{type.overview}</p>
              </div>

              <div className="w-[30%]">
                {
                  type.poster_path ?
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${type.poster_path}`}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-[16rem] h-[24rem] rounded-lg object-cover"
                    />
                  : 
                  <div className='w-[16rem] h-[24rem] flex flex-col items-center justify-center rounded-lg object-cover bg-primaryBlack'>
                    <MdImageNotSupported className='text-secondary text-4xl' />
                  </div>
                }
                
              </div>
            </div>     
        </main>
    )
}