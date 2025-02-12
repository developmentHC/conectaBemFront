import { api } from '@/libs/api';
import { useMutation } from '@tanstack/react-query';

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async ({ data }: Args) => {
      console.log(data);
      const response = await api.post('/auth/google', data);

      return response.data;
    },
  });
};

type Data = {
  credential: string;
};

type Args = {
  data: Data;
  onSucess?: () => void;
  onError?: () => void;
};
