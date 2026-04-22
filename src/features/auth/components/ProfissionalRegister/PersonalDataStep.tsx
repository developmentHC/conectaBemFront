"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useId, useRef } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { CEPField } from "@/components/Fields/CEPField";
import { useCEP } from "../../hooks/useCEP";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

const FIELD_ORDER = [
  "name",
  "birthdate",
  "cepResidencial",
  "enderecoResidencial",
  "numeroResidencial",
  "bairroResidencial",
  "cidadeResidencial",
  "estadoResidencial",
] as const;

const schema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ-]+)*$/,
      "O nome deve conter apenas letras e um espaço entre as palavras",
    ),
  birthdate: z
    .instanceof(Date, { message: "Data de nascimento inválida." })
    .nullable()
    .refine((date) => date !== null && !Number.isNaN(date.getTime()), {
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
      },
    )
    .refine(
      (date) => {
        if (!date) return true;
        const max = dayjs().subtract(18, "years").toDate();
        return date <= max;
      },
      {
        message: "Você deve ser maior de idade para se cadastrar na plataforma!",
      },
    ),
  cepResidencial: z
    .string()
    .min(1, "CEP é obrigatório")
    .length(9, "CEP deve conter 8 dígitos (formato: XXXXX-XXX)")
    .regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido (XXXXX-XXX)")
    .refine(
      async (cep) => {
        if (!/^\d{5}-\d{3}$/.test(cep)) {
          return true;
        }
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`,
          );
          return !response.data.erro;
        } catch {
          return true;
        }
      },
      {
        message: "CEP não encontrado. Verifique e tente novamente",
      },
    ),
  enderecoResidencial: z.string().min(3, "Endereço deve ter pelo menos 3 caracteres"),
  numeroResidencial: z.string().min(1, "Número é obrigatório"),
  bairroResidencial: z.string().min(3, "Bairro deve ter pelo menos 3 caracteres"),
  cidadeResidencial: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
  estadoResidencial: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
});

type Data = z.infer<typeof schema>;

export const PersonalDataStep = () => {
  const { changeStep, updateFields } = useProfissionalRegisterStore();
  const nameId = useId();
  const birthdateId = useId();
  const cepResidencialId = useId();
  const enderecoResidencialId = useId();
  const numeroResidencialId = useId();
  const bairroResidencialId = useId();
  const cidadeResidencialId = useId();
  const estadoResidencialId = useId();

  const fieldRefs = {
    name: useRef<HTMLDivElement>(null),
    birthdate: useRef<HTMLDivElement>(null),
    cepResidencial: useRef<HTMLDivElement>(null),
    enderecoResidencial: useRef<HTMLDivElement>(null),
    numeroResidencial: useRef<HTMLDivElement>(null),
    bairroResidencial: useRef<HTMLDivElement>(null),
    cidadeResidencial: useRef<HTMLDivElement>(null),
    estadoResidencial: useRef<HTMLDivElement>(null),
  };

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
    },
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

  const onValidSubmit = async (data: Data) => {
    const submittedData = {
      ...data,
      birthdate: data.birthdate === null ? undefined : data.birthdate,
      cepResidencial: data.cepResidencial.replace("-", ""),
      numeroResidencial: data.numeroResidencial ? parseInt(data.numeroResidencial, 10) : null,
    };

    updateFields(submittedData);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("service_location");
  };

  const onInvalidSubmit = (formErrors: FieldErrors<Data>) => {
    for (const field of FIELD_ORDER) {
      if (formErrors[field]) {
        const ref = fieldRefs[field].current;
        if (ref) {
          ref.scrollIntoView({ behavior: "smooth", block: "center" });
          const input = ref.querySelector("input") as HTMLInputElement | null;
          input?.focus();
        }
        break;
      }
    }
  };

  const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit);

  const replaceName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const onlyLettersAndSpace = rawValue
      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s-]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();

    setValue("name", onlyLettersAndSpace, { shouldValidate: true });
  };

  useEffect(() => {
    if (!data) return;

    setValue("enderecoResidencial", data.logradouro);
    setValue("bairroResidencial", data.bairro);
    setValue("cidadeResidencial", data.localidade);
    setValue("estadoResidencial", data.uf);
    setValue("numeroResidencial", "");
  }, [data, setValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div ref={fieldRefs.name} className="flex flex-col gap-2">
        <label htmlFor={nameId} className={errors.name ? "text-red-600" : ""}>
          Nome Completo <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("name")}
          onChange={replaceName}
          value={nameValue}
          id={nameId}
          variant="outlined"
          placeholder="Nome e Sobrenome"
          autoComplete="name"
          helperText={errors.name?.message}
          error={!!errors.name}
          inputProps={{
            "aria-required": "true",
            ...(errors.name && { "aria-describedby": "error-prof-name" }),
          }}
          FormHelperTextProps={{ id: "error-prof-name" }}
        />
      </div>

      <div ref={fieldRefs.birthdate} className="flex flex-col gap-2">
        <label htmlFor={birthdateId} className={errors.birthdate ? "text-red-600" : ""}>
          Data de Nascimento <span className="text-red-600">*</span>
        </label>
        <DatePicker
          maxDate={dayjs()}
          minDate={dayjs().subtract(110, "year")}
          disableFuture
          slotProps={{
            textField: {
              inputProps: {
                id: birthdateId,
                placeholder: "DD/MM/AAAA",
                autoComplete: "bday",
                "aria-required": "true",
                ...(errors.birthdate && { "aria-describedby": "error-prof-birthdate" }),
              },
              helperText: errors.birthdate?.message,
              error: !!errors.birthdate,
              FormHelperTextProps: { id: "error-prof-birthdate" },
            },
          }}
          onChange={(date) =>
            setValue("birthdate", date?.toDate() as any, {
              shouldValidate: true,
            })
          }
        />
      </div>

      <div ref={fieldRefs.cepResidencial} className="flex flex-col gap-2">
        <label htmlFor={cepResidencialId} className={errors.cepResidencial ? "text-red-600" : ""}>
          CEP Residencial <span className="text-red-600">*</span>
        </label>
        <CEPField
          {...register("cepResidencial")}
          id={cepResidencialId}
          onChange={(e) => setValue("cepResidencial", e.target.value, { shouldValidate: true })}
          error={!!errors.cepResidencial}
          helperText={errors.cepResidencial?.message}
          autoComplete="postal-code"
          inputProps={{
            "aria-required": "true",
            ...(errors.cepResidencial && { "aria-describedby": "error-prof-cep" }),
          }}
          FormHelperTextProps={{ id: "error-prof-cep" }}
        />
        <div className="flex justify-end">
          <span className="cursor-pointer font-normal text-[#1D1B20] text-base underline">
            Buscar CEP
          </span>
        </div>
      </div>

      <div ref={fieldRefs.enderecoResidencial} className="flex flex-col gap-2">
        <label
          htmlFor={enderecoResidencialId}
          className={errors.enderecoResidencial ? "text-red-600" : ""}
        >
          Logradouro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("enderecoResidencial")}
          id={enderecoResidencialId}
          onChange={(e) =>
            setValue("enderecoResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          value={logradouroValue}
          variant="outlined"
          placeholder="Nome da rua / avenida, número"
          helperText={errors.enderecoResidencial?.message}
          error={!!errors.enderecoResidencial}
          inputProps={{
            "aria-required": "true",
            ...(errors.enderecoResidencial && { "aria-describedby": "error-prof-endereco" }),
          }}
          FormHelperTextProps={{ id: "error-prof-endereco" }}
        />
      </div>

      <div ref={fieldRefs.numeroResidencial} className="flex flex-col gap-2">
        <label
          htmlFor={numeroResidencialId}
          className={errors.numeroResidencial ? "text-red-600" : ""}
        >
          Número <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("numeroResidencial")}
          id={numeroResidencialId}
          value={numeroResidencialValue}
          type="number"
          variant="outlined"
          placeholder="0000"
          helperText={errors.numeroResidencial?.message}
          error={!!errors.numeroResidencial}
          inputProps={{
            "aria-required": "true",
            ...(errors.numeroResidencial && { "aria-describedby": "error-prof-numero" }),
          }}
          FormHelperTextProps={{ id: "error-prof-numero" }}
        />
      </div>

      <div ref={fieldRefs.bairroResidencial} className="flex flex-col gap-2">
        <label
          htmlFor={bairroResidencialId}
          className={errors.bairroResidencial ? "text-red-600" : ""}
        >
          Bairro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("bairroResidencial")}
          id={bairroResidencialId}
          onChange={(e) =>
            setValue("bairroResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          value={bairroValue}
          variant="outlined"
          placeholder="Nome do bairro"
          helperText={errors.bairroResidencial?.message}
          error={!!errors.bairroResidencial}
          inputProps={{
            "aria-required": "true",
            ...(errors.bairroResidencial && { "aria-describedby": "error-prof-bairro" }),
          }}
          FormHelperTextProps={{ id: "error-prof-bairro" }}
        />
      </div>

      <div ref={fieldRefs.cidadeResidencial} className="flex flex-col gap-2">
        <label
          htmlFor={cidadeResidencialId}
          className={errors.cidadeResidencial ? "text-red-600" : ""}
        >
          Cidade <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("cidadeResidencial")}
          id={cidadeResidencialId}
          onChange={(e) =>
            setValue("cidadeResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          value={cidadeValue}
          variant="outlined"
          placeholder="Nome da cidade"
          helperText={errors.cidadeResidencial?.message}
          error={!!errors.cidadeResidencial}
          inputProps={{
            "aria-required": "true",
            ...(errors.cidadeResidencial && { "aria-describedby": "error-prof-cidade" }),
          }}
          FormHelperTextProps={{ id: "error-prof-cidade" }}
        />
      </div>

      <div ref={fieldRefs.estadoResidencial} className="flex flex-col gap-2">
        <label
          htmlFor={estadoResidencialId}
          className={errors.estadoResidencial ? "text-red-600" : ""}
        >
          Estado <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("estadoResidencial")}
          id={estadoResidencialId}
          onChange={(e) =>
            setValue("estadoResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          value={estadoValue}
          variant="outlined"
          placeholder="Nome do estado"
          helperText={errors.estadoResidencial?.message}
          error={!!errors.estadoResidencial}
          inputProps={{
            "aria-required": "true",
            ...(errors.estadoResidencial && { "aria-describedby": "error-prof-estado" }),
          }}
          FormHelperTextProps={{ id: "error-prof-estado" }}
        />
      </div>

      <div className="my-6">
        <span className="font-bold text-sm">Campos Obrigatórios ( * )</span>
      </div>

      <Button type="submit" variant="contained" size="large">
        Continuar
      </Button>
    </form>
  );
};
