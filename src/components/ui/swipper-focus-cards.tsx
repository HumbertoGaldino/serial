"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import Link from 'next/link'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Navigation, Scrollbar } from "swiper/modules";
import { MdImageNotSupported } from "react-icons/md";

type CardProps = {
  id: string,
  title?: string;
  name?: string;
  poster_path: string;
  season_number?: number;
}

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    type = "movie",
    isSeason = false,
    idTvshow=''
  }: {
    card: CardProps;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    type?: string;
    isSeason?: boolean;
    idTvshow: string;
  }) => (
    <Link href={isSeason ? `/${type}/${idTvshow}/season/${card.season_number}` : `/${type}/${card.id}`} >
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative cursor-pointer bg-neutral-900 overflow-hidden w-[9rem] h-[14rem] transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        {
          card.poster_path ?
            <Image
              src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
              alt={card.title ? card.title : card.name}
              fill
              className="object-cover absolute inset-0"
            />
          :
          <div className="object-cover absolute inset-0 rounded-lg bg-primaryBlack flex items-center justify-center text-white text-center">
            <MdImageNotSupported className='text-secondary text-4xl' />
          </div>

        }
        <div
          className={cn(
            "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-xl md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {card.title ? card.title : card.name}
          </div>
        </div>
      </div>
    </Link>
  )
);

Card.displayName = "Card";

export function SwipperFocusCards({ cards, type, isSeason, idTvshow }: { cards: CardProps[]; type: string, isSeason?: boolean, idTvshow?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 6 },
      }}
      scrollbar={true}
      modules={[Scrollbar, Navigation]}
      navigation={true}
      className="w-full"
    >
      {cards.map((card, index) => (
        <SwiperSlide key={card.title}>
          <Card
            key={type === "movie" ? card.title : card.name}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            type={type}
            isSeason={isSeason}
            idTvshow={idTvshow}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}