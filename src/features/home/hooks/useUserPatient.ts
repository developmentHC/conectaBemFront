import { useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { IPatient } from "@/types/patient";
import { getAuthToken } from "@/utils/getAuthToken";

export const useUserPatient = () => {
  const isAuthenticated = !!getAuthToken();

  return useQuery<IPatient>({
    queryKey: ["userPatient"],
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await api.get("/user");
      return response.data;
    },
  });
};
