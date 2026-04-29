import { useGetSearchProfessionalbyspecialitySpeciality } from "@/kubb/hooks/useGetSearchProfessionalbyspecialitySpeciality";
import { toProfessionalCardProps } from "@/utils/toProfessionalCardProps";

export function useProfessionalBySpeciality(speciality: string, page = 1) {
  const { data, isLoading, isError } = useGetSearchProfessionalbyspecialitySpeciality(
    speciality,
    page,
    { query: { enabled: !!speciality } },
  );

  const professionals = ((data as { professionals?: unknown[] } | null)?.professionals ?? []).map(
    toProfessionalCardProps,
  );

  return { data: professionals, isLoading, isError };
}
