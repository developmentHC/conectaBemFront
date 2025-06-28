import { Professional } from "@/types/professional";

export const searchAndSortProfessionals = (
  professionals: Professional[] | undefined,
  searchQuery: string | undefined
): Professional[] => {
  if (!professionals) {
    return [];
  }

  let filteredProfessionalsByName = [...professionals];
  let filteredProfessionalsBySpecialization = [...professionals];

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    filteredProfessionalsByName = filteredProfessionalsByName.filter(
      (professional) =>
        professional.name.toLowerCase().includes(lowerCaseSearchQuery)
    );
    if (filteredProfessionalsByName.length === 0) {
      filteredProfessionalsBySpecialization =
        filteredProfessionalsBySpecialization.filter((professional) =>
          professional.professionalSpecialties.some((specialty) =>
            specialty.toLowerCase().includes(lowerCaseSearchQuery)
          )
        );

      return filteredProfessionalsBySpecialization.sort(
        (a, b) => b.rating - a.rating
      );
    }
  }

  return filteredProfessionalsByName.sort((a, b) => b.rating - a.rating);
};
