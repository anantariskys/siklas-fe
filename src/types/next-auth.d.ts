import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "mahasiswa" | "dosen" | "admin" | "kaprodi";
      email: string;
      name: string;
      username: string;
      program_studi?: string;
      token: string; // Laravel token
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    email: string;
    name: string;
    username: string;
    program_studi?: string;
    laravelToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "mahasiswa" | "dosen" | "admin" | "kaprodi";
    laravelToken: string;
    program_studi?: string;
  }
}
