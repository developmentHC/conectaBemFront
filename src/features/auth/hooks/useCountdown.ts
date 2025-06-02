import { useEffect, useState } from "react";

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    return;
  }, [timeLeft]);

  function startCountdown(seconds: number): void {
    setTimeLeft(seconds);
  }
  function isCountdownActive(): boolean {
    return timeLeft > 0;
  }
  return { timeLeft, startCountdown, isCountdownActive };
};
