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
      let url = "";

      const hasFilters =
        filters.values.length ||
        filters.accessibility.length ||
        filters.services.length ||
        filters.payments.length;

        if (search && !hasFilters) {
          url = `https://conecta-bem-back.vercel.app/search/searchBar/${encodeURIComponent(search)}`;
        } else {
          const params = new URLSearchParams();

          filters.services.forEach((s) => params.append("service", s));
          filters.accessibility.forEach((a) => params.append("accessibility", a));
          filters.values.forEach((v) => params.append("specialty", v));

          params.append("page", String(page));

          url = `https://conecta-bem-back.vercel.app/search/professionals?${params.toString()}`;
      }

      console.log("🌐 URL FINAL:", url);

      const response = await axios.get(url);

      console.log("📦 RESPONSE:", response.data);

      return response.data.professionals ?? response.data ?? [];
    },
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
