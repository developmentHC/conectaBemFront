import { CEPField } from "@/components/Fields/CEPField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePatientRegisterStore } from "./usePatientRegisterStore";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCEP } from "../../hooks/useCEP";
import axios from "axios";

const schema = z.object({
  name: z
    .string()
    .min(3, "Nome inválido")
    .regex(/^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$/, "O nome deve conter apenas letras e um espaço entre as palavras"),
  birthdate: z
    .instanceof(Date)
    .refine(
      (date) => {
        const min = dayjs().subtract(110, "years").toDate();
        return date >= min;
      },
      {
        message: "Digite uma data de nascimento válida",
      }
    )
    .refine(
      (date) => {
        const max = dayjs().subtract(18, "years").toDate();
        return date <= max;
      },
      { message: "Você deve ser maior de idade para se cadastrar na plataforma!" }
    ),
  cepResidencial: z
    .string()
    .length(9, "CEP inválido")
    .regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido")
    .refine(
      async (cep) => {
        if (!/^\d{5}-\d{3}$/.test(cep)) {
          return true;
        }
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
          return !response.data.erro;
        } catch {
          return true;
        }
      },
      {
        message: "CEP não encontrado",
      }
    ),
  enderecoResidencial: z.string().min(3, "Endereço inválido"),
  bairroResidencial: z.string().min(3, "Bairro inválido"),
  cidadeResidencial: z.string().min(3, "Cidade inválida"),
  estadoResidencial: z.string().min(3, "Estado inválido"),
});

type Data = z.infer<typeof schema>;

export const PersonalDataStep = () => {
  const { updateFields, changeStep } = usePatientRegisterStore();
  const [nameInput, setNameInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Data>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const cepValue = watch("cepResidencial");
  const shouldFetchCep = cepValue?.replace(/\D/g, "").length === 8;

  const { data } = useCEP({
    cep: shouldFetchCep ? cepValue : "",
  });

  const onSubmit = handleSubmit(async (data: Data) => {
    data.cepResidencial = data.cepResidencial.replace("-", "");

    updateFields({
      birthdayDate: data.birthdate,
    });

    updateFields(data);

    changeStep("specialties");
  });

  const replaceName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const onlyLettersAndSpace = rawValue
      .replace(/[^A-Za-zÀ-ú\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();

    setValue("name", onlyLettersAndSpace);
    setNameInput(onlyLettersAndSpace);
  };

  useEffect(() => {
    if (!data) return;

    setValue("enderecoResidencial", data.logradouro);
    setValue("bairroResidencial", data.bairro);
    setValue("cidadeResidencial", data.localidade);
    setValue("estadoResidencial", data.estado);
  }, [data, setValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>
          Nome <span className="text-red-600">*</span>
        </label>

        <TextField onChange={replaceName} placeholder="Nome e Sobrenome" id="name" value={nameInput} required />
      </div>
      <div className="flex flex-col gap-2">
        <label>
          Data de Nascimento <span className="text-red-600">*</span>
        </label>
        <DatePicker
          maxDate={dayjs()}
          minDate={dayjs().subtract(110, "year")}
          disableFuture
          slotProps={{
            textField: {
              inputProps: {
                placeholder: "DD/MM/AAAA",
              },
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
        <label>
          CEP Residencial <span className="text-red-600">*</span>
        </label>
        <CEPField
          {...register("cepResidencial")}
          onChange={(e) => setValue("cepResidencial", e.target.value, { shouldValidate: true })}
          helperText={errors.cepResidencial?.message}
          error={!!errors.cepResidencial}
        />
      </div>

      <Button disabled={!isValid} className="text-button" variant="contained" type="submit">
        Continuar
      </Button>
    </form>
  );
};
