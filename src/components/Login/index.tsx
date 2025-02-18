"use client";
import React from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useFormStatus } from "react-dom";
import { useEffect, useActionState } from "react";
import { loginUser } from "@/app/actions/loginUser";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useTranslations } from "next-intl";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function SigninForm() {
  const { pending } = useFormStatus();
  const router = useRouter();

  type LoginResponse = {
    auth_token: string;
  };

  type State = {
    status: "idle" | "error" | "success";
    message?: string;
    errors?: {
      email?: string[];
      password?: string[];
    };
    data?: LoginResponse;
  };

  const initialState: State = {
    status: "idle",
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(loginUser, initialState);

  useEffect(() => {
    if (state?.status === "success") {
      router.push("/discover");
    }
  }, [state, router]);

  const t = useTranslations("SignIn");

  return (
    <div className="max-w-md w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gradient-to-b from-black dark:to-neutral-950">
      <h2 className="font-bold text-xl text-neutral-200">{t("title-login")}</h2>

      <form className="my-8" action={formAction}>
        {/* Error Messages */}
        {state?.status === "error" && (
          <div className="p-3 mb-4 rounded-lg bg-[#440475] border border-white text-white text-sm terminal-text">
            {state.message ||
              "Por favor, verifique suas credenciais e tente novamente."}
          </div>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t("placeholder-email")}</Label>
          <Input id="email" name="email" placeholder="E-mail" type="email" />
          {state?.errors?.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-500 terminal-text"
            >
              {state.errors.email[0]}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">{t("placeholder-password")}</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
          />
          {state?.errors?.password && (
            <p
              id="password-error"
              className="mt-1 text-sm text-red-500 terminal-text"
            >
              {state.errors.password[0]}
            </p>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn mb-4 from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {pending ? "Carregando..." : t("login-button")}
          <BottomGradient />
        </button>

        <button
          className={`bg-gradient-to-br relative group/btn via-violet-950 from-indigo-900 block bg-purple w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${pending ? "opacity-70 cursor-not-allowed" : ""}`}
          type="submit"
        >
          {t("register-button")}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
