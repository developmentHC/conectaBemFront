import { create } from "zustand";

type States = {
  name?: string;
  birthdayDate?: Date;
  cepResidencial?: string;
  enderecoResidencial?: string;
  bairroResidencial?: string;
  cidadeResidencial?: string;
  estadoResidencial?: string;
  specialties?: string[];
  servicePreferences?: string[];
  accessibility?: string[];
  skippedAccessibility?: boolean;
  profilePhoto?: string;
  step: Step;
};

type PatientRegisterProps = {
  updateFields: (fields: Partial<States>) => void;
  changeStep: (step: Step) => void;
  reset: () => void;
} & States;

export type Step = "personal_data" | "specialties" | "accessibility" | "complete_profile";

const defaultsStates: States = {
  name: undefined,
  birthdayDate: undefined,
  cepResidencial: undefined,
  enderecoResidencial: undefined,
  bairroResidencial: undefined,
  cidadeResidencial: undefined,
  estadoResidencial: undefined,
  specialties: [],
  accessibility: [],
  skippedAccessibility: false,
  profilePhoto: undefined,
  servicePreferences: [],
  step: "personal_data",
};

export const usePatientRegisterStore = create<PatientRegisterProps>((set) => ({
  ...defaultsStates,
  changeStep: (step: Step) => set({ step }),
  updateFields: (fields) => set(fields),
  reset: () => set(defaultsStates),
}));
