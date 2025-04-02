"use client";

import Image from "next/image";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { mock } from "./mock";
import { Button, Rating, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/Carousel/Carousel";
import { Services } from "@/components/Services";
import { InformationIcon, CheckIcon, StarIcon, HeartIcon } from "@/../public/images";
import { ArrowLeftIcon } from "../../../../public/images";
import dynamic from "next/dynamic";

const DateCalendar = dynamic(
  () =>
    import('@mui/x-date-pickers/DateCalendar').then(
      (mod) => mod.DateCalendar
    ),
  { ssr: false }
);

interface Slide {
  img: string;
  title: string;
}

export default function HomePage() {
  const OPTIONS: EmblaOptionsType = { align: 'start', dragFree: true, loop: true };
  const [showAllServices, setShowAllServices] = useState(false);
  const SLIDES_PAYMENTS: Slide[] = [
    { img: '../../images/pix.svg', title: 'Pix' },
    { img: '../../images/wellhub.svg', title: 'Wellhub' },
    { img: '../../images/master-card.svg', title: 'Master Card' },
    { img: '../../images/visa.svg', title: 'Visa' },
    { img: '../../images/pix.svg', title: 'Pix' },
    { img: '../../images/wellhub.svg', title: 'Wellhub' },
    { img: '../../images/master-card.svg', title: 'Master Card' },
    { img: '../../images/visa.svg', title: 'Visa' },
    { img: '../../images/pix.svg', title: 'Pix' },
    { img: '../../images/wellhub.svg', title: 'Wellhub' },
    { img: '../../images/master-card.svg', title: 'Master Card' },
    { img: '../../images/visa.svg', title: 'Visa' },
  ]
  const SLIDES_MEDICAL_INSURANCE: Slide[] = [
    { img: '/images/bradesco-seguros.png', title: 'Bradesco Seguros' },
    { img: '../../images/amil.svg', title: 'Amil' },
    { img: '../../images/sul-america.svg', title: 'Sul America' },
    { img: '../../images/assim-seguros.svg', title: 'Assim' },
    { img: '/images/bradesco-seguros.png', title: 'Bradesco Seguros' },
    { img: '../../images/amil.svg', title: 'Amil' },
    { img: '../../images/sul-america.svg', title: 'Sul America' },
    { img: '../../images/assim-seguros.svg', title: 'Assim' },
    { img: '/images/bradesco-seguros.png', title: 'Bradesco Seguros' },
    { img: '../../images/amil.svg', title: 'Amil' },
    { img: '../../images/sul-america.svg', title: 'Sul America' },
    { img: '../../images/assim-seguros.svg', title: 'Assim' },
  ]
  const [date, setDate] = useState<Dayjs>(dayjs());
  const BorderLinearProgress = styled(LinearProgress)({
    height: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#bec6dc",
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: "#253E99",
    },
  });
  const servicesToShow = showAllServices ? mock.services : mock.services.slice(0, 3);

  return (
    <div className="">
      <div className="lg:flex lg:justify-between lg:px-8 xl:justify-center xl:gap-28">
        <div className="lg:max-w-xl xl:max-w-2xl lg:space-y-14">
          <div
            id="profile"
            className="bg-[#E7EBFE] p-6 space-y-4 rounded-b-2xl lg:rounded-2xl relative"
          >
            <div className="flex justify-between">
              <button
                className="lg:hidden"
              >
                <ArrowLeftIcon height={33} width={33} />
              </button>
              <button
                className="lg:hidden"
              >
                <HeartIcon className="fill-[#3857F4]" height={33} width={33} />
              </button>
            </div>
            <div className="flex space-x-4">
              <div className="">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhlLTwoadT8WVh1TpUf9KBablyaDUi19GGQ&s"
                  alt=""
                  className="rounded-lg h-24 w-48 object-center object-cover"
                />
              </div>
              <div>
                <h1 className="text-[#3857F4] text-3xl font-bold">
                  {mock.professional.name}
                </h1>
                <div className="space-x-1 flex items-center">
                  <span className="text-base font-bold">{mock.professional.rating}</span>
                  <StarIcon className="fill-[#F6CE18]" width={19} height={19} />
                  <span className="text-[#B1ACB9]">({mock.professional.reviews_count})</span>
                </div>
                <div>
                  {mock.professional.specialization.map((specialization) => (
                    <span key={specialization} className="text-[#B1ACB9]">{specialization}</span>
                  ))}
                </div>
                <div className="space-x-2">
                  <span className="text-[#B1ACB9]">{mock.professional.price_range}</span>
                  <span className="text-[#B1ACB9]">|</span>
                  <span className="text-[#B1ACB9]">{mock.professional.distance}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-2">
              {mock.professional.qualifications.map((qualification) => (
                <span key={qualification} className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                  {qualification}
                </span>
              ))}
            </div>
            {/* <div className="flex justify-end">
              <button className="text-[#3857F4]">+ ver mais</button>
            </div> */}
            <div>
              <p className="text-[#3857F4]">
                {mock.professional.description}
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="text-[#D7FF7B] text-sm font-semibold"
              >
                Agendar atendimento
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className="border-[#253E99] text-[#253E99] text-sm font-semibold"
              >
                Falar Com Profissional
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className="border-[#253E99] text-[#253E99] text-sm font-semibold hidden lg:flex gap-2"
              >
                <HeartIcon className="fill-[#253E99]" height={24} width={24} />
                Adicionar Profissional aos Favoritos
              </Button>
            </div>
          </div>
          <div id="about" className="lg:bg-[#F8FAFF] py-8 px-6 rounded-2xl space-y-8">
            <div className="space-y-6">
              <h1 className="font-bold text-2xl">Sobre o profissional</h1>
              <p className="text-base font-normal">
                {mock.professional.about_the_professional}
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="font-bold text-2xl">Endereço</h1>
                <p className="text-base font-normal">
                  O profissional atende nos seguintes endereços:
                </p>
              </div>
              <div className="space-y-4">
                {mock.professional.address.map((address) => (
                  <span key={address} className="block max-w-[404px] px-4 py-2.5 bg-white rounded-lg shadow-[#919EAB29] shadow-md">
                    {address}
                  </span>
                ))}
              </div>
            </div>
            <div id="payment-methods" className="space-y-6">
              <h1 className="font-bold text-2xl">Métodos de Pagamento</h1>
              <div className="space-y-2">
                <EmblaCarousel slides={SLIDES_PAYMENTS} options={OPTIONS} />
                <div className="flex lg:items-center space-x-2">
                  <InformationIcon height={20} width={20} />
                  <p className="text-[#645D6F] text-sm font-normal">
                    A plataforma não se responsabiliza por transações
                    financeiras.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="font-bold text-2xl">Convênios aceitos</h1>
              <div className="space-y-2">
                <EmblaCarousel slides={SLIDES_MEDICAL_INSURANCE} options={OPTIONS} />
                <div className="flex lg:items-center space-x-2">
                  <InformationIcon height={20} width={20} />
                  <p className="text-[#645D6F] text-sm font-normal">
                    A plataforma não se responsabiliza por transações
                    financeiras ou administrativas com planos de saúde.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 flex flex-col items-center lg:items-start">
              <h1 className="font-bold text-2xl">Pacotes Promocionais</h1>
              <div className="space-y-4">
                {mock.promotional_packages.map((promotional_package) => (
                  <Services
                    key={promotional_package.name}
                    title={promotional_package.name}
                    duration={promotional_package.duration}
                    price={promotional_package.price}
                    description={promotional_package.description}
                    className="w-[290px] sm:w-[400px] lg:w-[500px] xl:w-[600px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-6 lg:mx-0 pt-10 lg:pt-0 space-y-20 flex flex-col items-center">
          <div className="flex flex-col lg:max-w-[320px] w-fit lg:w-full space-y-6 items-center lg:items-start">
            <h1 className="font-bold text-2xl">Serviços</h1>
            <div className="space-y-4">
              {servicesToShow.map((service) => (
                <Services
                  key={service.name}
                  title={service.name}
                  duration={service.duration}
                  price={service.price}
                  description={service.description}
                  className="w-[290px] sm:w-[400px] lg:w-[300px]"
                />
              ))}

              {mock.services.length > 3 && (
                <button
                  onClick={() => setShowAllServices((prev) => !prev)}
                  className="text-[#3857F4] text-sm"
                >
                  {showAllServices ? '- ver menos' : '+ ver mais'}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start lg:max-w-[320px] w-full space-y-6 sticky top-8">
            <div className="space-y-2">
              <h1 className="font-bold text-2xl">Horários Disponíveis</h1>
              <p>Selecione a melhor data para você:</p>
            </div>
            <div className="lg:bg-[#EAEEFA] rounded-lg">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div className="hidden lg:block bg-[#EAEEFA] py-11 px-6 rounded-lg space-y-8">
              <h3 className="font-normal text-xl text-[#1D1B20]">
                Gostaria de agendar um horário?
              </h3>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="text-[#D7FF7B] text-base font-semibold w-full"
              >
                Agendar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-0 bg-[#F8FAFF] rounded-lg py-10 mt-9">
        <div className="space-y-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">Avaliações</h1>
          <div className="space-y-8">
            <div className="flex space-x-4">
              <div className="flex flex-col justify-center items-center">
                <h6 className="text-5xl font-bold">4.8</h6>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <span>atendimento</span>
                  <BorderLinearProgress
                    className="w-[61px]"
                    variant="determinate"
                    value={mock.reviews.categories.atendimento * 10 * 2}
                  />
                  <span>{mock.reviews.categories.atendimento}</span>
                </div>
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <span>acessibilidade</span>
                  <BorderLinearProgress
                    className="w-[61px]"
                    variant="determinate"
                    value={mock.reviews.categories.acessibilidade * 10 * 2}
                  />
                  <span>{mock.reviews.categories.acessibilidade}</span>
                </div>
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <span>instalações</span>
                  <BorderLinearProgress
                    className="w-[61px]"
                    variant="determinate"
                    value={mock.reviews.categories.instalacoes * 10 * 2}
                  />
                  <span>{mock.reviews.categories.instalacoes}</span>
                </div>
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <span>outros</span>
                  <BorderLinearProgress
                    className="w-[61px]"
                    variant="determinate"
                    value={mock.reviews.categories.outros * 10 * 2}
                  />
                  <span>{mock.reviews.categories.outros}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              <div className="flex font-normal items-center justify-center text-sm px-4 py-1.5 border border-[#253E99] rounded-full">
                <p>Relevantes</p>
              </div>
              <div className="flex justify-center items-center font-normal text-sm px-2 py-1.5 border border-[#253E99] rounded-full bg-[#A5B4E9] space-x-1">
                <CheckIcon width={12} height={9} fill="#000" />
                <p>Recentes</p>
              </div>
              <div className="flex font-normal text-sm px-4 py-1.5 border border-[#253E99] rounded-full whitespace-nowrap">
                <p>Melhores Avaliações</p>
              </div>
              <div className="flex font-normal text-sm px-4 py-1.5 border border-[#253E99] rounded-full whitespace-nowrap">
                <p>Piores avaliações</p>
              </div>
            </div>
          </div>
          {mock.reviews.review_details.map((review) => (
            <div className="space-y-4" key={review.author}>
              <div className="flex justify-between">
                <div className="flex space-x-2 items-center py-2">
                  <Image
                    className="rounded-full object-cover"
                    src={"/images/senhorjorge.jpg"}
                    alt={""}
                    width={50}
                    height={50}
                  />
                  <h6>{review.author}</h6>
                </div>
                <div>
                  <Rating
                    name="half-rating-read"
                    defaultValue={review.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
              </div>
              <div className="space-t-4 space-x-5">
                {review.tags.map((tag) => (
                  <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-[#645D6F]">{review.date}</p>
                <p>{review.review}</p>
              </div>
            </div>
          ))}
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className="border-[#253E99] text-[#253E99] text-sm font-semibold w-full"
          >
            Ver Mais Avaliações +
          </Button>
        </div>
      </div>
    </div>
  );
}
