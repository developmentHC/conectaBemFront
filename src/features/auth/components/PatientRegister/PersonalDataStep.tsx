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

type Data = z.infer<typeof schema>;

const schema = z.object({
  name: z
    .string()
    .min(3, "Nome inválido")
    .regex(/^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$/, "O nome deve conter apenas letras e um espaço entre as palavras"),
  birthdate: z.instanceof(Date).refine(
    (date) => {
      const now = new Date();
      const min = dayjs().subtract(90, "years").toDate();
      return date <= now && date >= min;
    },
    {
      message: "Data de nascimento deve ser entre hoje e 90 anos atrás",
    }
  ),
  cepResidencial: z.string().length(9, "CEP inválido"),
  enderecoResidencial: z.string().min(3, "Endereço inválido"),
  bairroResidencial: z.string().min(3, "Bairro inválido"),
});

export const PersonalDataStep = () => {
  const { updateFields, changeStep } = usePatientRegisterStore();
  const [nameInput, setNameInput] = useState("");

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

  const { data } = useCEP({
    cep: getValues("cepResidencial"),
  });

  const onSubmit = handleSubmit(async (data: Data) => {
    data.cepResidencial = data.cepResidencial.replace("-", "");
    console.log(data);
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
    console.log(data);
    setValue("enderecoResidencial", data.logradouro);

    setValue("bairroResidencial", data.bairro);
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
