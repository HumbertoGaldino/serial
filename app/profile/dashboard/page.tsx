import { useTranslations } from "next-intl";
import { BackgroundBeamsWithCollision } from "@/src/components/ui/background-beams-with-collision";
import ProfileDashboard from '@/src/components/ProfileDashboard';

export default function SignUp() {
  const t = useTranslations("SignUp");
  return (
    <>
      <BackgroundBeamsWithCollision className="flex flex-row items-center justify-center py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 p-8 md:p-10 relative z-9999">
          <ProfileDashboard />
        </main>
      </BackgroundBeamsWithCollision>
    </>  
    );
    
}