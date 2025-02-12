export type IPatient = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
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