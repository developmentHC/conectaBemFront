"use client";

import { FormMultiStep } from "@/components/FormMultiStep";
import { Step, useProfissionalRegisterStore} from "./useProfissionalRegisterStore";
import { PersonalDataStep } from "./PersonalDataStep";
import { ServiceLocationStep } from "./ServiceLocationStep";
import { FormTitle } from "./FormTitle";
import { Description } from "./Description";
import { SpecialtyStep } from "./SpecialtyStep";
import { AccessibilityStep } from "./AccessibilityStep";
import { CompleteProfileStep } from "./CompleteProfileStep";

export const ProfissionalRegister = () => {
  const { step } = useProfissionalRegisterStore();

  const progresses: Record<Step, number> = {
     personal_data: 20,
    service_location: 40,
    specialties: 60,
    accessibility: 80,
    complete_profile: 100,
  };

  return (
    <>
      <FormMultiStep.Header className="gap-4">
        <FormTitle />
        <FormMultiStep.Progress progress={progresses[step]} />
        <Description />
      </FormMultiStep.Header>

      {step === "personal_data" && <PersonalDataStep />}
      {step === "service_location" && <ServiceLocationStep />}
      {step === "specialties" && <SpecialtyStep />}
      {step === "accessibility" && <AccessibilityStep />} 
      {step === "complete_profile" && <CompleteProfileStep />}

      <FormMultiStep.NeedHelpButton className="text-gray-500 justify-start gap-2 w-fit" />
    </>
  );
};