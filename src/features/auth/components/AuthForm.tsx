"use client";

import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCredentialLogin } from "../hooks/useCredentialLogin";

type Data = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email("Tem que ser um e-mail válido"),
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

  const onSubmit = handleSubmit(async (data) => {
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
          className="rounded-lg w-full text-button"
          variant="contained"
          size="large"
        >
          Continuar
        </Button>
      )}

      {isPending && (
        <Button
          className="rounded-lg w-full text-button"
          variant="contained"
          size="large"
        >
          <CircularProgress color="inherit" size={26} className="self-center" />
        </Button>
      )}
    </form>
  );
};
