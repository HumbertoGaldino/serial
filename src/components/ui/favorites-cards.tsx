"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/src/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

type CardProps = {
  title: string;
  poster_path: string;
}

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardProps;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative cursor-pointer bg-gray-100 dark:bg-neutral-900 overflow-hidden w-[16rem] h-[24rem] transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
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
  )
);

Card.displayName = "Card";

export function FavoritesCards({ cards }: { cards: CardProps[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1} // Número de itens visíveis por vez
      breakpoints={{
        768: { slidesPerView: 4 }, // No desktop, exibe 4 por vez
      }}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="w-full"
    >
      {cards.map((card, index) => (
        <SwiperSlide key={card.title}>
          <Card
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
