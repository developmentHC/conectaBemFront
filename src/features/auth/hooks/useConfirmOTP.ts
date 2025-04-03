import { api } from "@/libs/api";
import { useEmailStore } from "@/stores/emailStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useConfirmOTP = () => {
  const router = useRouter();
  const { email } = useEmailStore();

  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await api.post(`auth/checkOTP`, {
        email,
        OTP: code,
      });

      return response.data;
    },
    onSuccess: () => {
      router.push(`/auth/registro`);
    },
  });
};
