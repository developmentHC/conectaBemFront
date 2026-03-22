// import { useSession } from '@/stores/useSession';

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";

export const useSendCodeEmail = () => {
  const router = useRouter();
  const { email, exists, setExists } = useUserStore();

  return useMutation({
    mutationFn: async ({ code }: Data) => {
      const response = await api.post(`auth/checkOTP`, {
        email,
        OTP: code,
      });

      const data = response.data;

      setExists(data.message.email.exists);

      return data;
    },
    onSuccess: () => {
      if (!exists) {
        return router.push(`/auth/register`);
      }

      router.push(`/home`);
    },
  });
};

type Data = {
  code: string;
};
