"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { CodeInput } from "@/components/CodeInput/CodeInput";
import { useCredentialLogin } from "../../hooks/useCredentialLogin";
import { useAuthStore } from "../../stores/useAuthStore";
import { useConfirmOTP } from "../../hooks/useConfirmOTP";

export const CodeForm = () => {
  const { mutate: resendCode } = useCredentialLogin();
  const { mutate: sendEmailCode, error, isPending } = useConfirmOTP();
  const { email } = useAuthStore();
  const [code, setCode] = useState<(string | null)[]>([null, null, null, null]);

  const onSubmit = (data: (string | null)[]) => {
    const code = data.join("");

    sendEmailCode({ code });
  };

  const sendCode = () => {
    console.log(email);

    resendCode({ email });
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
          <span onClick={sendCode} className="text-blue-600 cursor-pointer">
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