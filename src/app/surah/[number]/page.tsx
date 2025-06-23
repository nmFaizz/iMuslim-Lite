import SingleSurahContainer from "@/app/surah/[number]/containers/SingleSurahContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Surah",
    description: "Baca Surah Al-Quran secara lengkap.",
};

export default async function SingleSurahPage({
    params
}: {
    params: Promise<{ number: string }>;
}) {
    const { number } = await params;     

    return <SingleSurahContainer number={number} />;
}