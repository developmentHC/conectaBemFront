import { PatientRegister } from "@/features/auth/components/PatientRegister";

export default function registroPaciente() {
  return (
    <main className="flex items-start justify-center">
      <div className="flex w-full flex-col gap-8 md:max-w-[450px]">
        <PatientRegister />
      </div>
    </main>
  );
}
