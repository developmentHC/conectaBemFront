"use client";

import { Button } from "@mui/material";
import { ProfessionalCard } from "./ProfessionalCard";
import { useUserPatient } from "../hooks/useUserPatient";

export const ProfessionalSection = () => {
  const { data: patient } = useUserPatient();

  return (
    <section className="flex flex-col gap-6">
      {patient?.userSpecialities?.map((specialitie, index) => (
        <div key={`section-${specialitie.id}`} className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">{specialitie.name}</p>
            <Button className="text-button" variant="contained">
              Ver Mais
            </Button>
          </div>
          <ProfessionalCard specialization={specialitie.name} />
        </div>
      ))}
    </section>
  );
};
