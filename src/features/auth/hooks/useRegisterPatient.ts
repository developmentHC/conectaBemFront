import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";
import type { ICreatePatient } from "@/types/patient";

export const useRegisterPatient = () => {
  const router = useRouter();
  const { pendingToken, clearPendingToken, setUser } = useUserStore();

  return useMutation({
    mutationFn: async (data: ICreatePatient) => {
      if (!pendingToken) {
        toast.error("Sessão expirada. Por favor, faça o login novamente.");
        router.push("/auth");
        throw new Error("pendingToken ausente");
      }

      const response = await api.post("/auth/createPatient", data, {
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
          const session = await getSession();
          if (session?.user) {
            setUser({
              id: (session.user as any).id ?? (session.user as any)._id,
              email: session.user.email ?? "",
              name: session.user.name ?? undefined,
              photo: (session.user as any).profilePhoto ?? session.user.image ?? undefined,
              type: (session as any).userType ?? undefined,
            });
          }
          toast.success("Cadastro realizado e sessão iniciada!");
          router.push("/");
        } else {
          throw new Error(result?.error || "Não foi possível iniciar a sessão.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Ocorreu um erro ao iniciar a sessão.");
      }
    },
    onError: (error) => {
      if (error.message === "pendingToken ausente") return;
      toast.error(error.message);
    },
  });
};
