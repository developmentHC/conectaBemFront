"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useEmailStore } from "@/stores/emailStore";
import { CodeInput } from "@/components/CodeInput";
import { useCredentialLogin } from "../hooks/useCredentialLogin";
import { useSendCodeEmail } from "../hooks/useSendCodeEmail";

export const CodeForm = () => {
  const { mutate: resendCode } = useCredentialLogin();
  const { mutate: sendEmailCode, error, isPending } = useSendCodeEmail();
  const { email } = useEmailStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);

  const onSubmit = (data: (string | null)[]) => {
    const code = data.join("");

    sendEmailCode({ code });
  };

  const sendCode = (email: any) => {
    resendCode({
      data: { email },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-2 ">
          <CodeInput
            value={code}
            onChange={setCode}
            onFirstComplete={onSubmit}
          />
          <span
            onClick={() => sendCode(email)}
            className="text-blue-600 cursor-pointer"
          >
            Reenviar código
          </span>
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
