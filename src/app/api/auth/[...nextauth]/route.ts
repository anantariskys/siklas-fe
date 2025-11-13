import { socialLogin } from "@/services/auth/social-login";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // 🔑 Saat user login pertama kali
    async jwt({ token, user }) {
      if (user) {
        try {
          // Kirim data user ke Laravel backend
          const backend = await socialLogin({
            google_id: user.id,
            email: user.email!,
            name: user.name!,
            avatar: user.image || undefined,
          });

          console.log("BACKEND", backend);

          token.id = backend.data.user.id;
          token.laravelToken = backend.data.token;
        } catch (err) {
          console.error("Laravel login failed:", err);
        }
      }
      return token;
    },

    // 🔑 Saat session diakses di client
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.token = token.laravelToken as string; // token Laravel
      }
      return session;
    },

    // 🔑 Batasi domain email
    async signIn({ profile }) {
      if (profile?.email?.endsWith("@student.ub.ac.id")) {
        return true;
      }
      return false;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
