"use client";

import { FormMultiStep } from "@/components/FormMultiStep";
import { AccessibilityStep } from "./AccessibilityStep";
import { CompleteProfileStep } from "./CompleteProfileStep";
import { Description } from "./Description";
import { FormTitle } from "./FormTitle";
import { PersonalDataStep } from "./PersonalDataStep";
import { ServiceLocationStep } from "./ServiceLocationStep";
import { SpecialtyStep } from "./SpecialtyStep";
import { type Step, useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

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
    <div className="flex w-full flex-col bg-[#F3F5FA] pb-16">
      <div className="flex w-full max-w-[450px] flex-col gap-16">
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

        {step !== "complete_profile" && (
          <FormMultiStep.NeedHelpButton className="w-fit justify-start gap-2 text-gray-500" />
        )}
      </div>
    </div>
  );
};
