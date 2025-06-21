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
      <h1 className="text-xl font-bold mb-4">Doa berdasarkan kategori</h1>
      <h2 className="text-lg mb-2">Pilih kategori doa:</h2>
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
            <li key={idx} className="border-b bg-secondary-purple p-8 rounded-2xl space-y-5">
              <h3 className="font-bold text-xl text-primary-purple">{idx + 1}. {doa.judul}</h3>
              <p className="font-bold text-3xl text-background">{doa.arab}</p>
              <div>
                <p className='text-background'>Artinya:</p>
                <p className='text-muted-foreground'>{doa.indo}</p>
              </div>
              <p className='text-background'>Sumber: {doa.source}</p>
            </li>
          ))}
      </ul>
    </div>
    </MainLayout>
  );
}

