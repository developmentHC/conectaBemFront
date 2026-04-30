import type { IProfessional } from "@/types/professional";

export const filterAndSortProfessionals = (
  professionals: IProfessional[] | undefined,
  specialization?: string,
) => {
  if (!professionals) return [];

  const sorted = [...professionals].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return specialization
    ? sorted.filter((professional) => professional.specialization === specialization)
    : sorted;
};
