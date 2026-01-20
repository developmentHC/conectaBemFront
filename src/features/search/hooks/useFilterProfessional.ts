// import { IProfessional } from "@/types/professional";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useFilterProfessional = () => {
//   return useQuery<IProfessional[]>({
//     queryKey: ["professional"],
//     queryFn: async () => {
//       const response = await axios.get("mocks/professional.json");

//       return response.data;
//     },
//     refetchOnWindowFocus: false,
//     retry: false,
//     staleTime: 10 * 60 * 1000,
//   });
// };

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

      const isMock = process.env.NEXT_PUBLIC_ENABLE_API_MOCKING === "true";

      // const url = isMock
      //   ? "/mocks/professional.json"
      //   : `/search/searchBar/${encodeURIComponent(search)}/${page}`;

       const url = isMock
        ? "/mocks/professional.json"
        : `https://conecta-bem-back.vercel.app/search/searchBar/${encodeURIComponent(search)}`;

       const response = await axios.get(url);

       if(isMock) return response.data;

       console.log("API RESPONSE", response.data);


      return response.data.professionals ?? [];
    },
    enabled: !!search, // só busca se tiver termo
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
