export type IProfessional = {
  id: number;
  name: string;
  specialization: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  preferablyServices: {
    id: number;
    name: string;
  }[];
  distance: number;
};