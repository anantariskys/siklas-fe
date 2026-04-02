import { login } from "@/services/auth/login";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // @ts-ignore
          const res = await login({
            username: credentials.username as string,
            password: credentials.password as string,
          });

          return {
            id: res.data.user.id.toString(),
            username: res.data.user.username,
            name: res.data.user.name,
            role: res.data.user.role,
            laravelToken: res.data.token,
            email: res.data.user.email,
            program_studi: res.data.user.program_studi,
          };
        } catch (err) {
          console.error("Admin login gagal:", err);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // @ts-ignore
        token.role = user.role as "mahasiswa" | "dosen" | "admin" | "kaprodi";
        // @ts-ignore
        token.username = user.username;
        // @ts-ignore
        token.laravelToken = user.laravelToken;
        // @ts-ignore
        token.program_studi = user.program_studi;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id as string;
        // @ts-ignore
        session.user.role = token.role as
          | "mahasiswa"
          | "dosen"
          | "admin"
          | "kaprodi";
        // @ts-ignore
        session.user.token = token.laravelToken as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        // @ts-ignore
        session.user.username = token.username as string;
        // @ts-ignore
        session.user.program_studi = token.program_studi as string;
      }
      return session;
    },

    async signIn() {
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
