import { ReactNode } from "react";
import { create } from "zustand";

type States = {
  name?: string;
  birthdate?: Date;
  cepResidencial?: string;
  enderecoResidencial?: string;
  bairroResidencial?: string;
  complementoResidencial?: string;
  cidadeResidencial?: string;
  estadoResidencial?: string;
  cepProfessional?: string;
  clinicName?: string;
  cpfCNPJ?: string;
  enderecoClinica?: string;
  bairroClinica?: string;
  cidadeClinica?: string;
  estadoClinica?: string;
  complementoClinica?: string;
  numeroClinica?: number;
  specialties?: string[];
  servicePreferences?: string[];
  photo?: string;

  accessibility?: string[];
  skippedAccessibility?: boolean;

  title?: ReactNode;
  description?: ReactNode;
  BackstepButton?: ReactNode;
  suggestions?: string;
  step: Step;
};

type ProfissionalRegisterProps = {
  updateFields: (fields: Partial<States>) => void;
  changeStep: (step: Step) => void;
  reset: () => void;
} & States;

export type Step = "personal_data" | "service_location" | "specialties" | "accessibility" | "complete_profile";

const defaultsStates: States = {
  name: "Teste User",
  birthdate: undefined,
  cepResidencial: undefined,
  enderecoResidencial: undefined,
  bairroResidencial: undefined,
  cidadeResidencial: undefined,
  estadoResidencial: undefined,
  complementoResidencial: undefined,
  cepProfessional: undefined,
  clinicName: undefined,
  cpfCNPJ: undefined,
  enderecoClinica: undefined,
  cidadeClinica: undefined,
  estadoClinica: undefined,
  bairroClinica: undefined,
  complementoClinica: undefined,
  numeroClinica: undefined,
  specialties: undefined,
  servicePreferences: undefined,
  photo: undefined,
  accessibility: undefined,
  skippedAccessibility: false,
  title: undefined,
  description: undefined,
  suggestions: undefined,
  BackstepButton: undefined,
  step: "complete_profile",
};

export const useProfissionalRegisterStore = create<ProfissionalRegisterProps>((set) => ({
  ...defaultsStates,
  changeStep: (step: Step) => set({ step }),
  updateFields: (fields) => set(fields),
  reset: () => set(defaultsStates),
}));
