import {
  getSearchProfessionalbyspecialitySpecialityQueryKey,
  useGetSearchProfessionalbyspecialitySpeciality,
} from "@/kubb/hooks/useGetSearchProfessionalbyspecialitySpeciality";
import { toProfessionalCardProps } from "@/utils/toProfessionalCardProps";

export function useProfessionalBySpeciality(speciality: string, page = 1) {
  // Workaround: the Kubb-generated hook declares `page` as a path param,
  // but the URL only has `:speciality`. Inject `page` into the queryKey
  // so React Query refetches, and forward it as a real query string param.
  const { data, isLoading, isError } = useGetSearchProfessionalbyspecialitySpeciality(
    speciality,
    page,
    {
      query: {
        enabled: !!speciality,
        queryKey: [
          ...getSearchProfessionalbyspecialitySpecialityQueryKey(speciality, page),
          { page },
        ] as const,
      },
      client: { params: { page } },
    },
  );

  const professionals = (data?.professionals ?? []).map(toProfessionalCardProps);

  return {
    data: professionals,
    isLoading,
    isError,
    pageCount: data?.pageCount ?? 1,
  };
}
