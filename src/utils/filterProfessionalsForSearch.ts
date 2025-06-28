import { FilterProps } from "@/types/filter";
import { Professional } from "@/types/professional";

export const filterProfessionals = (
  professionals: Professional[] | undefined,
  filters: FilterProps
): Professional[] => {
  if (!professionals) return [];

  return professionals
    .filter((professional) => {
      if (filters.specialization && filters.specialization.length > 0) {
        const hasAnySpecialization =
          professional.professionalSpecialties?.some((spec) =>
            filters.specialization!.some(
              (selectedSpec) =>
                spec.toLowerCase() === selectedSpec.toLowerCase()
            )
          ) ||
          professional.otherProfessionalSpecialties?.some((spec) =>
            filters.specialization!.some(
              (selectedSpec) =>
                spec.toLowerCase() === selectedSpec.toLowerCase()
            )
          );
        if (!hasAnySpecialization) return false;
      }

      if (
        filters.price &&
        String(professional.price) !== String(filters.price)
      ) {
        return false;
      }

      if (filters.acessibility && filters.acessibility.length > 0) {
        const hasAnyAcessibility =
          professional.professionalServicePreferences?.some((pref) =>
            filters.acessibility!.some(
              (acc) => pref.toLowerCase() === acc.toLowerCase()
            )
          );
        if (!hasAnyAcessibility) return false;
      }

      if (filters.service && filters.service.length > 0) {
        const hasAnyService = professional.professionalServicePreferences?.some(
          (pref) =>
            filters.service!.some(
              (srv) => pref.toLowerCase() === srv.toLowerCase()
            )
        );
        if (!hasAnyService) return false;
      }

      if (
        filters.maxDistance !== undefined &&
        professional.distance !== undefined &&
        professional.distance > filters.maxDistance
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => b.rating - a.rating);
};
