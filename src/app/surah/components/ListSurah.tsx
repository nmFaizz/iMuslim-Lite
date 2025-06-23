"use client"
import React from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Surah, AllSurahResponse, SavedSurah } from "@/types/surah"
import Link from "next/link"
import apiQuran from "@/lib/apiQuran"
import { Button } from "@/components/ui/button"
import { ArrowRightCircle, Bookmark, Loader2Icon } from "lucide-react"
import ListSkeleton from "@/components/ListSkeleton"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Session } from "@supabase/supabase-js"
import { UncontrolledInput } from "@/components/ui/uncontrolled/UncontrolledInput"
import { useDebounce } from "@/app/surah/hooks/useDebounce"
import { useFilteredSurah } from "@/app/surah/hooks/useFilteredSurah"

export default function ListSurah() {
    const [listSurah, setListSurah] = React.useState<Surah[]>([])
    const [searchSurah, setSearchSurah] = React.useState<string>('')
    
    const debouncedSearchTerm = useDebounce(searchSurah, 300)
    
    const filteredSurah = useFilteredSurah(listSurah, debouncedSearchTerm)

    const { isSuccess, isLoading } = useQuery<Surah[]>({
        queryKey: ['list-surah'],
        queryFn: async () => {
            const res = await apiQuran.get<AllSurahResponse>("/v2/surat")
            setListSurah(res.data.data)
            return res.data.data
        }
    })

    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { error, data } = await supabase.auth.getSession()
            
            if (error) {
                toast.error(error.message)
                return null
            }

            return data.session
        },
    })

    const handleSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchSurah(e.target.value)
    }, [])

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
                placeholder="Cari Surah (nama latin)..."
                className="mt-4 mb-8"
                value={searchSurah}
                onChange={handleSearchChange}
            />

            {debouncedSearchTerm && (
                <p className="text-sm text-muted-foreground mb-4">
                    Menampilkan {filteredSurah.length} surah dari {listSurah.length} total surah
                </p>
            )}

            <div className="my-8">
                {isSuccess && (
                    filteredSurah.length > 0 ? (
                        filteredSurah.map((surah) => (
                            <SurahItem 
                                key={surah.nomor} 
                                surah={surah}  
                                session={session}
                            />
                        ))
                    ) : debouncedSearchTerm ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                Tidak ada surah yang ditemukan untuk &quot;{debouncedSearchTerm}&quot;
                            </p>
                        </div>
                    ) : null
                )}
            </div>
        </>
    )
}

const SurahItem = React.memo(function SurahItem({
    surah,
    session = null
}: {
    surah: Surah;
    session?: Session | null;
}) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: SavedSurah) => {
            const res = await fetch("/api/save_surah", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })  

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Failed to save surah")
            }
        },
        onSuccess: () => {
            toast.success("Surah berhasil disimpan")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const onSubmit = React.useCallback(() => {
        if (!session?.user.id) return
        
        const payload = {
            id_user: session.user.id,
            id_surah: surah.nomor,
            arab: surah.nama,
            description: surah.deskripsi,
            indo: surah.arti,
            audio: surah.audioFull["01"],
            latin: surah.namaLatin,
        }

        mutate(payload)
    }, [session?.user.id, surah, mutate])

    return (
        <div 
            className="flex md:flex-row flex-col gap-5 py-6 bg-secondary-purple dark:bg-muted/20 text-black rounded-2xl p-5 mb-5"
        >
            <div className="flex items-center justify-center rounded-full w-[50px] h-[50px] bg-white">
                <p className="text-2xl">{surah.nomor}</p>
            </div>

            <div className="flex-1">
                <h2 className="text-2xl md:text-4xl font-bold text-primary-purple">{surah.nama}</h2>
                <p className="font-bold text-foreground">{surah.namaLatin}</p>
                <p className="text-muted-foreground">{surah.tempatTurun} - {surah.jumlahAyat} Ayahs</p>

                <audio
                    controls
                    src={surah.audioFull["01"]}
                    className="mt-2"
                    preload="none"
                />

                <div className="flex flex-wrap gap-2 mt-4">
                    <Link href={`/surah/${surah.nomor}`}>
                        <Button>
                            <span className="flex items-center gap-2">
                                Baca Surah
                                <ArrowRightCircle className="w-5 h-5" />
                            </span>
                        </Button>
                    </Link>

                    {session && (
                        <Button 
                            variant="ghost" 
                            onClick={onSubmit}
                            disabled={isPending}
                        >
                            <span className="flex items-center gap-2">
                                Bookmark
                                <Bookmark className="w-4 h-4" />
                                {isPending && (
                                    <Loader2Icon className="w-4 h-4 animate-spin" />
                                )}
                            </span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
})