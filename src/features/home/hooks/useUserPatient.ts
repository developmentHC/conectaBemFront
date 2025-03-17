import { IPatient } from "@/types/patient";
import { useQuery } from "@tanstack/react-query";

export const useUserPatient = () => {
  return useQuery<IPatient>({
    queryKey: ["userPatient"],
    queryFn: async () => {
      const storedPatient = localStorage.getItem("userPatient");

      if (storedPatient) {
        return JSON.parse(storedPatient);
      }

      const response = await fetch("mocks/userPatient.json");
      const data = await response.json();

      localStorage.setItem("userPatient", JSON.stringify(data));

      return data;
    },
  });
};