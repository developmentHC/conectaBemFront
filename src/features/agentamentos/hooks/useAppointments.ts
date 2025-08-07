import { IAppointment } from "@/types/appointment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAppointments = () => {
  return useQuery<IAppointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await axios.get("mocks/appointments.json");
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
