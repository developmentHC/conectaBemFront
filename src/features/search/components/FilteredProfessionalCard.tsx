"use client";

import Image from "next/image";
import { MdStarRate } from "react-icons/md";
import { IProfessional } from "@/types/professional";

type ProfessionalCardProps = {
  professional: IProfessional;
};

export const FilteredProfessionalCard = ({
  professional,
}: ProfessionalCardProps) => {
  if (!professional) return null;

  return (
    <div className="bg-gray-50 rounded-lg shadow-md cursor-pointer max-h-[250px] w-full overflow-hidden ">
      <div className="flex flex-row h-full my-4 mx-6 gap-8">
        <img
          className="rounded-lg max-w-[80px] lg:max-w-[160px] max-h-[80px] lg:max-h-[160px] object-cover"
          src={professional.image || ""}
          alt="profissional"
          width={240}
          height={160}
        />
        <div className="flex flex-col">
          <p className="text-2xl font-semibold w-40 truncate sm:w-full">
            {professional.name}
          </p>
          <div className="flex gap-1 items-center">
            <span className="font-semibold">
              {Number.isInteger(professional.rating)
                ? `${professional.rating}.0`
                : professional.rating}
            </span>
            <MdStarRate className="text-yellow-400" />
            <span className="text-sm text-gray-400">
              ({professional.reviews} avaliações)
            </span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-gray-500 text-sm">
              {professional.specialization}
            </span>
            <span className="text-gray-500 text-sm">
              R$ {professional.price}{" "}
              {professional.distance !== undefined && (
                <>| {professional.distance} Km</>
              )}
            </span>
          </div>
          <div className="min-h-[30px] max-h-[60px] mt-2 hidden lg:flex">
            <div className="flex flex-row gap-2 flex-wrap">
              {professional.preferablyServices.slice(0, 2).map((service) => (
                <div
                  key={service.id}
                  className="border border-blue-600 px-2 py-1 rounded-full text-xs"
                >
                  {service.name}
                </div>
              ))}
              {professional.preferablyServices.length > 2 && (
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-all">
                  + ver mais
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[30px] max-h-[60px] flex my-4 mx-6 lg:hidden">
        <div className="flex flex-row gap-2 flex-wrap">
          {professional.preferablyServices.slice(0, 2).map((service) => (
            <div
              key={service.id}
              className="border border-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {service.name}
            </div>
          ))}
          {professional.preferablyServices.length > 2 && (
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-all">
              + ver mais
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
