"use client";

import { Header } from "@/components/Header/index";
import { Footer } from "@/components/Footer/Footer";
import { useSession } from "@/stores/useSession";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { session } = useSession();
  const isLoggedIn = !!session?.message?.id;
  const isProfessional = session?.message?.role === "professional";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="lg:flex w-full max-w-[86rem] mx-auto px-10 py-10 min-h-[40vh] lg:justify-center lg:items-center">
        <main className="flex-1">{children}</main>
      </div>
      {isLoggedIn ? (
        <Footer
          variant={isProfessional ? "logged-in-professional" : "logged-in-patient"}
          showCopyright={true}
        />
      ) : (
        <Footer
          variant="full"
          sections={[
            {
              title: "Explorar",
              links: [
                { label: "Buscar Profissionais" },
                { label: "Quero Ser um Profissional" },
              ],
            },
            {
              title: "Suporte",
              links: [{ label: "FAQ" }],
            },
            {
              title: "Sobre o Conecta Bem",
              links: [{ label: "Quem Somos" }, { label: "Valores" }],
            },
          ]}
          bottomLinks={[
            { label: "Termos de Uso" },
            { label: "Política de Privacidade" },
          ]}
          showBrand={false}
        />
      )}
    </div>
  );
}