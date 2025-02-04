import { useTranslations } from "next-intl";
import Profile from '../../src/components/Profile'
import { BackgroundBeamsWithCollision } from "../../src/components/ui/background-beams-with-collision";

export default function SignUp() {
  const t = useTranslations("SignUp");
  return (
      <BackgroundBeamsWithCollision className="flex flex-row items-center justify-center py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 relative z-9999">
          <Profile />
        </main>
      </BackgroundBeamsWithCollision>  );
}