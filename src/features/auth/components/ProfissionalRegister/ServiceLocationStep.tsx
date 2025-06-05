import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { useCEP } from "../../hooks/useCEP";
import { CEPField } from "@/components/Fields/CEPField";
import { useEffect, useState } from "react";
import { CpfCnpjField } from "@/components/Fields/CpfCnpjField";
import { isValidCNPJ, isValidCPF } from "@/utils/isCPFCNPJValid";

const schema = z.object({
  clinicName: z.string().min(3, "Nome inválido"),
  cpfCNPJ: z
    .string()
    .min(11, "CNPJ ou CPF inválido")
    .max(18, "CNPJ ou CPF inválido")
    .refine(
      (doc) => {
        const cleaned = doc.replace(/\D/g, "");

        if (cleaned.length === 11) return isValidCPF(doc);
        if (cleaned.length === 14) return isValidCNPJ(doc);

        return false;
      },
      {
        message: "CNPJ ou CPF inválido",
      }
    ),
  cepProfessional: z.string().length(9, "CEP inválido"),
  enderecoClinica: z.string().min(5, "Endereço inválido"),
  bairroClinica: z.string().min(3, "Bairro inválido"),
  numeroClinica: z.number().min(1, "Número inválido"),
  complementoClinica: z.string(),
  cidadeClinica: z.string().min(3, "Cidade inválida"),
  estadoClinica: z.string().min(3, "Estado inválido"),
});

type Data = z.infer<typeof schema>;

export const ServiceLocationStep = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<Data>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const { updateFields, changeStep } = useProfissionalRegisterStore();

  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [neighborhoodInput, setNeighborhoodInput] = useState("");

  const cepValue = watch("cepProfessional");
  const shouldFetchCep = cepValue?.replace(/\D/g, "").length === 8;

  const { data } = useCEP({
    cep: shouldFetchCep ? cepValue : "",
  });

  useEffect(() => {
    if (data?.erro) {
      setError("cepProfessional", {
        type: "manual",
        message: "CEP não encontrado",
      });
    }
  }, [data, setError]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const onlyLettersAndSpace = rawValue.replace(/\s+/g, " ").trimStart();

    setValue("clinicName", onlyLettersAndSpace);
    setNameInput(onlyLettersAndSpace);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const onlyLettersAndSpace = rawValue
      .replace(/[^A-Za-zÀ-ú\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();

    setValue("enderecoClinica", onlyLettersAndSpace);
    setAddressInput(onlyLettersAndSpace);
  };

  const onChangeNeighborhood = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const onlyLettersAndSpace = rawValue
      .replace(/[^A-Za-zÀ-ú\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();

    setValue("bairroClinica", onlyLettersAndSpace);
    setNeighborhoodInput(onlyLettersAndSpace);
  };

  const onChangeAddition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const onlyLettersAndSpace = rawValue.trimStart();

    setValue("complementoClinica", onlyLettersAndSpace);
  };

  const onSubmit = handleSubmit(async (data) => {
    data.cepProfessional = data.cepProfessional.replace("-", "");
    data.cpfCNPJ = data.cpfCNPJ.replace(".", "").replace(".", "").replace("-", "").replace("/", "");

    updateFields(data);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("specialties");
  });

  useEffect(() => {
    if (!data) return;

    setValue("enderecoClinica", data.logradouro);
    setAddressInput(data.logradouro || "");

    setValue("bairroClinica", data.bairro);
    setNeighborhoodInput(data.bairro || "");

    setValue("cidadeClinica", data.localidade);
    setValue("estadoClinica", data.estado);
  }, [data, setValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>
          Nome da Clínica <span className="text-red-600">*</span>
        </label>
        <TextField
          onChange={onChangeName}
          placeholder="Nome Fantasia"
          helperText={errors.clinicName?.message}
          error={!!errors.clinicName}
          value={nameInput}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>
          CNPJ OU CPF do Profissional <span className="text-red-600">*</span>
        </label>
        <CpfCnpjField {...register("cpfCNPJ")} helperText={errors.cpfCNPJ?.message} error={!!errors.cpfCNPJ} />
      </div>
      <div className="flex flex-col gap-2">
        <label>
          CEP Local de Atendimento <span className="text-red-600">*</span>
        </label>
        <CEPField
          {...register("cepProfessional")}
          onChange={(e) => setValue("cepProfessional", e.target.value, { shouldValidate: true })}
          helperText={errors.cepProfessional?.message}
          error={!!errors.cepProfessional}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>
          Logradouro da Clínica <span className="text-red-600">*</span>
        </label>
        <TextField
          onChange={onChangeAddress}
          placeholder="Rua, Avenida, Travessa"
          helperText={errors.enderecoClinica?.message}
          error={!!errors.enderecoClinica}
          value={addressInput}
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
            onChange={onChangeNeighborhood}
            className="w-full"
            placeholder="Bairro"
            helperText={errors.bairroClinica?.message}
            error={!!errors.bairroClinica}
            value={neighborhoodInput}
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
            {...register("numeroClinica", {
              valueAsNumber: true,
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            placeholder="1014"
            type="number"
            helperText={errors.numeroClinica?.message}
            error={!!errors.numeroClinica}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>Complemento</label>
        <TextField {...register("complementoClinica")} placeholder="Sala 1101, bloco B" onChange={onChangeAddition} />
      </div>

      <Button disabled={!isValid} type="submit" className="w-full text-button" variant="contained">
        Continuar
      </Button>
    </form>
  );
};
