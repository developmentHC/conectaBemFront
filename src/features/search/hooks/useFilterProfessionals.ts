import { useState, useMemo } from "react";
import { Professional } from "@/types/professional";
import { filterProfessionals } from "@/utils/filterProfessionalsForSearch";
import { FilterProps } from "@/types/filter";

export const useFilterProfessionals = (
  professionals: Professional[] | undefined
) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const onFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const [filters, setFilters] = useState<FilterProps>({
    specialization: [],
    price: "",
    acessibility: [],
    service: [],
    maxDistance: undefined,
  });

  const setSpecialization = (specialization: string[]) => {
    setFilters((prev) => ({ ...prev, specialization }));
  };

  const setPrice = (price: string) => {
    setFilters((prev) => ({ ...prev, price }));
  };

  const setAccessibility = (acessibility: string[]) => {
    setFilters((prev) => ({ ...prev, acessibility }));
  };

  const setService = (service: string[]) => {
    setFilters((prev) => ({ ...prev, service }));
  };

  const setMaxDistance = (maxDistance: number) => {
    setFilters((prev) => ({ ...prev, maxDistance }));
  };

  const filteredProfessionals = useMemo(() => {
    const isEmptyFilters =
      (!filters.specialization || filters.specialization.length === 0) &&
      !filters.price &&
      (!filters.acessibility || filters.acessibility.length === 0) &&
      (!filters.service || filters.service.length === 0) &&
      (filters.maxDistance === undefined || filters.maxDistance === null);

    if (isEmptyFilters) {
      return professionals;
    }

    return filterProfessionals(professionals, filters);
  }, [professionals, filters]);

  return {
    isFilterOpen,
    onFilterClick,
    filters,
    setPrice,
    setSpecialization,
    setAccessibility,
    setService,
    setMaxDistance,
    filteredProfessionals,
  };
};
