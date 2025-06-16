"use client";
import { useQuery } from '@tanstack/react-query';

import useTime from '@/hooks/useTime';
import { getFormattedDate } from '@/lib/helper';
import apiMuslim from '@/lib/apiMuslim';
import { JadwalShalat, Kota, PilihKotaResponse } from '@/types/jadwal';
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectLabel, 
    SelectItem 
} from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { useState } from 'react';

export default function JadwalSholat() {
    const { time } = useTime();
    const [selectedKota, setSelectedKota] = useState<string>('1632');

    const { data: jadwal } = useQuery<JadwalShalat>({
        queryKey: ['jadwal-sholat', selectedKota],
        queryFn: async () => {
            const res = await apiMuslim.get(`/sholat/jadwal/${selectedKota}/${getFormattedDate(new Date())}`);
            return res.data.data;
        },
        refetchInterval: 60000, 
    })  
    
    const { data: pilihanKota, isLoading } = useQuery<Kota[]>({
        queryKey: ['pilihan-kota'],
        queryFn: async () => {
            const res = await apiMuslim.get<PilihKotaResponse>('/sholat/kota/semua');
            return res.data.data;
        },
        refetchInterval: 60000,
    })

    // const { data: jadwalBulanan } = useQuery<JadwalShalat>({
    //     queryKey: ['jadwal-sholat-kota', selectedKota],
    //     queryFn: async () => {
    //         const res = await apiMuslim.get(`/sholat/jadwal/${selectedKota}/${new Date().getFullYear()}/${new Date().getMonth()}`);
    //         console.log(res.data.data)
    //         return res.data.data;
    //     },
    //     enabled: !!selectedKota, 
    //     refetchInterval: 60000,
    // });
    
    return (
        <div className='my-6 md:my-8'>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-4xl'>{time} WIB</p>
              
                <div>
                    <p>{jadwal?.daerah} - {jadwal?.lokasi}</p>
                </div>
        
                <div className='grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-5 mt-12 w-full'>
                    <div className='text-sm md:text-base border border-muted-foreground/20 rounded-lg p-2 flex flex-col items-center justify-center'>
                        <h3>{jadwal?.jadwal.imsak}</h3>
                        <p>IMSAK</p>
                    </div>
                    <div className='text-sm md:text-base border border-muted-foreground/20 rounded-lg p-2 flex flex-col items-center justify-center'>
                        <h3>{jadwal?.jadwal.subuh}</h3>
                        <p>SUBUH</p>
                    </div>
                    <div className='text-sm md:text-base border border-muted-foreground/20 rounded-lg p-2 flex flex-col items-center justify-center'>
                        <h3>{jadwal?.jadwal.dzuhur}</h3>
                        <p>DZUHUR</p>
                    </div>
                    <div className='text-sm md:text-base border border-muted-foreground/20 rounded-lg p-2 flex flex-col items-center justify-center'>
                        <h3>{jadwal?.jadwal.ashar}</h3>
                        <p>ASHAR</p>
                    </div>
                    <div className='text-sm md:text-base border border-muted-foreground/20 rounded-lg p-2 flex flex-col items-center justify-center'>
                        <h3>{jadwal?.jadwal.maghrib}</h3>
                        <p>MAGHRIB</p>
                    </div>
                    <div className='text-sm md:text-base border border-muted-foreground/20 rounded-lg p-2 flex flex-col items-center justify-center'>
                        <h3>{jadwal?.jadwal.isya}</h3>
                        <p>ISYA</p>
                    </div>
                </div>
            </div>

            <div className='mt-8'>
                <Select
                    onValueChange={(value) => {
                        console.log('Kota terpilih:', value);
                        setSelectedKota(value);
                    }}
                >
                    <SelectTrigger disabled={isLoading}>
                        <SelectValue placeholder="Pilih Jadwal Sholat" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Kota di Indonesia</SelectLabel>
                            {pilihanKota?.map((kota) => (
                                <SelectItem 
                                    key={kota.id} 
                                    value={kota.id}
                                >
                                    {kota.lokasi}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
