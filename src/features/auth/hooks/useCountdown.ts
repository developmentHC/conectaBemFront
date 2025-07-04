import { useEffect, useState } from "react";

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      setIsActive(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startCountdown = (seconds: number) => {
    setTimeLeft(seconds);
    setIsActive(true);
  };

  return { timeLeft, isActive, startCountdown };
};
