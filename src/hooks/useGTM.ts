"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gtmEvents } from "@/utils/gtm";

export const useGTM = () => {
  const pathname = usePathname();

  useEffect(() => {
    const pageName = pathname.split("/").filter(Boolean).join("_") || "home";
    gtmEvents.pageView(pageName);
  }, [pathname]);

  return gtmEvents;
};
