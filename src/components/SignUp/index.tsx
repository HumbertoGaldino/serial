"use client";
import React from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useFormStatus } from "react-dom";
import { useEffect, useActionState } from "react";
import { registerUser } from "@/app/actions/registerUser";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useTranslations } from "next-intl";
import { IconBrandGoogle } from "@tabler/icons-react";

function RegisterButton() {
  const t = useTranslations("SignUp");
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${
        pending ? "opacity-70 cursor-not-allowed" : ""
      }`}
      type="submit"
      disabled={pending}
    >
      {pending ? "Carregando..." : t("register-button")}
      <BottomGradient />
    </button>
  );
}

export default function SignupForm() {
  const router = useRouter();
  const t = useTranslations("SignUp");

  type RegisterResponse = {
    message?: string;
  };

  type State = {
    status: "idle" | "error" | "success";
    message?: string;
    errors?: {
      name?: string[];
      lastname?: string[];
      email?: string[];
      username?: string[];
      password?: string[];
    };
    data?: RegisterResponse;
  };

  const initialState: State = {
    status: "idle",
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state?.status === "success") {
      alert(`${state.data?.message} Você será redirecionado(a) para a página de login.`);
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="max-w-md w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gradient-to-b from-black dark:to-neutral-950">
      <h2 className="font-bold text-xl text-neutral-200">
        {t("title-register")}
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        {t("subtitle-register")}
      </p>

      <form className="my-8" action={formAction}>
        {state?.status === "error" && (
          <div className="p-3 mb-4 rounded-lg bg-[#440475] border border-white text-white text-sm terminal-text">
            {state.message || "Por favor, verifique seus dados e tente novamente."}
          </div>
        )}

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">{t("placeholder-name")}</Label>
            <Input id="name" name="name" placeholder={t("placeholder-name")} type="text" />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-500 terminal-text">
                {state.errors.name[0]}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">{t("placeholder-lastname")}</Label>
            <Input id="lastname" name="lastname" placeholder={t("placeholder-lastname")} type="text" />
            {state?.errors?.lastname && (
              <p className="mt-1 text-sm text-red-500 terminal-text">
                {state.errors.lastname[0]}
              </p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">{t("placeholder-username")}</Label>
          <Input id="username" name="username" placeholder={t("placeholder-username")} type="text" />
          {state?.errors?.username && (
            <p className="mt-1 text-sm text-red-500 terminal-text">
              {state.errors.username[0]}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t("placeholder-email")}</Label>
          <Input id="email" name="email" placeholder="E-mail" type="email" />
          {state?.errors?.email && (
            <p className="mt-1 text-sm text-red-500 terminal-text">
              {state.errors.email[0]}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">{t("placeholder-password")}</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" />
          {state?.errors?.password && (
            <p className="mt-1 text-sm text-red-500 terminal-text">
              {state.errors.password[0]}
            </p>
          )}
        </LabelInputContainer>

        <RegisterButton />

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
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
