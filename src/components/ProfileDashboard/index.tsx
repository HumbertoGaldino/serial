"use client";

import { TbDeviceTvOldFilled } from "react-icons/tb";
import { MdLocalMovies } from "react-icons/md";
import Favorites from "../Favorites";
import { useTranslations } from "next-intl";

export default function ProfileDashboard() {
  const t = useTranslations("Profile");

  const totalWatchTime = 9876543; // Tempo total gasto em segundos
  const time = formatTime(totalWatchTime);

  return (
    <div className="flex flex-col gap-3 bg-slate-950 w-[90vw] h-full p-4">
      <div className="w-full flex flex-1 p-2">
        <div className="flex flex-col gap-2 flex-1 w-full h-full">
          <div className="flex gap-2">
            {Object.entries(time).map(([unit, value]) => (
              <div
                key={unit}
                className="w-full rounded-lg bg-slate-900 text-center flex flex-col justify-center items-center p-4 shadow-md"
              >
                <h2 className="text-4xl font-bold text-white">
                  {String(value).padStart(2, "0")}
                </h2>
                <span className="text-xs uppercase text-gray-300">
                  {t(unit)}
                </span>
              </div>
            ))}

            <div className="w-full rounded-lg bg-[#6b41b6] text-center flex flex-row justify-center items-center p-4 shadow-md">
              <MdLocalMovies className="text-4xl text-center mr-4 text-white" />
              <div className="w-[93px]">
                <h2 className="text-4xl font-bold text-white">28</h2>
                <span className="text-xs uppercase text-gray-300">Filmes</span>
              </div>
            </div>

            <div className="w-full flex flex-row rounded-lg bg-[#6b41b6] text-center justify-center items-center p-4 shadow-md">
              <TbDeviceTvOldFilled className="text-4xl text-center mr-4 text-white" />
              <div>
                <h2 className="text-4xl font-bold text-white">5.513</h2>
                <span className="text-xs uppercase text-gray-300">
                  Episódios
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-2 flex-1">
            <Favorites />
          </div>
        </div>
      </div>
    </div>
  );
}

const formatTime = (totalSeconds: number) => {
  const months = Math.floor(totalSeconds / (60 * 60 * 24 * 30));
  const days = Math.floor((totalSeconds / (60 * 60 * 24)) % 30);
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);

  return { months, days, hours, minutes };
};
