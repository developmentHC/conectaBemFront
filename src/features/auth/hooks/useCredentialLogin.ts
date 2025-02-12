import { api } from "@/libs/api";
import { useEmailStore } from "@/stores/emailStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCredentialLogin = () => {
  const router = useRouter();
  const { setEmail } = useEmailStore();

  return useMutation({
    mutationFn: async ({ data }: Args) => {
      const response = await api.post("/auth/sendOTP", data);

      return response.data;
    },
    onSuccess: (responseData: ResponseData) => {
      setEmail(responseData.email.adress);

      toast.success("Código enviado com sucesso!");

      router.push(`/auth/confirm-code`);
    },
    onError: (error) => {
      console.error("Erro ao enviar o OTP:", error);
    },
  });
};

type Data = {
  email: string;
};

type ResponseData = {
  email: {
    adress: string;
  };
};

type Args = {
  data: Data;
  onSuccess?: () => void;
  onError?: () => void;
};
