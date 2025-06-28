import { Professional } from "@/types/professional";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfessionals = () => {
  return useQuery<Professional[]>({
    queryKey: ["professional"],
    queryFn: async () => {
      const response = await axios.get("mocks/professionals-search.json");

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
