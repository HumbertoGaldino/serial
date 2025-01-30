import { useTranslations } from "next-intl";
import SigninForm from '../src/components/Login'
import { BackgroundBeamsWithCollision } from "../src/components/ui/background-beams-with-collision";
import SerialSparkles from '../src/components/SerialSparkles'

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <BackgroundBeamsWithCollision className="flex flex-col items-center justify-center py-2">
        <main className="flex flex-row gap-5 items-center justify-center w-full flex-1 px-20 relative z-9999">
          <SerialSparkles />
          <SigninForm />
        </main>
      </BackgroundBeamsWithCollision>
    </>
  );
}
