import { useTranslations } from "next-intl";
import { BackgroundBeamsWithCollision } from "../../src/components/ui/background-beams-with-collision";
import Profile from '../../src/components/Profile';
import Favorites from '../../src/components/Favorites';
import Timekeeper from '../../src/components/Timekeeper';

export default function SignUp() {
  const t = useTranslations("SignUp");
  return (
    <>
      <BackgroundBeamsWithCollision className="flex flex-row items-center justify-center py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 relative z-9999">
          <Profile />
          <Timekeeper />
        </main>
      </BackgroundBeamsWithCollision>
    </>  
    );
    
}