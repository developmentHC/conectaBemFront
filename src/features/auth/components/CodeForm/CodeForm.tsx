"use client";

import { useState, useRef, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import {
  CodeInput,
  type CodeInputHandle,
} from "@/components/CodeInput/CodeInput";
import { useCredentialLogin } from "../../hooks/useCredentialLogin";
import { useCountdown } from "../../hooks/useCountdown";
import { useUserStore } from "@/stores/userSessionStore";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type CodeFormProps = {
  onValidationSuccess: (responseStatus: number) => void;
};

export const CodeForm = ({ onValidationSuccess }: CodeFormProps) => {
  const router = useRouter();
  const { mutate: resendCode } = useCredentialLogin();
  const { email } = useUserStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);
  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
  });

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

    if (result?.error === "ACCOUNT_PENDING") {
      router.push("/auth/registro");
    } else if (result?.error) {
      setError(true);
      codeInputRef.current?.focusOnFirstInput();
    }
  };

  const sendCode = () => {
    startCountdownResendCode(50);
    startCountdownValidCode(30 * 60);

    resendCode({ email });
  };

  return (
    <>
      {timeLeftValidCode > 0 ? (
        <span className="">
          Seu código de verificação expira em{" "}
          <span className="font-bold">
            {timeLeftValidCode <= 60
              ? `${timeLeftValidCode} segundo${timeLeftValidCode === 1 ? "" : "s"}`
              : `${Math.ceil(timeLeftValidCode / 60)} ${
                  Math.ceil(timeLeftValidCode / 60) === 1 ? "minuto" : "minutos"
                }`}
            .
          </span>
        </span>
      ) : (
        <span className="">
          Código expirado! Por favor, solicite um novo código.
        </span>
      )}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-4 ">
          <CodeInput
            ref={codeInputRef}
            value={code}
            onChange={setCode}
            onComplete={onSubmit}
            error={!!error}
          />
          {timeLeftResendCode > 0 ? (
            <span className="text-gray-400 test-sm flex justify-end">
              Reenviar código em {timeLeftResendCode} segundos
            </span>
          ) : (
            <span
              onClick={() => sendCode()}
              className="text-[#1D1B20] cursor-pointer text-end font-[lato] font-bold text-base underline"
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
        </div>
      )}
    </>
  );
};
