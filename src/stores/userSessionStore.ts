import { create } from "zustand";

type UserStoreProps = {
  email: string | null
  idUser: string | undefined
  exists: boolean
  setExists: (exists: boolean) => void
  setIdUser: (id: string) => void
  setEmail: (email: string) => void
}

export const useUserStore = create<UserStoreProps>((set) => ({
  email: null,
  idUser: undefined,
  exists: false,
  setExists: (exists: boolean) => set({ exists }),
  setEmail: (email: string) => set({ email }),
  setIdUser: (id: string) => set({ idUser: id }),
}))