import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUserStore } from "@/stores/userSessionStore";

export const useAuth = () => {
  const router = useRouter();
  const { exists, idUser, userType, clearSession } = useUserStore();

  const isAuthenticated = Boolean(exists && idUser);

  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/auth");
      return false;
    }
    return true;
  }, [isAuthenticated, router]);

  const logout = useCallback(() => {
    clearSession();
    router.push("/auth");
  }, [clearSession, router]);

  return {
    isAuthenticated,
    userType,
    requireAuth,
    logout,
  };
};
