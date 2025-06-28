import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Category = {
  name: string;
  specializations: string[];
};

export const useCategories = (category: string) => {
  return useQuery<string[]>({
    queryKey: ["categories", category],
    queryFn: async () => {
      const response = await axios.get<Category[]>("mocks/categories.json");
      const data = response.data;
      if (!category) {
        return data.flatMap((cat) => cat.specializations);
      } else {
        const found = data.find((cat) => cat.name === category);
        return found ? found.specializations : [];
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
