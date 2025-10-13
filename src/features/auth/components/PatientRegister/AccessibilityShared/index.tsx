import { usePatientRegisterStore } from "../usePatientRegisterStore";
import { AccessibilityStepShared } from "../../AccessibilityShared/AccessibilityStepShared";

export const AccessibilityStep = () => {
  const { changeStep, updateFields } = usePatientRegisterStore();
  const handleChangeStep = (step: string) => changeStep(step as any);
  return <AccessibilityStepShared changeStep={handleChangeStep} updateFields={updateFields} />;
};