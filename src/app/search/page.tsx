"use client";

import { IProfessional } from "@/types/professional";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { FilterDialogDesktop } from "@/features/search/components/FilterDialogDesktop";
import { FilterPanelMobile } from "@/features/search/components/FilterPanelMobile";
import { MedicalSpecialization } from "@/components/MedicalSpecialization/MedicalSpecialization";
import { FilterButton } from "@/features/search/components/FilterButton";
import { FilteredProfessionalCard } from "@/features/search/components/FilteredProfessionalCard";
import { useFilterProfessional } from "@/features/search/hooks/useFilterProfessional";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { CircularProgress } from "@mui/material";

function SearchPage() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: filteredProfessionals, isLoading } = useFilterProfessional();

  const onFilterChange = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (
    isFilterOpen &&
    typeof window !== "undefined" &&
    window.innerWidth < 768
  ) {
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
    <div className="flex flex-col gap-6 w-full">
      <SearchInput />

      {isFilterOpen && (
        <FilterDialogDesktop
          open={isFilterOpen}
          onFilterChange={onFilterChange}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Resultados</h1>
        <div className="flex gap-2">
          <FilterButton onClick={onFilterChange} />
          <MedicalSpecialization />
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {filteredProfessionals
            ?.slice(0, 4)
            .map((professional: IProfessional) => (
              <FilteredProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
