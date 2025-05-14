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
  CNPJCPFProfissional: string | undefined;
  professionalSpecialties: string[] | undefined;
  otherProfessionalSpecialties: string[] | undefined;
  professionalServicePreferences: string[] | undefined;
  profilePhoto: File | undefined;
  residencial: {
    cepResidencial: string | undefined;
    enderecoResidencial: string | undefined;
    bairroResidencial: string | undefined;
  };
  clinica: {
    nomeClinica: string | undefined;
    cepClinica: string | undefined;
    enderecoClinica: string | undefined;
    bairroClinica: string | undefined;
    numeroClinica: number | undefined;
    complementoClinica: string | undefined;
  };
};
