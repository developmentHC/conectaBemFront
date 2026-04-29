"use client";

import { useHighlightWeek } from "../hooks/useHighlightWeek";
import { ProfessionalCard } from "./ProfessionalCard";

export const HighlightWeek = () => {
  const { data, isLoading, isError } = useHighlightWeek(1);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl">Destaques da semana</p>
        <div className="cursor-pointer font-semibold underline decoration-2 underline-offset-4">
          + Ver Mais
        </div>
      </div>
      <ProfessionalCard professionals={data} isLoading={isLoading} isError={isError} />
    </section>
  );
};
