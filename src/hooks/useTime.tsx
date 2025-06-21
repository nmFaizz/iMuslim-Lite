import { useEffect, useState } from "react";

type TimeProps = {
  timeZone?: string;
}

export default function useTime({ 
  timeZone = 'Asia/Jakarta' 
}: TimeProps = {}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
    const now = new Date();

    const pad = (num: number) => String(num).padStart(2, '0');

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    setTime(`${hours}:${minutes}:${seconds}`);
  };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return { time };
}
