"use client";

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/index";
import { useSession } from "@/stores/useSession";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = useSession();
  const isLoggedIn = !!session?.message?.id;
  const isProfessional = session?.message?.role === "professional";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto min-h-[40vh] w-full max-w-[86rem] px-10 py-10 lg:flex lg:items-center lg:justify-center">
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
              links: [{ label: "Buscar Profissionais" }, { label: "Quero Ser um Profissional" }],
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
          bottomLinks={[{ label: "Termos de Uso" }, { label: "Política de Privacidade" }]}
          showBrand={false}
        />
      )}
    </div>
  );
}
