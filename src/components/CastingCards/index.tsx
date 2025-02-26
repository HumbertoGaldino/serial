import { useEffect, useState } from "react";
import LoadingSpinner from "@/src/components/LoadingSpinner/LoadingSpinner";
import { useParams } from "next/navigation";
import { fetchCasting } from "@/app/actions/fetchCasting";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import { PiApplePodcastsLogoBold } from "react-icons/pi";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Navigation, Scrollbar } from "swiper/modules";


import { Bebas_Neue, Athiti } from "next/font/google";
const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function CastingCards({ type }: { type: string }) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [cast, setCast] = useState<object>();

    useEffect(() => {
        const fetchCastData = async () => {
          try {              
            const data = await fetchCasting(id,type);

            setCast(data);
          } catch (error) {
            console.error("Erro ao buscar o filme:", error);
          }
          setIsLoading(false);
        };

        fetchCastData();
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
              <PiApplePodcastsLogoBold className="mt-1 mr-3"/>
              Elenco
            </h2>

            <Swiper
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 6 },
              }}
              scrollbar={true}
              modules={[Scrollbar, Navigation]}
              navigation={true}
              className="w-[95%] swiper-container pb-10"
            >
              { 
                cast.cast.slice(0, 10).map((cast, index) => {
                      return (
                        <SwiperSlide key={index} className="swiper-item">
                          <div className="w-[150px] flex flex-col items-center justify-center cursor-pointer " key={index}>
                              {
                                cast.profile_path ? 
                                  <Image                             
                                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                                      alt={cast.name}
                                      width={1000}
                                      height={1000}
                                      className="rounded-t-lg w-[150px] h-[150px] object-cover"
                                  />
                                :
                                <div className="w-[150px] h-[150px] rounded-t-lg bg-primaryBlack flex items-center justify-center text-white text-center">
                                  <MdImageNotSupported className='text-secondary text-4xl' />
                                </div>
                              }
                              <div className="h-[100px] w-[150px] p-2 rounded-b-lg bg-slate-900 flex flex-col items-center justify-start">
                                  <h4 className={`${bebasNeue.className} text-xl text-white text-center leading-5`}>{cast.name}</h4>
                                  <h5 className={`${athiti.className}text-lg text-bold text-white text-center leading-4`}>{cast.character}</h5>
                              </div>

                          </div>
                        </SwiperSlide>
                      )
                })          
              }
              <SwiperSlide>
                <div className="w-[150px] h-[250px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFFE00] text-white hover:text-primary">
                <span className={`${bebasNeue.className} text-xl text-center leading-5`}>
                  Mostrar Mais
                </span>
                  <FaArrowCircleRight className="text-xl text-center mt-2" />
                </div>
              </SwiperSlide>
            </Swiper>
            
          </div>
      )
}
