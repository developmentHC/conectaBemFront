"use client";

import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useEmailStore } from "@/stores/emailStore";
import { CodeInput } from "@/components/CodeInput";
import { useCredentialLogin } from "../hooks/useCredentialLogin";
import { useSendCodeEmail } from "../hooks/useSendCodeEmail";
import { useCountdown } from "../hooks/useCountdown";
import { useRouter } from "next/navigation";

export const CodeForm = () => {
  const router = useRouter();
  const { mutate: resendCode } = useCredentialLogin();
  const { mutate: sendEmailCode, error, isPending } = useSendCodeEmail();
  const { email } = useEmailStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);
  const {
    timeLeft: timeLeftResendCode,
    startCountdown: startCountdownResendCode,
  } = useCountdown();
  const {
    timeLeft: timeLeftValidCode,
    startCountdown: startCountdownValidCode,
  } = useCountdown();

  useEffect(() => {
    if (email) {
      startCountdownValidCode(30 * 60);
    } else {
      router.push(`/auth`);
    }
  }, []);

  const onSubmit = (data: (string | null)[]) => {
    const code = data.join("");

    sendEmailCode({ code });
  };

  const sendCode = (email: any) => {
    resendCode({
      data: { email },
    });
    startCountdownResendCode(50);
    startCountdownValidCode(30 * 60);
  };

  return (
    <>
      {timeLeftValidCode > 0 ? (
        <span className="">
          Seu código de verificação expira em{" "}
          <span className="font-bold">
            {Math.ceil(timeLeftValidCode / 60)}{" "}
            {Math.ceil(timeLeftValidCode / 60) === 1 ? "minuto" : "minutos"}.
          </span>
        </span>
      ) : (
        <span className="">
          Código expirado! Por favor, solicite um novo código.
        </span>
      )}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-2 ">
          <CodeInput
            value={code}
            onChange={setCode}
            onFirstComplete={onSubmit}
          />
          {timeLeftResendCode > 0 ? (
            <span className="text-gray-400 test-sm">
              Reenviar código em {timeLeftResendCode} segundos
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
