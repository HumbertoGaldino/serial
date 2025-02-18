import { useTranslations } from "next-intl";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function SeeAllButton() {
  const t = useTranslations("Discover");

  return (
    <button
      className={`${bebasNeue.className} w-[70%] h-14 my-10 rounded-2xl rounded-t-none text-3xl text-gray-300 tracking-widest bg-purple hover:bg-opacity-100 bg-opacity-70 transition-colors duration-300`}
    >
      {t("see-all-button")}
    </button>
  );
}
