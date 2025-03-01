"use client";
import Image from "next/image";
import { GiTvRemote } from "react-icons/gi";
import React, { useEffect, useRef, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {useOutsideClick} from "@/src/hooks/use-outside-click";
import { MdImageNotSupported } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import dayjs from "dayjs";

import { Bebas_Neue, Athiti } from "next/font/google";
import Countdown from "../Countdown";
const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function EpisodesExpandableCards ({ episodes }) {
  const [activeEpisode, setActiveEpisode] = useState(null);

  const modalRef = useRef(null);
  const id = useId();

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD/MM/YYYY");
  };

  useOutsideClick(modalRef, () => setActiveEpisode(null));

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setActiveEpisode(null);
    }

    if (activeEpisode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeEpisode]);

  return (
    <div className="lg-max:max-w-[85vw] 3xl:max-w-[90vw] p-6 flex flex-col items-center gap-4 relative z-1 bg-slate-950">
      <h2
        className={`${bebasNeue.className} w-[95%] flex items-center text-primary 3xl:text-[4em] 3xl:tracking-[0.3em] lg-max:text-[2em] lg-max:tracking-[0.3em] border-b-4 border-primary mb-4`}
      >
        <GiTvRemote className="mr-3" />
        Episódios
      </h2>

      <div className="w-[90%] grid grid-cols-1 gap-4">
        {episodes.map((episode, index) => (
          <motion.div
            key={index}
            layoutId={`episode-card-${id}-${index}`}
            onClick={() => setActiveEpisode(episode)}
            className="relative w-full cursor-pointer hover:bg-slate-900 bg-[#050c28] h-[8rem] rounded-lg overflow-hidden transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-row items-center">
              { episode.still_path ?
                <Image
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                  alt={episode.name}
                  width={1000}
                  height={1000}
                  className="object-cover w-[12rem] h-[8rem]"
                />
                :
                <div className="w-[12rem] h-[8rem] bg-primaryBlack flex items-center justify-center text-white text-center">
                  <MdImageNotSupported className="text-secondary text-4xl" />
                </div>
              }
              <div className="p-4">
                <span
                  className={`${bebasNeue.className} text-2xl text-white block mb-2`}
                >
                  {`S${episode.season_number
                    .toString()
                    .padStart(2, "0")}|E${episode.episode_number
                    .toString()
                    .padStart(2, "0")}`}
                </span>
                <h3
                  className={`${bebasNeue.className} text-xl text-white line-clamp-2`}
                >
                  {episode.name}
                </h3>
              </div>
              {
                new Date(episode.air_date) < new Date() ? (
                  <BsEyeFill className="absolute right-7 text-white text-3xl hover:text-secondary" />
                ) : (
                  <Countdown targetDate={episode.air_date} />
                )
              }
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeEpisode && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto"
          >
            <motion.div
              ref={modalRef} // Ref moved to the content container
              layoutId={`episode-card-${id}-${activeEpisode.episode_number}`}
              className="bg-[#050c28] rounded-lg max-w-3xl w-full mx-auto overflow-hidden relative" 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="relative lg-max:h-60 3xl:h-64 md:h-96">
                { activeEpisode.still_path ?
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${activeEpisode.still_path}`}
                    alt={activeEpisode.name}
                    width={1000}
                    height={1000}
                    className="object-cover lg-max:h-60 3xl: h-64"
                  />
                  :
                  <div className="w-full h-full bg-primaryBlack flex items-center justify-center text-white text-center">
                    <MdImageNotSupported className="text-secondary text-4xl" />
                  </div>
                }
              </div>

              <div className="p-6">
                <button
                  onClick={() => setActiveEpisode(null)}
                  className="absolute top-2 right-4 text-white/70 hover:text-white transition-colors z-10"
                >
                  ×
                </button>

                <h3
                  className={`${bebasNeue.className} text-3xl text-white mb-4`}
                >
                  {activeEpisode.name}
                </h3>
                <p className={`${athiti.className} text-gray-300 mb-4`}>
                  {activeEpisode.overview || "No description available"}
                </p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 bg-primary text-white rounded-full">
                    {`Season ${activeEpisode.season_number}`}
                  </span>
                  <span className="px-4 py-2 bg-slate-700 text-white rounded-full">
                    {`Episode ${activeEpisode.episode_number}`}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}