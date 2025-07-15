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
        token: { label: "token", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }
          if (credentials.code && credentials.email) {
            const response = await api.post(`auth/checkOTP`, {
              email: credentials?.email,
              OTP: credentials?.code,
            });

            const data = response.data;

            if (data.user.status === "pending") {
              const error = new Error("ACCOUNT_PENDING");
              (error as any).userId = data.user._id;
              throw error;
            }

            let userType = "patient";

            if (data.userType && Array.isArray(data.userType) && data.userType.includes('professional')) {
              userType = "professional";
            }

            if (data.user && data.user._id) {
              return {
                id: data.user._id,
                email: data.user.email,
                name: data.user.name,
                token: data.token,
                type: userType,
                ...data.user,
              };
            }
          } else if (credentials.token) {
            const response = await api.get("user", {
              headers: {
                Authorization: `Bearer ${credentials.token}`,
              },
            });

            const data = response.data;

            let userType = "patient";

            if (data.userType && Array.isArray(data.userType) && data.userType.includes('professional')) {
              userType = "professional";
            }

            if (data._id) {
              return {
                id: data._id,
                email: data.email,
                name: data.name,
                token: credentials.token,
                type: userType,
                ...data,
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          if (error instanceof Error && error.message === "ACCOUNT_PENDING") {
            throw error;
          }

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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await api.post("/auth/sendOTP", { email: user.email });
          const data = response.data;

          if (data.email.status === "completed") {
            Object.assign(user, data.user);
            return true;
          } else if (data.email.status === "pending") {
            const params = new URLSearchParams({
              userId: data.id || "",
            });
            return `/auth/registro?${params.toString()}`;
          }
        } catch {
          throw new Error("Erro ao fazer login");
        }
      }
      return true;
    },
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
