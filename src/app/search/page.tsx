"use client";

import { SearchInput } from "@/components/SearchInput/SearchInput";
import { ProfessionalCard } from "@/features/search/components/ProfessionalCard";
import { Professional } from "@/types/professional";
import { searchAndSortProfessionals } from "@/utils/searchAndSortProfessionals";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { SpecializationTags } from "@/features/search/components/SpecializationTags";
import { FilterButton } from "@/features/search/components/FilterButton";
import { FilterPanelMobile } from "@/features/search/components/FilterPanelMobile";
import { useFilterProfessionals } from "@/features/search/hooks/useFilterProfessionals";
import { FilterDialogDesktop } from "@/features/search/components/FilterDialogDesktop";
import { useSearchStore } from "@/stores/searchStore";
import { useCategories } from "@/features/search/hooks/useCategories";
import { useProfessionalsBySpecializations } from "@/features/search/hooks/useProfessionalsBySpecializations";

export default function SearchPage() {
  const router = useRouter();

  // TODO Filtrar por categoria
  /* const searchParams = useSearchParams();
  const category = searchParams.get("category") || ""; */

  const { query: searchQuery } = useSearchStore();
  const category = "";
  const { data: specializationsList = [] } = useCategories(category);

  const { professionalsBySpecializations, isLoading } =
    useProfessionalsBySpecializations(specializationsList);

  const filterProps = useFilterProfessionals(professionalsBySpecializations);

  const searchedProfessionals = searchAndSortProfessionals(
    filterProps.filteredProfessionals,
    searchQuery
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <CircularProgress size={75} />
      </div>
    );
  }

  if (
    filterProps.isFilterOpen &&
    typeof window !== "undefined" &&
    window.innerWidth < 768
  ) {
    return <FilterPanelMobile {...filterProps} />;
  }

  return (
    <div className="flex flex-col gap-6 mb-2 overflow-hidden w-full">
      <div className="w-fit">
        <button
          className="flex items-center gap-1 text-sm"
          onClick={() => router.push("/")}
        >
          <IoMdArrowBack size={20} />
          voltar
        </button>
      </div>
      {!category && <SearchInput />}

      {filterProps.isFilterOpen && <FilterDialogDesktop {...filterProps} />}

      {!searchQuery &&
        filterProps.filteredProfessionals &&
        filterProps.filteredProfessionals.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">
              {category ? category : "Todos Profissionais"}
            </h1>
            <div className="flex gap-2">
              <FilterButton onClick={filterProps.onFilterClick} />
              <SpecializationTags
                specializations={filterProps.filters.specialization}
                specializationsList={specializationsList}
                setSpecialization={filterProps.setSpecialization}
              />
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {filterProps.filteredProfessionals
                .slice(0, 4)
                .map((professional: Professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    professional={professional}
                  />
                ))}
            </div>
          </div>
        )}

      {searchQuery && searchedProfessionals.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Resultados</h1>
          <p className="text-gray-500 text-sm">
            {searchedProfessionals.length} resultados para {searchQuery}
          </p>
          <SpecializationTags
            specializations={filterProps.filters.specialization}
            specializationsList={specializationsList}
            setSpecialization={filterProps.setSpecialization}
          />
          <div className="flex flex-col gap-4 mt-2">
            {searchedProfessionals.map((professional: Professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {searchQuery &&
            filterProps.filteredProfessionals &&
            filterProps.filteredProfessionals.length > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-semibold">Resultados</h1>
                  <FilterButton onClick={filterProps.onFilterClick} />
                </div>
                {Object.values(filterProps.filters).some((value) =>
                  Array.isArray(value) ? value.length > 0 : !!value
                ) ? (
                  <p className="text-xl text-gray-500">
                    Não encontramos resultados para “{searchQuery}” com os
                    filtros selecionados, tente modificar as palavras da busca
                    ou os filtros.
                  </p>
                ) : (
                  <p className="text-xl text-gray-500">
                    Não encontramos resultados para “{searchQuery}”, tente
                    modificar as palavras da busca.
                  </p>
                )}

                <h2 className="text-xl">Similares</h2>
                <div className="flex flex-col gap-4">
                  {filterProps.filteredProfessionals
                    .slice(0, 4)
                    .map((professional: Professional) => (
                      <ProfessionalCard
                        key={professional.id}
                        professional={professional}
                      />
                    ))}
                </div>
              </>
            )}
        </div>
      )}

      {filterProps.filteredProfessionals &&
        filterProps.filteredProfessionals.length === 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">
              {category ? category : "Todos Profissionais"}
            </h1>
            <div className="flex gap-2">
              <FilterButton onClick={filterProps.onFilterClick} />
              <SpecializationTags
                specializations={filterProps.filters.specialization}
                specializationsList={specializationsList}
                setSpecialization={filterProps.setSpecialization}
              />
            </div>
            <p className="text-xl text-gray-500">
              Não há profissionais com o filtro selecionado. Tente modificar as
              opções.
            </p>
            <h2 className="text-xl">Similares</h2>
            <div className="flex flex-col gap-4 mt-2">
              {(professionalsBySpecializations ?? [])
                .slice(0, 4)
                .map((professional: Professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    professional={professional}
                  />
                ))}
            </div>
          </div>
        )}
    </div>
  );
}
