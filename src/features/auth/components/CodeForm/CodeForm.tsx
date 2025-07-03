"use client";

import { useState, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { CodeInput, type CodeInputHandle } from "@/components/CodeInput/CodeInput";
import { useCredentialLogin } from "../../hooks/useCredentialLogin";
import { useCountdown } from "../../hooks/useCountdown";
import { useUserStore } from "@/stores/userSessionStore";
import { signIn } from "next-auth/react";

type CodeFormProps = {
  onValidationSuccess: (responseStatus: number) => void;
};

export const CodeForm = ({ onValidationSuccess }: CodeFormProps) => {
  const { mutate: resendCode } = useCredentialLogin();
  const { email } = useUserStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);
  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { countdown, isActive, startCountdown } = useCountdown();

  const codeInputRef = useRef<CodeInputHandle>(null);

  const onSubmit = async (data: (string | null)[]) => {
    const code = data.join("");
    setCode([null, null, null, null]);
    setError(false);
    setPending(true);
    const result = await signIn("credentials", {
      email,
      code,
      redirect: false,
    });
    setPending(false);

    if (result?.ok) {
      onValidationSuccess(result.status);
    }

    if (result?.error) {
      setError(true);
      codeInputRef.current?.focusOnFirstInput();
    }
  };

  const sendCode = () => {
    startCountdown();

    resendCode({ email });
  };

  return (
    <>
      {isActive && (
        <p>
          Seu código de verificação expira em <span className="font-semibold">30 minutos.</span>
        </p>
      )}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-4 ">
          <CodeInput ref={codeInputRef} value={code} onChange={setCode} onComplete={onSubmit} />
          {isActive && <p className="text-gray-400 text-sm">Reenviar o código em {countdown} segundos.</p>}
          {!isActive && (
            <span onClick={sendCode} className="cursor-pointer">
              Reenviar código
            </span>
          )}
        </div>
      </div>

      {isPending && (
        <div className="flex justify-center">
          <CircularProgress size={75} />
        </div>
      )}

      {!isPending && (
        <div className="flex flex-col gap-4">
          {error && (
            <span className="text-red-600">
              Código incorreto! Preencha corretamente ou reenvie o código e tente novamente.
            </span>
          )}
        </div>
      )}
    </>
  );
};
