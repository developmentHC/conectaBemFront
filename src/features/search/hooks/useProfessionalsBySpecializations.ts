import { Professional } from "@/types/professional";
import { useProfessionals } from "./useProfessionals";

export const useProfessionalsBySpecializations = (
  specializationsList: string[]
) => {
  const { data: professionals, isLoading } = useProfessionals();

  const professionalsBySpecializations =
    professionals?.filter(
      (professional: Professional) =>
        professional.professionalSpecialties.some((specialty) =>
          specializationsList.includes(specialty)
        ) ||
        professional.otherProfessionalSpecialties?.some((otherSpecialty) =>
          specializationsList.includes(otherSpecialty)
        )
    ) ?? [];

  return {
    professionalsBySpecializations,
    isLoading,
  };
};
