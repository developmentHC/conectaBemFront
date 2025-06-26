import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCredentialLogin = () => {
  const router = useRouter();
  const { setIdUser } = useUserStore();

  return useMutation({
    mutationFn: async (email: any) => {
      const response = await api.post("/auth/sendOTP", email);

      setIdUser(response.data.id);

      return response.data;
    },
    onSuccess: () => {
      toast.success("Código enviado com sucesso!");

      router.push(`/auth/confirmar-codigo`);
    },
    onError: (error) => {
      console.error("Erro ao enviar o OTP:", error);
    },
  });
};
