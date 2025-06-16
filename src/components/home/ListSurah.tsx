"use client"
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Surah, AllSurahResponse } from "@/types/surah"
import Link from "next/link"
import apiQuran from "@/lib/apiQuran"
import { Button } from "@/components/ui/button"
import { ArrowRightCircle } from "lucide-react"
import ListSkeleton from "../ListSkeleton"

export default function ListSurah() {
    const { data, isSuccess, isLoading } = useQuery<Surah[]>({
        queryKey: ['list-surah'],
        queryFn: async () => {
            const res = await apiQuran.get<AllSurahResponse>("/v2/surat")
            return res.data.data
        }
    })

    const [audioReady, setAudioReady] = useState<{ [key: number]: boolean }>({})

    

    const handleAudioReady = (nomor: number) => {
        setAudioReady(prev => ({ ...prev, [nomor]: true }))
    }

    return (
        <div className="my-8">
            {isLoading && (
                <ListSkeleton />
            )}

            {isSuccess && (
                data?.map((surah) => (
                    <div 
                        key={surah.nomor}
                        className="flex md:flex-row flex-col gap-5 border-b border-input py-6 bg-secondary-purple text-black rounded-2xl p-5 mb-5"
                    >
                        <div className="flex items-center justify-center rounded-full w-[50px] h-[50px] bg-white">
                            <p className="text-2xl">{surah.nomor}</p>
                        </div>

                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-primary-purple">{surah.nama}</h2>
                            <p className="font-bold">{surah.namaLatin}</p>
                            <p className="text-ring">{surah.tempatTurun} - {surah.jumlahAyat} Ayahs</p>

                            {!audioReady[surah.nomor] && (
                                <p className="mt-2 text-sm text-muted-foreground">Loading audio...</p>
                            )}
                            <audio
                                controls
                                src={surah.audioFull["01"]}
                                className="mt-2"
                                style={{ display: audioReady[surah.nomor] ? "block" : "none" }}
                                onCanPlayThrough={() => handleAudioReady(surah.nomor)}
                                preload="auto"
                            />
                            <Link href={`/surah/${surah.nomor}`}>
                                <Button className="mt-8">
                                    Baca Surah
                                    <ArrowRightCircle />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}