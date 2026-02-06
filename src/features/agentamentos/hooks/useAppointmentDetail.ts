"use client";

import type { IAppointmentDetail } from "@/types/appointment";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentDetail } from "../services/appointments";

export const useAppointmentDetail = (appointmentId?: string | null) => {
  return useQuery<IAppointmentDetail>({
    queryKey: ["appointment-detail", appointmentId],
    queryFn: () => fetchAppointmentDetail(String(appointmentId)),
    enabled: Boolean(appointmentId),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
