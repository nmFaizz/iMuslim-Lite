'use client';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiMuslim from '@/lib/apiMuslim';
import { AllDoaResponse, Doa } from '@/types/doa';
import ListSkeleton from '@/components/ListSkeleton';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectLabel
} from '@/components/ui/select';

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

  const { data, isLoading, isSuccess } = useQuery<Doa[]>({
    queryKey: ['doa', selectedSumber],
    queryFn: async () => {
      const res = await apiMuslim.get<AllDoaResponse>(`/doa/sumber/${selectedSumber}`);
      return res.data.data;
    }
  })

  return (
    <MainLayout withNavbar containerSize="1200">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Doa berdasarkan kategori</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Select
            onValueChange={(value) => {
                setSelectedSumber(value);
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Pilih kategori doa" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Kategori Doa</SelectLabel>
                    {sumberList?.map((sumber, i) => (
                        <SelectItem 
                            key={i} 
                            value={sumber.value}
                        >
                            {sumber.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <ListSkeleton className='mt-4 '/>
      )}

      {isSuccess && (
        <ul className="mt-6 space-y-4">
          {data?.map((doa, idx) => (
              <li key={idx} className="bg-secondary-purple dark:bg-muted/20 p-8 rounded-2xl space-y-5">
                <div className='bg-white rounded-lg px-4 py-1.5 w-max'>
                  <h3 className="font-bold text-black">{idx + 1}. {doa.judul}</h3>
                </div>
                <p className="font-bold text-3xl text-primary-purple">{doa.arab}</p>
                <div>
                  <p className='text-foreground'>Artinya:</p>
                  <p className='text-foreground'>{doa.indo}</p>
                </div>
                <p className='text-muted-foreground'>Sumber: {doa.source}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
    </MainLayout>
  );
}

