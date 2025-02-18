"use server";

import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor insira um email válido"),
  username: z.string().min(3, "O username deve ter pelo menos 3 caracteres"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres"),
});

type RegisterResponse = {
  message?: string;
};

type State = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    username?: string[];
    password?: string[];
  };
  data?: RegisterResponse;
};

export async function registerUser(
  _: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/user/register`, {
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
        message: data.message || "Erro ao criar conta",
      };
    }

    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Erro ao criar conta",
    };
  }
}
