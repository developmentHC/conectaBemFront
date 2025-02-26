// import { api } from "@/libs/api";
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCEP = ({ cep }: { cep: string }) => {
  return useQuery({
    queryKey: ["cep", cep],
    queryFn: async () => {
      cep = cep.replace("-", "");

      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      return response.data;
    },
  });
};