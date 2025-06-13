// src/services/doa.ts

import { Doa } from "../types/doa";

// Perbarui base URL yang benar
const BASE_URL = "https://api-zhirrr.vercel.app/api";

export const fetchSumberList = async (): Promise<string[]> => {
  return ['quran', 'hadist', 'haji', 'harian', 'pilihan', 'ibadah', 'lainnya'];
};

export const fetchDoaBySumber = async (sumber: string): Promise<Doa[]> => {
    const res = await fetch(`/api/proxy/doa/${sumber}`);
    if (!res.ok) throw new Error("Gagal mengambil doa dari sumber " + sumber);
    const data = await res.json();
    return data.data;
  };
  
