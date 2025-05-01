import { Specialty } from "@/types/specialty"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetSpecialty = () => {
  return useQuery<Specialty[]>({
    queryKey: ["specialty"],
    queryFn: async () => {
      const response = await axios.get("../mocks/specialties.json")

      return response.data
    }
  })
}