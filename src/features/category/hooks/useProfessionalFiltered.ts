import { IProfessional } from "@/types/professional";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfessionalFiltered = () => {
  return useQuery<IProfessional[]>({
    queryKey: ["professionalFiltered"],
    queryFn: async () => {
      const response = await axios.get("../mocks/professional.json");

      return response.data;
    },
  });
};
