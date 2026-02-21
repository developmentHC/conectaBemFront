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
    queryKey: ["professional", search, page, filters.values.join(","),
    filters.accessibility.join(","),
    filters.services.join(","),
    filters.payments.join(","),
    filters.distance,],
    queryFn: async () => {
      if(!search) return [];

       const url = `https://conecta-bem-back.vercel.app/search/searchBar/${encodeURIComponent(search)}`;

       const response = await axios.get(url);

       console.log("API RESPONSE", response.data);
       
      return response.data.professionals ?? [];
    },
    enabled: !!search,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
