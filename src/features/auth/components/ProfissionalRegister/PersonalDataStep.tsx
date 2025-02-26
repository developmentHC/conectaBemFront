"use client";

import { Button, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

type Data = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(10, "Nome inválido"),
  birthdate: z.instanceof(Date),
});

export const PersonalDataStep = () => {
  const { changeStep, updateFields } = useProfissionalRegisterStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: Data) => {
    updateFields(data);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("service_location");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <TextField
        {...register("name")}
        id="name"
        variant="outlined"
        placeholder="Nome e Sobrenome"
        label="Nome Completo"
        required
        helperText={errors.name?.message}
        error={!!errors.name}
      />

      <DatePicker
        maxDate={dayjs()}
        slotProps={{
          textField: {
            helperText: errors.birthdate?.message,
            error: !!errors.birthdate,
            required: true,
          },
        }}
        onChange={(date) =>
          setValue("birthdate", date?.toDate() as any, {
            shouldValidate: true,
          })
        }
        label="Data de Nascimento"
      />

      <Button
        disabled={!isValid}
        type="submit"
        variant="contained"
        size="large"
      >
        Continuar
      </Button>
    </form>
  );
};