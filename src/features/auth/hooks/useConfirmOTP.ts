import { api } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";

export const useConfirmOTP = () => {
  const router = useRouter();
  const { email, isConfirmed } = useAuthStore();

  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await api.post(`auth/checkOTP`, {
        email,
        OTP: code,
      });

      return response.data;
    },
    onSuccess: () => {
      if (!isConfirmed) {
        router.push(`/auth/registro`);
      }

      router.push(`/home`);
    },
  });
};