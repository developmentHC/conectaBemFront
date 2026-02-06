"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { MdStarRate } from "react-icons/md";
import { useAppointments } from "@/features/agentamentos/hooks/useAppointments";
import { AppointmentsPatientGrid } from "@/features/agentamentos/components/AppointmentsPatientGrid";
import { useProfessional } from "@/features/home/hooks/useProfessional";
import { filterAndSortProfessionals } from "@/utils/filterProfessionals";
import type { IAppointment } from "@/types/appointment";
import { useRouter } from "next/navigation";

type MainTab = "confirmed" | "pending" | "canceled";
type ConfirmedSubFilter = "all" | "confirmed" | "completed";

function toInternalStatus(a: IAppointment): "confirmed" | "pending" | "completed" | "canceled" {
  const raw = String((a as any).derivedStatus ?? a.status ?? "")
    .trim()
    .toLowerCase();

  if (raw.includes("pendente") || raw.includes("aguardando")) return "pending";
  if (raw.includes("conclu")) return "completed";
  if (raw.includes("cancel")) return "canceled";
  if (raw.includes("confirm")) return "confirmed";

  if (raw === "pending") return "pending";
  if (raw === "completed") return "completed";
  if (raw === "canceled" || raw === "cancelled") return "canceled";
  return "confirmed";
}

export default function AgendamentosPacientesPage() {

  const { data: appointments = [], isLoading, error } = useAppointments();
  const router = useRouter();
  const [mainTab, setMainTab] = useState<MainTab>("confirmed");
  const [confirmedFilter, setConfirmedFilter] = useState<ConfirmedSubFilter>("all");

  const handleInfoNavigation = useCallback(
    (appointmentId: string) => {
      router.push(`/agendamentos-pacientes/${appointmentId}`);
    },
    [router],
  );

  const handleAskProfessional = useCallback(
    (appointmentId: string) => {
      const target = appointments.find((item) => String(item.id) === String(appointmentId));
      const professionalName = target?.professional?.name ?? "profissional da ConectaBem";
      const subject = encodeURIComponent(`Pergunta sobre o agendamento ${appointmentId}`);
      const body = encodeURIComponent(`Olá ${professionalName},\n\n`);
      const email = (target as any)?.professional?.email || "contato@conectabem.com";

      if (typeof window !== "undefined") {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }
    },
    [appointments],
  );

  const filteredAppointments = useMemo(() => {
    const withInternal = appointments.map((a) => ({ a, st: toInternalStatus(a) }));

    if (mainTab === "pending") return withInternal.filter((x) => x.st === "pending").map((x) => x.a);
    if (mainTab === "canceled") return withInternal.filter((x) => x.st === "canceled").map((x) => x.a);

    const base = withInternal.filter((x) => x.st === "confirmed" || x.st === "completed");
    if (confirmedFilter === "confirmed") return base.filter((x) => x.st === "confirmed").map((x) => x.a);
    if (confirmedFilter === "completed") return base.filter((x) => x.st === "completed").map((x) => x.a);
    return base.map((x) => x.a);
  }, [appointments, mainTab, confirmedFilter]);

  const infoText = useMemo(() => {
    if (mainTab === "pending") {
      return "Exibindo todos os agendamentos pendentes de confirmação pelo profissional. Você será notificado quando o agendamento for confirmado.";
    }
    if (mainTab === "canceled") {
      return "Exibindo todos os agendamentos cancelados.";
    }
    if (confirmedFilter === "confirmed") return "Exibindo todos os agendamentos confirmados.";
    if (confirmedFilter === "completed") return "Exibindo todos os agendamentos concluídos.";
    return "";
  }, [mainTab, confirmedFilter]);

  const hasFilteredAppointments = filteredAppointments.length > 0;


  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center text-[#3857F4] text-lg font-medium">Carregando agendamentos...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center text-red-500 text-lg font-medium">Erro ao carregar agendamentos.</div>
      </main>
    );
  }
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold">Meus Agendamentos</h1>
      <p className="mt-1 text-sm text-slate-500">
        Selecione o status para exibir seus agendamentos
      </p>


      <div className="mt-5 w-full">
        <div className="grid grid-cols-3 rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setMainTab("confirmed")}
            className={[
              "rounded-lg py-2 text-sm font-medium",
              mainTab === "confirmed" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            Confirmados
          </button>

          <button
            type="button"
            onClick={() => setMainTab("pending")}
            className={[
              "rounded-lg py-2 text-sm font-medium",
              mainTab === "pending" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            Pendentes
          </button>

          <button
            type="button"
            onClick={() => setMainTab("canceled")}
            className={[
              "rounded-lg py-2 text-sm font-medium",
              mainTab === "canceled" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            Cancelados
          </button>
        </div>
      </div>


      {mainTab === "confirmed" && (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setConfirmedFilter("all")}
            className={[
              "rounded-lg border px-3 py-1.5 text-sm font-medium",
              confirmedFilter === "all"
                ? "border-[#253E99] bg-blue-50 text-[#253E99]"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            Todos
          </button>

          <button
            type="button"
            onClick={() => setConfirmedFilter("confirmed")}
            className={[
              "rounded-lg border px-3 py-1.5 text-sm font-medium",
              confirmedFilter === "confirmed"
                ? "border-[#253E99] bg-blue-50 text-[#253E99]"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            Confirmados
          </button>

          <button
            type="button"
            onClick={() => setConfirmedFilter("completed")}
            className={[
              "rounded-lg border px-3 py-1.5 text-sm font-medium",
              confirmedFilter === "completed"
                ? "border-[#253E99] bg-blue-50 text-[#253E99]"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            Concluídos
          </button>
        </div>
      )}

      {infoText && <p className="mt-4 text-sm text-slate-600">{infoText}</p>}


      <div className="mt-6">
        {hasFilteredAppointments ? (
          <AppointmentsPatientGrid
            appointments={filteredAppointments}
            onInfo={handleInfoNavigation}
            onAsk={handleAskProfessional}
          />
        ) : (
          <section className="rounded-3xl  px-6 py-10 text-center">
            <div className="mx-auto flex max-w-2xl flex-col gap-2">
              <p className="text-base font-semibold text-slate-700">Não encontramos nenhum agendamento</p>
              <p className="text-sm text-slate-500">
                Tente filtrar novamente ou que tal agendar com os profissionais abaixo.
              </p>
            </div>
            <div className="mt-8 text-left">
              <p className="text-lg font-semibold text-slate-800">Sugestões de Profissionais</p>
              <div className="mt-4">
                <ProfessionalSuggestions />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function ProfessionalSuggestions() {
  const { data: professionals = [], isLoading, isError } = useProfessional();

  const suggestions = useMemo(() => filterAndSortProfessionals(professionals).slice(0, 5), [professionals]);

  if (isLoading) {
    return <p className="text-sm text-[#3857F4]">Carregando sugestões...</p>;
  }

  if (isError || suggestions.length === 0) {
    return <p className="text-sm text-slate-500">Não foi possível carregar sugestões no momento.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {suggestions.map((professional) => {
        const chips = [
          professional.specialization,
          ...(professional.preferablyServices ?? []).slice(0, 2).map((service) => service.name),
        ].filter((label): label is string => Boolean(label));

        return (
          <article
            key={professional.id}
            className="flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm md:flex-row md:items-center md:gap-6"
          >
            <Image
              className="h-48 w-full rounded-2xl object-cover md:h-40 md:w-40"
              src={professional.image || "/images/professional/woman (1).jpeg"}
              alt={`Foto do profissional ${professional.name}`}
              width={320}
              height={160}
            />

            <div className="flex flex-1 flex-col gap-3">
              <div>
                <p className="text-xl font-semibold text-slate-900">{professional.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1 text-sm text-slate-600">
                  <span className="font-semibold">
                    {Number.isInteger(professional.rating) ? `${professional.rating}.0` : professional.rating}
                  </span>
                  <MdStarRate className="text-yellow-400" />
                  <span className="text-xs text-slate-500">({professional.reviews} avaliações)</span>
                </div>
                <span className="text-sm text-slate-500">
                  {typeof professional.price === "number"
                    ? professional.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                    : professional.price}
                  {professional.distance ? ` | ${professional.distance} km` : ""}
                </span>
              </div>

              {chips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {chips.map((label, index) => (
                    <span
                      key={`${professional.id}-chip-${index}-${label}`}
                      className="rounded-full border border-[#3857F4] px-3 py-1 text-xs font-semibold text-[#3857F4]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/profissional/${professional.id}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#3857F4] text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Ver perfil
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
