import { api } from "@/libs/api";
import { ICreatePatient } from "@/types/patient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRegisterPatient = () => {
  return useMutation({
    mutationFn: async (data: ICreatePatient) => {
      const response = await api.post("/auth/createPatient", data);
      console.log(response);
      return response.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
