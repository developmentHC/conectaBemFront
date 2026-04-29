import type { IProfessional } from "@/types/professional";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toProfessionalCardProps(raw: any): IProfessional {
  return {
    id: raw._id ?? raw.id ?? 0,
    name: raw.name ?? "",
    specialization: raw.professionalSpecialties?.[0] ?? raw.specialization ?? "",
    image: raw.profilePhoto ?? raw.image ?? "",
    price: raw.price,
    rating: raw.rating,
    reviews: raw.reviews,
    isFavorite: raw.isFavorite ?? false,
    accessibility: raw.accessibility ?? [],
    preferablyServices: raw.preferablyServices ?? [],
    distance: raw.distance,
  };
}
