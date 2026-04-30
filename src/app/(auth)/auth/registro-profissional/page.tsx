import { ProfissionalRegister } from "@/features/auth/components/ProfissionalRegister";

export default function register() {
  return (
    <div className="flex items-start justify-center">
      <div className="flex w-full flex-col gap-8 md:max-w-[450px]">
        <ProfissionalRegister />
      </div>
    </div>
  );
}
