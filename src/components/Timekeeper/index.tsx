"use client";
import React from "react";

import { Bebas_Neue } from 'next/font/google'
import { useTranslations } from "next-intl";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOldFilled } from "react-icons/tb";

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'], 
  weight: '400' 
});
 
export default function Timekeeper() {
  const t = useTranslations("Profile");
  return (
    <>
      <div className={`${bebasNeue.className} flex items-center justify-center gap-3 rounded-2xl w-full min-h-48 p-[40px] shadow-input bg-gradient-to-b from-black dark:to-neutral-900 mb-0.5`}>
        <div className="flex flex-col items-start justify-center w-[207px] h-[115px] border border-white rounded-lg">
            <div className="flex flex-row items-center justify-center gap-1 border-b border-white text-white w-full h-[40px] p-2 pb-2.5 text-center">
                <TbDeviceTvOldFilled className="text-2xl text-center mb-1.5"/>
                <h4>{t("timekeeperTv")}</h4>
            </div>
            <div className="flex flex-row p-2 h-[64px]">
                <div className="flex flex-row mr-3 text-white">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">4</span>
                    <span className="text-lg">{t("months")}</span>
                    </div>                
                </div>
                <div className="flex flex-row mr-5 text-white">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">4</span>
                    <span className="text-lg">{t("days")}</span>
                    </div>
                </div>
                <div className="flex flex-row mr-3 text-white">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">21</span>
                    <span className="text-lg">{t("hours")}</span>
                    </div>
                </div>
                <div className="flex flex-row text-white">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">54</span>
                    <span className="text-lg">{t("minutes")}</span>
                    </div>
                </div>  
            </div>
        </div>

        <div className="flex flex-col items-start justify-center w-[207px] h-[115px] border border-white rounded-lg">
            <div className="flex flex-row items-center justify-center gap-1 border-b border-white text-white w-full h-[40px] p-2 pb-2.5 text-center ">
                <TbDeviceTvOldFilled className="text-2xl text-center mb-0.5"/>
                <h4>{t("count-episodes")}</h4>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[60px] p-2 pt-5 text-white text-center text-5xl">
                544                             
            </div>
        </div> 

        <div className="flex flex-col items-start justify-center w-[207px] h-[115px] border border-white rounded-lg">
            <div className="flex flex-row items-center justify-center gap-1 border-b border-white text-white w-full h-[40px] p-2 pb-2.5 text-center">
                <MdLocalMovies className="text-2xl text-center mb-0.5"/>
                <h4>{t("timekeeperMovies")}</h4>
            </div>
            <div className="flex flex-row h-[60px] p-2">
                <div className="flex flex-row mr-3 text-white ">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">4</span>
                    <span className="text-lg">{t("months")}</span>
                    </div>                
                </div>
                <div className="flex flex-row mr-5 text-white ">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">4</span>
                    <span className="text-lg">{t("days")}</span>
                    </div>
                </div>
                <div className="flex flex-row mr-3 text-white ">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">21</span>
                    <span className="text-lg">{t("hours")}</span>
                    </div>
                </div>
                <div className="flex flex-row text-white ">
                    <div className="flex flex-col">
                    <span className="text-2xl -mb-3">54</span>
                    <span className="text-lg">{t("minutes")}</span>
                    </div>
                </div>  
            </div>
        </div> 

        <div className="flex flex-col items-start justify-center w-[207px] h-[115px] border border-white rounded-lg">
            <div className="flex flex-row items-center justify-center gap-1 border-b border-white text-white w-full h-[40px] p-2 pb-2.5 text-center ">
                <MdLocalMovies className="text-2xl text-center mb-0.5"/>
                <h4>{t("count-movies")}</h4>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[60px] p-2 pt-5 text-white text-center text-5xl">
                80                             
            </div>
        </div> 

      </div>    
    </>
  );
}