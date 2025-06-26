import { FormMultiStep } from "@/components/FormMultiStep";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

export const Description = () => {
  const { step } = useProfissionalRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <FormMultiStep.Description>
          Aqui você irá inserir suas informações iniciais. Para cadastrar dados
          complementares acesse: Perfil &gt; Editar informações.
        </FormMultiStep.Description>
      )}

      {step === "service_location" && (
        <FormMultiStep.Description>
          Aqui você irá inserir suas informações iniciais de atendimento. Para
          cadastrar todos os seus dados acesse: perfil &gt; editar informações.
        </FormMultiStep.Description>
      )}
    </>
  );
};
