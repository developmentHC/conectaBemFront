import { ProfissionalRegister } from "@/features/auth/components/ProfissionalRegister";

export default function register() {
  return (
    <main className="flex justify-center items-start">
      <div className="flex flex-col gap-8 md:max-w-[450px]">
        <ProfissionalRegister />
      </div>
    </main>
  );
}