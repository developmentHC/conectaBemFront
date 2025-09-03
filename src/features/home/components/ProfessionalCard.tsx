"use client";

import Image from "next/image";
import { MdStarRate } from "react-icons/md";
import { useProfessional } from "../hooks/useProfessional";
import { useMemo } from "react";
import { filterAndSortProfessionals } from "@/utils/filterProfessionals";
import Link from "next/link";

type ProfessionalSectionProps = {
  specialization?: string;
};

export const ProfessionalCard = ({
  specialization,
}: ProfessionalSectionProps) => {
  const { data: professional, isLoading, isError } = useProfessional();

  const sortedProfessional = useMemo(() => {
    return filterAndSortProfessionals(professional, specialization);
  }, [professional, specialization]);

  const professionals = sortedProfessional.slice(0, 10);

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>Erro</div>;

  return (
    <div className="flex gap-4 overflow-x-auto lg:flex-wrap justify-start">
      {professionals?.map((professional) => (
        <div
          key={professional.id}
          className="flex flex-col gap-4 cursor-pointer h-full professional-card"
        >
          <div className="flex justify-center">
            <Image
              className="rounded-lg w-full lg:max-w-[216px] xl:max-w-[260px]"
              src={professional.image || ""}
              alt="profissional"
              width={240}
              height={160}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center flex-wrap">
              <p className="text-2xl font-semibold w-full truncate">
                {professional.name}
              </p>
              <div className="flex gap-1 items-center">
                <span className="font-semibold">{professional.rating}</span>
                <MdStarRate className="text-yellow-400" />

                <span className="text-sm text-gray-600">
                  ({professional.reviews} avaliações)
                </span>
              </div>
            </div>
            <span className="text-gray-600 text-sm">
              {professional.specialization}
            </span>
            <span className="text-gray-600 text-sm">
              R$ {professional.price} | {professional.distance} Km
            </span>
          </div>
          <div className="min-h-[70px] max-h-[70px]">
            <div className="flex gap-3 flex-wrap justify-between">
              {professional.preferablyServices.slice(0, 3).map((service) => (
                <div
                  key={service.id}
                  className="border border-blue-600 p-1 rounded-full text-sm"
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
          <div className="flex justify-between items-center w-full">
            <Link 
              href={`/profissional/${professional.id}`} 
              className="bg-[#3857F4] w-full h-12 text-[#D7FF7B] px-4 rounded-lg hover:bg-blue-700 font-[lato] font-bold text-base flex items-center justify-center"
            >
              Ver perfil
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};