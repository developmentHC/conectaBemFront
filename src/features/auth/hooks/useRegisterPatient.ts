import { api } from "@/libs/api";
import { ICreatePatient } from "@/types/patient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetUser } from "./useGetUser";

export const useRegisterPatient = () => {
  const router = useRouter();
  const { refetch: fetchUser } = useGetUser({ enabled: false });

  return useMutation({
    mutationFn: async (data: ICreatePatient) => {
      const response = await api.post("/auth/createPatient", data);

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
