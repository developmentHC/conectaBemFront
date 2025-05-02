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
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});

export const metadata = {
  title: "ConectaBem",
  description: "ConectaBem",
};

// const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-br" className={lato.className}>
      <body className="bg-background">
        <ReactQueryClientProvider>
          <SessionProviderAuth>
            <MuiThemeProvider>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                <Toaster position="top-center" />
                <div className="flex flex-col justify-between space-y-8">
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
