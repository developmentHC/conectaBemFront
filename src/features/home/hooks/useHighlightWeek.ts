import {
  getSearchHighlightsweekQueryKey,
  useGetSearchHighlightsweek,
} from "@/kubb/hooks/useGetSearchHighlightsweek";
import { toProfessionalCardProps } from "@/utils/toProfessionalCardProps";

export function useHighlightWeek(page = 1) {
  // Workaround: the Kubb-generated hook declares `page` as a path param,
  // but the URL is `/search/highlightsWeek` — `page` is never sent and
  // the queryKey doesn't change between pages. Inject `page` into the
  // queryKey so React Query refetches, and forward it as a real query
  // string param.
  const { data, isLoading, isError } = useGetSearchHighlightsweek(page, {
    query: {
      queryKey: [...getSearchHighlightsweekQueryKey(page), { page }] as const,
    },
    client: { params: { page } },
  });

  const professionals = (data?.professionals ?? []).map(toProfessionalCardProps);

  return {
    data: professionals,
    isLoading,
    isError,
    pageCount: data?.pageCount ?? 1,
  };
}
