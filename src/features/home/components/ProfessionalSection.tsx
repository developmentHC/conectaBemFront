"use client";

import { useUserPatient } from "../hooks/useUserPatient";
import { ProfessionalCard } from "./ProfessionalCard";

export const ProfessionalSection = () => {
  const { data: patient } = useUserPatient();

  const fallbackSpecialities = [
    { id: 1, name: "Acupuntura" },
    { id: 2, name: "Reiki" },
  ];

  const specialitiesToMap =
    patient?.userSpecialities && patient.userSpecialities.length > 0
      ? patient.userSpecialities
      : fallbackSpecialities;

  return (
    <section className="flex flex-col gap-6">
      {specialitiesToMap?.map((specialitie) => (
        <div key={`section-${specialitie.id}`} className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-2xl">{specialitie.name}</p>
            <div className="cursor-pointer font-semibold underline decoration-2 underline-offset-4">
              + Ver Mais
            </div>
          </div>
          <ProfessionalCard specialization={specialitie.name} />
        </div>
      ))}
    </section>
  );
};
