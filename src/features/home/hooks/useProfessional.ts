import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IProfessional } from "@/types/professional";

export const useProfessional = () => {
  return useQuery<IProfessional[]>({
    queryKey: ["professional"],
    queryFn: async () => {
      const response = await axios.get("/mocks/professional.json");

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
