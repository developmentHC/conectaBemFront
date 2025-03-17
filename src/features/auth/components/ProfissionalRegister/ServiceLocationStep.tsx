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
      <div className="flex flex-col gap-2">
        <label>
          Nome da Clínica <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("clinicName")}
          placeholder="Nome Fantasia"
          helperText={errors.clinicName?.message}
          error={!!errors.clinicName}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>
          CNPJ OU CPF do Profissional <span className="text-red-600">*</span>
        </label>
        <CpfCnpjField
          {...register("cpfCNPJ")}
          helperText={errors.cpfCNPJ?.message}
          error={!!errors.cpfCNPJ}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>
          CEP Local de Atendimento <span className="text-red-600">*</span>
        </label>
        <CEPField
          {...register("cep")}
          helperText={errors.cep?.message}
          error={!!errors.cep}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>
          Logradouro da Clínica <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("address")}
          placeholder="Rua, Avenida, Travessa"
          helperText={errors.address?.message}
          error={!!errors.address}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <label>
            Bairro da Clínica <span className="text-red-600">*</span>
          </label>
          <TextField
            className="w-full"
            placeholder="Bairro"
            {...register("neighborhood")}
            helperText={errors.neighborhood?.message}
            error={!!errors.neighborhood}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>
            Número <span className="text-red-600">*</span>
          </label>
          <TextField
            {...register("number")}
            placeholder="1014"
            type="number"
            helperText={errors.number?.message}
            error={!!errors.number}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>Complemento</label>
        <TextField
          {...register("complement")}
          placeholder="Sala 1101, bloco B"
        />
      </div>

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
