import { useProfissionalRegisterStore } from "../useProfissionalRegisterStore";
import { AccessibilityStepShared } from "../../AccessibilityShared/AccessibilityStepShared";

export const AccessibilityStep = () => {
  const { changeStep: storeChangeStep, updateFields } = useProfissionalRegisterStore();
  return <AccessibilityStepShared changeStep={(step: string) => storeChangeStep(step as any)} updateFields={updateFields} />;
};