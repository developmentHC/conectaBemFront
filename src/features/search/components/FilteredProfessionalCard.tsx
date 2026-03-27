"use client";

import Image from "next/image";
import { MdStarRate } from "react-icons/md";
import type { IProfessional } from "@/types/professional";

type ProfessionalCardProps = {
  professional: IProfessional;
};

export const FilteredProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  if (!professional) return null;

  return (
    <div className="max-h-[250px] w-full cursor-pointer overflow-hidden rounded-lg bg-gray-50 shadow-md">
      <div className="mx-6 my-4 flex h-full flex-row gap-8">
        <Image
          className="max-h-[80px] max-w-[80px] rounded-lg object-cover lg:max-h-[160px] lg:max-w-[160px]"
          src={professional.image || ""}
          alt="profissional"
          width={240}
          height={160}
        />
        <div className="flex flex-col">
          <p className="w-40 truncate font-semibold text-2xl sm:w-full">{professional.name}</p>
          <div className="flex items-center gap-1">
            <span className="font-semibold">
              {Number.isInteger(professional.rating)
                ? `${professional.rating}.0`
                : professional.rating}
            </span>
            <MdStarRate className="text-yellow-400" />
            <span className="text-gray-400 text-sm">({professional.reviews} avaliações)</span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-gray-500 text-sm">{professional.specialization}</span>
            <span className="text-gray-500 text-sm">
              R$ {professional.price}{" "}
              {professional.distance !== undefined && <>| {professional.distance} Km</>}
            </span>
          </div>
          <div className="mt-2 hidden max-h-[60px] min-h-[30px] lg:flex">
            <div className="flex flex-row flex-wrap gap-2">
              {professional.preferablyServices.slice(0, 2).map((service) => (
                <div
                  key={service.id}
                  className="rounded-full border border-blue-600 px-2 py-1 text-xs"
                >
                  {service.name}
                </div>
              ))}
              {professional.preferablyServices.length > 2 && (
                <button
                  type="button"
                  className="text-blue-600 text-sm transition-all hover:text-blue-800"
                >
                  + ver mais
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 my-4 flex max-h-[60px] min-h-[30px] lg:hidden">
        <div className="flex flex-row flex-wrap gap-2">
          {professional.preferablyServices.slice(0, 2).map((service) => (
            <div key={service.id} className="rounded-full border border-blue-600 px-2 py-1 text-xs">
              {service.name}
            </div>
          ))}
          {professional.preferablyServices.length > 2 && (
            <button
              type="button"
              className="text-blue-600 text-sm transition-all hover:text-blue-800"
            >
              + ver mais
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
