"use client";

import { FormMultiStep } from "@/components/FormMultiStep";
import { Step, usePatientRegisterStore } from "./usePatientRegisterStore";
import { BackStepButton } from "./BackStepButton";
import { FormTitle } from "./FormTitle";
import { Description } from "./Description";
import { PersonalDataStep } from "./PersonalDataStep";
import { SpecialtyStep } from "./SpecialityStep";
import { AccessibilityStep } from "./AccessibilityStep";
import { CompleteProfileStep } from "./CompleteProfileStep";

const progresses: Record<Step, number> = {
  personal_data: 40,
  specialties: 60,
  accessibility: 80,
  complete_profile: 100,
};

export const PatientRegister = () => {
  const { step } = usePatientRegisterStore();

  return (
    <>
      <FormMultiStep.Header className="gap-4">
        {/* <BackStepButton /> */}
        <FormTitle />
        <FormMultiStep.Progress progress={progresses[step]} />
        <Description />
      </FormMultiStep.Header>

      {step === "personal_data" && <PersonalDataStep />}
      {step === "specialties" && <SpecialtyStep />}
      {step === "accessibility" && <AccessibilityStep />}
      {step === "complete_profile" && <CompleteProfileStep />}

      <FormMultiStep.NeedHelpButton className="text-gray-500 justify-start gap-2 w-fit" />
    </>
  );
};
