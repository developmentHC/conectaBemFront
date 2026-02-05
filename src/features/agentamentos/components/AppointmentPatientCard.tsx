"use client";

import Image from "next/image";
import { CalendarDays, Clock3, BadgeDollarSign, MapPin } from "lucide-react";


export type PatientAppointmentStatus = "confirmed" | "pending" | "completed" | "canceled";

type Address = {
  addressLine?: string;
};

type Professional = {
  name: string;
  imageUrl?: string | null;
};

export type AppointmentPatientCardProps = {
  status: PatientAppointmentStatus;

  professional: Professional;

  dateLabel: string;
  timeLabel: string;
  priceLabel: string;
  address?: Address;
  services?: string[];

  primaryCta: {
    label: string;
    onClick: () => void;
  };

  secondaryCta?: {
    label: string;
    onClick: () => void;
  };
};

function statusUi(status: PatientAppointmentStatus | string) {
  switch (status) {
    case "confirmed":
      return {
        label: "Agendamento Confirmado",
        icon: "✓",
        bgHex: "#E3F7DE",
        borderHex: "#2E7D32",
        iconHex: "#2E7D32",
      };

    case "pending":
      return {
        label: "Pendente de Confirmação",
        icon: "!",
        bgHex: "#FFF7D6",
        borderHex: "#C08A00",
        iconHex: "#C08A00",
      };

    case "completed":
      return {
        label: "Agendamento Concluído",
        icon: "✓",
        bgHex: "#CFD6FC",
        borderHex: "#253E99",
        iconHex: "#253E99",
      };

    case "canceled":
      return {
        label: "Agendamento Cancelado",
        icon: "✕",
        bgHex: "#CBC8D0",
        borderHex: "#6B7280",
        iconHex: "#6B7280",
      };

    default:
      console.warn("Unknown appointment status:", status);
      return {
        label: "Status do Agendamento",
        icon: "dot",
        bgHex: "#F8FAFC",
        borderHex: "#CBD5E1",
        iconHex: "#64748B",
      };
  }
}




export function AppointmentPatientCard(props: AppointmentPatientCardProps) {
  const ui = statusUi(props.status);

  return (
    <article className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="px-4 pt-4">
        <div
          className="w-full rounded-full border px-3 py-2 text-xs font-medium flex items-center justify-center gap-2 text-slate-900"
          style={{ backgroundColor: ui.bgHex, borderColor: ui.borderHex }}
        >

          <span
            className="grid h-4 w-4 place-items-center rounded-full border text-[10px] leading-none font-bold"
            style={{ borderColor: ui.iconHex, color: ui.iconHex }}
            aria-hidden="true"
          >
            {ui.icon === "✓" ? "✓" : ui.icon === "!" ? "!" : ui.icon === "✕" ? "✕" : "•"}
          </span>

          {ui.label}
        </div>
      </div>



      <div className="px-4 pt-4 flex gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {props.professional.imageUrl ? (
            <Image
              src={props.professional.imageUrl}
              alt={props.professional.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-blue-700 truncate">
            {props.professional.name}
          </h3>

          <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              <span>Data: {props.dateLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-slate-400" />
              <span>Horário: {props.timeLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="h-4 w-4 text-slate-400" />
              <span>Preço: {props.priceLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 mx-auto w-[92%] border-t border-[#CBC8D0]" />

      {props.address?.addressLine && (
        <div className="px-4 mt-3 text-xs text-slate-600 flex items-start gap-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="leading-5">{props.address.addressLine}</span>
        </div>
      )}

      <hr className="my-4 mx-auto w-[92%] border-t border-[#CBC8D0]" />



      {props.services?.length ? (
        <div className="px-4 pb-2">
          <p className="text-xs font-semibold text-slate-700">Serviços Agendados:</p>
          <ul className="mt-2 list-disc pl-5 text-xs text-slate-600 space-y-1">
            {props.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="px-4 pb-2">
          <p className="text-xs font-semibold text-slate-700">Serviços Agendados:</p>
          <p className="mt-2 text-xs text-slate-500">—</p>
        </div>
      )}


      <div className="px-4 pb-4 pt-3 space-y-2">
        <button
          type="button"
          onClick={props.primaryCta.onClick}
          className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:opacity-95"
        >
          {props.primaryCta.label}
        </button>

        {props.secondaryCta ? (
          <button
            type="button"
            onClick={props.secondaryCta.onClick}
            className="w-full rounded-xl border border-blue-300 bg-white px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            {props.secondaryCta.label}
          </button>
        ) : null}
      </div>
    </article>
  );
}
