"use client";

import { useAppointments } from "../hooks/useAppointments";
import { useFilterAppointments } from "../hooks/useFilterAppointments";
import { AppointmentTimeline } from "./AppointmentProfessionalTimeline";

export const AppointmentsSection = ({
  tabValue,
  selectedDate,
}: {
  tabValue: string;
  selectedDate?: string;
}) => {
  const { data: appointments, isLoading, error } = useAppointments();

  const filteredAppointments = useFilterAppointments(appointments || [], tabValue, selectedDate);

  if (isLoading) {
    return (
      <div className="text-center font-medium text-[#3857F4] text-lg">
        Carregando agendamentos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-medium text-lg text-red-500">
        Erro ao carregar agendamentos.
      </div>
    );
  }

  return (
    <section className="w-full">
      <AppointmentTimeline appointments={filteredAppointments} />
    </section>
  );
};
