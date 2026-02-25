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

const applyFilters = (
  professionals: IProfessional[],
  filters: professionalFilters
) => {
  return professionals.filter((p) => {
    if (
      filters.services.length &&
      !filters.services.some((s) => p.professionalSpecialties?.includes(s))
    ) {
      return false;
    }

    if (
      filters.accessibility.length &&
      !filters.accessibility.some((a) =>
        p.accessibility?.includes(a)
      )
    ) {
      return false;
    }

    if (
      filters.payments.length &&
      !filters.payments.some((pay) =>
        p.payments?.includes(pay)
      )
    ) {
      return false;
    }

    if (
      filters.values.length &&
      !filters.values.includes(p.priceRange)
    ) {
      return false;
    }

    if (filters.distance && p.distance > filters.distance) {
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
    values: [],
    accessibility: [],
    services: [],
    payments: [],
    distance: 0,
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
        onFilterChange={onFilterChange}
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
            setFilters(newFilters);
            setIsFilterOpen(false);
          }}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Resultados</h1>

        <div className="flex gap-2">
          <FilterButton onClick={onFilterChange} />
          <MedicalSpecialization
              selectedSpecializations={filters.services}
              onToggleSpecialization={(name) => {
                setFilters((prev) => {
                  const alreadySelected = prev.services.includes(name);
                  const updatedServices = alreadySelected
                    ? prev.services.filter((s) => s !== name) 
                    : [...prev.services, name];

                  return { ...prev, services: updatedServices };
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
