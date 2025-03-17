import { api } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/useAuthStore";

export const useCredentialLogin = () => {
  const router = useRouter();
  const { setEmail } = useAuthStore();

  return useMutation({
    mutationFn: async (email: any) => {
      const response = await api.post("/auth/sendOTP", email);

      return response.data;
    },
    onSuccess: (responseData: ResponseData) => {
      setEmail(responseData.email.adress);

      toast.success("Código enviado com sucesso!");

      router.push(`/auth/confirmar-codigo`);
    },
    onError: (error) => {
      console.error("Erro ao enviar o OTP:", error);
    },
  });
};

type ResponseData = {
  email: {
    adress: string;
  };
};