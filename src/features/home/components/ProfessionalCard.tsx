"use client";

import Image from "next/image";
import { MdStarRate } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useProfessional } from "../hooks/useProfessional";
import { useMemo } from "react";
import { filterAndSortProfessionals } from "@/utils/filterProfessionals";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/Carousel/CarouselArrowButtons";

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

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>Erro</div>;

  const renderCard = (professionalItem: (typeof professionals)[number], index: number) => (
    <div
      key={professionalItem.id ?? index}
      className="flex flex-col gap-4 cursor-pointer h-full max-h-[530px] professional-card"
    >
      <div className="relative w-full h-[160px] flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
        {professionalItem.image ? (
          <Image
            className="object-cover w-full h-full"
            src={professionalItem.image}
            alt="profissional"
            width={240}
            height={160}
          />
        ) : (
          <FaUser className="text-gray-300 text-6xl" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-2xl font-semibold w-full truncate">
            {professionalItem.name}
          </p>
          <div className="flex gap-1 items-center">
            <span className="font-semibold">
              {Number.isInteger(professionalItem.rating)
                ? `${professionalItem.rating}.0`
                : professionalItem.rating}
            </span>
            <MdStarRate className="text-yellow-400" />

            <span className="text-sm text-gray-600">
              ({professionalItem.reviews} avaliações)
            </span>
          </div>
        </div>
        <span className="text-gray-600 text-sm">
          {professionalItem.price} | {professionalItem.distance} Km
        </span>
      </div>
      <div className="min-h-[50px] max-h-[50px]">
        <div className="flex gap-2 flex-wrap">
          <div className="border border-blue-600 px-2 py-1 rounded-full text-xs">
            {professionalItem.specialization}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full ">
        <Link
          href={`/profissional/${professionalItem.id}`}
          className="bg-[#3857F4] w-full h-12 text-[#D7FF7B] px-4 rounded-lg hover:bg-blue-700 font-[lato] font-bold text-base flex items-center justify-center"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: carrossel com 1 card visível e setas */}
      <div className="relative w-full md:hidden">
        <section className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex">
            {professionals?.map((professionalItem, index) => (
              <div
                className="basis-full flex-shrink-0 flex-grow-0 flex justify-center"
                key={professionalItem.id ?? index}
              >
                {renderCard(professionalItem, index)}
              </div>
            ))}
          </div>
        </section>

        <PrevButton
          onClick={onPrevButtonClick}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
        />
        <NextButton
          onClick={onNextButtonClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
        />
      </div>

      {/* Tablet/Desktop: layout original em múltiplas colunas */}
      <div className="hidden md:flex gap-6 flex-wrap justify-start">
        {professionals?.map((professionalItem, index) => renderCard(professionalItem, index))}
      </div>
    </>
  );
};
