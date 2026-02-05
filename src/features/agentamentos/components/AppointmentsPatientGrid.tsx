"use client";

import type { IAppointment } from "@/types/appointment";
import { AppointmentPatientCard, PatientAppointmentStatus } from "./AppointmentPatientCard";

type Props = {
    appointments: IAppointment[];
    onInfo?: (id: string) => void;
    onAsk?: (id: string) => void;
};

function mapStatus(a: IAppointment): PatientAppointmentStatus {
  const raw = String((a as any).derivedStatus ?? a.status ?? "").trim().toLowerCase();

  // PT-BR (mock)
  if (raw.includes("pendente") || raw.includes("aguardando")) return "pending";
  if (raw.includes("confirm")) return "confirmed";
  if (raw.includes("conclu")) return "completed";
  if (raw.includes("cancel")) return "canceled";

  // EN (backend)
  if (raw === "pending") return "pending";
  if (raw === "confirmed") return "confirmed";
  if (raw === "completed") return "completed";
  if (raw === "canceled" || raw === "cancelled") return "canceled";

  return "confirmed";
}


function formatDateLabel(a: IAppointment) {
    const iso = a.dateTime ?? (a.date && a.time ? `${a.date}T${a.time}` : a.date ?? "");
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR");
}

function formatTimeLabel(a: IAppointment) {
    const iso = a.dateTime ?? (a.date && a.time ? `${a.date}T${a.time}` : "");
    if (!iso) return a.time ?? "—";
    const d = new Date(iso);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function formatPriceLabel(a: IAppointment) {
    const p = a.price;
    if (typeof p !== "number") return "—";
    return p.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatAddressLine(a: IAppointment) {

    const addr = Array.isArray(a.address) ? (a.address.find((x: any) => x?.active) ?? a.address[0]) : (a.address as any);
    if (!addr) return undefined;

    const line = addr.address ?? "";
    const neighborhood = addr.neighborhood ? ` - ${addr.neighborhood}` : "";
    return `${line}${neighborhood}`.trim() || undefined;
}

function getCtasByStatus(status: PatientAppointmentStatus) {
  switch (status) {
    case "confirmed":
      return {
        primary: "Informações do Agendamento",
        secondary: "Perguntar ao Profissional",
      };

    case "pending":
      return {
        primary: "Informações do Agendamento",
        secondary: "Perguntar ao Profissional",
        note: "Aguardando confirmação do profissional",
      };

    case "completed":
      return {
        primary: "Reagendar Atendimento",
        secondary: "Avaliar Atendimento",
      };

    case "canceled":
      return {
        primary: "Informações do Agendamento",
      };
  }
}


export function AppointmentsPatientGrid({ appointments, onInfo, onAsk }: Props) {
    return (
        <section className="w-full">

            <div className="mx-auto w-full max-w-6xl px-0.5 sm:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {appointments.map((a) => {
                        const id = String(a.id);
                        const st = mapStatus(a);
                        const ctas = getCtasByStatus(st);

                        return (
                            <AppointmentPatientCard
                                key={id}
                                status={st}
                                professional={{
                                    name: a.professional?.name ?? "Profissional",
                                    imageUrl: (a.professional as any)?.profileImageUrl ?? (a.professional as any)?.image ?? null,
                                }}
                                dateLabel={formatDateLabel(a)}
                                timeLabel={formatTimeLabel(a)}
                                priceLabel={formatPriceLabel(a)}
                                address={{ addressLine: formatAddressLine(a) }}
                                services={a.serviceName ? [a.serviceName] : undefined}
                                primaryCta={{
                                    label: ctas.primary,
                                    onClick: () => onInfo?.(id),
                                }}
                                secondaryCta={
                                    ctas.secondary
                                        ? {
                                            label: ctas.secondary,
                                            onClick: () => onAsk?.(id),
                                        }
                                        : undefined
                                }
                            />
                        );

                    })}
                </div>
            </div>
        </section>
    );
}
