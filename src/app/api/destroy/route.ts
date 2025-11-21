import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Hapus cookie NextAuth JWT
  const cookieStore = cookies();
  (await cookieStore).set("next-auth.session-token", "", {
    maxAge: 0,
    path: "/",
  });
  (await cookieStore).set("__Secure-next-auth.session-token", "", {
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ success: true, message: "Session destroyed" });
}
