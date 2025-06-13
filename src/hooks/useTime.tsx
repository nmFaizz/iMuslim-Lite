"use client";
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
      setTime(new Date().toLocaleTimeString('id-ID', { timeZone }));
    };

    update(); 

    const interval = setInterval(update, 1000); 

    return () => clearInterval(interval); 
  }, [timeZone]);

  return { time };
}