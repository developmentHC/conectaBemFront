"use client";

import { Button, Divider, Rating, styled } from "@mui/material";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import ArrowLeftIcon from "../../../public/images/arrow-left";
import ArrowRightIcon from "../../../public/images/arrow-right";
import InformationIcon from "../../../public/images/info";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { CheckIcon } from "../../../public/images/check";
import { Services } from "@/components/Services";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/Carousel/Carousel";

export default function HomePage() {
  const OPTIONS: EmblaOptionsType = { align: 'start', dragFree: true, loop: true };
  const SLIDES_PAYMENTS = [
    { img: 'images/pix.svg', title: 'Pix' },
    { img: 'images/wellhub.svg', title: 'Wellhub' },
    { img: 'images/master-card.svg', title: 'Master Card' },
    { img: 'images/visa.svg', title: 'Visa' },
    { img: 'images/pix.svg', title: 'Pix' },
    { img: 'images/wellhub.svg', title: 'Wellhub' },
    { img: 'images/master-card.svg', title: 'Master Card' },
    { img: 'images/visa.svg', title: 'Visa' },
    { img: 'images/pix.svg', title: 'Pix' },
    { img: 'images/wellhub.svg', title: 'Wellhub' },
    { img: 'images/master-card.svg', title: 'Master Card' },
    { img: 'images/visa.svg', title: 'Visa' },
  ]
  const SLIDES_MEDICAL_INSURANCE = [
    { img: 'images/bradesco-seguros.svg', title: 'Bradesco Seguros' },
    { img: 'images/amil.svg', title: 'Amil' },
    { img: 'images/sul-america.svg', title: 'Sul America' },
    { img: 'images/assim-seguros.svg', title: 'Assim' },
    { img: 'images/bradesco-seguros.svg', title: 'Bradesco Seguros' },
    { img: 'images/amil.svg', title: 'Amil' },
    { img: 'images/sul-america.svg', title: 'Sul America' },
    { img: 'images/assim-seguros.svg', title: 'Assim' },
    { img: 'images/bradesco-seguros.svg', title: 'Bradesco Seguros' },
    { img: 'images/amil.svg', title: 'Amil' },
    { img: 'images/sul-america.svg', title: 'Sul America' },
    { img: 'images/assim-seguros.svg', title: 'Assim' },
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

  return (
    <div className="">
      <div className="lg:flex lg:justify-between lg:px-8">
        <div className="lg:max-w-xl xl:max-w-3xl 2xl:max-w-5xl lg:space-y-14">
          <div
            id="profile"
            className="bg-[#E7EBFE] p-6 space-y-4 rounded-b-2xl lg:rounded-2xl"
          >
            <div className="flex space-x-4">
              <div className="">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhlLTwoadT8WVh1TpUf9KBablyaDUi19GGQ&s"
                  alt="fdafs"
                  className="rounded-lg h-24 w-48 object-center object-cover"
                />
              </div>
              <div>
                <h1 className="text-[#3857F4] text-3xl font-bold">
                  Jardel Silva
                </h1>
                <div className="space-x-3">
                  <span className="text-base font-bold">5.0</span>
                  <span className="text-[#B1ACB9]">1050 avaliações</span>
                </div>
                <div>
                  <span className="text-[#B1ACB9]">Fisioterapia</span>
                </div>
                <div className="space-x-2">
                  <span className="text-[#B1ACB9]">$$$</span>
                  <span className="text-[#B1ACB9]">|</span>
                  <span className="text-[#B1ACB9]">0.25km</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-2">
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Quiropraxia
              </span>
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Libras
              </span>
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Certificado XYZ
              </span>
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Sala individual
              </span>
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Inglês
              </span>
            </div>
            <div className="flex justify-end">
              <button className="text-[#3857F4]">+ ver mais</button>
            </div>
            <div>
              <p className="text-[#3857F4]">
                "Especializado em técnicas de ajuste vertebral e tratamentos
                para alívio de dores crônicas, tensão muscular e problemas de
                postura.”
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
            </div>
          </div>
          <div id="about" className="lg:bg-[#F8FAFF] py-8 px-6 rounded-2xl space-y-8">
            <div className="space-y-6">
              <h1 className="font-bold text-2xl">Sobre o profissional</h1>
              <p className="text-base font-normal">
                "Sou [Nome], quiroprata com [X anos] de experiência,
                especializado em técnicas de ajuste vertebral e tratamentos para
                alívio de dores crônicas, tensão muscular e problemas de
                postura. Meu objetivo é proporcionar uma melhora significativa
                na sua qualidade de vida, através de cuidados personalizados que
                restauram o equilíbrio do corpo. Acredito na importância da
                saúde integral e estou comprometido em oferecer um atendimento
                humanizado e eficaz para promover seu bem-estar."
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
                <span className="block max-w-[404px] px-4 py-2.5 bg-white rounded-lg shadow-[#919EAB29] shadow-md">
                  Rua Fulaninho, 000. Cidade, Estado
                </span>
              </div>
            </div>
            <div id="payment-methods" className="space-y-6">
              <h1 className="font-bold text-2xl">Métodos de Pagamento</h1>
              <div className="space-y-2">
                <EmblaCarousel slides={SLIDES_PAYMENTS} options={OPTIONS} />
                <div className="flex lg:justify-center lg:items-center space-x-1">
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
                <div className="flex lg:justify-center lg:items-center space-x-1">
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
                <Services
                  title="2 serviços pelo preço de 1"
                  duration="100 min"
                  price="R$ 3.500,00"
                  description="Esta promoção é composta pelos serviços disponíveis até o valor de R$ 500. Adicionar aqui todas as condições para o usuário resgatar a promoção."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-6 lg:mx-0 pt-10 lg:pt-0 space-y-24 flex flex-col items-center">
          <div className="flex flex-col lg:max-w-[320px] w-fit lg:w-full space-y-6 items-center lg:items-start">
            <h1 className="font-bold text-2xl">Serviços</h1>
            <div className="space-y-4">
              <Services
                title="Ajustes Quiropráticos"
                duration="90 min"
                price="R$ 1.500,00"
                description="O serviço de ajustes quiropráticos consiste em técnicas manuais e específicas para alinhar a coluna vertebral e outras articulações do corpo, com o objetivo de melhorar a função do sistema nervoso e aliviar dores."
              />
              <Services
                title="Alinhamento de Coluna"
                duration="120 min"
                price="R$ 520,00"
                description="O serviço de ajustes quiropráticos consiste em técnicas manuais e específicas para alinhar a coluna vertebral e outras articulações do corpo, com o objetivo de melhorar a função do sistema nervoso e aliviar dores."
              />
              <Services
                title="Correção Postural"
                duration="120 min"
                price="R$ 250,00"
                description="O serviço de ajustes quiropráticos consiste em técnicas manuais e específicas para alinhar a coluna vertebral e outras articulações do corpo, com o objetivo de melhorar a função do sistema nervoso e aliviar dores."
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start lg:max-w-[320px] w-full space-y-6">
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
                    value={96}
                  />
                  <span>4.8</span>
                </div>
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <span>acessibilidade</span>
                  <BorderLinearProgress
                    className="w-[61px]"
                    variant="determinate"
                    value={98}
                  />
                  <span>4.9</span>
                </div>
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <span>atendimento</span>
                  <BorderLinearProgress
                    className="w-[61px]"
                    variant="determinate"
                    value={50}
                  />
                  <span>4.8</span>
                </div>
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <span>atendimento</span>
                  <BorderLinearProgress
                    className="w-[61px]"
                    variant="determinate"
                    value={50}
                  />
                  <span>4.8</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex font-normal items-center justify-center text-sm px-4 py-1.5 border border-[#253E99] rounded-full">
                <p>Relevantes</p>
              </div>
              <div className="flex justify-center items-center font-normal text-sm px-2 py-1.5 border border-[#253E99] rounded-full bg-[#A5B4E9] space-x-1">
                <CheckIcon width={12} height={9} fill="#000" />
                <p>Recentes</p>
              </div>
              <div className="flex font-normal text-sm px-4 py-1.5 border border-[#253E99] rounded-full">
                <p>Melhores Avaliações</p>
              </div>
              <div className="flex font-normal text-sm px-4 py-1.5 border border-[#253E99] rounded-full">
                <p>Piores avaliações</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center py-2">
                <Image
                  className="rounded-full object-cover"
                  src={"/images/senhorjorge.jpg"}
                  alt={""}
                  width={50}
                  height={50}
                />
                <h6>Xin Yue</h6>
              </div>
              <div>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                />
              </div>
            </div>
            <div className="space-t-4 space-x-5">
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Quiropraxia
              </span>
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Pontual
              </span>
              <span className="p-2 border rounded-e-lg rounded-t-lg border-[#253E99] text-sm">
                Didático
              </span>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[#645D6F]">21 de outubro de 2024 - 11h30</p>
            <p>Recentemente tive uma boa experiência com o doutor fulano. O fulano escutou atentamente as minhas dúvidas e explicou os detalhes necessários para o exame. Me senti confortável e confiante.</p>
          </div>
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
