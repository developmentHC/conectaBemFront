export type IPatient = {
  id: string | undefined;
  name: string;
  email: string;
  profilePhoto: string;
  cepResidencial: string;
  enderecoResidencial: string;
  complementoResidencial: string;
  userSpecialities: {
    id: number;
    name: string;
  }[];
  userServicePreferences: {
    id: number;
    name: string;
  }[];
  userAcessibilityPreferences: {
    id: number;
    name: string;
  }[];
};

export type ICreatePatient = {
  userId: string | undefined;
  name: string | undefined;
  residentialAddress: {
    cep: string | undefined;
    address: string | undefined;
    neighborhood: string | undefined;
    city: string | undefined;
    state: string | undefined;
  };
  birthdayDate: number | undefined;
  userSpecialties: string[] | undefined;
  userServicePreferences: string[] | undefined;
  userAcessibilityPreferences: string[] | undefined;
  /** URL da foto de perfil hospedada (retornada por /auth/uploadPhoto) */
  profilePhoto: string | undefined;
};
