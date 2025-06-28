import { create } from "zustand";

type SearchStoreProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const useSearchStore = create<SearchStoreProps>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
}));
