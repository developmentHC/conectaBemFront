import { AccessibilityStepShared } from "../../AccessibilityShared/AccessibilityStepShared";
import { useProfissionalRegisterStore } from "../useProfissionalRegisterStore";

export const AccessibilityStep = () => {
  const { changeStep: storeChangeStep, updateFields } = useProfissionalRegisterStore();
  return (
    <AccessibilityStepShared
      changeStep={(step: string) => storeChangeStep(step as any)}
      updateFields={updateFields}
    />
  );
};
