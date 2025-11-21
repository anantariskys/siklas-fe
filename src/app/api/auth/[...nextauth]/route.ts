import { login } from "@/services/auth/admin-login";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
          const res = await login({
            username: credentials.username,
            password: credentials.password,
          });

          return {
            id: res.data.user.id,
            username: res.data.user.username,
            name: res.data.user.name,
            role: res.data.user.role,
            laravelToken: res.data.token,
            email: res.data.user.email,
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
    maxAge: 5 * 60,
  },

  jwt: {
    maxAge: 5 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role as "mahasiswa" | "dosen" | "admin" | "kaprodi";
        token.username = user.username;
        token.laravelToken = user.laravelToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as
          | "mahasiswa"
          | "dosen"
          | "admin"
          | "kaprodi";
        session.user.token = token.laravelToken as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
      }
      return session;
    },

    async signIn() {
      return true; // hanya credentials yang boleh login
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
