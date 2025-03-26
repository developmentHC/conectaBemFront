import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image";

type PropType = {
  slides: object[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="">
      <div className="flex">
        <PrevButton onClick={onPrevButtonClick} />

        <section className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slides, index) => (
              <div className="basis-[32%] md:basis-[14%] lg:basis-[24%] flex-shrink-0 flex-grow-0 flex flex-col space-y-3 items-center" key={index}>
                <div className="bg-[#F8FAFF] rounded-lg p-3 h-[80px] flex shadow-sm shadow-[#919EAB29]">
                  <Image src={slides.img} alt={""} width={70} height={70} />
                </div>
                <p className="text-sm font-normal">{slides.title}</p>
              </div>
            ))}
          </div>
        </section>
        <NextButton onClick={onNextButtonClick} />
      </div>
    </div>
  )
}

export default EmblaCarousel
