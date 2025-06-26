import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserType = "patient" | "professional" | null;

interface UserData {
  id: string;
  email: string;
  name?: string;
  photo?: string;
  type?: UserType;
}

type UserStoreProps = {
  email: string | null;
  idUser: string | undefined;
  exists: boolean;
  name: string | null;
  profilePhoto: string | null;
  userType: UserType;
  isAuthenticated: boolean;

  setUser: (userData: UserData) => void;
  setUserType: (userType: UserType) => void;
  setExists: (exists: boolean) => void;
  setIdUser: (id: string) => void;
  setEmail: (email: string) => void;
  setProfilePhoto: (photo: string) => void;
  clearProfilePhoto: () => void;
  clearSession: () => void;
};

export const useUserStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      email: null,
      idUser: undefined,
      exists: false,
      name: null,
      profilePhoto: null,
      userType: null,
      isAuthenticated: false,
      setUser: (userData) => {
        set({
          idUser: userData.id,
          email: userData.email,
          name: userData.name || null,
          profilePhoto: userData.photo || null,
          userType: userData.type || null,
          exists: true,
          isAuthenticated: true,
        });
      },

      setExists: (exists) => set({ exists }),
      setEmail: (email) => set({ email }),
      setUserType: (userType) => set({ userType }),
      setIdUser: (id) => set({ idUser: id }),
      setProfilePhoto: (photo) => set({ profilePhoto: photo }),
      clearProfilePhoto: () => set({ profilePhoto: null }),
      clearSession: () => {
        set({
          email: null,
          idUser: undefined,
          exists: false,
          name: null,
          profilePhoto: null,
          userType: null,
          isAuthenticated: false,
        });
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("user-session");
        }
      },
    }),
    {
      name: "user-session",
      storage: typeof window !== "undefined" ? createJSONStorage(() => window.sessionStorage) : undefined,
      partialize: (state) => ({
        profilePhoto: state.profilePhoto,
        idUser: state.idUser,
        exists: state.exists,
        name: state.name,
        userType: state.userType,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
