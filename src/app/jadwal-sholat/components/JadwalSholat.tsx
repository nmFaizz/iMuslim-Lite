"use client";
import { useQuery } from '@tanstack/react-query';

import useTime from '@/hooks/useTime';
import { getFormattedDate } from '@/lib/helper';
import apiMuslim from '@/lib/apiMuslim';
import { JadwalShalat, JadwalShalatBulanan, JadwalShalatBulananResponse, Kota, PilihKotaResponse } from '@/types/jadwal';
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
import { getCurrentPrayer, getTimeUntilNext } from '@/lib/jadwalShalat';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import useSession from '@/hooks/useSession';

export default function JadwalSholat() {
    const { time } = useTime();
    const [selectedKota, setSelectedKota] = useState<string>('1632');
    const { session } = useSession();

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');

    const { data: jadwal } = useQuery<JadwalShalat>({
        queryKey: ['jadwal-sholat', selectedKota],
        queryFn: async () => {
            const res = await apiMuslim.get(`/sholat/jadwal/${selectedKota}/${getFormattedDate(new Date())}`);
            return res.data.data;
        },
        refetchInterval: 60000, 
    })  
    
    const { data: pilihanKota, isLoading: isPilihanLoading } = useQuery<Kota[]>({
        queryKey: ['pilihan-kota'],
        queryFn: async () => {
            const res = await apiMuslim.get<PilihKotaResponse>('/sholat/kota/semua');
            return res.data.data;
        },
        refetchInterval: 60000,
    })

    const { 
        data: jadwalBulanan, 
        isLoading: isBulananLoading, 
        isSuccess: isBulananSuccess 
    } = useQuery<JadwalShalatBulanan>({
        queryKey: ['jadwal-sholat-bulanan', selectedKota],
        queryFn: async () => {
            const res = await apiMuslim.get<JadwalShalatBulananResponse>(`https://api.myquran.com/v2/sholat/jadwal/${selectedKota}/${year}/${month}`);
            return res.data.data;
        },
        refetchInterval: 60000,
    })

    const {  } = useQuery({
        queryKey: ['user-kota', selectedKota],
        queryFn: async () => {
            const { error, data: userResponse } = await supabase.auth.getUser();

            if (error) {
                toast.error(error.message);
                return null;
            }

            const userId = userResponse?.user?.id;
            const { data: userKota } = await supabase
                .from("user")
                .select("kota_id")
                .eq("id", userId)
                .single();
             
            setSelectedKota(userKota?.kota_id)
            return userKota?.kota_id
        },
        enabled: !!session?.access_token,
    })

    const currentPrayerInfo = jadwal ? getCurrentPrayer(jadwal.jadwal, time || "") : null;
    const timeUntilNext = currentPrayerInfo ? getTimeUntilNext(currentPrayerInfo.next.time, time || "") : null;
    
    return (
        <div className='my-6 md:my-8'>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-4xl'>{time} WIB</p>
              
                <div>
                    <p>{jadwal?.daerah} - {jadwal?.lokasi}</p>
                </div>

                {currentPrayerInfo && (
                    <div className='mt-6 text-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
                        <p className='text-lg font-semibold text-blue-700 dark:text-blue-300'>
                            Waktu {currentPrayerInfo.current.name}
                        </p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            {currentPrayerInfo.current.time} - {currentPrayerInfo.next.time}
                        </p>
                        {timeUntilNext && (
                            <p className='text-sm text-gray-500 dark:text-gray-500 mt-1'>
                                {timeUntilNext.hours > 0 && `${timeUntilNext.hours} jam `}
                                {timeUntilNext.minutes} menit lagi menuju {currentPrayerInfo.next.name}
                            </p>
                        )}
                    </div>
                )}
        
                <div className='grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mt-12 w-full'>
                    {[
                        { time: jadwal?.jadwal.imsak, name: 'IMSAK', key: 'imsak' },
                        { time: jadwal?.jadwal.subuh, name: 'SUBUH', key: 'subuh' },
                        { time: jadwal?.jadwal.dzuhur, name: 'DZUHUR', key: 'dzuhur' },
                        { time: jadwal?.jadwal.ashar, name: 'ASHAR', key: 'ashar' },
                        { time: jadwal?.jadwal.maghrib, name: 'MAGHRIB', key: 'maghrib' },
                        { time: jadwal?.jadwal.isya, name: 'ISYA', key: 'isya' }
                    ].map((prayer) => {
                        const isActive = currentPrayerInfo?.current.key === prayer.key;
                        const isNext = currentPrayerInfo?.next.key === prayer.key;
                        
                        return (
                            <div 
                                key={prayer.key}
                                className={`text-sm md:text-base border rounded-lg p-2 flex flex-col items-center justify-center transition-colors text-center ${
                                    isActive 
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                                        : isNext
                                        ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                                        : 'border-muted-foreground/20'
                                }`}
                            >
                                <h3 className={`font-semibold ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                                    {prayer.time}
                                </h3>
                                <p className={`text-xs md:text-sm ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                    {prayer.name}
                                    {isActive && ' (Sekarang)'}
                                    {isNext && ' (Selanjutnya)'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='mt-8'>
                <Select
                    onValueChange={(value) => {
                        setSelectedKota(value);
                    }}
                >
                    <SelectTrigger disabled={isPilihanLoading}>
                        <SelectValue placeholder="Pilih kota" />
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

            <div className="w-full  mx-auto mt-5">
                <div className="rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border border-border rounded-t-lg">
                        <h2 className="text-xl font-bold text-foreground">Jadwal Sholat Bulanan</h2>
                    </div>

                    <div className="overflow-x-auto max-h-[500px]">
                        <table className="w-full border">
                            <thead className='sticky top-0 bg-background z-20'>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-6 font-bold text-foreground uppercase tracking-wider text-sm">
                                        Tanggal
                                    </th>
                                    <th className="text-left py-4 px-6 font-bold text-foreground uppercase tracking-wider text-sm">
                                        Imsak
                                    </th>
                                    <th className="text-left py-4 px-6 font-bold text-foreground uppercase tracking-wider text-sm">
                                        Subuh
                                    </th>
                                    <th className="text-left py-4 px-6 font-bold text-foreground uppercase tracking-wider text-sm">
                                        Dzuhur
                                    </th>
                                    <th className="text-left py-4 px-6 font-bold text-foreground uppercase tracking-wider text-sm">
                                        Ashar
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-foreground uppercase tracking-wider text-sm">
                                        Maghrib
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-foreground uppercase tracking-wider text-sm">
                                        Isya
                                    </th>
                                </tr>
                            </thead>

                            {isBulananLoading && (
                                <tbody>
                                    <tr>
                                        <td colSpan={7} className="py-4 px-6 text-center text-muted-foreground">
                                            Memuat jadwal sholat bulanan...
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            
                            {isBulananSuccess && (
                                <tbody className="divide-y divide-border">
                                    {jadwalBulanan?.jadwal.map((item) => (
                                        <tr key={item.tanggal} className="hover:bg-foreground/10 transition-colors duration-200">
                                            <td className="py-4 px-6 text-foreground font-medium">{item.tanggal}</td>
                                            <td className="py-4 px-6 text-foreground font-mono">{item.imsak}</td>
                                            <td className="py-4 px-6 text-foreground font-mono">{item.subuh}</td>
                                            <td className="py-4 px-6 text-foreground font-mono">{item.dzuhur}</td>
                                            <td className="py-4 px-6 text-foreground font-mono">{item.ashar}</td>
                                            <td className="py-4 px-6 text-foreground font-mono">{item.maghrib}</td>
                                            <td className="py-4 px-6 text-foreground font-mono">{item.isya}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}