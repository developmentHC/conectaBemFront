"use client";

import toast from "react-hot-toast";
import { ContactSupportIcon } from "@/assets/icons";
import { CodeForm } from "@/features/auth/components/CodeForm/CodeForm";
import { TitleCode } from "@/features/auth/components/CodeForm/TitleCode";
import { Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { SuccessScreen } from "@/features/auth/components/SuccessScreen/SuccessScreen";

export default function ConfirmCode() {
  const [isValidated, setIsValidated] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string>("");

  const handleSubmitChangeMethod = () => {
    toast.error("Outros métodos de acesso não implementados!");
  };

  const handleSuccessValidation = (responseStatus: number) => {
    setIsValidated(true);
    if (responseStatus === 200) {
      setRedirectUrl("/");
    } else if (responseStatus === 201) {
      setRedirectUrl("/auth/registro");
    }
    document.body.classList.add("fullscreen-active");
  };

  useEffect(() => {
    return () => document.body.classList.remove("fullscreen-active");
  }, []);

  return isValidated ? (
    <SuccessScreen
      title="Código validado com sucesso!"
      message="Você está sendo redirecionado para encontrar os melhores profissionais"
      redirectUrl={redirectUrl}
    />
  ) : (
    <main className="flex justify-center">
      <div className="flex flex-col md:max-w-[450px] justify-center gap-8">
        <TitleCode />

        <CodeForm onValidationSuccess={handleSuccessValidation} />

        <div className="flex flex-col gap-4 text-gray-600">
          <span className="">Não se esqueça de verificar sua caixa de spam, caso não encontre nosso e-mail</span>
          <div className="flex items-center gap-2">
            <ContactSupportIcon className="fill-gray-600" />
            <span className="">Precisa de ajuda?</span>
          </div>
        </div>

        <Divider />

        <Button onClick={handleSubmitChangeMethod} variant="outlined">
          Mudar método
        </Button>
      </div>
    </main>
  );
}
