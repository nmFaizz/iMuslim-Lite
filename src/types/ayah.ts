export type SurahAyahResponse = {
    status: number;
    data: SurahAyah[];
}

export type SurahAyah = {
    arab: string;
    asbab: string;
    audio: string;
    ayah: string;
    hizb: string | null;
    id: string;
    juz: string;
    latin: string;
    notes: string | null;
    page: string;
    surah: string;
    text: string;
    theme: string | null;
};