"use client";

import Image from "next/image";
import { useState } from "react";
import { mock } from "./mock";
import { InformationIcon, StarIcon } from "@/../public/images";
import { BsArrowReturnRight } from "react-icons/bs";
import { RxAccessibility } from "react-icons/rx";

export default function PerfilProfissional() {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  const toggleService = (id: string) => {
    setSelectedServices(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // ===== FUNÇÕES PARA OS BOTÕES (COMENTADAS PARA IMPLEMENTAÇÃO FUTURA) =====

  // const handleOpenMap = () => {
  //   // Abrir Google Maps com endereço do profissional
  //   const address = mock.professional.address[0];
  //   const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  //   window.open(url, '_blank');
  // };

  // const handleScheduleAppointment = () => {
  //   // Navegar para página de agendamento
  //   // router.push('/scheduling/appointment');
  //   // Ou abrir modal de agendamento
  //   console.log('Serviços selecionados:', Array.from(selectedServices));
  // };

  // const handleViewAllQuestions = () => {
  //   // Navegar para página com todas as perguntas
  //   // router.push(`/professional/${professionalId}/questions`);
  //   console.log('Ver todas as perguntas');
  // };

  // const handleAskQuestion = () => {
  //   // Abrir modal ou navegar para formulário de pergunta
  //   // setShowAskQuestionModal(true);
  //   console.log('Fazer pergunta ao profissional');
  // };

  // const handleViewMoreReviews = () => {
  //   // Navegar para página com todas as avaliações
  //   // router.push(`/professional/${professionalId}/reviews`);
  //   console.log('Ver mais avaliações');
  // };



  const reviewDetails = mock.reviews?.review_details ?? [];
  const reviewCount = reviewDetails.length;

  const averageRating = reviewDetails.length
    ? Number(
      (
        reviewDetails.reduce((sum: number, r: any) => sum + Number(r.rating ?? 0), 0) /
        reviewDetails.length
      ).toFixed(1)
    )
    : 0;



  // helper simples p/ renderizar logos em grid
  const LogoGrid = ({ items }: { items: { img: string; title: string }[] }) => (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((i) => (
        <div
          key={i.title}
          className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-3 h-16"
          title={i.title}
        >
          <Image
            src={i.img}
            alt={i.title}
            width={35}
            height={35}
            className="h-8 w-6 sm:h-10 sm:w-10 object-contain"
          />
        </div>
      ))}
    </div>
  );

  const PAYMENTS = [
    { img: "/images/pix.svg", title: "Pix" },
    { img: "/images/wellhub.svg", title: "Wellhub" },
    { img: "/images/master-card.svg", title: "Master Card" },
    { img: "/images/visa.svg", title: "Visa" },
  ];
  const INSURANCES = [
    { img: "/images/bradesco-seguros.png", title: "Bradesco Seguros" },
    { img: "/images/amil.svg", title: "Amil" },
    { img: "/images/sul-america.svg", title: "Sul América" },
    { img: "/images/assim-seguros.svg", title: "Assim" },
  ];

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[360px] sm:max-w-none mx-auto px-4 sm:px-8 lg:px-10 py-6 space-y-6">

        {/* CARD DO PERFIL  */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <div className="mt-2 rounded-lg p-4 border border-slate-200 bg-white w-full">
            <div className="flex flex-col gap-4">

              {/* FOTO E INFORMAÇÕES - LADO A LADO NO MOBILE */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/professional/man (1).jpeg"
                    alt={mock.professional.name}
                    width={140}
                    height={140}
                    className="w-26 h-30 sm:w-32 sm:h-32 rounded-lg object-cover"
                  />
                </div>

                {/* BLOCO DE INFORMAÇÕES */}
                <div className="flex flex-col justify-between min-w-0 flex-1">
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
                      {mock.professional.name}
                    </h1>

                    <div className="mt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{mock.professional.rating}</span>
                        <StarIcon className="fill-[#F6CE18]" width={18} height={18} />
                      </div>
                      <span className="text-slate-500 text-sm">
                        ({mock.professional.reviews_count} avaliações)
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-slate-500">
                      {mock.professional.specialization.map((s) => (
                        <span key={s} className="text-sm">{s}</span>
                      ))}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-slate-500 text-sm">
                      <span>{mock.professional.price_range}</span>
                      <span>•</span>
                      <span>{mock.professional.distance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUALIFICAÇÕES - EMBAIXO NO MOBILE */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {mock.professional.qualifications.map((q) => (
                  <span
                    key={q}
                    className="rounded-full border border-indigo-700 px-3 py-1 text-sm text-slate-900"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* SOBRE O PROFISSIONAL */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Sobre o Profissional</h2>

          <p className="mt-6 text-slate-700">
            {showFullAbout
              ? mock.professional.about_the_professional
              : mock.professional.about_the_professional.slice(0, 310) +
              (mock.professional.about_the_professional.length > 310 ? "..." : "")
            }
          </p>

          {mock.professional.about_the_professional.length > 310 && (
            <div className="mt-2 flex justify-end">
              {/* onClick já implementado - expandir/recolher descrição */}
              <button
                type="button"
                className="text-sm font-medium text-[#253E99] underline flex items-center gap-1"
                onClick={() => setShowFullAbout((v) => !v)}
              >
                {!showFullAbout && <span className="font-bold">+</span>}
                {showFullAbout ? "Ver menos" : "Ver mais"}
              </button>
            </div>
          )}
        </section>


        {/* MÉTODOS DE PAGAMENTO */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Métodos de Pagamento</h2>
          <h3 className="mt-6 p-2">Métodos de pagamento e Convênios aceitos por esse profissional:</h3>
          <LogoGrid items={PAYMENTS} />
          <LogoGrid items={INSURANCES} />
          <div className="mt-5 border-t border-slate-200 pt-4">
            <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
              <div className="flex items-start gap-2">
                <InformationIcon width={18} height={18} />
                <p className="text-sm">
                  O Valor da consulta deve ser pago diretamente ao profissional no dia do agendamento
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ENDEREÇO */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Endereço</h2>
          <p className="mt-6 p-2 text-slate-600">O profissional atende nos seguintes endereços:</p>
          <div className="mt-4 space-y-3">
            {mock.professional.address.map((addr) => (
              <div
                key={addr}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm"
              >
                {addr}
              </div>
            ))}
          </div>

        </section>

        {/* MAPA (placeholder) */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <div className="relative flex flex-col ">
            {/* MAPA DO GOOGLE */}
            <div className="mt-2 border border-[#EAEEFA] bg-[#EAEEFA] flex flex-col items-center py-4">
              <div className="h-64 w-full overflow-hidden rounded-lg bg-slate-100">
                <iframe
                  title="Localização"
                  className="h-full w-full"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    mock.professional.address[0]
                  )}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>


              {/* onClick={handleOpenMap} - Descomente quando implementar */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  mock.professional.address[0]
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full max-w-[312px] h-10 sm:max-w-[550px] sm:h-12 mx-auto items-center justify-center rounded-xl bg-[#3857F4] px-6 text-lg font-semibold text-[#D7FF7B] shadow-md hover:bg-[#2d46d9] transition"
              >
                Abrir no Mapa
              </a>
            </div>
          </div>

        </section>

        {/* ACESSIBILIDADE */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <div className="mt-2 border border-[#EAEEFA] bg-[#EAEEFA] p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <RxAccessibility className="text-white bg-[#3857F4] w-8 h-8 p-1 rounded-full" />
              <h2 className="text-xl font-bold text-slate-900">Acessibilidade:</h2>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {mock.professional.accessibility?.map((feat: string) => (
                <span
                  key={feat}
                  className="rounded-full border border-[#253E99] bg-white px-3 py-1 text-sm"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* AGENDAR SERVIÇOS */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Agendar Serviços</h2>
          <p className="mt-6 p-2 text-slate-600">
            Selecione um ou mais serviços que deseja agendar com este profissional.
          </p>

          <div className="mt-4 space-y-4">
            {mock.services?.map((s: any) => {
              const id = s.id ?? s.name;
              const active = selectedServices.has(id);
              return (
                <div
                  key={id}

                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="pr-4">
                    <h3 className="font-semibold text-slate-900">{s.name}</h3>
                    <ul className="mt-2 text-sm text-slate-700 space-y-1">
                      <li><span className="font-bold ">Duração:</span> {s.duration}</li>
                      <li><span className="font-bold">Preço:</span> {s.price}</li>
                    </ul>
                    {s.description && (
                      <p className="mt-2 text-sm text-slate-600"><span className="font-bold">Descrição:</span> {s.description}</p>
                    )}
                  </div>

                  <div className="mx-4 h-16 w-px bg-slate-200 sm:block" />
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={active}
                      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && toggleService(id)}
                      onClick={() => toggleService(id)}

                      className={`h-10 w-10 rounded-md border-2 flex items-center justify-center transition-all duration-150 ease-in-out ${active
                        ? "border-[#3857F4] bg-[#3857F4]"
                        : "border-[#3857F4] bg-white"
                        }`}
                    >
                      {active && (
                        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            {/* onClick={handleScheduleAppointment} - Descomente quando implementar */}
            <button
              type="button"
              className="inline-flex w-full max-w-[312px] h-10 sm:max-w-[550px] sm:h-12 items-center justify-center rounded-xl bg-[#3857F4] px-6 text-lg font-semibold text-[#D7FF7B] shadow-md hover:bg-[#2d46d9] transition"
            >
              Solicitar agendamento
            </button>
          </div>



        </section>

        {/* PERGUNTAS E RESPOSTAS */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Perguntas e Respostas</h2>
          <p className="mt-6 p-2 text-slate-700">Veja perguntas e respostas feitas a este profissional</p>

          <div className="mt-4 space-y-3">
            {[
              {
                question: "Quais são os horários de atendimento disponíveis?",
                answer: "Atendimento de segunda a sexta, das 9h às 18h.",
              },
              {
                question: "Atende somente presencial ou também online?",
                answer: "Atendimento apenas presencial.",
              },
              {
                question: "O profissional atende crianças e idosos?",
                answer: "Sim, atende todas as faixas etárias.",
              },
            ].map((qa, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none select-none items-center justify-between">
                  <span className="font-medium text-slate-900">{qa.question}</span>

                  <svg
                    className="h-5 w-5 text-slate-500 transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>

                <div className="mt-2 flex items-start gap-2 text-slate-600">
                  <BsArrowReturnRight className="mt-1 text-slate-500" />
                  <p>{qa.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-10">
            {/* onClick={handleViewAllQuestions} - Descomente quando implementar */}
            <button
              type="button"
              className="w-full sm:w-auto sm:flex-1 max-w-[312px] h-10 sm:max-w-[550px] sm:h-12 rounded-xl bg-[#3857F4] px-6 text-lg font-semibold text-[#D7FF7B] shadow-md hover:bg-[#2d46d9] transition"
            >
              Ver todas as perguntas
            </button>

            {/* onClick={handleAskQuestion} - Descomente quando implementar */}
            <button
              type="button"
              className="w-full sm:w-auto sm:flex-1 max-w-[312px] h-10 sm:max-w-[550px] sm:h-12 rounded-xl border border-[#3857F4] px-6 text-lg font-semibold text-[#3857F4] shadow-md hover:bg-[#E7EBFE] transition"
            >
              Perguntar ao Profissional
            </button>
          </div>

        </section>



        {/* AVALIAÇÕES */}
        <section className="w-full rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Avaliações ({reviewCount})
          </h2>

          {/* nota grande + estrelas */}
          <div className="mt-4 flex flex-col items-left">
            <div className="text-5xl font-bold">
              {averageRating.toFixed(1)}
            </div>

            <div className="flex items-center gap-1 text-amber-400 mt-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const fullStar = i + 1 <= Math.floor(averageRating);
                const halfStar = i + 0.5 === averageRating;

                return (
                  <span key={i}>
                    {fullStar ? "★" : halfStar ? "⯨" : "☆"}
                  </span>
                );
              })}
            </div>
          </div>


          {/* cards */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mock.reviews?.review_details?.map((r: any) => (
              <article
                key={r.author}
                className="rounded-xl  bg-white p-4 shadow-sm"
              >
                <header className="flex items-center gap-3">
                  <Image
                    src={"/images/senhorjorge.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900">{r.author}</h4>
                    <div className="text-amber-400 text-sm leading-none">
                      {"★★★★★".slice(0, Math.round(Number(r.rating)))}
                    </div>
                  </div>
                </header>

                <p className="mt-2 text-xs text-slate-500">{r.date}</p>
                <p className="mt-2 text-slate-700">{r.review}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            {/* onClick={handleViewMoreReviews} - Descomente quando implementar */}
            <button
              type="button"
              className="inline-flex w-full max-w-[312px] h-10 sm:max-w-[550px] sm:h-12 items-center justify-center rounded-xl border border-[#3857F4] px-6 text-lg font-semibold text-[#3857F4] shadow-md hover:bg-[#E7EBFE] transition"
            >
              Ver mais avaliações
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
