import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const cookieStore = await cookies();

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const response = await fetch(`${process.env.API_URL}/user/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      cookieStore.delete("auth_token");
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!cookieStore.get("user_id")?.value) {
      const user_id = await response.json().then((data) => data.decoded?.id);
      cookieStore.set("user_id", user_id);
    }

    return NextResponse.next();
  } catch (error) {
    await cookies().then((cookieStore) => cookieStore.delete("auth_token"));
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/discover/:path*",
    "/profile/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup|$).*)",
  ],
};
