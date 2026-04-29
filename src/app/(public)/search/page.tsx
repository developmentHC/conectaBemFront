"use client";

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { MedicalSpecialization } from "@/components/MedicalSpecialization/MedicalSpecialization";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { FilterButton } from "@/features/search/components/FilterButton";
import { FilterDialogDesktop } from "@/features/search/components/FilterDialogDesktop";
import { FilteredProfessionalCard } from "@/features/search/components/FilteredProfessionalCard";
import { FilterPanelMobile } from "@/features/search/components/FilterPanelMobile";
import { useFilterProfessional } from "@/features/search/hooks/useFilterProfessional";
import { useFilters } from "@/hooks/useFilters";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { IProfessional } from "@/types/professional";

function SearchPage() {
  const isMobile = useIsMobile();
  const { filters, handleApplyFilters, handleClearFilters } = useFilters();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: professionals,
    isLoading,
    isError,
    pageCount,
  } = useFilterProfessional({
    filters,
    page,
    searchTerm: activeSearch,
  });

  const onFilterChange = () => setIsFilterOpen((prev) => !prev);

  const handleApplyAndClose = (next: Parameters<typeof handleApplyFilters>[0]) => {
    handleApplyFilters(next);
    setPage(1);
  };

  const handleClearAndReset = () => {
    handleClearFilters();
    setPage(1);
  };

  if (isFilterOpen && isMobile) {
    return <FilterPanelMobile onFilterChange={onFilterChange} />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={(term) => {
          setActiveSearch(term);
          setPage(1);
        }}
      />

      {isFilterOpen && (
        <FilterDialogDesktop
          key={String(isFilterOpen)}
          open={isFilterOpen}
          onFilterChange={onFilterChange}
          onApply={handleApplyAndClose}
          onClear={handleClearAndReset}
          initialFilters={filters}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Resultados</h1>
        <div className="flex gap-2">
          <FilterButton onClick={onFilterChange} />
          <MedicalSpecialization />
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <CircularProgress size={75} />
          </div>
        )}

        {isError && !isLoading && (
          <p className="text-center text-gray-500">Erro ao carregar profissionais.</p>
        )}

        {!isLoading && (
          <div className="mt-2 flex flex-col gap-4">
            {professionals.map((professional: IProfessional) => (
              <FilteredProfessionalCard key={professional.id} professional={professional} />
            ))}
            {professionals.length === 0 && (
              <p className="text-center text-gray-500">Nenhum profissional encontrado.</p>
            )}
          </div>
        )}

        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              className="rounded-md border border-secondary-500 px-4 py-2 text-sm disabled:opacity-40"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="text-sm">
              Página {page} de {pageCount}
            </span>
            <button
              type="button"
              className="rounded-md border border-secondary-500 px-4 py-2 text-sm disabled:opacity-40"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
