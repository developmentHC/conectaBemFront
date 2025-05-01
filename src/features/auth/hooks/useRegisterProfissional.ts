import { api } from "@/libs/api";
import { ICreateProfissional } from "@/types/professional";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRegisterProfissional = () => {
  return useMutation({
    mutationFn: async (data: ICreateProfissional) => {
      const response = await api.post("/auth/createProfessional", data);

      return response.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
