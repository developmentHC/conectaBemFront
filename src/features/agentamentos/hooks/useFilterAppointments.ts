import { IAppointment } from "@/types/appointment";

export const useFilterAppointments = (
  appointments: IAppointment[],
  tabValue: string
) => {
  switch (tabValue) {
    case "a_realizar":
      return appointments.filter(
        (appointment) =>
          appointment.status === "Aguardando" ||
          appointment.status === "Confirmado"
      );
    case "realizados":
      return appointments.filter(
        (appointment) =>
          appointment.status === "Realizado" ||
          appointment.status === "Cancelado"
      );
    default:
      return appointments;
  }
};
