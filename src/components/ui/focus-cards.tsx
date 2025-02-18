"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/src/lib/utils";

type CardProps = {
  title: string;
  name: string;
  poster_path: string;
}

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    type = "movie",
  }: {
    card: CardProps;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    type?: string;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative cursor-pointer bg-neutral-900 overflow-hidden lg-max:w-[10rem] lg-max:h-[16rem] 3xl:w-[14rem] 3xl:h-[22rem] transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
        alt={type === "movie" ? card.title : card.name}
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
          {type === "movie" ? card.title ?? "Movie Title" : card.name ?? "Card Name"}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards, type }: { cards: CardProps[]; type: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center flex-wrap lg-max:gap-5 3xl:gap-10 w-full">
      {cards.map((card, index) => {
        return (
          <Card
            key={type === "movie" ? card.title : card.name}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            type={type}
          />
        );
      })}
    </div>
  );
}
