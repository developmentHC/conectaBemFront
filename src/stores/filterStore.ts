import { create } from "zustand";

type FilterStoreProps = {
  value: string[];
  accessibility: string[];
  preferences: string[];
  distance: number;
  specializationStore: string;
  setFilters: (filters: Partial<FilterStoreProps>) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterStoreProps>((set) => ({
  value: [],
  accessibility: [],
  preferences: [],
  distance: 0,
  specializationStore: "",
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () =>
    set({ value: [], accessibility: [], preferences: [], distance: 0 }),
}));
