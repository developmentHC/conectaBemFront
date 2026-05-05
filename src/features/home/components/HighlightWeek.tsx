"use client";

import { useState } from "react";
import { useHighlightWeek } from "../hooks/useHighlightWeek";
import { ProfessionalCard } from "./ProfessionalCard";

export const HighlightWeek = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, pageCount } = useHighlightWeek(page);
  const hasMore = page < pageCount;
  const canGoBack = page > 1;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl">Destaques da semana</p>
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
    </section>
  );
};
