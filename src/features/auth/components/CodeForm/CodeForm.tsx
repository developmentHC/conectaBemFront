"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { CodeInput } from "@/components/CodeInput/CodeInput";
import { useCredentialLogin } from "../../hooks/useCredentialLogin";
import { useConfirmOTP } from "../../hooks/useConfirmOTP";
import { useCountdown } from "../../hooks/useCountdown";
import { useUserStore } from "@/stores/userSessionStore";

export const CodeForm = () => {
  const { mutate: resendCode } = useCredentialLogin();
  const { mutate: sendEmailCode, error, isPending } = useConfirmOTP();
  const { email } = useUserStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);
  const { countdown, isActive, startCountdown } = useCountdown();

  const onSubmit = (data: (string | null)[]) => {
    const code = data.join("");

    sendEmailCode({ code });
  };

  const sendCode = () => {
    startCountdown();

    resendCode({ email });
  };

  return (
    <>
      {isActive && (
        <p>
          Seu código de verificação expira em{" "}
          <span className="font-semibold">30 minutos.</span>
        </p>
      )}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-2 ">
          <CodeInput
            value={code}
            onChange={setCode}
            onFirstComplete={onSubmit}
          />
          {isActive && (
            <p className="text-gray-400 text-sm">
              Reenviar o código em {countdown} segundos.
            </p>
          )}
          {!isActive && (
              <span onClick={sendCode} className="text-blue-600 cursor-pointer">
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
              Código incorreto! Preencha corretamente ou reenvie o código e
              tente novamente.
            </span>
          )}
          <Button
            disabled={!error}
            className="rounded-lg w-full"
            variant="outlined"
            onClick={() => onSubmit(code)}
          >
            Confirmar código
          </Button>
        </div>
      )}
    </>
  );
};
