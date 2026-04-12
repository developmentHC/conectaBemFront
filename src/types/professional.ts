<<<<<<< HEAD
export type Address = {
  active: boolean;
  address: string;
  cep: string;
  city: string;
  neighborhood: string;
  state: string;
  _id: string;
};

export type Clinic = {
  _id: string;
  name: string;
  addition: string;
=======
// export type IProfessional = {
//   id: number;
//   name: string;
//   specialization: string;
//   image: string;
//   price: number;
//   rating: number;
//   reviews: number;
//   isFavorite: boolean;
//   accessibility: string[];
//   preferablyServices: {
//     id: number;
//     name: string;
//   }[];
//   distance?: number;
// };

export type Address = {
  cep: string;
  address: string;
  neighborhood: string;
  number: string;
  city?: string;
  state?: string;
};

export type Clinic = {
  name: string;
>>>>>>> 9f18420 (style: Adicionado opções de customizações e acrescentando imagem avatar para quando não houver imagem vindo da api)
  cep: string;
  address: string;
  neighborhood: string;
  number: string;
<<<<<<< HEAD
  city?: string;
  state?: string;
};

export type IProfessional = {
  _id: string;
  name: string;
  imageUrl: string | null;
  CNPJCPFProfissional: string;
  birthdayDate: string;
  ratingsAvg: number;
  ratingsCount: number;

  professionalSpecialties: string[];
  otherProfessionalSpecialties: string[];
  professionalServicePreferences: string[];

  priceRange: string;

  acceptedPayments: {
    pix: boolean;
    wellhub: boolean;
    mastercard: boolean;
    visa: boolean;
  };

  address: Address[];
  clinic: Clinic;
=======
};

export type IProfessional = {
    _id: string;
    name: string;
    imageUrl: string;
    CNPJCPFProfissional: string;
    birthdayDate: string;
    ratingsAvg: number;
    ratingsCount: number;

    professionalSpecialties: string[];
    otherProfessionalSpecialties: string[];
    professionalServicePreferences: string[];

    acceptedPayments: {
      pix: boolean;
      wellhub: boolean;
      mastercard: boolean;
      visa: boolean;
    };

    address: Address[];
    clinic: Clinic;
>>>>>>> 9f18420 (style: Adicionado opções de customizações e acrescentando imagem avatar para quando não houver imagem vindo da api)
};

export type ICreateProfissional = {
  userId: string | undefined;
  name: string | undefined;
  birthdayDate: number | undefined;
  CNPJCPFProfissional: string | undefined;
  professionalSpecialties: string[] | undefined;
  otherProfessionalSpecialties: string[] | undefined;
  professionalServicePreferences: string[] | undefined;
  acessibility: string[] | undefined;
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
