import { api } from "@/libs/api";
import { ICreatePatient } from "@/types/patient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRegisterPatient = () => {
  return useMutation({
    mutationFn: async (data: ICreatePatient) => {
      const response = await api.post("/auth/createProfessional", data)

      return response.data
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
};
