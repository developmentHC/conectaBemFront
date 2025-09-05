"use client";

import { ProfessionalCard } from "./ProfessionalCard";
import { useUserPatient } from "../hooks/useUserPatient";

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
            <p className="text-2xl font-semibold">{specialitie.name}</p>
            <div className="font-semibold decoration-2 underline underline-offset-4 cursor-pointer">
              + Ver Mais
            </div>
          </div>
          <ProfessionalCard specialization={specialitie.name} />
        </div>
      ))}
    </section>
  );
};
