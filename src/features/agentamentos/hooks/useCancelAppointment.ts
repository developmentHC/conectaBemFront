"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CancelAppointmentResponse,
  IAppointment,
  IAppointmentDetail,
} from "@/types/appointment";
import { cancelAppointmentRequest } from "../services/appointments";

type Variables = {
  appointmentId: string;
  reason: string;
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<CancelAppointmentResponse, Error, Variables>({
    mutationFn: ({ appointmentId, reason }) => cancelAppointmentRequest(appointmentId, { reason }),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<IAppointment[]>(["appointments"], (previous) => {
        if (!previous) return previous;
        return previous.map((appointment) =>
          String(appointment.id) === String(variables.appointmentId)
            ? {
                ...appointment,
                status: "Cancelado",
                derivedStatus: "canceled",
              }
            : appointment,
        );
      });

      queryClient.setQueryData<IAppointmentDetail | undefined>(
        ["appointment-detail", variables.appointmentId],
        (previous) => {
          if (!previous) return previous;
          return {
            ...previous,
            status: "Cancelado",
            derivedStatus: "canceled",
          } as IAppointmentDetail;
        },
      );
    },
  });
};
