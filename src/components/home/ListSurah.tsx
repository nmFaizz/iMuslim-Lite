"use client"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Surah, AllSurahResponse } from "@/types/surah"
import Link from "next/link"
import apiQuran from "@/lib/apiQuran"
import { Button } from "@/components/ui/button"
import { ArrowRightCircle, Bookmark } from "lucide-react"
import ListSkeleton from "@/components/ListSkeleton"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Session } from "@supabase/supabase-js"
import { UncontrolledInput } from "@/components/ui/uncontrolled/UncontrolledInput"

export default function ListSurah() {
    const [listSurah, setListSurah] = React.useState<Surah[]>([])
    const [searchSurah, setSearchSurah] = React.useState<string>('')
    const [searchedListSurah, setSearchedListSurah] = React.useState<Surah[]>([])

    const { isSuccess, isLoading } = useQuery<Surah[]>({
        queryKey: ['list-surah'],
        queryFn: async () => {
            const res = await apiQuran.get<AllSurahResponse>("/v2/surat")
            setListSurah(res.data.data)
            setSearchedListSurah(res.data.data)
            return res.data.data
        }
    })

    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { error, data } = await supabase.auth.getSession()
            
            if (error) {
                toast.error(error.message)
                return;
            }

            return data.session
        },
    })

    if (isLoading) {
        return <ListSkeleton className="my-8" />
    }

    return (
        <>  
            <h1 className="text-3xl font-bold mt-12">
                Daftar Surah
            </h1>
            
            <UncontrolledInput 
                id="search-surah"
                placeholder="Cari Surah..."
                className="mt-4 mb-8"
                value={searchSurah}
                onChange={(e) => {
                    setSearchSurah(e.target.value)

                    if (e.target.value === '') {
                        setSearchedListSurah(listSurah)
                        return;
                    }

                    const filteredSurah = listSurah.filter(surah => 
                        surah.namaLatin.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                    setSearchedListSurah(filteredSurah)
                }}
            />

            <div className="my-8">
                {isSuccess && (
                    searchedListSurah?.map((surah) => (
                        <SurahItem 
                            key={surah.nomor} 
                            surah={surah}  
                            session={session}
                        />
                    ))
                )}
            </div>
        </>
    )
}

function SurahItem({
    surah,
    session = null
}: {
    surah: Surah;
    session?: Session | null;
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

                <div>
                    <Link href={`/surah/${surah.nomor}`}>
                        <Button className="mt-8">
                            <span className="flex items-center gap-2">
                                Baca Surah
                                <ArrowRightCircle className="w-5 h-5" />
                            </span>
                        </Button>
                    </Link>

                    {session && (
                        <Button 
                            variant="ghost" 
                            className="ml-3 mt-2"
                        >
                            Bookmark
                            <Bookmark />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}