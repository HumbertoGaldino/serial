"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser(): Promise<void> {
  await cookies().then((cookieStore) => cookieStore.delete("auth_token"));
  redirect("/");
}
