
// kerjain disini buat doa page, jadi di response api 
// hasilnya di map return 
// pake endpoint '/v2/doa/sumber/<nama-sumber>'
// dapetin list nama sumber nya dari endpoint '/v2/doa/sumber' 
// nanti di page nya ada dropdown buat pilih sumber doa
// list sumbernya ada 'quran, hadist, haji, harian, pilihan, ibadah, lainnya'
// fokus integrasi apinya dlu, UI nya belakangan

// src/pages/DoaPage.tsx

'use client';

import { useEffect, useState } from 'react';
import { getDoaBySumber } from '@/services/doa';

const sumberList = [
  { label: "Quran", value: "quran" },
  { label: "Hadits", value: "hadits" },
  { label: "Pilihan", value: "pilihan" },
  { label: "Harian", value: "harian" },
  { label: "Ibadah", value: "ibadah" },
  { label: "Haji", value: "haji" },
  { label: "Lainnya", value: "lainnya" }
];


interface DoaItem {
  doa: string;
  ayat: string;
  latin: string;
  artinya: string;
  grup: string;
  riwayat?: string;
}

export default function DoaPage() {
  const [selectedSumber, setSelectedSumber] = useState<string>('quran');
  const [doaList, setDoaList] = useState<DoaItem[]>([]);
  const [uniqueGrupList, setUniqueGrupList] = useState<string[]>([]);
  const [selectedGrup, setSelectedGrup] = useState<string>('');

  useEffect(() => {
    const fetchDoa = async () => {
      const data = await getDoaBySumber(selectedSumber);
      setDoaList(data);

      const grupSet = new Set(data.map((doa: DoaItem) => doa.grup));
      const grupArray = Array.from(grupSet).filter((grup): grup is string => typeof grup === 'string');

      setUniqueGrupList(grupArray);
      setSelectedGrup(grupArray[0] || '');
    };

    fetchDoa();
  }, [selectedSumber]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar Doa Berdasarkan Sumber & Grup</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <select
        value={selectedSumber}
        onChange={(e) => setSelectedSumber(e.target.value)}
        className="p-2 border rounded"
>
        {sumberList.map(({ label, value }) => (
          <option key={value} value={value}>
          {label}
          </option>
        ))}
        </select>

        {uniqueGrupList.length > 0 && (
          <select
            value={selectedGrup}
            onChange={(e) => setSelectedGrup(e.target.value)}
            className="p-2 border rounded"
          >
            {uniqueGrupList.map((grup, idx) => (
              <option key={idx} value={grup}>
                {grup}
              </option>
            ))}
          </select>
        )}
      </div>

      <ul className="mt-6 space-y-4">
        {doaList
          .filter((doa) => doa.grup === selectedGrup)
          .map((doa, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <p className="font-bold">{doa.doa}</p>
              <p className="italic text-xl">{doa.ayat}</p>
              <p className="text-sm text-gray-700">{doa.latin}</p>
              <p className="text-sm text-gray-600">{doa.artinya}</p>
              <p className="text-sm text-gray-500">
                Grup: {doa.grup} {doa.riwayat && `- ${doa.riwayat}`}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}

