import { IProfessional } from "@/types/professional";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfessional = () => {
  return useQuery<IProfessional[]>({
    queryKey: ["professional"],
    queryFn: async () => {
      const response = await axios.get("mocks/professional.json");

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 *60 * 1000,
  });
};