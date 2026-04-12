import { IProfessional } from "@/types/professional";
import { professionalFilters } from "@/types/professionalFilters";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  search: string;
  page: number;
  filters: professionalFilters;
}

export const useFilterProfessional = ({ search, page, filters }: Params) => {
  return useQuery<IProfessional[]>({
    queryKey: [
    "professional",
    search,
    page,
    (filters.values ?? []).join(","),
    (filters.accessibility ?? []).join(","),
    (filters.services ?? []).join(","),
    (filters.payments ?? []).join(","),
    filters.distance,
  ],
    queryFn: async () => {
      if(!search) return [];

      let url = "";

      if (search) {
        url = `https://conecta-bem-back.vercel.app/search/searchBar/${encodeURIComponent(search)}`;
      } else {
        url = `https://conecta-bem-back.vercel.app/search/professionals?page=${page}`;
      }

      // console.log("🌐 URL FINAL:", url);

       const response = await axios.get(url);

      //  console.log("📦 RESPONSE BRUTA:", response.data);
       
      return response.data.professionals ?? [];
    },
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
