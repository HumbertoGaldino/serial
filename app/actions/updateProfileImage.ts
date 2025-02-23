"use server";

import { cookies } from "next/headers";

export async function updateProfileImage(imageUrl: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API_URL}/user/profile/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imgProfile: imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile image");
  }

  return await response.json();
}
