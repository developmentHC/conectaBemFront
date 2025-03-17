"use client";

import { ProfessionalCard } from "@/components/ProfessionalCard";
import { useProfessionalFiltered } from "../hooks/useProfessionalFiltered";
import { useMemo } from "react";
import { useFilterStore } from "@/stores/filterStore";
import { filterProfessionals } from "@/utils/filterProfessionalsTeste";

export const ProfessionalSection = () => {
  const filters = useFilterStore();

  const { data: professionals } = useProfessionalFiltered();

  const filteredProfessionals = useMemo(
    () =>
      filterProfessionals(professionals, {
        specialization: filters.specializationStore,
        accessibility: filters.accessibility,
        preferences: filters.preferences,
        value: filters.value,
        distance: filters.distance || 10,
      }),
    [professionals, filters]
  );

  return (
    <div className="flex flex-col gap-4">
      {filteredProfessionals.map((professional) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}

      {filteredProfessionals.length === 0 && (
        <p className="text-gray-500 text-xl">
          Não há profissionais com o filtro selecionado. Tente modificar as
          opções.
        </p>
      )}
    </div>
  );
};
