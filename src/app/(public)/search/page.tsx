"use client";

import { IProfessional } from "@/types/professional";
import { useEffect, useState } from "react";
import { FilterDialogDesktop } from "@/features/search/components/FilterDialogDesktop";
import { FilterPanelMobile } from "@/features/search/components/FilterPanelMobile";
import { MedicalSpecialization } from "@/components/MedicalSpecialization/MedicalSpecialization";
import { FilterButton } from "@/features/search/components/FilterButton";
import { FilteredProfessionalCard } from "@/features/search/components/FilteredProfessionalCard";
import { useFilterProfessional } from "@/features/search/hooks/useFilterProfessional";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { CircularProgress } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import { professionalFilters } from "@/types/professionalFilters";

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

  // Sempre que o termo mudar, volta para página 1
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch])

  const { data: filteredProfessionals, isLoading } = useFilterProfessional({ search: debouncedSearch, page, filters });

  const onFilterChange = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (
    isFilterOpen &&
    typeof window !== "undefined" &&
    window.innerWidth < 768
  ) {
    return <FilterPanelMobile onClose={() => setIsFilterOpen(false)} onFilterChange={onFilterChange} />;
  }

  console.log(filteredProfessionals);
  
  return (
    <div className="flex flex-col gap-6 w-full">
      <SearchInput value={search} onChange={setSearch} />

      {isFilterOpen && (
        <FilterDialogDesktop
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onFilterChange={(filters) => {
            setFilters(filters);
            setIsFilterOpen(false);
          }}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Resultados</h1>
        <div className="flex gap-2">
          <FilterButton onClick={onFilterChange} />
          <MedicalSpecialization />
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {isLoading ? (
            <div className="flex justify-center mt-8">
              <CircularProgress size={75} />
            </div>
          ) : filteredProfessionals && filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional: IProfessional) => (
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
