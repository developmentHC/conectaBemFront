import { api } from "@/libs/api";
import { useUserStore } from "@/stores/userSessionStore";
import { IProfessional } from "@/types/professional";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (options = {}) => {
  const { setUser } = useUserStore();

  return useQuery<IProfessional[]>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/user");

      setUser({
        id: response.data._id,
        email: response.data.email,
        name: response.data.name,
        type: response.data.userType,
        photo: response.data.profilePhoto,
      });

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
