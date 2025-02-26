"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Navigation, Scrollbar } from "swiper/modules";
import { MdImageNotSupported } from "react-icons/md";

type CardProps = {
  id?: string;
  idMovie?: string;
  idTvShow?: string;
  title: string;
  name: string;
  poster_path?: string;
  posterPath?: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    type = "movie",
    isProfile = false,
  }: {
    card: CardProps;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    type?: string;
    isProfile?: boolean;
  }) => {
    let cardId = card.id;
    if (isProfile) {
      cardId = type === "movie" ? card.idMovie : card.idTvShow;
    }
    const posterPath = isProfile ? card.posterPath : card.poster_path;
    return (
      <Link href={`/${type}/${cardId}`}>
        <div
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "rounded-lg relative cursor-pointer bg-neutral-900 overflow-hidden lg-max:w-[9rem] lg-max:h-[14rem] 3xl:w-[10rem] 3xl:h-[15rem] transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
          )}
        >
          {posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${posterPath}`} // Updated this line to use posterPath
              alt={card.title}
              fill
              className="object-cover absolute inset-0"
            />
          ) : (
            <div className="object-cover absolute inset-0 rounded-lg bg-primaryBlack flex items-center justify-center text-white text-center">
              <MdImageNotSupported className="text-secondary text-4xl" />
            </div>
          )}
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
              {card.title}
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

Card.displayName = "Card";

export function SwipperFocusCards({
  cards,
  type,
  isProfile,
}: {
  cards: CardProps[];
  type: string;
  isProfile?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        1080: { slidesPerView: 8 },
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
            isProfile={isProfile}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
