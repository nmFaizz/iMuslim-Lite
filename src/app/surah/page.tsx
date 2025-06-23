import ListSurah from "@/app/surah/components/ListSurah"
import MainLayout from "@/layouts/MainLayout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Surah",
    description: "Baca Surah Al-Quran secara lengkap.",
}

export default function SurahPage() {
    return (
        <MainLayout containerSize="1200">
            <ListSurah />
        </MainLayout>
    )
}