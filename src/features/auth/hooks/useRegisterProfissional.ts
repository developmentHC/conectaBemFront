import { api } from "@/libs/api";
import { ICreateProfissional } from "@/types/professional";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetUser } from "./useGetUser";

export const useRegisterProfissional = () => {
  const router = useRouter();
  const { refetch: fetchUser } = useGetUser({ enabled: false });

  return useMutation({
    mutationFn: async (data: ICreateProfissional) => {
      const response = await api.post("/auth/createProfessional", data);

      return response.data;
    },
    onSuccess: async () => {
      await fetchUser();
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
