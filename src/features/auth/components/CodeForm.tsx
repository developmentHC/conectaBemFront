"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useEmailStore } from "@/stores/emailStore";
import { CodeInput } from "@/components/CodeInput";
import { useCredentialLogin } from "../hooks/useCredentialLogin";
import { useSendCodeEmail } from "../hooks/useSendCodeEmail";
import { useCountdown } from "../hooks/useCountdown";

export const CodeForm = () => {
  const { mutate: resendCode, isError: isSendCodeError } = useCredentialLogin();
  const { mutate: sendEmailCode, error, isPending } = useSendCodeEmail();
  const { email } = useEmailStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);
  const { timeLeft, startCountdown, isCountdownActive } = useCountdown();

  const onSubmit = (data: (string | null)[]) => {
    const code = data.join("");

    sendEmailCode({ code });
  };

  const sendCode = (email: any) => {
    resendCode({
      data: { email },
    });
    startCountdown(30);
  };

  return (
    <>
      {!isSendCodeError && (
        <span className="">
          Seu código de verificação expira em{" "}
          <span className="font-bold">30 minutos.</span>
        </span>
      )}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-2 ">
          <CodeInput
            value={code}
            onChange={setCode}
            onFirstComplete={onSubmit}
          />
          {isCountdownActive() ? (
            <span className="text-gray-400 test-sm">
              Reenviar código em {timeLeft} segundos
            </span>
          ) : (
            <span
              onClick={() => sendCode(email)}
              className="text-blue-600 cursor-pointer"
            >
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
