import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import type { IUserAuth as IJwt } from "@/types/auth";

type SessionProps = {
  session: null | IJwt;
};

const getSessionFromToken = (): IJwt | null => {
  try {
    const token = Cookies.get("authToken");
    if (!token) return null;
    return jwtDecode<IJwt>(token);
  } catch {
    return null;
  }
};

export const useSession = create<SessionProps>(() => ({
  session: getSessionFromToken(),
}));
