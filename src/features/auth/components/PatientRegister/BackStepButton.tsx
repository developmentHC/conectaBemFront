import { FormMultiStep } from "@/components/FormMultiStep";
import Link from "next/link";
import { usePatientRegisterStore } from "./usePatientRegisterStore";

export const BackStepButton = () => {
  const { changeStep, step } = usePatientRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <Link href={"/auth/registro"} className="w-fit">
          <FormMultiStep.BackStepButton />
        </Link>
      )}

      {step === "specialties" && (
        <FormMultiStep.BackStepButton
          onClick={() => changeStep("personal_data")}
        />
      )}

      {step === "accessibility" && (
        <FormMultiStep.BackStepButton
          onClick={() => changeStep("specialties")}
        />
      )}

      {step === "complete_profile" && (
        <FormMultiStep.BackStepButton
          onClick={() => changeStep("accessibility")}
        />
      )}
    </>
  );
};
