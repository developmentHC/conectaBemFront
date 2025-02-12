import { create } from "zustand";

type EmailStoreProps = {
  email: string | null
  exists: boolean
  setExists: (exists: boolean) => void
  setEmail: (email: string) => void
}

export const useEmailStore = create<EmailStoreProps>((set) => ({
  email: null,
  exists: false,
  setExists: (exists: boolean) => set({ exists }),
  setEmail: (email: string) => set({ email }),
}))