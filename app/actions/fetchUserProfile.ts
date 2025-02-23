"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchUserProfile() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    redirect("/");
  }

  const response = await fetch(`${process.env.API_URL}/user/profile/${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`${response.status}: Failed to fetch user profile.`);
  }

  const userProfile = await response.json();
  return userProfile;
}