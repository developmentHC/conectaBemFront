import { create } from "zustand";

type EmailStoreProps = {
  email: string | null
  isConfirmed: boolean
  setEmail: (email: string) => void
}

export const useAuthStore = create<EmailStoreProps>((set) => ({
  email: null,
  isConfirmed: false,
  setEmail: (email: string) => set({ email }),
}))