import "next-auth";

declare module "next-auth" {
  interface Address {
    cep: number;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    active: boolean;
    _id: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token?: string;
    userType?: string;
    address?: Address[];
    birthdayDate?: Date | string;
    profileImage?: string;

    userSpecialties?: string[];
    userServicePreferences?: string[];
    userAcessibilityPreferences?: string[];
    professionalSpecialties?: string[];
    otherProfessionalSpecialties?: string[];
    professionalServicePreferences?: string[];
  }

  interface Session {
    user?: User;
  }
}
