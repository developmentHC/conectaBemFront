import { usePageTracking } from "@/features/gtm/hooks/usePageTracking";
import { ReactNode } from "react";

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  usePageTracking();
  return <>{children}</>;
};
