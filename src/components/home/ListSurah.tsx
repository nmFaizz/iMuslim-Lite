"use client"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Surah, AllSurahResponse } from "@/types/surah"
import Link from "next/link"
import apiQuran from "@/lib/apiQuran"
import { Button } from "@/components/ui/button"
import { ArrowRightCircle } from "lucide-react"
import ListSkeleton from "@/components/ListSkeleton"

export default function ListSurah() {
    const { data, isSuccess, isLoading } = useQuery<Surah[]>({
        queryKey: ['list-surah'],
        queryFn: async () => {
            const res = await apiQuran.get<AllSurahResponse>("/v2/surat")
            return res.data.data
        }
    })

    if (isLoading) {
        return <ListSkeleton className="my-8" />
    }

    return (
        <>  
            <h1 className="text-3xl font-bold mt-12">
                Daftar Surah
            </h1>
            <div className="my-8">
                {isSuccess && (
                    data?.map((surah) => (
                        <SurahItem 
                            key={surah.nomor} 
                            surah={surah}  
                        />
                    ))
                )}
            </div>
        </>
    )
}

function SurahItem({
    surah,
}: {
    surah: Surah;
}) {
    return (
        <div 
            key={surah.nomor}
            className="flex md:flex-row flex-col gap-5 py-6 bg-secondary-purple dark:bg-muted/20 text-black rounded-2xl p-5 mb-5"
        >
            <div className="flex items-center justify-center rounded-full w-[50px] h-[50px] bg-white">
                <p className="text-2xl">{surah.nomor}</p>
            </div>

            <div>
                <h2 className="text-2xl md:text-4xl font-bold text-primary-purple">{surah.nama}</h2>
                <p className="font-bold text-foreground">{surah.namaLatin}</p>
                <p className="text-muted-foreground">{surah.tempatTurun} - {surah.jumlahAyat} Ayahs</p>

                <audio
                    controls
                    src={surah.audioFull["01"]}
                    className="mt-2"
                    preload="none"
                />
                <Link href={`/surah/${surah.nomor}`}>
                    <Button className="mt-8">
                        <span className="flex items-center gap-2">
                            Baca Surah
                            <ArrowRightCircle className="w-5 h-5" />
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}