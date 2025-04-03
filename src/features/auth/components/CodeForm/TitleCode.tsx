"use client";

import { WelcomeSectionHeader } from "@/components/WelcomeSectionHeader";
import { useEmailStore } from "@/stores/emailStore";

export const TitleCode = () => {
  const { email } = useEmailStore();

  return (
    <WelcomeSectionHeader
      href="/auth"
      title={`Digite o código enviado para ${email || "seu e-mail"}!`}
    />
  );
};
