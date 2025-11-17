import { CEPField } from "@/components/Fields/CEPField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { usePatientRegisterStore } from "./usePatientRegisterStore";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useCEP } from "../../hooks/useCEP";
import axios from "axios";

const schema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .regex(
      /^[A-Za-zÀ-ú]+(?: [A-Za-zÀ-ú]+)*$/,
      "O nome deve conter apenas letras e um espaço entre as palavras"
    ),
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
          return false;
        }
      },
      {
        message: "CEP não encontrado",
      }
    ),
  enderecoResidencial: z.string().min(3, "Endereço inválido"),
  numeroResidencial: z.string().min(1, "Número inválido"),
  bairroResidencial: z.string().min(3, "Bairro inválido"),
  cidadeResidencial: z.string().min(3, "Cidade inválida"),
  estadoResidencial: z.string().min(2, "Estado inválido"),
});

type Data = z.infer<typeof schema>;

export const PersonalDataStep = () => {
  const { updateFields, changeStep } = usePatientRegisterStore();
  const [nameInput, setNameInput] = useState("");

  // refs para scrollar até o primeiro erro
  const fieldRefs = {
    name: useRef<HTMLDivElement | null>(null),
    birthdate: useRef<HTMLDivElement | null>(null),
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

  const cepValue = watch("cepResidencial");
  const shouldFetchCep = cepValue?.replace(/\D/g, "").length === 8;

  const { data } = useCEP({
    cep: shouldFetchCep ? cepValue : "",
  });

  const onValidSubmit = async (data: Data) => {
    data.cepResidencial = data.cepResidencial.replace("-", "");

    updateFields({
      birthdayDate: data.birthdate,
    });

    updateFields(data);

    changeStep("specialties");
  };

  const onInvalidSubmit = (formErrors: FieldErrors<Data>) => {
    // ordem dos campos para scrollar para o erro mais superior
    const orderedFields: (keyof Data)[] = [
      "name",
      "birthdate",
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
          id="name"
          value={nameInput}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </div>

      {/* Data de nascimento */}
      <div ref={fieldRefs.birthdate} className="flex flex-col gap-2">
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
        />
      </div>

      {/* Logradouro */}
      <div ref={fieldRefs.enderecoResidencial} className="flex flex-col gap-2">
        <label className={errors.enderecoResidencial ? "text-red-600" : ""}>
          Logradouro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("enderecoResidencial")}
          placeholder="Nome da rua / avenida"
          error={!!errors.enderecoResidencial}
          helperText={errors.enderecoResidencial?.message}
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
        />
      </div>

      {/* Bairro */}
      <div ref={fieldRefs.bairroResidencial} className="flex flex-col gap-2">
        <label className={errors.bairroResidencial ? "text-red-600" : ""}>
          Bairro <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("bairroResidencial")}
          placeholder="Nome do bairro"
          error={!!errors.bairroResidencial}
          helperText={errors.bairroResidencial?.message}
        />
      </div>

      {/* Cidade */}
      <div ref={fieldRefs.cidadeResidencial} className="flex flex-col gap-2">
        <label className={errors.cidadeResidencial ? "text-red-600" : ""}>
          Cidade <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("cidadeResidencial")}
          placeholder="Nome da cidade"
          error={!!errors.cidadeResidencial}
          helperText={errors.cidadeResidencial?.message}
        />
      </div>

      {/* Estado */}
      <div ref={fieldRefs.estadoResidencial} className="flex flex-col gap-2">
        <label className={errors.estadoResidencial ? "text-red-600" : ""}>
          Estado <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("estadoResidencial")}
          placeholder="Nome do estado"
          error={!!errors.estadoResidencial}
          helperText={errors.estadoResidencial?.message}
        />
      </div>

      <p className="text-xs text-gray-500">
        Campos Obrigatórios (<span>*</span>)
      </p>

      <Button className="text-button" variant="contained" type="submit">
        Continuar
      </Button>

      <div className="mb-12" />
    </form>
  );
};
