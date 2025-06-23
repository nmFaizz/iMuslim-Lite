import { Surah } from "@/types/surah"
import React from "react"

export function useFilteredSurah(surahList: Surah[], searchTerm: string) {
    return React.useMemo(() => {
        if (!searchTerm.trim()) return surahList
        
        const lowercaseSearch = searchTerm.toLowerCase()
        return surahList.filter(surah => 
            surah.namaLatin.toLowerCase().includes(lowercaseSearch) ||
            surah.nama.includes(searchTerm) ||
            surah.arti.toLowerCase().includes(lowercaseSearch)
        )
    }, [surahList, searchTerm])
}