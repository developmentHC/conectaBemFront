import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Lato } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import {
  AuthProvider,
  MuiLocalizationProvider,
  MuiThemeProvider,
  ReactQueryClientProvider,
} from "@/providers/";

export const metadata = {
  title: "ConectaBem",
  description: "ConectaBem",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-br">
      <GoogleTagManager gtmId={`${GTM_ID}`} />
      <body className={`bg-default ${lato.className}`}>
        <AuthProvider>
          <ReactQueryClientProvider>
            <MuiThemeProvider>
              <MuiLocalizationProvider>
                <div>
                  <Toaster position="top-center" />
                  {children}
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
