import { api } from "@/libs/api";
import { ICreatePatient } from "@/types/patient";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRegisterPatient = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ICreatePatient) => {
      const response = await api.post("/auth/createPatient", data);

      return response.data;
    },
    onSuccess: async (data) => {
      try {
        console.log("data:", data);
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
      } catch (error) {
        console.log(error);
        toast.error("Ocorreu um erro ao iniciar a sessão.");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
