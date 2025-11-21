import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role;

    // area admin
    if (pathname.startsWith("/admin")) {
      if (role !== "admin" && role !== "kaprodi") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // halaman utama user
    if (pathname === "/") {
      if (role !== "dosen" && role !== "mahasiswa") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/:path*", "/admin/:path*"],
};
