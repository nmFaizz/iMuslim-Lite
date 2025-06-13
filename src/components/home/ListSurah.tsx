"use client"
import { useQuery } from "@tanstack/react-query"
import { Surah, AllSurahResponse } from "@/types/surah"
import Link from "next/link"
import apiQuran from "@/lib/apiQuran"

export default function ListSurah() {
    const { data } = useQuery<Surah[]>({
        queryKey: ['list-surah'],
        queryFn: async () => {
            const res = await apiQuran.get<AllSurahResponse>("/v2/surat")
            return res.data.data
        }
    })

    return (
        <div>
            {data?.map((surah) => (
                <Link 
                    href={`/surah/${surah.nomor}`} 
                    key={surah.nomor} 
                >
                    <div className="border-b border-input py-6">
                        <h2 className="text-2xl font-bold">{surah.nama}</h2>
                        <p>{surah.namaLatin}</p>
                        <p className="text-ring">{surah.tempatTurun} - {surah.jumlahAyat} Ayahs</p>
                        <audio controls src={surah.audioFull["01"]} className="mt-2"></audio>
                    </div>
                </Link>
            ))}
        </div>
    )
}