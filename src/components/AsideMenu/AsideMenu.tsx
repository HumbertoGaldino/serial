import Image from "next/image";
import Link from "next/link";
import { logoutUser } from "@/app/actions/logoutUser";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

import { useTranslations } from "next-intl";

export default function AsideMenu() {
  const t = useTranslations("AsideMenu");

  const links = [
    {
      label: t("profile"),
      href: "/profile",
      icon: <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("dashboard"),
      href: "/profile/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t("settings"),
      href: "/profile/settings",
      icon: <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div className="w-0 lg-max:mr-[15vw] 3xl:mr-[10vw]">
      <aside className="fixed flex flex-col gap-3 bg-slate-900 lg-max:w-[15vw] 3xl:w-[10vw] h-screen p-4 z-50">
        <Image
          src="/logo.svg"
          width={80}
          height={20}
          className="w-[80px] h-[20px] mb-6"
          alt=""
        />
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-white flex flex-row gap-2 p-1 justify-start hover:bg-[#6b41b6] rounded-md"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
        <button
          onClick={logoutUser}
          className="text-white flex flex-row gap-2 p-1 justify-start hover:bg-[#6b41b6] rounded-md"
        >
          <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
          {t("logout")}
        </button>
      </aside>
    </div>
  );
}
