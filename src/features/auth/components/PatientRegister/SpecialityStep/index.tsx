"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePatientRegisterStore } from "../usePatientRegisterStore";
import { ServicesSelection } from "./ServicesSelection";
import { SpecialitiesSelection } from "./SpecialitiesSelection";

type Data = z.infer<typeof schema>;

const schema = z.object({
  specialties: z.array(z.string()).min(1, "Selecione pelo menos uma especialidade"),
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
        <label className="w-full font-semibold text-xl">
          Especialidades <span className="text-red-600">*</span>
        </label>

        <SpecialitiesSelection
          onChange={(selecteds) => setValue("specialties", selecteds)}
          selecteds={selectedSpecialties}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="w-full font-semibold text-xl">Atendimento</label>
        <p className="opacity-80">Escolha as preferências de atendimento</p>

        <ServicesSelection
          onChange={(value) => setValue("servicePreferences", value)}
          selecteds={selectedServices}
        />
      </div>

      <Button className="text-button" variant="contained" type="submit">
        Continuar
      </Button>
    </form>
  );
};
