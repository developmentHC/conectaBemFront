"use client";

import { useQuery } from "@tanstack/react-query";
import type { IAppointment } from "@/types/appointment";
import { fetchAppointments } from "../services/appointments";

export const useAppointments = () => {
  return useQuery<IAppointment[]>({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
