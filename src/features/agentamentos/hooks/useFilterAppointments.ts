// src/features/agendamentos/hooks/useFilterAppointments.ts

import dayjs from "dayjs";
import type { IAppointment } from "@/types/appointment";

export const useFilterAppointments = (
  appointments: IAppointment[],
  tabValue: string,
  selectedDate?: string,
) => {
  let filtered = appointments;

  // moch
  switch (tabValue) {
    case "a_realizar":
      filtered = appointments.filter(
        (appointment) => appointment.status === "Aguardando" || appointment.status === "Confirmado",
      );
      break;
    case "realizados":
      filtered = appointments.filter(
        (appointment) => appointment.status === "Realizado" || appointment.status === "Cancelado",
      );
      break;
  }

  // Filtro por data (só aplica se tiver selectedDate)
  if (selectedDate) {
    filtered = filtered.filter((appointment) =>
      dayjs(appointment.date).isSame(selectedDate, "day"),
    );
  }

  return filtered;
};
