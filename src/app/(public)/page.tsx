"use client";

import Image from "next/image";
import { useState } from "react";
import { MedicalSpecialization } from "@/components/MedicalSpecialization/MedicalSpecialization";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { HighlightWeek } from "@/features/home/components/HighlightWeek";
import { PersonalAddress } from "@/features/home/components/PersonalAddress";
import { ProfessionalSection } from "@/features/home/components/ProfessionalSection";
import { FilterButton } from "@/features/search/components/FilterButton";
import { FilterDialogDesktop } from "@/features/search/components/FilterDialogDesktop";
import { FilterPanelMobile } from "@/features/search/components/FilterPanelMobile";
import type { FiltersState } from "@/features/search/components/types";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HomePage() {
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
  const isMobile = useIsMobile();

  const onFilterChange = () => {
    setIsFilterOpen((prev) => !prev);
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

  return (
    <main className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <PersonalAddress />
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:max-w-[60%] lg:w-full lg:max-w-[50%]">
              <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                Conecta Bem: <br /> O cuidado que acolhe.
              </h1>
              <span className="lg:text-3xl">
                Encontre os melhores profissionais de terapias alternativas para você!
              </span>
            </div>
            <div className="hidden w-full justify-end md:flex">
              <Image
                className="h-full max-h-[268px] w-full max-w-[1000px] rounded-xl object-contain"
                alt="logo"
                src="/images/imageHeader.jpg"
                width={1000}
                height={250}
              />
            </div>
          </div>
          <div className="flex w-full max-w-[1336px] flex-col items-center gap-10 self-stretch">
            <SearchInput />
            <div className="flex flex-wrap items-center justify-center md:mx-auto md:w-4/5">
              <FilterButton onClick={onFilterChange} />
              <MedicalSpecialization />
            </div>
          </div>
        </div>
      </section>
      <HighlightWeek />

      <ProfessionalSection />

      {isFilterOpen && (
        <FilterDialogDesktop
          open={isFilterOpen}
          onFilterChange={onFilterChange}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          initialFilters={filters}
        />
      )}
    </main>
  );
}
