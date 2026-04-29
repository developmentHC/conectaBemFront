"use client";

import { useProfessionalBySpeciality } from "../hooks/useProfessionalBySpeciality";
import { useUserPatient } from "../hooks/useUserPatient";
import { ProfessionalCard } from "./ProfessionalCard";

type Speciality = { id: number; name: string };

const SpecialitySectionItem = ({ speciality }: { speciality: Speciality }) => {
  const { data, isLoading, isError } = useProfessionalBySpeciality(speciality.name, 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl">{speciality.name}</p>
        <div className="cursor-pointer font-semibold underline decoration-2 underline-offset-4">
          + Ver Mais
        </div>
      </div>
      <ProfessionalCard professionals={data} isLoading={isLoading} isError={isError} />
    </div>
  );
};

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
        <SpecialitySectionItem key={`section-${specialitie.id}`} speciality={specialitie} />
      ))}
    </section>
  );
};
