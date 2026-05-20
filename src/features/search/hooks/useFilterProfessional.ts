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
      specialty: filters.specialties,
      service: filters.services,
      accessibility: filters.accessibility,
      page,
    },
    { query: { enabled: !hasSearchTerm } },
  );

  const searchQuery = useGetSearchSearchbarTerms(searchTerm, { page }, {
    query: { enabled: hasSearchTerm },
  });

  const activeQuery = hasSearchTerm ? searchQuery : filterQuery;

  // Both `/search/searchBar/:terms` and `/search/professionals` return
  // `{ professionals, page, pageCount, ... }`. The previous code assumed
  // `/search/professionals` returned a bare array and lost both the
  // results and the pageCount. The Kubb-generated type for the filter
  // endpoint is `any`, so we have to narrow defensively.
  const filterData = filterQuery.data as
    | { professionals?: RawProfessional[]; pageCount?: number }
    | undefined;

  const rawList: RawProfessional[] = hasSearchTerm
    ? (searchQuery.data?.professionals ?? [])
    : (filterData?.professionals ?? []);

  return {
    data: rawList.map(toProfessionalCardProps),
    isLoading: activeQuery.isLoading,
    isError: activeQuery.isError,
    pageCount: hasSearchTerm ? (searchQuery.data?.pageCount ?? 1) : (filterData?.pageCount ?? 1),
  };
};
