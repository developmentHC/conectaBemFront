import { FormMultiStep } from "@/components/FormMultiStep";
import { Button } from "@mui/material";
import Link from "next/link";

export default function registro() {
  return (
    <main className="flex justify-center w-full">
      <div className="flex flex-col gap-8 w-full md:max-w-[450px]">
        <FormMultiStep.Header className="gap-4">
          <Link href={"/auth"} className="w-fit">
            <FormMultiStep.BackStepButton />
          </Link>
          <FormMultiStep.Title>Tudo pronto para começar</FormMultiStep.Title>
          <FormMultiStep.Progress progress={20} />
          <FormMultiStep.Description>
            Você deseja se cadastrar como:
          </FormMultiStep.Description>
        </FormMultiStep.Header>
        <div className="flex flex-col gap-6">
          <Link href={"/auth/registro-paciente"}>
            <Button className="text-black w-full" variant="outlined">
              Paciente
            </Button>
          </Link>
          <Link href={"/auth/registro-profissional"}>
            <Button className="text-black w-full" variant="outlined">
              Profissional
            </Button>
          </Link>
        </div>
        <div>
          <FormMultiStep.NeedHelpButton className="flex items-center  text-gray-600 gap-2" />
        </div>
      </div>
    </main>
  );
}
