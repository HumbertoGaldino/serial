import { useTranslations } from "next-intl";
import SignupForm from '../../src/components/SignUp'
import { BackgroundBeamsWithCollision } from "../../src/components/ui/background-beams-with-collision";

export default function SignUp() {
  const t = useTranslations("SignUp");
  return (
      <BackgroundBeamsWithCollision className="flex flex-col items-center justify-center py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 relative z-9999">
          <SignupForm />
        </main>
      </BackgroundBeamsWithCollision>  );
}