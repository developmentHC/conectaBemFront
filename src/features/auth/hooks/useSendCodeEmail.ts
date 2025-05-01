// import { useSession } from '@/stores/useSession';
import { api } from "@/libs/api";
import { useEmailStore } from "@/stores/userSessionStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSendCodeEmail = () => {
  const router = useRouter();
  const { email, exists, setExists } = useEmailStore();

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
    }
  });
};

type Data = {
  code: string;
};
