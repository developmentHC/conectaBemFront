"use client";

import { Button, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { CEPField } from "@/components/Fields/CEPField";

type Data = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(10, "Nome inválido"),
  birthdate: z.instanceof(Date),
  cep: z.string().length(9, "CEP inválido"),
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
      <div className="flex flex-col gap-2">
        <label>Nome Completo <span className="text-red-600">*</span></label>
        <TextField
          {...register("name")}
          id="name"
          variant="outlined"
          placeholder="Nome e Sobrenome"
          required
          helperText={errors.name?.message}
          error={!!errors.name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Data de Nascimento <span className="text-red-600">*</span></label>
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
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>CEP Residencial <span className="text-red-600">*</span></label>
        <CEPField
          {...register("cep")}
          onChange={(e) =>
            setValue("cep", e.target.value, { shouldValidate: true })
          }
        />
      </div>

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
