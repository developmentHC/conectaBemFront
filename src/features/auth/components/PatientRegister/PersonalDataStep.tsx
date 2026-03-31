import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useId, useRef, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { CEPField } from "@/components/Fields/CEPField";
import { useCEP } from "../../hooks/useCEP";
import { usePatientRegisterStore } from "./usePatientRegisterStore";

const schema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .regex(
      /^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$/,
      "O nome deve conter apenas letras e um espaço entre as palavras",
    ),
  birthdayDate: z
    .instanceof(Date, { message: "Data de nascimento é obrigatória" })
    .refine(
      (date) => {
        const min = dayjs().subtract(110, "years").toDate();
        return date >= min;
      },
      {
        message: "Digite uma data de nascimento válida",
      },
    )
    .refine(
      (date) => {
        const max = dayjs().subtract(18, "years").toDate();
        return date <= max;
      },
      {
        message: "Você deve ser maior de idade para se cadastrar na plataforma!",
      },
    ),
  cepResidencial: z
    .string()
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
          return false;
        }
      },
      {
        message: "CEP não encontrado. Verifique e tente novamente",
      },
    ),
  enderecoResidencial: z.string().min(3, "Logradouro deve ter pelo menos 3 caracteres"),
  numeroResidencial: z.string().min(1, "Número é obrigatório"),
  bairroResidencial: z.string().min(3, "Bairro deve ter pelo menos 3 caracteres"),
  cidadeResidencial: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
  estadoResidencial: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
});

type Data = z.infer<typeof schema>;

export const PersonalDataStep = () => {
  const { updateFields, changeStep } = usePatientRegisterStore();
  const [nameInput, setNameInput] = useState("");
  const nameId = useId();

  const fieldRefs = {
    name: useRef<HTMLDivElement | null>(null),
    birthdayDate: useRef<HTMLDivElement | null>(null),
    cepResidencial: useRef<HTMLDivElement | null>(null),
    enderecoResidencial: useRef<HTMLDivElement | null>(null),
    numeroResidencial: useRef<HTMLDivElement | null>(null),
    bairroResidencial: useRef<HTMLDivElement | null>(null),
    cidadeResidencial: useRef<HTMLDivElement | null>(null),
    estadoResidencial: useRef<HTMLDivElement | null>(null),
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
  });

  useEffect(() => {
    register("name");
  }, [register]);

  const cepValue = watch("cepResidencial");
  const shouldFetchCep = cepValue?.replace(/\D/g, "").length === 8;

  const { data } = useCEP({
    cep: shouldFetchCep ? cepValue : "",
  });

  const onValidSubmit = async (data: Data) => {
    data.cepResidencial = data.cepResidencial.replace("-", "");

    updateFields({
      birthdayDate: data.birthdayDate,
    });

    updateFields(data);

    changeStep("specialties");
  };

  const onInvalidSubmit = (formErrors: FieldErrors<Data>) => {
    // ordem dos campos para scrollar para o erro mais superior
    const orderedFields: (keyof Data)[] = [
      "name",
      "birthdayDate",
      "cepResidencial",
      "enderecoResidencial",
      "numeroResidencial",
      "bairroResidencial",
      "cidadeResidencial",
      "estadoResidencial",
    ];

    for (const field of orderedFields) {
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
      .replace(/[^A-Za-zÀ-ú\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();

    setValue("name", onlyLettersAndSpace, { shouldValidate: true });
    setNameInput(onlyLettersAndSpace);
  };

  useEffect(() => {
    if (!data) return;

    setValue("enderecoResidencial", data.logradouro || "", {
      shouldValidate: true,
    });
    setValue("bairroResidencial", data.bairro || "", {
      shouldValidate: true,
    });
    setValue("cidadeResidencial", data.localidade || "", {
      shouldValidate: true,
    });
    setValue("estadoResidencial", data.estado || data.uf || "", {
      shouldValidate: true,
    });
  }, [data, setValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Nome */}
      <div ref={fieldRefs.name} className="flex flex-col gap-2">
        <label className={errors.name ? "text-red-600" : ""}>
          Nome <span className="text-red-600">*</span>
        </label>

        <TextField
          {...register("name")}
          onChange={replaceName}
          placeholder="Nome e Sobrenome"
          id={nameId}
          value={nameInput}
          required
          autoComplete="name"
          helperText={errors.name?.message}
          error={!!errors.name}
          inputProps={{ "aria-required": "true", "aria-describedby": "error-name" }}
          FormHelperTextProps={{ id: "error-name" }}
        />
      </div>

      {/* Data de nascimento */}
      <div ref={fieldRefs.birthdayDate} className="flex flex-col gap-2">
        <label className={errors.birthdayDate ? "text-red-600" : ""}>
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
                autoComplete: "bday",
                "aria-required": "true",
                "aria-describedby": "error-birthdate",
              },
              helperText: errors.birthdayDate?.message,
              error: !!errors.birthdayDate,
              required: true,
              FormHelperTextProps: { id: "error-birthdate" },
            },
          }}
          onChange={(date) =>
            setValue("birthdayDate", date?.toDate() as any, {
              shouldValidate: true,
            })
          }
        />
      </div>

      {/* CEP */}
      <div ref={fieldRefs.cepResidencial} className="flex flex-col gap-2">
        <label className={errors.cepResidencial ? "text-red-600" : ""}>
          CEP Residencial <span className="text-red-600">*</span>
        </label>
        <CEPField
          {...register("cepResidencial")}
          onChange={(e) =>
            setValue("cepResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          helperText={errors.cepResidencial?.message}
          error={!!errors.cepResidencial}
          autoComplete="postal-code"
          inputProps={{ "aria-required": "true", "aria-describedby": "error-cep" }}
          FormHelperTextProps={{ id: "error-cep" }}
        />
      </div>

      {/* Logradouro */}
      <div ref={fieldRefs.enderecoResidencial} className="flex flex-col gap-2">
        <label className={errors.enderecoResidencial ? "text-red-600" : ""}>
          Logradouro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("enderecoResidencial")}
          onChange={(e) =>
            setValue("enderecoResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          placeholder="Nome da rua / avenida"
          error={!!errors.enderecoResidencial}
          helperText={errors.enderecoResidencial?.message}
          inputProps={{ "aria-required": "true", "aria-describedby": "error-endereco" }}
          FormHelperTextProps={{ id: "error-endereco" }}
        />
      </div>

      {/* Número */}
      <div ref={fieldRefs.numeroResidencial} className="flex flex-col gap-2">
        <label className={errors.numeroResidencial ? "text-red-600" : ""}>
          Número <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("numeroResidencial")}
          placeholder="0000"
          error={!!errors.numeroResidencial}
          helperText={errors.numeroResidencial?.message}
          inputProps={{ "aria-required": "true", "aria-describedby": "error-numero" }}
          FormHelperTextProps={{ id: "error-numero" }}
        />
      </div>

      {/* Bairro */}
      <div ref={fieldRefs.bairroResidencial} className="flex flex-col gap-2">
        <label className={errors.bairroResidencial ? "text-red-600" : ""}>
          Bairro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("bairroResidencial")}
          onChange={(e) =>
            setValue("bairroResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          placeholder="Nome do bairro"
          error={!!errors.bairroResidencial}
          helperText={errors.bairroResidencial?.message}
          inputProps={{ "aria-required": "true", "aria-describedby": "error-bairro" }}
          FormHelperTextProps={{ id: "error-bairro" }}
        />
      </div>

      {/* Cidade */}
      <div ref={fieldRefs.cidadeResidencial} className="flex flex-col gap-2">
        <label className={errors.cidadeResidencial ? "text-red-600" : ""}>
          Cidade <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("cidadeResidencial")}
          onChange={(e) =>
            setValue("cidadeResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          placeholder="Nome da cidade"
          error={!!errors.cidadeResidencial}
          helperText={errors.cidadeResidencial?.message}
          inputProps={{ "aria-required": "true", "aria-describedby": "error-cidade" }}
          FormHelperTextProps={{ id: "error-cidade" }}
        />
      </div>

      {/* Estado */}
      <div ref={fieldRefs.estadoResidencial} className="flex flex-col gap-2">
        <label className={errors.estadoResidencial ? "text-red-600" : ""}>
          Estado <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("estadoResidencial")}
          onChange={(e) =>
            setValue("estadoResidencial", e.target.value, {
              shouldValidate: true,
            })
          }
          placeholder="Nome do estado"
          error={!!errors.estadoResidencial}
          helperText={errors.estadoResidencial?.message}
          inputProps={{ "aria-required": "true", "aria-describedby": "error-estado" }}
          FormHelperTextProps={{ id: "error-estado" }}
        />
      </div>

      <p className="text-gray-500 text-xs">
        Campos Obrigatórios (<span>*</span>)
      </p>

      <Button className="text-button" variant="contained" type="submit">
        Continuar
      </Button>

      <div className="mb-12" />
    </form>
  );
};
