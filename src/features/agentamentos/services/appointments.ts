import type {
  CancelAppointmentPayload,
  CancelAppointmentResponse,
  IAppointment,
  IAppointmentDetail,
} from "@/types/appointment";
import axios from "axios";

export async function fetchAppointments(): Promise<IAppointment[]> {
  // Backend wiring ready to go — just uncomment when the API is available.
  // const { data } = await api.get("/appointments/me");
  // return data?.data ?? [];

  const response = await axios.get<IAppointment[]>("/mocks/appointments.json");

  return response.data.map((appointment) => ({
    ...appointment,
    dateTime:
      appointment.dateTime ??
      (appointment.date && appointment.time
        ? `${appointment.date}T${appointment.time}`
        : undefined),
  }));
}

export async function fetchAppointmentDetail(appointmentId: string): Promise<IAppointmentDetail> {
  if (!appointmentId) {
    throw new Error("ID do agendamento é obrigatório.");
  }

  // const { data } = await api.get(`/appointments/${appointmentId}`);
  // return data?.data;

  const response = await axios.get<IAppointmentDetail[]>("/mocks/appointmentDetails.json");
  const appointment = response.data.find((item) => String(item.id) === String(appointmentId));

  if (!appointment) {
    throw new Error("Agendamento não encontrado.");
  }

  return appointment;
}

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export async function cancelAppointmentRequest(
  appointmentId: string,
  payload: CancelAppointmentPayload,
): Promise<CancelAppointmentResponse> {
  if (!appointmentId) {
    throw new Error("ID do agendamento é obrigatório para cancelar.");
  }

  // const { data } = await api.post(`/appointments/${appointmentId}/cancel`, payload);
  // return data?.data;

  await wait(1200);
  void payload; // Reserve payload usage until the real API wiring is available.

  return {
    status: "canceled",
    canceledAt: new Date().toISOString(),
  };
}
