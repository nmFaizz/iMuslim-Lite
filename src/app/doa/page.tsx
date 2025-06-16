'use client';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiMuslim from '@/lib/apiMuslim';
import { AllDoaResponse, Doa } from '@/types/doa';
import ListSkeleton from '@/components/ListSkeleton';

const sumberList = [
  { label: "Quran", value: "quran" },
  { label: "Hadits", value: "hadits" },
  { label: "Pilihan", value: "pilihan" },
  { label: "Harian", value: "harian" },
  { label: "Ibadah", value: "ibadah" },
  { label: "Haji", value: "haji" },
  { label: "Lainnya", value: "lainnya" }
];

export default function DoaPage() {
  const [selectedSumber, setSelectedSumber] = useState<string>('quran');

  const { data, isLoading } = useQuery<Doa[]>({
    queryKey: ['doa', selectedSumber],
    queryFn: async () => {
      const res = await apiMuslim.get<AllDoaResponse>(`/doa/sumber/${selectedSumber}`);
      return res.data.data;
    }
  })

  return (
    <MainLayout withNavbar containerSize="1200">
      <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Doa Doa Berdasarkan Sumber</h1>
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

      {isLoading && (
        <ListSkeleton className='mt-4 '/>
      )}
      <ul className="mt-6 space-y-4">
        {data?.map((doa, idx) => (
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

