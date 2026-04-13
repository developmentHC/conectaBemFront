import { IProfessional } from "@/types/professional";

export interface NormalizedProfessionalFilter {
  specialties: string[];
  services: string[];
  accessibility: string[];
  payments: string[];
  priceRange: string | null;
}

const normalizeArray = (arr?: unknown[]): string[] => {
  if (!Array.isArray(arr)) return [];

  return arr
    .filter((item): item is string => typeof item === "string")
    .map(item => item.trim().toLowerCase());
};

const normalizePayments = (payments?: Record<string, boolean>): string[] => {
  if (!payments) return [];

  return Object.entries(payments)
    .filter(([_, value]) => value)
    .map(([key]) => key.toLowerCase());
};

export function normalizeProfessionalFilter(
  professional: IProfessional
): NormalizedProfessionalFilter {
  return {
    specialties: normalizeArray(professional.professionalSpecialties || []),
    accessibility: normalizeArray(professional.otherProfessionalSpecialties || []),
    services: normalizeArray(professional.professionalServicePreferences || []),
    payments: normalizePayments(professional.acceptedPayments),
    priceRange: professional.priceRange ?? 0,
  };
}