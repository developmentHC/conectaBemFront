export type FiltersState = {
  specialties: string[];
  availability: string[];
  value: string[];
  accessibility: string[];
  services: string[];
  distance: number;
};

export type FilterDialogProps = {
  open?: boolean;
  onFilterChange: () => void;
  onApply?: (filters: FiltersState) => void;
  onClear?: () => void;
  initialFilters?: FiltersState;
};
