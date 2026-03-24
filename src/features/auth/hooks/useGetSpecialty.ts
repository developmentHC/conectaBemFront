import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Specialty } from "@/types/specialty";

export const useGetSpecialty = () => {
  return useQuery<Specialty[]>({
    queryKey: ["specialty"],
    queryFn: async () => {
      const response = await axios.get("../mocks/specialties.json");

      return response.data;
    },
  });
};
