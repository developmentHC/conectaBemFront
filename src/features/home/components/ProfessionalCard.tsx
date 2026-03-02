"use client";

import Image from "next/image";
import { MdStarRate } from "react-icons/md";
import { FaUser } from "react-icons/fa";
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

  const professionals = sortedProfessional.slice(0, 8);

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>Erro</div>;

  return (
    <div className="flex gap-6 overflow-x-auto lg:flex-wrap justify-start">
      {professionals?.map((professional, index) => (
        <div
          key={professional.id ?? index}
          className="flex flex-col gap-4 cursor-pointer h-full max-h-[530px] professional-card"
        >
          <div className="relative w-full h-[160px] flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
            {professional.image ? (
              <Image
                className="object-cover w-full h-full"
                src={professional.image}
                alt="profissional"
                width={240}
                height={160}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  
                }}
              />
            ) : (
              <FaUser className="text-gray-300 text-6xl" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center flex-wrap">
              <p className="text-2xl font-semibold w-full truncate">
                {professional.name}
              </p>
              <div className="flex gap-1 items-center">
                <span className="font-semibold">
                  {Number.isInteger(professional.rating)
                    ? `${professional.rating}.0`
                    : professional.rating}
                </span>
                <MdStarRate className="text-yellow-400" />

                <span className="text-sm text-gray-600">
                  ({professional.reviews} avaliações)
                </span>
              </div>
            </div>
            <span className="text-gray-600 text-sm">
              {professional.price} | {professional.distance} Km
            </span>
          </div>
          <div className="min-h-[50px] max-h-[50px]">
            <div className="flex gap-2 flex-wrap">
              <div className="border border-blue-600 px-2 py-1 rounded-full text-xs">
                {professional.specialization}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full ">
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
