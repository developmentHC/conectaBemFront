import { useState } from "react";
import type { FiltersState } from "@/features/search/components/types";

export const defaultFilters: FiltersState = {
  specialties: [],
  availability: [],
  value: [],
  accessibility: [],
  services: [],
  distance: 12,
};

export function useFilters() {
  const [filters, setFilters] = useState<FiltersState>({ ...defaultFilters });

  const handleApplyFilters = (next: FiltersState) => setFilters(next);
  const handleClearFilters = () => setFilters({ ...defaultFilters });

  return {
    filters,
    handleApplyFilters,
    handleClearFilters,
  };
}
