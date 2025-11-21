import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "mahasiswa" | "dosen" | "admin" | "kaprodi";
      email: string;
      name: string;
      username: string;
      token: string; // Laravel token
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    email: string;
    name: string;
    username: string;
    laravelToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "mahasiswa" | "dosen" | "admin" | "kaprodi";
    laravelToken: string;
  }
}
