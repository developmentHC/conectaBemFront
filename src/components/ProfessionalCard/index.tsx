import Image from "next/image";
import { Preferences } from "./Preferences";
import { ProfessionalData } from "./ProfessionalData";
import { IProfessional } from "@/types/professional";
import { ProfessionalContextProvider } from "./ProfessionalContext";

type ProfessionalCardProps = {
  professional: IProfessional;
};

export const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  return (
    <ProfessionalContextProvider professional={professional}>
      <div className="bg-white w-full px-6 py-4 flex flex-col gap-6 rounded-lg cursor-pointer">
        <div className="flex gap-8 lg:flex-row">
          <Image
            className="rounded-lg w-full max-w-[80px] max-h-[80px] lg:max-w-[160px] lg:max-h-[160px]"
            src={professional.image || ""}
            width={80}
            height={80}
            alt="teste"
          />
          <div className="flex flex-col gap-[11px] w-full">
            <ProfessionalData />
            <div className="flex gap-3 flex-wrap w-fit h-fit">
              <Preferences />
              <button className="text-sm text-blue-600 hover:text-blue-800 transition-all">
                + ver mais
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalContextProvider>
  );
};
