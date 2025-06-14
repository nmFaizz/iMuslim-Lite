// src/services/doa.ts
import apiMuslim from '@/lib/apiMuslim';
import axios from 'axios';

export interface DoaItem {
  doa: string;
  ayat: string;
  latin: string;
  artinya: string;
  sumber?: string;
  riwayat?: string;
  grup: string;
}

export interface KategoriDoa {
  id: string;
  nama: string;
  doa: DoaItem[];
}

export const getDoaBySumber = async (sumber: string) => {
  try {
    const url = `/v2/doa/sumber/${sumber}`;
    console.log('Fetching:', url);
    const response = await axios.get(url);
    return response.data?.data || [];
  } catch (error) {
    console.error('Gagal fetch doa dari sumber:', error);
    return [];
  }
};

export const getAllKategoriDoa = async (): Promise<KategoriDoa[]> => {
  try {
    const response = await apiMuslim.get('/doa');
    const rawArray: DoaItem[] = response.data;

    console.log("API Response:", response.data);
    console.log('✅ Data pertama dari API:', rawArray.slice(0, 3));
    console.log('🔍 response.data:', response.data);
    console.log('🧪 Apakah array?', Array.isArray(response.data));


    if (Array.isArray(rawArray)) {
      const grouped: Record<string, DoaItem[]> = {};

     rawArray.forEach((item, i) => {
  const kategori = (item.grup || 'Lainnya').trim(); // ← gunakan item.grup
  console.log(`📌 [${i}] kategori:`, kategori);

  if (!grouped[kategori]) {
    grouped[kategori] = [];
  }
  grouped[kategori].push(item);
});


  const kategoriArray: KategoriDoa[] = Object.keys(grouped).map((nama, index) => ({
      id: index.toString(),
        nama,
        doa: grouped[nama],
      }));

    console.log('📂 Semua kategori hasil grouping:', Object.keys(grouped)); // ⬅️ Log semua nama kategori hasil grouping

      return kategoriArray;
    }

    console.log('❌ Bukan array');
    return [];
  } catch (error) {
    console.error('Gagal mengambil semua kategori doa', error);
    return [];
  }
};




