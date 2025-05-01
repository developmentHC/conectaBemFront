import { FormMultiStep } from "@/components/FormMultiStep";
import { usePatientRegisterStore } from "./usePatientRegisterStore";

export const Description = () => {
  const { step, name } = usePatientRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <FormMultiStep.Description>
          Aqui vocé irá inserir suas informações iniciais de atendimento. Para
          cadastrar todos os seus dados acesse: perfil &gt; editar infos.
        </FormMultiStep.Description>
      )}

      {step === "accessibility" && (
        <FormMultiStep.Description>
          Insira sua necessidade para um melhor atendimento
        </FormMultiStep.Description>
      )}

      {step === "complete_profile" && (
        <FormMultiStep.Description>
          Estamos felizes em ter você aqui, {name}. Você está pronta para
          iniciar sua jornada?
        </FormMultiStep.Description>
      )}
    </>
  );
};
