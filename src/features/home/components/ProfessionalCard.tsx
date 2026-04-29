"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/Carousel/CarouselArrowButtons";
import type { IProfessional } from "@/types/professional";

type ProfessionalCardProps = {
  professionals: IProfessional[];
  isLoading: boolean;
  isError: boolean;
};

export const ProfessionalCard = ({ professionals, isLoading, isError }: ProfessionalCardProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>Erro ao carregar profissionais.</div>;

  const renderCard = (professionalItem: (typeof professionals)[number]) => (
    <div
      className="professional-card flex h-full max-h-[530px] cursor-pointer flex-col gap-4"
    >
      <div className="relative flex h-[160px] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        {professionalItem.image ? (
          <Image
            className="h-full w-full object-cover"
            src={professionalItem.image}
            alt="profissional"
            width={240}
            height={160}
          />
        ) : (
          <FaUser className="text-6xl text-gray-300" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between">
          <p className="w-full truncate font-semibold text-2xl">{professionalItem.name}</p>
          <div className="flex items-center gap-1">
            {professionalItem.rating != null && (
              <>
                <span className="font-semibold">
                  {Number.isInteger(professionalItem.rating)
                    ? `${professionalItem.rating}.0`
                    : professionalItem.rating}
                </span>
                <MdStarRate className="text-yellow-400" />
              </>
            )}
            {professionalItem.reviews != null && (
              <span className="text-gray-600 text-sm">({professionalItem.reviews} avaliações)</span>
            )}
          </div>
        </div>
        {(professionalItem.price != null || professionalItem.distance != null) && (
          <span className="text-gray-600 text-sm">
            {professionalItem.price != null && `R$ ${professionalItem.price}`}
            {professionalItem.price != null && professionalItem.distance != null && " | "}
            {professionalItem.distance != null && `${professionalItem.distance} Km`}
          </span>
        )}
      </div>
      <div className="max-h-[50px] min-h-[50px]">
        <div className="flex flex-wrap gap-2">
          <div className="rounded-full border border-secondary-500 px-2 py-1 text-xs">
            {professionalItem.specialization}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <Link
          href={`/profissional/${professionalItem.id}`}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-primary-500 px-4 font-[lato] font-bold text-base text-lime-500 hover:bg-primary-800"
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
        <section className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {professionals?.map((professionalItem) => (
              <div
                className="flex flex-shrink-0 flex-grow-0 basis-full justify-center"
                key={professionalItem.id}
              >
                {renderCard(professionalItem)}
              </div>
            ))}
          </div>
        </section>

        <PrevButton
          onClick={onPrevButtonClick}
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2"
        />
        <NextButton
          onClick={onNextButtonClick}
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2"
        />
      </div>

      {/* Tablet/Desktop: layout original em múltiplas colunas */}
      <div className="hidden flex-wrap justify-start gap-6 md:flex">
        {professionals?.map((professionalItem) => renderCard(professionalItem))}
      </div>
    </>
  );
};
