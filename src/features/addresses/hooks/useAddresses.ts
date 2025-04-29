import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["userAddresses"],
    queryFn: async () => {
      const response = await axios.get("/mocks/adresses.json");
      
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1 * 60 * 60 * 1000,
  });
};
