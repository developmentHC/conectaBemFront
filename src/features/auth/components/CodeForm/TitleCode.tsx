"use client";

import { WelcomeSectionHeader } from "@/components/WelcomeSectionHeader";
import { useUserStore } from "@/stores/userSessionStore";

export const TitleCode = () => {
  const { email } = useUserStore();

  return (
    <WelcomeSectionHeader
      href="/auth"
      title={`Digite o código enviado para ${email || "seu e-mail"}!`}
    />
  );
};
