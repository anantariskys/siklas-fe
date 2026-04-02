import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  // Clear all possible NextAuth/Auth.js cookie names
  const cookiesToClear = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "authjs.session-token",
    "__Secure-authjs.session-token",
    "next-auth.callback-url",
    "next-auth.csrf-token",
    "authjs.callback-url",
    "authjs.csrf-token",
  ];

  cookiesToClear.forEach((name) => {
    cookieStore.set(name, "", {
      maxAge: 0,
      path: "/",
    });
  });

  return NextResponse.json({ success: true, message: "Session destroyed" });
}
