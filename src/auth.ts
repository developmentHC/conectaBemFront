import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Facebook, Google],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.id_token as string;

      return session;
    },
  },
});
