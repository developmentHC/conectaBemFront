import { FormMultiStep } from "@/components/FormMultiStep";
import { usePatientRegisterStore } from "./usePatientRegisterStore";

export const FormTitle = () => {
  const { step } = usePatientRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <>
          <FormMultiStep.Title>Cadastro do Paciente</FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 1/4</span>
        </>
      )}
      {step === "specialties" && (
        <>
          <FormMultiStep.Title>Preferências</FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 2/4</span>
        </>
      )}
      {step === "accessibility" && (
        <>
          <FormMultiStep.Title>Acessibilidade</FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 3/4</span>
        </>
      )}
      {step === "complete_profile" && (
        <>
          <FormMultiStep.Title>
            Quase tudo pronto para iniciar
          </FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 4/4</span>
        </>
      )}
    </>
  );
};
