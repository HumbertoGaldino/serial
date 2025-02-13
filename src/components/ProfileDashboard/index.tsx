"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { useTranslations } from "next-intl";

export default function ProfileDashboard() {
  const t = useTranslations("ProfileMenu");
  const links = [
    {
      label: t("dashboard"),
      href: "/dashboard",
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
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[60vh]" 
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
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {Object.entries(time).map(([unit, value]) => (
            <div
              key={unit}
              className="min-h-[5rem] min-w-[5rem] rounded-lg bg-neutral-800 text-center flex flex-col justify-center items-center p-4 shadow-md"
            >
              <h2 className="text-4xl font-bold text-white">{String(value).padStart(2, "0")}</h2>
              <span className="text-xs uppercase text-gray-300">{t(unit)}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
