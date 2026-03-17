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
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 lg:w-full md:max-w-[60%] lg:max-w-[50%]">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
                Conecta Bem: <br /> O cuidado que acolhe.
              </h1>
              <span className="text-base md:text-2xl lg:text-3xl">
                Encontre os melhores profissionais de terapias alternativas para você!
              </span>
            </div>
            <div className="hidden md:flex w-full justify-end">
              <Image
                className="w-full max-w-[1000px] h-full max-h-[268px] rounded-xl object-contain"
                alt="logo"
                src="/images/imageHeader.jpg"
                width={1000}
                height={250}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 w-full max-w-[1336px] self-stretch">
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
