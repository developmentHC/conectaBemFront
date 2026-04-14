"use client";

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { MedicalSpecialization } from "@/components/MedicalSpecialization/MedicalSpecialization";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { FilterButton } from "@/features/search/components/FilterButton";
import { FilterDialogDesktop } from "@/features/search/components/FilterDialogDesktop";
import { FilteredProfessionalCard } from "@/features/search/components/FilteredProfessionalCard";
import { FilterPanelMobile } from "@/features/search/components/FilterPanelMobile";
import type { FiltersState } from "@/features/search/components/types";
import { useFilterProfessional } from "@/features/search/hooks/useFilterProfessional";
import type { IProfessional } from "@/types/professional";
import { useIsMobile } from "@/hooks/useIsMobile";

function SearchPage() {
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const defaultFilters: FiltersState = {
    specialties: [],
    availability: [],
    value: [],
    accessibility: [],
    services: [],
    distance: 12,
  };
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const { data: filteredProfessionals, isLoading } = useFilterProfessional();

  const onFilterChange = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleApplyFilters = (next: FiltersState) => {
    setFilters(next);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  if (isFilterOpen && isMobile) {
    return <FilterPanelMobile onFilterChange={onFilterChange} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <CircularProgress size={75} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <SearchInput />

      {isFilterOpen && (
        <FilterDialogDesktop
          open={isFilterOpen}
          onFilterChange={onFilterChange}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          initialFilters={filters}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Resultados</h1>
        <div className="flex gap-2">
          <FilterButton onClick={onFilterChange} />
          <MedicalSpecialization />
        </div>

        <div className="mt-2 flex flex-col gap-4">
          {filteredProfessionals?.slice(0, 4).map((professional: IProfessional) => (
            <FilteredProfessionalCard key={professional.id} professional={professional} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
