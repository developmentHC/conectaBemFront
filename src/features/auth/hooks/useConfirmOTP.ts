import { useMutation } from "@tanstack/react-query";
import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";

export const useConfirmOTP = () => {
  const { email } = useUserStore();

  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await api.post(`auth/checkOTP`, {
        email,
        OTP: code,
      });

      return { data: response.data, status: response.status };
    },
  });
};
