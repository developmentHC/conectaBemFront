import { IProfessional } from "@/types/professional";

export const filterAndSortProfessionals = (
  professionals: IProfessional[] | undefined,
  specialization?: string
) => {
  if (!professionals) return [];

  const sorted = [...professionals].sort((a, b) => b.rating - a.rating);

  return specialization
    ? sorted.filter(
        (professional) => professional.specialization === specialization
      )
    : sorted;
};
