"use client";

import { MdStarRate, MdPayments, MdCheckCircle } from "react-icons/md";
import { IProfessional } from "@/types/professional";
import Image from "next/image";
import { getAvatarUrl } from "@/utils/avatar";
import Link from "next/link";

type ProfessionalCardProps = {
  professional: IProfessional;
};

export const FilteredProfessionalCard = ({
  professional,
}: ProfessionalCardProps) => {
  if (!professional) return null;

  const {
    name,
    imageUrl,
    ratingsAvg,
    ratingsCount,
    professionalSpecialties = [],
    clinic,
    acceptedPayments,
    professionalServicePreferences = [],
    _id
  } = professional;

  const location = clinic?.city && clinic?.state 
    ? `${clinic.city} - ${clinic.state}`
    : "Localização não informada";

  const paymentsList = acceptedPayments 
    ? Object.entries(acceptedPayments)
        .filter(([_, value]) => value === true)
        .map(([key]) => key)
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full p-4 mb-4">
      <div className="flex flex-row gap-6">
        <div className="relative min-w-[140px] h-[140px] lg:min-w-[180px] lg:h-[180px]">
          <Image
            className="rounded-xl object-cover"
            src={imageUrl || getAvatarUrl(name)}
            alt={name}
            fill
            sizes="(max-width: 768px) 140px, 180px"
          />
        </div>

        <div className="flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-[#2B478B] text-2xl font-bold truncate">
              {name}
            </h3>

            <div className="flex items-center gap-1 mt-1">
              <span className="font-bold text-gray-800 text-lg">
                {(ratingsAvg || 0).toFixed(1)}
              </span>
              <MdStarRate className="text-yellow-400 text-xl" />
              <span className="text-sm text-gray-400">
                ({ratingsCount || 0} avaliações)
              </span>
            </div>

            <div className="flex flex-col gap-0.5 mt-1">
              <span className="text-gray-600 font-medium text-sm truncate">
                {clinic?.name || "Clínica Independente"}
              </span>
              <span className="text-gray-400 text-xs">
                {location}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 max-w-[400px]">
            {professionalSpecialties?.length > 0 ? (
              professionalSpecialties.slice(0, 4).map((spec, index) => (
                <div
                  key={`${_id}-spec-${index}`}
                  className="border border-[#2B478B] text-[#2B478B] text-center py-1.5 px-2 rounded-2xl text-xs font-medium truncate"
                >
                  {spec}
                </div>
              ))
            ) : (
              <div className="text-gray-300 text-xs italic">
                Nenhuma especialidade listada
              </div>
            )}
          </div>

          {professionalServicePreferences.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {professionalServicePreferences.map((pref, index) => (
                <div 
                  key={`pref-${index}`}
                  className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg border border-green-100 text-[11px] font-bold uppercase tracking-wider"
                >
                  <MdCheckCircle size={14} className="text-green-500" />
                  {pref}
                </div>
              ))}
            </div>
          )}

          {paymentsList.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                <MdPayments size={14} />
              </span>
              <div className="flex gap-1.5">
                {paymentsList.map((method) => (
                  <span 
                    key={method} 
                    className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Link 
            href={`/professional/${_id}`} 
            className="w-full block"
          >
            <button className="w-full bg-[#4353FF] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors mt-4">
              Ver Perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};