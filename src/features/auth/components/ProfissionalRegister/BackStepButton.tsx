import Link from "next/link";
import { FormMultiStep } from "@/components/FormMultiStep";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

export const BackStepButton = () => {
  const { changeStep, step } = useProfissionalRegisterStore();

  return (
    <>
      {step === "personal_data" && (
        <Link href={"/auth/registro"} className="w-fit">
          <FormMultiStep.BackStepButton />
        </Link>
      )}

      {step === "service_location" && (
        <FormMultiStep.BackStepButton onClick={() => changeStep("personal_data")} />
      )}

      {step === "specialties" && (
        <FormMultiStep.BackStepButton onClick={() => changeStep("service_location")} />
      )}

      {step === "complete_profile" && (
        <FormMultiStep.BackStepButton onClick={() => changeStep("specialties")} />
      )}
    </>
  );
};
