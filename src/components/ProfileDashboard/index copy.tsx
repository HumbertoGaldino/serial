"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { MdLocalMovies } from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { useTranslations } from "next-intl";
import Favorites from "../Favorites";

export default function ProfileDashboard() {
  const t = useTranslations("ProfileMenu");
  const links = [
    {
      label: t("dashboard"),
      href: "/profile/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t("profile"),
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t("settings"),
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t("logout"),
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-700 overflow-hidden h-[60vh]" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Nome Usuário",
                href: "#",
                icon: (
                  <Image
                    src="/profile-example.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        <img src="/logo.svg" className="w-[80px] h-[20px]" alt="" />
      </motion.span>
  );
};

export const LogoIcon = () => {
  return (
      <img src="/s_logo.svg" className="w-[80px] h-[20px]" alt="" />
  );
};

const formatTime = (totalSeconds: number) => {
  const months = Math.floor(totalSeconds / (60 * 60 * 24 * 30));
  const days = Math.floor((totalSeconds / (60 * 60 * 24)) % 30);
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);

  return { months, days, hours, minutes };
};

const Dashboard = () => {
  const t = useTranslations("Profile");
  const totalWatchTime = 9876543; // Tempo total gasto em segundos
  const time = formatTime(totalWatchTime);

  return (
    <div className="w-full flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {Object.entries(time).map(([unit, value]) => (
            <div
              key={unit}
              className="w-full rounded-lg bg-neutral-800 text-center flex flex-col justify-center items-center p-4 shadow-md"
            >
              <h2 className="text-4xl font-bold text-white">{String(value).padStart(2, "0")}</h2>
              <span className="text-xs uppercase text-gray-300">{t(unit)}</span>
            </div>
          ))}

          <div
              className="w-full rounded-lg bg-neutral-800 text-center flex flex-row justify-center items-center p-4 shadow-md"
            >
              <MdLocalMovies className="text-4xl text-center mr-4 text-white"/>
              <div className="w-[93px]">
                <h2 className="text-4xl font-bold text-white">28</h2>
                <span className="text-xs uppercase text-gray-300">Filmes</span>
              </div>
          </div>

          <div
              className="w-full flex flex-row rounded-lg bg-neutral-800 text-center justify-center items-center p-4 shadow-md"
            >
              <TbDeviceTvOldFilled className="text-4xl text-center mr-4 text-white"/>
              <div>
                <h2 className="text-4xl font-bold text-white">5.513</h2>
                <span className="text-xs uppercase text-gray-300">Episódios</span>
              </div>
          </div>

        </div>

        <div className="w-full flex gap-2 flex-1">
          <Favorites />
        </div>
      </div>
    </div>
  );
};
