export type IProfessional = {
  id: number;
  name: string;
  specialization: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  isFavorite: boolean;
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
  cepResidencial: string | undefined;
  enderecoResidencial: string | undefined;
  complementoResidencial: string | undefined;
  nomeClinica: string | undefined;
  CNPJCPFProfissional: string | undefined;
  cepClinica: string | undefined;
  enderecoClinica: string | undefined;
  complementoClinica: string | undefined;
  professionalSpecialties: string[] | undefined;
  otherProfessionalSpecialties: string[] | undefined;
  professionalServicePreferences: string[] | undefined;
  profilePhoto: File | undefined;
};
