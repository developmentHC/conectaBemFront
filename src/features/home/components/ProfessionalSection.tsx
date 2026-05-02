"use client";

import { useState } from "react";
import { useProfessionalBySpeciality } from "../hooks/useProfessionalBySpeciality";
import { useUserPatient } from "../hooks/useUserPatient";
import { ProfessionalCard } from "./ProfessionalCard";

type Speciality = { id: number; name: string };

const SpecialitySectionItem = ({ speciality }: { speciality: Speciality }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, pageCount } = useProfessionalBySpeciality(
    speciality.name,
    page,
  );
  const hasMore = page < pageCount;
  const canGoBack = page > 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl">{speciality.name}</p>
        <div className="flex items-center gap-3">
          {canGoBack && (
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="cursor-pointer font-semibold underline decoration-2 underline-offset-4"
            >
              Anterior
            </button>
          )}
          {hasMore && (
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="cursor-pointer font-semibold underline decoration-2 underline-offset-4"
            >
              + Ver Mais
            </button>
          )}
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
