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
  userAccessibilityPreferences: {
    id: number;
    name: string;
  }[];
};

export type ICreatePatient = {
  name: string | undefined;
  residentialAddress: {
    cep: string | undefined;
    endereco: string | undefined;
    numero: string | undefined;
    bairro: string | undefined;
    cidade: string | undefined;
    estado: string | undefined;
  };
  birthdayDate: number | undefined;
  userSpecialties: string[] | undefined;
  userServicePreferences: string[] | undefined;
  accessibility: string[] | undefined;
  /** URL da foto de perfil hospedada (retornada por /auth/uploadPhoto) */
  profilePhoto: string | undefined;
};
