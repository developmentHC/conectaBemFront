"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ThreeDotLoading from "@/components/ThreeDotLoading";

type SuccessScreenProps = {
  title: string;
  message: string;
  redirectUrl: string;
  duration?: number;
};

export const SuccessScreen = ({
  title,
  message,
  redirectUrl,
  duration = 4000,
}: SuccessScreenProps) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectUrl);
    }, duration);

    return () => clearTimeout(timer);
  }, [router, redirectUrl, duration]);

  return (
    <div className="fullscreen-mode flex h-screen flex-col items-center justify-center gap-8 bg-blue-600 p-4 text-center text-white">
      <h1 className="font-bold text-3xl">{title}</h1>
      <Image src="/images/logo2.svg" alt="Logo CB" width={150} height={150} />
      <ThreeDotLoading />
      <p className="text-lg">{message}</p>
    </div>
  );
};
