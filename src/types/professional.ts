export type IProfessional = {
  id: number;
  name: string;
  specialization: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  accessibility: string[];
  preferablyServices: {
    id: number;
    name: string;
  }[];
  distance?: number;
};

export type ICreateProfissional = {
  userId: string | undefined;
  name: string | undefined;
  birthdayDate: number | undefined;
  CNPJCPFProfissional: string | undefined;
  professionalSpecialties: string[] | undefined;
  otherProfessionalSpecialties: string[] | undefined;
  professionalServicePreferences: string[] | undefined;
  accessibility: string[] | undefined;
  profilePhoto: string | undefined;
  residentialAddress: {
    cep: string | undefined;
    address: string | undefined;
    neighborhood: string | undefined;
    city: string | undefined;
    state: string | undefined;
  };
  clinic: {
    name: string | undefined;
    cep: string | undefined;
    address: string | undefined;
    neighborhood: string | undefined;
    number: number | undefined;
    city: string | undefined;
    state: string | undefined;
    addition: string | undefined;
  };
};
