import { FormMultiStep } from "@/components/FormMultiStep";
import { usePatientRegisterStore } from "./usePatientRegisterStore";

export const Description = () => {
  const { step, name } = usePatientRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <FormMultiStep.Description>
          Aqui você irá inserir suas informações iniciais. Para cadastrar dados complementares acesse: Perfil {">"}{" "}
          Editar informações.
        </FormMultiStep.Description>
      )}

      {step === "accessibility" && (
        <FormMultiStep.Description>Insira sua necessidade para um melhor atendimento</FormMultiStep.Description>
      )}

      {step === "complete_profile" && (
        <FormMultiStep.Description>
          Estamos felizes em ter você aqui, {name}. Você está pronta para iniciar sua jornada?
        </FormMultiStep.Description>
      )}
    </>
  );
};
