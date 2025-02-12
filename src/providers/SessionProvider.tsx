import { SessionProvider } from "next-auth/react";

export const SessionProviderAuth = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
