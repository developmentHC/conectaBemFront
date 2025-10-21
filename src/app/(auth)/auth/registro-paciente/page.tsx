import { PatientRegister } from "@/features/auth/components/PatientRegister";

export default function registroPaciente() {
  return (
    <main className="flex justify-center items-start">
      <div className="flex flex-col gap-8 md:max-w-[450px]">
        <PatientRegister />
      </div>
    </main>
  );
}
