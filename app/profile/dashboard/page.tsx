import { useTranslations } from "next-intl";
import ProfileDashboard from '@/src/components/ProfileDashboard';

export default function SignUp() {
  const t = useTranslations("SignUp");
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full flex-1 relative z-9999">
        <ProfileDashboard />
      </main>
    </>  
    );
    
}