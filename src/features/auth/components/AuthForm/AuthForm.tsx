"use client";

import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCredentialLogin } from "../../hooks/useCredentialLogin";
// import { signOut, useSession } from "next-auth/react";
// import { useEffect } from "react";

type Data = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email("Ops! Verifique as informações e tente novamente"),
});

export const AuthForm = () => {
  const { mutate: login, isPending } = useCredentialLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Data>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    login({
      data: data,
    });
  });

  return (
    <form className="flex flex-col gap-7" onSubmit={onSubmit}>
      <TextField
        {...register("email")}
        helperText={errors.email?.message}
        error={!!errors.email}
        id="email"
        label="Entrar com o e-mail"
        placeholder="seuemail@conectabem.com"
      />

      {!isPending && (
        <Button
          disabled={!isValid}
          type="submit"
          className="rounded-lg w-full text-lime-500"
          variant="contained"
          size="large"
        >
          Continuar
        </Button>
      )}

      {isPending && (
        <Button className="rounded-lg w-full text-lime-500" variant="contained" size="large">
          <CircularProgress color="inherit" size={26} className="self-center" />
        </Button>
      )}
    </form>
  );
};
