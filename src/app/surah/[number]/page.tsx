import SingleSurahContainer from "@/app/surah/[number]/containers/SingleSurahContainer";

export default async function SingleSurahPage({
    params
}: {
    params: Promise<{ number: string }>;
}) {
    const { number } = await params;     

    return <SingleSurahContainer number={number} />;
}