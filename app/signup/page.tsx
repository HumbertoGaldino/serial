import { useTranslations } from "next-intl";
import SignupForm from '../../src/components/SignUp'

export default function SignUp() {
  const t = useTranslations("SignUp");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url(/background-sign.gif)] bg-cover bg-center">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <SignupForm />
      </main>
    </div>
  );
}