"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ThreeDotLoading from "@/components/ThreeDotLoading";

type SuccessScreenProps = {
  title: string;
  message: string;
  redirectUrl: string;
  duration?: number;
};

export const SuccessScreen = ({ title, message, redirectUrl, duration = 4000 }: SuccessScreenProps) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectUrl);
    }, duration);

    return () => clearTimeout(timer);
  }, [router, redirectUrl, duration]);

  return (
    <div className="fullscreen-mode flex flex-col items-center justify-center text-center gap-8 bg-blue-600 text-white h-screen p-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <img src="/images/logo2.svg" alt="Logo CB" width={150} height={150} />
      <ThreeDotLoading />
      <p className="text-lg">{message}</p>
    </div>
  );
};
