import { IProfessional } from "@/types/professional";
import { createContext, useContext } from "react";

type ProfessionalContextProviderProps = {
  professional: IProfessional;
  children: React.ReactNode;
};

const ProfessionalContext = createContext<IProfessional | null>(null);

export const useProfessional = () => {
  const context = useContext(ProfessionalContext);

  if (!context) {
    throw new Error(
      "useProfessionalContext Precisa ser usado dentro de um ProfessionalContextProvider"
    );
  }

  return context;
};

export const ProfessionalContextProvider = ({
  professional,
  children,
}: ProfessionalContextProviderProps) => {
  return (
    <ProfessionalContext.Provider value={professional}>
      {children}
    </ProfessionalContext.Provider>
  );
};
