"use client";

import { useQuery } from "@tanstack/react-query";
import type { IAppointmentDetail } from "@/types/appointment";
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
