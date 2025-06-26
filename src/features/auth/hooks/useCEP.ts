// import { api } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCEP = ({ cep }: { cep: string }) => {
  return useQuery({
    queryKey: ["cep", cep],
    queryFn: async () => {
      cep = cep.replace("-", "");

      if (!cep || cep.length !== 8) return null;

      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      return response.data;
    },
    retry: false,
  });
};
