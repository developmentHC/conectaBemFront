import "./globals.css";
import { Lato } from "next/font/google";
import { ReactNode } from "react";
import { Header } from "@/components/Header/index";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer/Footer";
import { AuthProvider, MuiLocalizationProvider, MuiThemeProvider, ReactQueryClientProvider } from "@/providers/";

export const metadata = {
  title: "ConectaBem",
  description: "ConectaBem",
};

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-br">
      <body className={`bg-default ${lato.className}`}>
        <AuthProvider>
          <ReactQueryClientProvider>
            <MuiThemeProvider>
              <MuiLocalizationProvider>
                <div className="flex flex-col gap-8">
                  <Toaster position="top-center" />
                  <Header />
                  <div className="lg:flex w-full max-w-[86rem] mx-auto px-10 min-h-[70vh] lg:justify-center lg:items-center">
                    {children}
                  </div>
                  <Footer />
                </div>
              </MuiLocalizationProvider>
            </MuiThemeProvider>
          </ReactQueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
