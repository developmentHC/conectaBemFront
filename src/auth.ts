import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
// import { useEmailStore } from "./stores/emailStore";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Facebook, Google],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.id_token = account.id_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.id_token as string;
      session.user.email = token.email as string;
      return session;
    },
  },
});
