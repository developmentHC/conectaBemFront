import { professionalFilters } from "@/types/professionalFilters";

export type FilterDialogProps = {
  open?: boolean;
  filters: professionalFilters;
  onFilterChange: (filters: professionalFilters) => void;
  onClose: () => void;
};
