import { useGetSearchHighlightsweek } from "@/kubb/hooks/useGetSearchHighlightsweek";
import { toProfessionalCardProps } from "@/utils/toProfessionalCardProps";

export function useHighlightWeek(page = 1) {
  const { data, isLoading, isError } = useGetSearchHighlightsweek({ page });

  const professionals = (data?.professionals ?? []).map(toProfessionalCardProps);

  return {
    data: professionals,
    isLoading,
    isError,
    pageCount: data?.pageCount ?? 1,
  };
}
