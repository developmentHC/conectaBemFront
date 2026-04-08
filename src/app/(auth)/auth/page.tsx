import { Divider } from "@mui/material";
import { FormMultiStep } from "@/components/FormMultiStep";
import { AuthForm } from "@/features/auth/components/AuthForm/AuthForm";
import { SocialNetwork } from "@/features/auth/components/SocialNetwork/SocialNetwork";

export default function register() {
  return (
    <div className="flex md:justify-center">
      <div className="flex w-full flex-col gap-8 md:max-w-[450px]">
        <FormMultiStep.Header>
          <FormMultiStep.Title>Prazer ter você no ConectaBem!</FormMultiStep.Title>
        </FormMultiStep.Header>

        <div className="flex w-full flex-col gap-12">
          <AuthForm />
          <Divider />
          <SocialNetwork />
        </div>
      </div>
    </div>
  );
}
