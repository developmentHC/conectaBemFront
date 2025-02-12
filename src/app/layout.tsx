import "./globals.css";
// import { Inter } from 'next/font/google'
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryClientProvider } from "@/providers/ReactQueryProvider";
import { MuiThemeProvider } from "@/providers/MuiThemeProvider";
import { Toaster } from "react-hot-toast";
import { SessionProviderAuth } from "@/providers/SessionProvider";
import { Footer } from "@/components/Footer/Footer";

export const metadata = {
  title: "ConectaBem",
  description: "ConectaBem",
};

// const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
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
                  <div className="lg:flex w-full max-w-[86rem] mx-auto px-10 min-h-[70vh] lg:justify-center lg:items-center">
                    {children}
                  </div>
                  <Footer />
                </div>
              </GoogleOAuthProvider>
            </MuiThemeProvider>
          </SessionProviderAuth>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
