import { api } from "@/libs/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        code: { label: "number", type: "number" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.code) {
            return null;
          }
          const response = await api.post(`auth/checkOTP`, {
            email: credentials?.email,
            OTP: credentials?.code,
          });

          const data = response.data;

          if (data.user && data.user._id) {
            return {
              id: data.user._id,
              email: data.user.email,
              name: data.user.name,
              token: data.token,
              type: data.userType,
              ...data.user,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    verifyRequest: "/auth/confirmar-codigo",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  /* logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
  }, */
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
