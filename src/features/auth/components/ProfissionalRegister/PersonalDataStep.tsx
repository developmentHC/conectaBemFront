"use client";

import axios from "axios";
import { Button, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { CEPField } from "@/components/Fields/CEPField";
import { useEffect } from "react";
import { useCEP } from "../../hooks/useCEP";

const schema = z.object({
  name: z
    .string()
    .min(3, "Nome inválido")
    .regex(
      /^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$/,
      "O nome deve conter apenas letras e um espaço entre as palavras"
    ),
  birthdate: z
    .instanceof(Date, { message: "Data de nascimento inválida." })
    .nullable()
    .refine((date) => date !== null && !isNaN(date.getTime()), {
        message: "Data de nascimento é obrigatória!",
    })
    .refine(
      (date) => {
        if (!date) return true; 
        const min = dayjs().subtract(110, "years").toDate();
        return date >= min;
      },
      {
        message: "Digite uma data de nascimento válida",
      }
    )
    .refine(
      (date) => {
        if (!date) return true;
        const max = dayjs().subtract(18, "years").toDate();
        return date <= max;
      },
      {
        message:
          "Você deve ser maior de idade para se cadastrar na plataforma!",
      }
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
          const response = await axios.get(
            `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`
          );
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
  numeroResidencial: z.string().min(1, "Número obrigatório"), 
  bairroResidencial: z.string().min(3, "Bairro inválido"),
  cidadeResidencial: z.string().min(3, "Cidade inválida"),
  estadoResidencial: z.string().min(2, "Estado inválido"),
});

type Data = z.infer<typeof schema>;

export const PersonalDataStep = () => {
  const { changeStep, updateFields } = useProfissionalRegisterStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Data>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      birthdate: null,
      cepResidencial: "",
      enderecoResidencial: "",
      numeroResidencial: "",
      bairroResidencial: "",
      cidadeResidencial: "",
      estadoResidencial: "",
    }
  });

  const nameValue = watch("name"); 
  const cepValue = watch("cepResidencial");
  const logradouroValue = watch("enderecoResidencial");
  const bairroValue = watch("bairroResidencial");
  const cidadeValue = watch("cidadeResidencial");
  const estadoValue = watch("estadoResidencial");
  const numeroResidencialValue = watch("numeroResidencial");
  const shouldFetchCep = cepValue?.replace(/\D/g, "").length === 8;

  const { data } = useCEP({
    cep: shouldFetchCep ? cepValue : "",
  });

  const onSubmit = handleSubmit(async (data: Data) => {
    const submittedData = {
        ...data,
        birthdate: data.birthdate === null ? undefined : data.birthdate,
        cepResidencial: data.cepResidencial.replace("-", ""),
        numeroResidencial: data.numeroResidencial ? parseInt(data.numeroResidencial, 10) : null,
    }

    updateFields(submittedData);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("service_location");
  });

  const replaceName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const onlyLettersAndSpace = rawValue
      .replace(/[^A-Za-zÀ-ú\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();

    setValue("name", onlyLettersAndSpace, { shouldValidate: true });
  };

  useEffect(() => {
    if (!data) return;

    setValue("enderecoResidencial", data.logradouro);
    setValue("bairroResidencial", data.bairro);
    setValue("cidadeResidencial", data.localidade);
    setValue("estadoResidencial", data.estado);
    setValue("numeroResidencial", "");
  }, [data, setValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className={errors.name ? "text-red-600" : ""}>
          Nome Completo <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("name")}
          onChange={replaceName}
          value={nameValue}
          id="name"
          variant="outlined"
          placeholder="Nome e Sobrenome"
          helperText={errors.name?.message}
          error={!!errors.name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={errors.birthdate ? "text-red-600" : ""}>
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
        <label className={errors.cepResidencial ? "text-red-600" : ""}>
          CEP Residencial <span className="text-red-600">*</span>
        </label>
        <CEPField
          {...register("cepResidencial")}
          onChange={(e) =>
            setValue("cepResidencial", e.target.value, { shouldValidate: true })
          }
          error={!!errors.cepResidencial}
          helperText={errors.cepResidencial?.message}
        />
        <div className="flex justify-end">
          <span className="text-base text-[#1D1B20] underline cursor-pointer font-normal">
            Buscar CEP
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={errors.enderecoResidencial ? "text-red-600" : ""}>
          Longradouro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("enderecoResidencial")}
          value={logradouroValue}
          variant="outlined"
          placeholder="Nome da rua / avenida, número"
          helperText={errors.enderecoResidencial?.message}
          error={!!errors.enderecoResidencial}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={errors.numeroResidencial ? "text-red-600" : ""}>
          Número <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("numeroResidencial")}
          value={numeroResidencialValue}
          type="number"
          variant="outlined"
          placeholder="0000"
          helperText={errors.numeroResidencial?.message}
          error={!!errors.numeroResidencial}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={errors.bairroResidencial ? "text-red-600" : ""}>
          Bairro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("bairroResidencial")}
          value={bairroValue}
          variant="outlined"
          placeholder="Nome do bairro"
          helperText={errors.bairroResidencial?.message}
          error={!!errors.bairroResidencial}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={errors.cidadeResidencial ? "text-red-600" : ""}>
          Cidade <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("cidadeResidencial")}
          value={cidadeValue}
          variant="outlined"
          placeholder="Nome da cidade"
          helperText={errors.cidadeResidencial?.message}
          error={!!errors.cidadeResidencial}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={errors.estadoResidencial ? "text-red-600" : ""}>
          Estado <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("estadoResidencial")}
          value={estadoValue}
          variant="outlined"
          placeholder="Nome do estado"
          helperText={errors.estadoResidencial?.message}
          error={!!errors.estadoResidencial}
        />
      </div>

      <div className="my-6">
        <span className="text-sm font-bold">
          Campos Obrigatórios ( * )
        </span>
      </div>

      <Button type="submit" variant="contained" size="large">
        Continuar
      </Button>
    </form>
  );
};
