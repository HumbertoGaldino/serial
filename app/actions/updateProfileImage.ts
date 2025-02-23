"use server";

import { cookies } from "next/headers";

interface ProfileResponse {
  message: string;
}

export async function updateProfileImage(imageUrl: string): Promise<ProfileResponse> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imgProfile: imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to update profile image");
  }

  const result = await response.json();
  return result as ProfileResponse;
}
