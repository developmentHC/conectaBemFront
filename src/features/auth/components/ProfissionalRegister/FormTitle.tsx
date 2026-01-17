import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { FormMultiStep } from "@/components/FormMultiStep";

export const FormTitle = () => {
  const { step } = useProfissionalRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <>
          <FormMultiStep.Title>Cadastro profissional</FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 1/5</span>
        </>
      )}
      {step === "service_location" && (
        <>
          <FormMultiStep.Title>Cadastro local de atendimento</FormMultiStep.Title>

          <span className="text-gray-500 text-sm">etapa 2/5</span>
        </>
      )}
      {step === "specialties" && (
        <>
          <FormMultiStep.Title>Especialidades</FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 3/5</span>
        </>
      )}
      {step === "accessibility" && (
        <>
          <FormMultiStep.Title>Acessibilidade</FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 4/5</span>
        </>
      )}
      {step === "complete_profile" && (
        <>
          <FormMultiStep.Title>
            Quase tudo pronto para iniciar
          </FormMultiStep.Title>
          <span className="text-gray-500 text-sm">etapa 5/5</span>
        </>
      )}
    </>
  );
};
