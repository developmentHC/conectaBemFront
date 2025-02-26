import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { useCEP } from "../../hooks/useCEP";
import { CEPField } from "@/components/Fields/CEPField";
import { useEffect } from "react";
import { CpfCnpjField } from "@/components/Fields/CpfCnpjField";

type Data = z.infer<typeof schema>;

const schema = z.object({
  clinicName: z.string().min(3, "Nome inválido"),
  cpfCNPJ: z
    .string()
    .min(11, "CNPJ ou CPF inválido")
    .max(18, "CNPJ ou CPF inválido"),
  cep: z.string().length(9, "CEP inválido"),
  address: z.string().min(5, "Endereço inválido"),
  neighborhood: z.string().min(3, "Bairro inválido"),
  number: z.string().min(1, "Número inválido"),
  complement: z.string(),
});

export const ServiceLocationStep = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { updateFields, changeStep } = useProfissionalRegisterStore();

  const { data } = useCEP({
    cep: getValues("cep"),
  });

  const onSubmit = handleSubmit(async (data) => {
    data.cep = data.cep.replace("-", "");
    data.cpfCNPJ = data.cpfCNPJ
      .replace(".", "")
      .replace(".", "")
      .replace("-", "")
      .replace("/", "");

    updateFields(data);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("specialties");
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setValue("address", data.logradouro);
    setValue("neighborhood", data.bairro);
  }, [data]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <TextField
        {...register("clinicName")}
        label="Nome da Clínica"
        placeholder="Nome Fantasia"
        helperText={errors.clinicName?.message}
        error={!!errors.clinicName}
        required
      />
      <CpfCnpjField
        {...register("cpfCNPJ")}
        helperText={errors.cpfCNPJ?.message}
        error={!!errors.cpfCNPJ}
      />
      <CEPField
        {...register("cep")}
        helperText={errors.cep?.message}
        error={!!errors.cep}
      />
      <TextField
        {...register("address")}
        label="Logradouro da Clínica"
        helperText={errors.address?.message}
        error={!!errors.address}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        disabled
      />
      <div className="flex gap-4">
        <TextField
          className="w-full"
          {...register("neighborhood")}
          label="Bairro da Clínica"
          helperText={errors.neighborhood?.message}
          error={!!errors.neighborhood}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          disabled
        />
        <TextField
          {...register("number")}
          type="number"
          label="Número"
          helperText={errors.number?.message}
          error={!!errors.number}
          required
        />
      </div>

      <TextField
        {...register("complement")}
        label="Complemento"
        placeholder="Sala 1101, bloco B"
      />

      <Button
        disabled={!isValid}
        type="submit"
        className="w-full text-button"
        variant="contained"
      >
        Continuar
      </Button>
    </form>
  );
};