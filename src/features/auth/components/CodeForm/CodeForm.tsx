"use client";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { CodeInput, type CodeInputHandle } from "@/components/CodeInput/CodeInput";
import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";
import { useCountdown } from "../../hooks/useCountdown";
import { useCredentialLogin } from "../../hooks/useCredentialLogin";

type CodeFormProps = {
  onValidationSuccess: (responseStatus: number) => void;
};

export const CodeForm = ({ onValidationSuccess }: CodeFormProps) => {
  const router = useRouter();
  const { mutate: resendCode } = useCredentialLogin();
  const { email, setPendingToken } = useUserStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);
  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { timeLeft: timeLeftResendCode, startCountdown: startCountdownResendCode } = useCountdown();
  const { timeLeft: timeLeftValidCode, startCountdown: startCountdownValidCode } = useCountdown();

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

    try {
      const response = await api.post("/auth/checkOTP", { email, OTP: code });
      const responseData = response.data;

      if (responseData.user?.status === "pending") {
        setPendingToken(responseData.token);
        router.push("/auth/registro");
        return;
      }

      const result = await signIn("credentials", {
        token: responseData.token,
        redirect: false,
      });

      if (result?.ok) {
        onValidationSuccess(result.status);
      } else {
        setError(true);
        codeInputRef.current?.focusOnFirstInput();
      }
    } catch {
      setError(true);
      codeInputRef.current?.focusOnFirstInput();
    } finally {
      setPending(false);
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
        <span className="">Código expirado! Por favor, solicite um novo código.</span>
      )}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-4">
          <CodeInput
            ref={codeInputRef}
            value={code}
            onChange={setCode}
            onComplete={onSubmit}
            error={!!error}
          />
          {timeLeftResendCode > 0 ? (
            <span className="test-sm flex justify-end text-gray-400">
              Reenviar código em {timeLeftResendCode} segundos
            </span>
          ) : (
            <button
              type="button"
              onClick={() => sendCode()}
              className="cursor-pointer text-end font-[lato] font-bold text-[#1D1B20] text-base underline"
            >
              Reenviar código
            </button>
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
            <span role="alert" aria-live="polite" className="text-red-600">
              Código incorreto! Preencha corretamente ou reenvie o código e tente novamente.
            </span>
          )}
        </div>
      )}
    </>
  );
};
