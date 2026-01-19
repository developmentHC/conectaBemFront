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
  cep: string;
  address: string;
  neighborhood: string;
  number: string;
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
