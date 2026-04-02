import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";
import type { ICreateProfissional } from "@/types/professional";

export const useRegisterProfissional = () => {
  const router = useRouter();
  const { pendingToken, clearPendingToken } = useUserStore();

  return useMutation({
    mutationFn: async (data: ICreateProfissional) => {
      const response = await api.post("/auth/createProfessional", data, {
        headers: { Authorization: `Bearer ${pendingToken}` },
      });

      return response.data;
    },
    onSuccess: async (data) => {
      clearPendingToken();
      try {
        const token = data.token;

        if (!token) {
          toast.error("Resposta inválida do servidor após o registro.");
          return;
        }

        const result = await signIn("credentials", {
          token,
          redirect: false,
        });

        if (result?.ok) {
          toast.success("Cadastro realizado e sessão iniciada!");
          router.push("/");
        } else {
          throw new Error(result?.error || "Não foi possível iniciar a sessão.");
        }
      } catch {
        toast.error("Ocorreu um erro ao iniciar a sessão.");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
