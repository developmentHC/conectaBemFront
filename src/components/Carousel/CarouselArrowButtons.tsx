import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import ArrowLeftCircleIcon from '../../../public/images/arrow-left-circle'
import { ArrowRightIcon } from '../../../public/images/arrow-right'

type UsePrevNextButtonsType = {
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [, setPrevBtnDisabled] = useState(true)
  const [, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { ...restProps } = props

  return (
    <button
      className="mx-2"
      type="button"
      {...restProps}
    >
      <ArrowLeftCircleIcon height={40} width={40} />
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { ...restProps } = props

  return (
    <button
      className="mx-1"
      type="button"
      {...restProps}
    >
      <ArrowRightIcon height={40} width={40} />
    </button>
  )
}
