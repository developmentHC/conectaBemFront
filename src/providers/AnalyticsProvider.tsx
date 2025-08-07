"use client";

import { useGTM } from "@/hooks/useGTM";
import { ReactNode } from "react";

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  useGTM();
  return <>{children}</>;
};
