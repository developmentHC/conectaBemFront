"use client";

import { IProfessional } from "@/types/professional";
import { professionalFilters } from "@/types/professionalFilters";
import { useEffect, useMemo, useState } from "react";

import { FilterDialogDesktop } from "@/features/search/components/FilterDialogDesktop";
import { FilterPanelMobile } from "@/features/search/components/FilterPanelMobile";
import { MedicalSpecialization } from "@/components/MedicalSpecialization/MedicalSpecialization";
import { FilterButton } from "@/features/search/components/FilterButton";
import { FilteredProfessionalCard } from "@/features/search/components/FilteredProfessionalCard";
import { useFilterProfessional } from "@/features/search/hooks/useFilterProfessional";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { CircularProgress } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import { normalizeProfessionalFilter } from '@/utils/normalizeProfessionalFilter';

const applyFilters = (
  professionals: IProfessional[],
  filters: professionalFilters
) => {
  return professionals.filter((p) => {
    const normalized = normalizeProfessionalFilter(p);

      if (
        filters.specialty.length &&
        !filters.specialty.some(s =>
          normalized.specialties.includes(s.toLowerCase())
      )
    ) {
    return false;
  }

  if (
      filters.services.length &&
      !filters.services.some(s => 
        normalized.services?.includes(s.toLowerCase())
      )
    ) {
      return false;
    }

  if (
    filters.accessibility.length &&
    !filters.accessibility.some(a =>
      normalized.accessibility.includes(a.toLowerCase())
    )
  ) {
    return false;
  }

  if (
    filters.payments.length &&
    !filters.payments.some(pay =>
      normalized.payments.includes(pay.toLowerCase())
    )
  ) {
    return false;
  }

  if (
     filters.values.length &&
     (!normalized.priceRange || !filters.values.includes(normalized.priceRange))
  ) {
    return false;
  }
    return true;
  });
};

function SearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const [filters, setFilters] = useState<professionalFilters>({
    specialty: [],
    values: [],
    accessibility: [],
    services: [],
    payments: [],
    distance: [],
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data: professionals, isLoading } = useFilterProfessional({
    search: debouncedSearch,
    page,
    filters,
  });

  const filteredProfessionals = useMemo(() => {
    if (!professionals) return [];
    return applyFilters(professionals, filters);
  }, [professionals, filters]);

  const onFilterChange = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (
    isFilterOpen &&
    typeof window !== "undefined" &&
    window.innerWidth < 768
  ) {
    return (
      <FilterPanelMobile
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setIsFilterOpen(false);
        }}
        filters={filters}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <SearchInput value={search} onChange={setSearch} />

      {isFilterOpen && (
        <FilterDialogDesktop
          open={isFilterOpen}
          filters={filters}
          onClose={() => setIsFilterOpen(false)}
          onFilterChange={(newFilters) => {
            console.log("ANTES DE SETAR:", newFilters.services);
            setFilters({
              specialty: newFilters.specialty ?? [],
              values: newFilters.values ?? [],
              accessibility: newFilters.accessibility ?? [],
              services: newFilters.services ?? [],
              payments: newFilters.payments ?? [],
              distance: newFilters.distance ?? [],
            });
            setIsFilterOpen(false);
          }}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Resultados</h1>

        <div className="flex gap-2">
          <FilterButton onClick={onFilterChange} />
          <MedicalSpecialization
              selectedSpecializations={filters.specialty}
              onToggleSpecialization={(name) => {
                setFilters((prev) => {
                  const alreadySelected = prev.specialty.includes(name);
                  const updatedServices = alreadySelected
                    ? prev.specialty.filter((s) => s !== name) 
                    : [...prev.specialty, name];

                  return { ...prev, specialty: updatedServices };
                });
              }}
            />
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {isLoading ? (
            <div className="flex justify-center mt-8">
              <CircularProgress size={75} />
            </div>
          ) : filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <FilteredProfessionalCard
                key={professional._id}
                professional={professional}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-8 text-center bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300">
              <p className="text-lg font-medium text-gray-700">
                Nenhum resultado encontrado
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
