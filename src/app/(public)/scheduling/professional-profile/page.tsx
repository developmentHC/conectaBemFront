"use client";

import Image from "next/image";
import { useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { RxAccessibility } from "react-icons/rx";
import { InformationIcon, StarIcon } from "@/../public/images";
import { mock } from "./mock";

export default function PerfilProfissional() {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const toggleService = (id: string) => {
    setSelectedServices((prev) => {
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
        ).toFixed(1),
      )
    : 0;

  // helper simples p/ renderizar logos em grid
  const LogoGrid = ({ items }: { items: { img: string; title: string }[] }) => (
    <div className="mx-auto mt-4 grid w-fit grid-cols-4 sm:mx-0">
      {items.map((i) => (
        <div key={i.title} className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white p-1">
            <Image
              src={i.img}
              alt={i.title}
              width={24}
              height={24}
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </div>
          <span className="mt-1 w-16 break-words text-center font-medium text-slate-600 text-xs leading-tight">
            {i.title}
          </span>
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
      <div className="mx-auto w-full max-w-[360px] px-4 py-6 sm:max-w-none sm:px-8 lg:px-10">
        {/* CARD DO PERFIL  */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <div className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-4">
              {/* FOTO E INFORMAÇÕES - LADO A LADO NO MOBILE */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/professional/man (1).jpeg"
                    alt={mock.professional.name}
                    width={140}
                    height={140}
                    className="h-30 w-26 rounded-lg object-cover sm:h-32 sm:w-32"
                  />
                </div>

                {/* BLOCO DE INFORMAÇÕES */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-lg text-slate-900 sm:text-2xl">
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
                        <span key={s} className="text-sm">
                          {s}
                        </span>
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
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {mock.professional.qualifications.map((q) => (
                  <span
                    key={q}
                    className="rounded-full border border-indigo-700 px-3 py-1 text-slate-900 text-sm"
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
          <h2 className="font-bold text-slate-900 text-xl">Sobre o Profissional</h2>

          <p className="mt-4 text-slate-700">
            {showFullAbout
              ? mock.professional.about_the_professional
              : mock.professional.about_the_professional.slice(0, 310) +
                (mock.professional.about_the_professional.length > 310 ? "..." : "")}
          </p>

          {mock.professional.about_the_professional.length > 310 && (
            <div className="mt-2 flex justify-end">
              {/* onClick já implementado - expandir/recolher descrição */}
              <button
                type="button"
                className="flex items-center gap-1 font-medium text-[#253E99] text-sm underline"
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
          <h2 className="font-bold text-slate-900 text-xl">Métodos de Pagamento</h2>
          <h3 className="mt-2 p-2">
            Métodos de pagamento e Convênios aceitos por esse profissional:
          </h3>
          <LogoGrid items={PAYMENTS} />
          <LogoGrid items={INSURANCES} />
          <div className="mt-5 border-slate-200 border-t pt-4">
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
            >
              <div className="flex items-start gap-2">
                <InformationIcon width={18} height={18} />
                <p className="text-sm">
                  O Valor da consulta deve ser pago diretamente ao profissional no dia do
                  agendamento
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ENDEREÇO */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <h2 className="font-bold text-slate-900 text-xl">Endereço</h2>
          <p className="mt-2 p-2 text-slate-600">O profissional atende nos seguintes endereços:</p>
          <div className="mt-2 space-y-3">
            {mock.professional.address.map((addr, index) => (
              <div
                key={addr}
                className={`cursor-pointer rounded-lg border px-4 py-2 shadow-sm transition-all duration-200 ${
                  selectedAddressIndex === index
                    ? "border-[#3857F4] bg-[#E7EBFE] ring-2 ring-[#3857F4] ring-opacity-20"
                    : "border-slate-200 bg-white hover:border-[#3857F4] hover:bg-[#F8FAFF]"
                }`}
                onClick={() => setSelectedAddressIndex(index)}
              >
                <span
                  className={
                    selectedAddressIndex === index ? "font-medium text-[#3857F4]" : "text-slate-700"
                  }
                >
                  {addr}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* MAPA (placeholder) */}
        <section className="!mt-2 w-full rounded-xl p-4 sm:p-6">
          <div className="relative flex flex-col">
            {/* MAPA DO GOOGLE */}
            <div className="mt-2 flex flex-col items-center border border-[#EAEEFA] bg-[#EAEEFA] py-4">
              <div className="h-64 w-full overflow-hidden rounded-lg bg-slate-100">
                <iframe
                  title="Localização"
                  className="h-full w-full"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    mock.professional.address[selectedAddressIndex],
                  )}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-3 text-center">
                <p className="font-medium text-slate-600 text-sm">
                  📍 {mock.professional.address[selectedAddressIndex]}
                </p>
              </div>

              {/* onClick={handleOpenMap} - Descomente quando implementar */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  mock.professional.address[selectedAddressIndex],
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mx-auto mt-6 inline-flex h-10 w-full max-w-[312px] items-center justify-center rounded-xl bg-[#3857F4] px-6 font-semibold text-[#D7FF7B] text-lg shadow-md transition hover:bg-[#2d46d9] sm:h-12 sm:max-w-[550px]"
              >
                Abrir no Mapa
              </a>
            </div>
          </div>
        </section>

        {/* ACESSIBILIDADE */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <div className="mt-2 rounded-lg border border-[#EAEEFA] bg-[#EAEEFA] p-4">
            <div className="flex items-center gap-2">
              <RxAccessibility className="h-8 w-8 rounded-full bg-[#3857F4] p-1 text-white" />
              <h2 className="font-bold text-slate-900 text-xl">Acessibilidade:</h2>
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
          <h2 className="font-bold text-slate-900 text-xl">Agendar Serviços</h2>
          <p className="mt-2 p-2 text-slate-600">
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
                    <ul className="mt-2 space-y-1 text-slate-700 text-sm">
                      <li>
                        <span className="font-bold">Duração:</span> {s.duration}
                      </li>
                      <li>
                        <span className="font-bold">Preço:</span> {s.price}
                      </li>
                    </ul>
                    {s.description && (
                      <p className="mt-2 text-slate-600 text-sm">
                        <span className="font-bold">Descrição:</span> {s.description}
                      </p>
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
                      className={`flex h-10 w-10 items-center justify-center rounded-md border-2 transition-all duration-150 ease-in-out ${
                        active ? "border-[#3857F4] bg-[#3857F4]" : "border-[#3857F4] bg-white"
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
              className="inline-flex h-10 w-full max-w-[312px] items-center justify-center rounded-xl bg-[#3857F4] px-6 font-semibold text-[#D7FF7B] text-lg shadow-md transition hover:bg-[#2d46d9] sm:h-12 sm:max-w-[550px]"
            >
              Solicitar agendamento
            </button>
          </div>
        </section>

        {/* PERGUNTAS E RESPOSTAS */}
        <section className="w-full rounded-xl p-4 sm:p-6">
          <h2 className="font-bold text-slate-900 text-xl">Perguntas e Respostas</h2>
          <p className="mt-2 p-2 text-slate-700">
            Veja perguntas e respostas feitas a este profissional
          </p>

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
                <summary className="flex cursor-pointer select-none list-none items-center justify-between">
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

          <div className="mt-6 flex flex-col items-center justify-center gap-10 sm:flex-row">
            {/* onClick={handleViewAllQuestions} - Descomente quando implementar */}
            <button
              type="button"
              className="h-10 w-full max-w-[312px] rounded-xl bg-[#3857F4] px-6 font-semibold text-[#D7FF7B] text-lg shadow-md transition hover:bg-[#2d46d9] sm:h-12 sm:w-auto sm:max-w-[550px] sm:flex-1"
            >
              Ver todas as perguntas
            </button>

            {/* onClick={handleAskQuestion} - Descomente quando implementar */}
            <button
              type="button"
              className="h-10 w-full max-w-[312px] rounded-xl border border-[#3857F4] px-6 font-semibold text-[#3857F4] text-lg shadow-md transition hover:bg-[#E7EBFE] sm:h-12 sm:w-auto sm:max-w-[550px] sm:flex-1"
            >
              Perguntar ao Profissional
            </button>
          </div>
        </section>

        {/* AVALIAÇÕES */}
        <section className="w-full rounded-xl p-4 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900 text-xl">Avaliações ({reviewCount})</h2>

          {/* nota grande + estrelas */}
          <div className="items-left mt-4 flex flex-col">
            <div className="font-bold text-5xl">{averageRating.toFixed(1)}</div>

            <div className="mt-1 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => {
                const fullStar = i + 1 <= Math.floor(averageRating);
                const halfStar = i + 0.5 === averageRating;

                return <span key={i}>{fullStar ? "★" : halfStar ? "⯨" : "☆"}</span>;
              })}
            </div>
          </div>

          {/* cards */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mock.reviews?.review_details?.map((r: any) => (
              <article key={r.author} className="rounded-xl bg-white p-4 shadow-sm">
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

                <p className="mt-2 text-slate-500 text-xs">{r.date}</p>
                <p className="mt-2 text-slate-700">{r.review}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            {/* onClick={handleViewMoreReviews} - Descomente quando implementar */}
            <button
              type="button"
              className="inline-flex h-10 w-full max-w-[312px] items-center justify-center rounded-xl border border-[#3857F4] px-6 font-semibold text-[#3857F4] text-lg shadow-md transition hover:bg-[#E7EBFE] sm:h-12 sm:max-w-[550px]"
            >
              Ver mais avaliações
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
