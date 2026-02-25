"use client";

import { MdStarRate } from "react-icons/md";
import { IProfessional } from "@/types/professional";
import Image from "next/image";
import { getAvatarUrl } from "@/utils/avatar";

type ProfessionalCardProps = {
  professional: IProfessional;
};

export const FilteredProfessionalCard = ({
  professional,
}: ProfessionalCardProps) => {
  if (!professional) return null;

  const services = professional.professionalServicePreferences ?? [];
  const specialties =
    professional.professionalSpecialties?.join(", ") ?? "";

  return (
    <div className="bg-gray-50 rounded-lg shadow-md cursor-pointer max-h-[250px] w-full overflow-hidden">
      <div className="flex flex-row h-full my-4 mx-6 gap-8">
        <Image
          className="rounded-lg max-w-[80px] lg:max-w-[160px] max-h-[80px] lg:max-h-[160px] object-cover"
          src={professional.imageUrl || getAvatarUrl(professional.name)}
          alt={professional.name}
          width={240}
          height={160}
        />

        <div className="flex flex-col">
          <p className="text-2xl font-semibold w-40 truncate sm:w-full">
            {professional.name}
          </p>

          <div className="flex gap-1 items-center">
            <span className="font-semibold">
              {Number.isInteger(professional.ratingsAvg)
                ? `${professional.ratingsAvg}.0`
                : professional.ratingsAvg}
            </span>
            <MdStarRate className="text-yellow-400" />
            <span className="text-sm text-gray-400">
              ({professional.ratingsCount} avaliações)
            </span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="text-gray-500 text-sm truncate max-w-[250px]">
              {specialties}
            </span>
          </div>

          <div className="min-h-[30px] max-h-[60px] mt-2 hidden lg:flex">
            <div className="flex flex-row gap-2 flex-wrap">
              {services.slice(0, 2).map((service, index) => (
                <div
                  key={`${professional._id}-service-${index}`}
                  className="border border-blue-600 px-2 py-1 rounded-full text-xs"
                >
                  {service}
                </div>
              ))}

              {services.length > 2 && (
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
          {services.slice(0, 2).map((service, index) => (
            <div
              key={`${professional._id}-service-mobile-${index}`}
              className="border border-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {service}
            </div>
          ))}

          {services.length > 2 && (
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-all">
              + ver mais
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
