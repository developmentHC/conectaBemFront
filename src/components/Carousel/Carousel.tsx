import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import type React from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselArrowButtons";

interface Slide {
  img: string;
  title: string;
}

type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="">
      <div className="flex">
        <PrevButton onClick={onPrevButtonClick} />

        <section className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slides, index) => (
              <div
                className="flex flex-shrink-0 flex-grow-0 basis-[40%] flex-col items-center space-y-3 sm:basis-[20%] md:basis-[20%] lg:basis-[25%]"
                key={index}
              >
                <div className="flex h-[81px] w-[90px] justify-center rounded-lg bg-[#F8FAFF] shadow-[#919EAB29] shadow-lg">
                  <Image src={slides.img} alt={""} width={70} height={70} />
                </div>
                <p className="text-center font-normal text-sm">{slides.title}</p>
              </div>
            ))}
          </div>
        </section>
        <NextButton onClick={onNextButtonClick} />
      </div>
    </div>
  );
};

export default EmblaCarousel;
