"use client";
import React from "react";

import { Bebas_Neue } from 'next/font/google'
import { useTranslations } from "next-intl";
import FavoritesFocusCards from "@/src/components/FavoritesFocusCards";

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'], 
  weight: '400' 
});
 
export default function Favorites() {
  const t = useTranslations("Profile");
  return (
    <>
      <div className={`${bebasNeue.className} flex flex-col items-center justify-center gap-3 rounded-2xl w-full min-h-48 p-[40px] shadow-input bg-gradient-to-l from-[#6b41b6] dark:to-black mb-0.5`}>
        <h2 className="text-6xl text-left w-full text-white">{t("favorites")}</h2>
        <FavoritesFocusCards />    
      </div>    
    </>
  );
}