import { professionalFilters } from "@/types/professionalFilters";

export type FilterDialogProps = {
  open?: boolean;
  onFilterChange: (filters: professionalFilters) => void;
  onClose: () => void;
};
