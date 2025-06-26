import { useEffect, useState } from "react";

export const useCountdown = () => {
  const [countdown, setCountdown] = useState(30);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || countdown <= 0) {
      setIsActive(false);

      setCountdown(30);

      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, countdown]);

  const startCountdown = () => {
    setCountdown(countdown);
    setIsActive(true);
  };

  return { countdown, isActive, startCountdown };
};
