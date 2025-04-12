import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryClientProvider } from "@/providers/ReactQueryProvider";
import { MuiThemeProvider } from "@/providers/MuiThemeProvider";
import { Toaster } from "react-hot-toast";
import { SessionProviderAuth } from "@/providers/SessionProvider";

export const metadata = {
  title: "ConectaBem",
  description: "ConectaBem",
};

type RootLayoutProps = {
  children: ReactNode
};    
export const revalidate = 1;
//export const revalidate = 86400; // 24 horas para todo o layout

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-default">
        <ReactQueryClientProvider>
          <SessionProviderAuth>
            <MuiThemeProvider>
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
              >
                <div className="flex flex-col gap-8">
                  <Toaster position="top-center" />
                  <Header />
                  
                  <div className="px-8">{children}</div>
                </div>
              </GoogleOAuthProvider>
            </MuiThemeProvider>
          </SessionProviderAuth>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
};