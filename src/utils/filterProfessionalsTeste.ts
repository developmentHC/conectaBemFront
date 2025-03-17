import { IProfessional } from "@/types/professional";

type FilterProps = {
  specialization?: string;
  value?: string[];
  accessibility?: string[];
  preferences?: string[];
  distance?: number;
};

export const filterProfessionals = (
  professionals: IProfessional[] | undefined,
  filters: FilterProps
): IProfessional[] => {
  if (!professionals) return [];

  const {
    specialization,
    value = [],
    accessibility = [],
    preferences = [],
    distance,
  } = filters;

  const noFiltersApplied =
    !specialization &&
    value.length === 0 &&
    accessibility.length === 0 &&
    preferences.length === 0 &&
    distance === undefined;

  if (noFiltersApplied) return professionals;

  return professionals.filter((professional) => {
    const matchesSpecialization =
      !specialization || specialization === professional.specialization;

    const matchesValue =
      value.length === 0 || value.includes(professional.price);

    const matchesAccessibility =
      accessibility.length === 0 ||
      professional.preferablyServices.some((service) =>
        accessibility.includes(service.name)
      );

    const matchesPreferences =
      preferences.length === 0 ||
      preferences.some((pref) =>
        professional.preferablyServices.some((service) => service.name === pref)
      );

    const matchesDistance =
      distance === undefined || professional.distance <= distance;

    return (
      matchesSpecialization &&
      matchesValue &&
      matchesAccessibility &&
      matchesPreferences &&
      matchesDistance
    );
  });
};
