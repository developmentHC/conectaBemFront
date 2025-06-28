import { FilterProps } from "@/types/filter";

export type FilterDialogProps = {
  onFilterClick: () => void;
  filters: FilterProps;
  setPrice: (price: string) => void;
  setAccessibility: (accessibility: string[]) => void;
  setService: (service: string[]) => void;
  setMaxDistance: (distance: number) => void;
};
