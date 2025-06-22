import { Surah } from "@/types/surah"
import { createSelectorHooks } from "auto-zustand-selectors-hook"
import { create } from "zustand"

type ListSurahStoreProps = {
	surah: Surah[] | null
	setSurah: (surah: Surah[] | null) => void
}

const useListSurahStoreBase = create<ListSurahStoreProps>()((set) => ({
	surah: null,
	setSurah: (surah: Surah[] | null) => set({ surah }),
}))

export const useListSurahStore = createSelectorHooks(useListSurahStoreBase)
