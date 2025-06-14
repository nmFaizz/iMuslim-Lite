// src/services/doa.ts
import apiMuslim from '@/lib/apiMuslim';

export interface DoaItem {
  arab : string;
  indo : string;
  judul : string;
  source : string;
}


export interface KategoriDoa {
  id: string;
  nama: string;
  doa: DoaItem[];
}

export const getDoaBySumber = async (sumber: string) => {
  try {
    const path = `/doa/sumber/${sumber}`; // Menggunakan sumber yang dipilih
    console.log('Fetching:', path);
    const response = await apiMuslim.get(path);
    console.log('Response :', response);
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

 ;


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




