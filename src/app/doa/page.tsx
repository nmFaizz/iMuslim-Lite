
// kerjain disini buat doa page, jadi di response api 
// hasilnya di map return 
// pake endpoint '/v2/doa/sumber/<nama-sumber>'
// dapetin list nama sumber nya dari endpoint '/v2/doa/sumber' 
// nanti di page nya ada dropdown buat pilih sumber doa
// list sumbernya ada 'quran, hadist, haji, harian, pilihan, ibadah, lainnya'
// fokus integrasi apinya dlu, UI nya belakangan

// src/pages/DoaPage.tsx

'use client';
import MainLayout from '@/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { getDoaBySumber } from '@/services/doa';
import { Main } from 'next/document';

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
  arab : string;
  indo : string;
  judul : string;
  source : string;
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


    };

    fetchDoa();
  }, [selectedSumber]);

  return (
    <MainLayout withNavbar containerSize="1200">
      <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar Doa Berdasarkan Sumber & Grup</h1>
      <h2 className="text-lg mb-2">Pilih Sumber Doa:</h2>
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


      </div>
      <ul className="mt-6 space-y-4">
        {doaList
          .map((doa, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <p className="font-bold">{doa.arab}</p>
              <p className="text-gray-700">{doa.indo}</p>
              <p className="font-bold text-sm text-gray-700">judul: {doa.judul}</p>
              <p className="text-sm text-gray-500">Sumber: {doa.source}</p>
              <p className="text-sm text-gray-500">
              </p>
            </li>
          ))}
      </ul>
    </div>
    </MainLayout>
  );
}

