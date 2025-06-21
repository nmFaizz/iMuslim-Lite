"use client";
import MainLayout from "@/layouts/MainLayout";
import apiQuran from "@/lib/apiQuran";
import { 
    Ayat, 
    SingleSurahResponse, 
    SurahDetail 
} from "@/types/surah";
import { useQuery } from "@tanstack/react-query";


export default function SingleSurahContainer({
    number,
}: {
    number: string
}) {

    const { data: surah } = useQuery<SurahDetail>({
        queryKey: ['surah', number],
        queryFn: async () => {
            const response = await apiQuran.get<SingleSurahResponse>(`/v2/surat/${number}`);
            return response.data.data;
        },
    })

    return (
        <MainLayout withNavbar containerSize="1200">
            <div className="flex flex-col items-center space-y-4 my-10">
                <h1 className="text-4xl md:text-7xl font-bold">{surah?.nama}</h1>
                <p className="text-2xl">{surah?.namaLatin}</p>
                <p>{surah?.tempatTurun} - {surah?.jumlahAyat} Ayat</p>
                <p className="text-center mt-8">{surah?.deskripsi}</p>
            </div>
            <div>
                {surah?.ayat?.map((ayat: Ayat) => (
                    <div key={ayat.nomorAyat} className="border-b space-y-5 py-12">
                        <h2 className="text-xl font-semibold">Ayat {ayat.nomorAyat}</h2>
                        <p className="text-2xl">{ayat.teksArab}</p>
                        <p className="italic">{ayat.teksLatin}</p>
                        <p className="text-primary">{ayat.teksIndonesia}</p>
                        <audio controls src={ayat.audio["01"]} preload="none">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}