"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@/stores/userSessionStore";
import { useCredentialLogin } from "../../hooks/useCredentialLogin";

// import { signOut, useSession } from "next-auth/react";
// import { useEffect } from "react";

type Data = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email("Ops! Verifique as informações e tente novamente"),
});

export const AuthForm = () => {
  const { mutate: login, isPending } = useCredentialLogin();
  const { setEmail } = useUserStore();
  const emailId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Data>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: Data) => {
    setEmail(data.email);

    login(data);
  });

  return (
    <form className="flex flex-col gap-7" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor={emailId}>
          E-mail<span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("email")}
          helperText={errors.email?.message}
          error={!!errors.email}
          id={emailId}
          placeholder="seuemail@conectabem.com"
        />
      </div>

      {!isPending && (
        <Button
          disabled={!isValid}
          type="submit"
          className="w-full rounded-lg text-lime-500"
          variant="contained"
          size="large"
        >
          Continuar
        </Button>
      )}

      {isPending && (
        <Button className="w-full rounded-lg text-lime-500" variant="contained" size="large">
          <CircularProgress color="inherit" size={26} className="self-center" />
        </Button>
      )}
    </form>
  );
};
