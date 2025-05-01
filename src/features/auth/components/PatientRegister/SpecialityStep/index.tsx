"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePatientRegisterStore } from "../usePatientRegisterStore";
import { Button } from "@mui/material";
import { SpecialitiesSelection } from "./SpecialitiesSelection";
import { ServicesSelection } from "./ServicesSelection";

type Data = z.infer<typeof schema>;

const schema = z.object({
  specialties: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma especialidade"),
  servicePreferences: z.array(z.string()),
});

export const SpecialtyStep = () => {
  const { setValue, handleSubmit, watch } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { specialties: [], servicePreferences: [] },
  });

  const { changeStep, updateFields } = usePatientRegisterStore();

  const selectedSpecialties = watch("specialties");
  const selectedServices = watch("servicePreferences");

  const onSubmit = handleSubmit(async (data: Data) => {
    updateFields(data as any);

    window.scrollTo({ top: 0, behavior: "smooth" });

    changeStep("accessibility");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold w-full">
          Especialidades <span className="text-red-600">*</span>
        </label>

        <SpecialitiesSelection
          onChange={(selecteds) => setValue("specialties", selecteds)}
          selecteds={selectedSpecialties}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold w-full">Atendimento</label>
        <p className="opacity-80">
          Escolha as opções que você e seu estabelecimento fornecem suporte
        </p>

        <ServicesSelection
          onChange={(value) => setValue("servicePreferences", value)}
          selecteds={selectedServices}
        />
      </div>

      <Button
        disabled={!selectedSpecialties.length}
        className="text-button"
        variant="contained"
        type="submit"
      >
        Continuar
      </Button>
    </form>
  );
};
