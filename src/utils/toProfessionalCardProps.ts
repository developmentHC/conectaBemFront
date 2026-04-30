import type { IProfessional } from "@/types/professional";

export type RawProfessional = {
  _id?: string;
  id?: number | string;
  name?: string;
  professionalSpecialties?: string[];
  specialization?: string;
  profilePhoto?: string;
  image?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  isFavorite?: boolean;
  accessibility?: string[];
  preferablyServices?: { id: number; name: string }[];
  distance?: number;
};

export function toProfessionalCardProps(raw: RawProfessional): IProfessional {
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
