import { ReactNode } from "react";
import { create } from "zustand";

type States = {
  name?: string;
  birthdate?: Date;
  cepResidencial?: string;
  cepProfessional?: string;
  clinicName?: string;
  cpfCNPJ?: string;
  address?: string;
  complement?: string;
  specialties?: string[];
  servicePreferences?: string[];
  photo?: File;
  title?: ReactNode;
  description?: ReactNode;
  BackstepButton?: ReactNode;
  suggestions?: string;
  step: Step;
}

type ProfissionalRegisterProps = {
  updateFields: (fields: Partial<States>) => void;
  changeStep: (step: Step) => void;
  reset: () => void;
} & States;

export type Step = "personal_data" | "service_location" | "specialties" | "complete_profile";

const defaultsStates: States = {
  name: undefined,
  birthdate: undefined,
  cepResidencial: undefined,
  cepProfessional: undefined,
  clinicName: undefined,
  cpfCNPJ: undefined,
  address: undefined,
  complement: undefined,
  specialties: undefined,
  servicePreferences: undefined,
  photo: undefined,
  title: undefined,
  description: undefined,
  suggestions: undefined,
  BackstepButton: undefined,
  step: "personal_data",
}

export const useProfissionalRegisterStore = create<ProfissionalRegisterProps>((set) => ({
  ...defaultsStates,
  changeStep: (step: Step) => set({ step }),
  updateFields: (fields) => set(fields),
  reset: () => set(defaultsStates),
}));