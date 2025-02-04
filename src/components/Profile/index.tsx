"use client";
import React from "react";

import { Bebas_Neue } from 'next/font/google'
import { useTranslations } from "next-intl";
import { RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOldFilled } from "react-icons/tb";

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'], 
  weight: '400' 
});
 
export default function Profile() {
  const t = useTranslations("Profile");
  return (
    <>
      <div className={`${bebasNeue.className} flex items-start rounded-2xl w-full min-h-48 p-[40px] bg-slate-600 mb-0.5`}>
        <div className="flex flex-row gap-4 items-start justify-center">
          <div className="relative w-40 h-40 outline outline-4 outline-[#6b41b6] rounded-full overflow-hidden">
            <img
              src="/profile-example.jpg"
              alt="Imagem de perfil"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center align-middle w-fit h-[50%]">
            <h1 className="text-4xl ">Nome do Usuário</h1>
            <h3 className="text-xl -mt-2.5 mb-2 italic">Username</h3> 
            <div className="flex flex-row">
              <div className="flex flex-row mr-3">
                <RiUserFollowFill className="text-2xl mr-2 mt-3 text-black hover:text-primary cursor-pointer"/>
                <div className="flex flex-col">
                  <span className="text-2xl -mb-3">564</span>
                  <span className="text-lg">{t("followers")}</span>
                </div>                
              </div>
              <div className="flex flex-row mr-5">
                <RiUserFollowLine className="text-2xl mr-2 mt-3 text-black hover:text-primary cursor-pointer"/>
                <div className="flex flex-col">
                  <span className="text-2xl -mb-3">564</span>
                  <span className="text-lg">{t("following")}</span>
                </div>
              </div>
              <div className="flex flex-row mr-3">
                <TbDeviceTvOldFilled className="text-2xl mr-2 mt-3 text-black hover:text-primary cursor-pointer"/>
                <div className="flex flex-col">
                  <span className="text-2xl -mb-3">50</span>
                  <span className="text-lg">{t("tvshows")}</span>
                </div>
              </div>
              <div className="flex flex-row">
                <MdLocalMovies className="text-2xl mr-2 mt-3 text-black hover:text-primary cursor-pointer"/>
                <div className="flex flex-col">
                  <span className="text-2xl -mb-3">80</span>
                  <span className="text-lg">{t("movies")}</span>
                </div>
              </div>
            </div>     
          </div>       
        </div>
      </div>     
    </>
  );
}