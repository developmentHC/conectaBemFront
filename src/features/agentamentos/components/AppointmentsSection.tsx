import { IAppointment } from "@/types/appointment";
import { useAppointments } from "../hooks/useAppointments";
import { useFilterAppointments } from "../hooks/useFilterAppointments";
import { AppointmentCard } from "./AppointmentCard";

export const AppointmentsSection = ({ tabValue }: { tabValue: string }) => {
  const { data: appointments, isLoading, error } = useAppointments();

  const filteredAppointments = useFilterAppointments(
    appointments || [],
    tabValue
  );

  if (isLoading) {
    return <div>Carregando agendamentos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar agendamentos.</div>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAppointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </section>
  );
};
