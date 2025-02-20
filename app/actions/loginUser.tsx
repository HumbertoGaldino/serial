"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Por favor insira um email válido"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres"),
});

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

export async function loginUser(_: State, formData: FormData): Promise<State> {
  console.log(formData.get("email"), formData.get("password"));
  console.log(formData.get("email"), formData.get("password"));

  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    console.log(validatedFields.data);
    console.log(JSON.stringify(validatedFields.data));
    const response = await fetch(`${process.env.API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: data?.message || "Erro ao fazer login",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("auth_token", data);

    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Erro ao fazer login",
    };
  }
}
