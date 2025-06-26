"use client";

import { FormMultiStep } from "@/components/FormMultiStep";
import {
  Step,
  useProfissionalRegisterStore,
} from "./useProfissionalRegisterStore";
import { PersonalDataStep } from "./PersonalDataStep";
import { ServiceLocationStep } from "./ServiceLocationStep";
import { FormTitle } from "./FormTitle";
import { BackStepButton } from "./BackStepButton";
import { Description } from "./Description";
import { SpecialtyStep } from "./SpecialtyStep";
import { CompleteProfileStep } from "./CompleteProfileStep";

export const ProfissionalRegister = () => {
  const { step } = useProfissionalRegisterStore();

  const progresses: Record<Step, number> = {
    personal_data: 40,
    service_location: 60,
    specialties: 80,
    complete_profile: 100,
  };

  return (
    <>
      <FormMultiStep.Header className="gap-4">
        <BackStepButton />
        <FormTitle />
        <FormMultiStep.Progress progress={progresses[step]} />
        <Description />
      </FormMultiStep.Header>

      {step === "personal_data" && <PersonalDataStep />}
      {step === "service_location" && <ServiceLocationStep />}
      {step === "specialties" && <SpecialtyStep />}
      {step === "complete_profile" && <CompleteProfileStep />}

      <FormMultiStep.NeedHelpButton className="text-gray-500 justify-start gap-2 w-fit" />
    </>
  );
};