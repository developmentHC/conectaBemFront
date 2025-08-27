import { FormMultiStep } from "@/components/FormMultiStep";
import { AuthForm } from "@/features/auth/components/AuthForm/AuthForm";
import { SocialNetwork } from "@/features/auth/components/SocialNetwork/SocialNetwork";
import { Divider } from "@mui/material";

export default function register() {
  return (
    <main className="flex md:justify-center ">
      <div className="flex flex-col gap-8 md:max-w-[450px] w-full">
        <FormMultiStep.Header>
          {/* <Link href={"/"}>
            <FormMultiStep.BackStepButton />
          </Link> */} 
          {/* removi o botão de voltar para a página inicial, pois ja possui um no header */}
          <FormMultiStep.Title>
            Prazer ter você no ConectaBem!
          </FormMultiStep.Title>
        </FormMultiStep.Header>

        <div className="flex flex-col gap-12 w-full">
          <AuthForm />
          <Divider />
          <SocialNetwork />
        </div>
      </div>
    </main>
  );
}