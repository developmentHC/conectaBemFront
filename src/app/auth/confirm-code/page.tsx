"use client";

import { WelcomeSectionHeader } from "@/components/WelcomeSectionHeader";
import { CodeForm } from "@/features/auth/components/CodeForm";
import { useCredentialLogin } from "@/features/auth/hooks/useCredentialLogin";
import { useEmailStore } from "@/stores/emailStore";
import { Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function ConfirmCode() {
  const { email, setEmail } = useEmailStore();
  const { mutate: login } = useCredentialLogin();
  const session = useSession();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (session.data?.user?.email && !hasSubmitted) {
      login({
        data: {
          email: session.data.user.email,
        },
      });
    }

    if (session.data?.user?.email) {
      setEmail(session.data.user.email);
    }

    setHasSubmitted(true);
  }, [session, login, hasSubmitted]);

  return (
    <main className="flex justify-center">
      <div className="flex flex-col md:max-w-[450px] justify-center gap-8">
        <WelcomeSectionHeader
          href="/auth"
          title={`Digite o código enviado para ${email}!`}
        />

        <CodeForm />

        <Divider />

        <div className="flex flex-col gap-4 text-gray-600">
          <span className="">
            Não se esqueça de verificar sua caixa de spam, caso não encontre
            nosso e-mail
          </span>
          <div className="flex items-center gap-2">
            <FaRegQuestionCircle />

            <span className="">Precisa de ajuda?</span>
          </div>
        </div>
      </div>
    </main>
  );
}
