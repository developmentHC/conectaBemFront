import "./globals.css";
import { Lato } from "next/font/google";
import { ReactNode } from "react";
import { Header } from "@/components/Header/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryClientProvider } from "@/providers/ReactQueryProvider";
import { MuiThemeProvider } from "@/providers/MuiThemeProvider";
import { Toaster } from "react-hot-toast";
import { SessionProviderAuth } from "@/providers/SessionProvider";
import { Footer } from "@/components/Footer/Footer";
import { MuiLocalizationProvider } from "@/providers/LocalizationProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import Script from "next/script";

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

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-br">
      <head>
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className={`bg-default ${lato.className}`}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <ReactQueryClientProvider>
          <SessionProviderAuth>
            <MuiThemeProvider>
              <MuiLocalizationProvider>
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
                >
                  <AnalyticsProvider>
                    <div className="flex flex-col gap-8">
                      <Toaster position="top-center" />
                      <Header />
                      <div className="lg:flex w-full max-w-[86rem] mx-auto px-10 min-h-[70vh] lg:justify-center lg:items-center">
                        {children}
                      </div>
                      <Footer />
                    </div>
                  </AnalyticsProvider>
                </GoogleOAuthProvider>
              </MuiLocalizationProvider>
            </MuiThemeProvider>
          </SessionProviderAuth>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
