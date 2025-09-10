"use client";

import { MedicalSpecialization } from "@/components/MedicalSpecialization/MedicalSpecialization";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { HighlightWeek } from "@/features/home/components/HighlightWeek";
import { PersonalAddress } from "@/features/home/components/PersonalAddress";
import { ProfessionalSection } from "@/features/home/components/ProfessionalSection";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <PersonalAddress />
        <div className="flex flex-col gap-14">
          <div className="flex justify-between items-center gap-6">
            <div className="flex flex-col gap-4 lg:w-full lg:max-w-[50%]">
              <h1 className="lg:text-5xl text-2xl font-semibold">
                Conecta Bem: <br /> O cuidado que acolhe.
              </h1>
              <span className="lg:text-3xl">
                Um lugar para encontrar terapias alternativas alinhadas ao que
                você acredita e precisa.
              </span>
            </div>
            <div className="hidden lg:flex w-full justify-end">
              <Image
                className="w-full max-w-[1000px] h-full max-h-[268px] rounded-xl object-contain"
                alt="logo"
                src="/images/imageHeader.jpg"
                width={1000}
                height={250}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SearchInput />
            <MedicalSpecialization />
          </div>
        </div>
      </section>
      <HighlightWeek />

      <ProfessionalSection />
    </main>
  );
}
