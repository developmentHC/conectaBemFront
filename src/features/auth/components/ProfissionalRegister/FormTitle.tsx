import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { FormMultiStep } from "@/components/FormMultiStep";

export const FormTitle = () => {
  const { step } = useProfissionalRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <FormMultiStep.Title>Cadastro profissional</FormMultiStep.Title>
      )}
      {step === "service_location" && (
        <FormMultiStep.Title>Local de atendimento</FormMultiStep.Title>
      )}
      {step === "specialties" && (
        <FormMultiStep.Title>Especialidades</FormMultiStep.Title>
      )}
      {step === "complete_profile" && (
        <FormMultiStep.Title>
          Lembre de completar seu perfil
        </FormMultiStep.Title>
      )}
    </>
  );
};