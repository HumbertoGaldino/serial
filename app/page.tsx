import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <main className="h-screen bg-gray-700 text-white flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1>{t("title")}</h1>
      </main>
    </>
  );
}
