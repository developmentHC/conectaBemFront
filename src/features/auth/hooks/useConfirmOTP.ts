import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetUser } from "./useGetUser";

export const useConfirmOTP = () => {
  const router = useRouter();
  const { email } = useUserStore();
  const { refetch: fetchUser } = useGetUser({ enabled: false });

  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await api.post(`auth/checkOTP`, {
        email,
        OTP: code,
      });

      return { data: response.data, status: response.status };
    },
    onSuccess: async (response) => {
      if (response.status === 200) {
        await fetchUser();
        router.push("/");
      } else if (response.status === 201) {
        router.push("/auth/registro");
      }
    },
  });
};
