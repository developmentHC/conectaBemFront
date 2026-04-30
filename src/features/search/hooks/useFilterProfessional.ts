import type { FiltersState } from "@/features/search/components/types";
import { useGetSearchProfessionals } from "@/kubb/hooks/useGetSearchProfessionals";
import { useGetSearchSearchbarTerms } from "@/kubb/hooks/useGetSearchSearchbarTerms";
import { type RawProfessional, toProfessionalCardProps } from "@/utils/toProfessionalCardProps";

type UseFilterProfessionalParams = {
  filters: FiltersState;
  page: number;
  searchTerm?: string;
};

export const useFilterProfessional = ({
  filters,
  page,
  searchTerm = "",
}: UseFilterProfessionalParams) => {
  const hasSearchTerm = searchTerm.trim().length > 0;

  const filterQuery = useGetSearchProfessionals(
    {
      specialty: filters.specialties[0],
      service: filters.services[0],
      accessibility: filters.accessibility[0],
      page,
    },
    { query: { enabled: !hasSearchTerm } },
  );

  const searchQuery = useGetSearchSearchbarTerms(searchTerm, page, {
    query: { enabled: hasSearchTerm },
  });

  const activeQuery = hasSearchTerm ? searchQuery : filterQuery;

  const rawList: RawProfessional[] = hasSearchTerm
    ? (searchQuery.data?.professionals ?? [])
    : Array.isArray(filterQuery.data)
      ? (filterQuery.data as RawProfessional[])
      : [];

  return {
    data: rawList.map(toProfessionalCardProps),
    isLoading: activeQuery.isLoading,
    isError: activeQuery.isError,
    pageCount: hasSearchTerm ? (searchQuery.data?.pageCount ?? 1) : 1,
  };
};
