"use client"
import apiMuslim from "@/lib/apiMuslim";
import { Doa, SingleDoaResponse } from "@/types/doa";
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RandomDoa() {
    const { data: doa } = useQuery<Doa>({
        queryKey: ['random-doa'],
        queryFn: async () => {
            const res = await apiMuslim.get<SingleDoaResponse>('/doa/acak');
            return res.data.data;
        }
    })

    return (
        <div className="border border-input rounded-lg p-6">
            <h2 className="text-2xl font-medium mb-4">Doa hari ini</h2>
            
            <div>
                <h3 className="text-2xl">{doa?.arab}</h3>
                <p className="mt-5">{doa?.judul}</p>
                <p className="text-muted-foreground">{doa?.indo}</p>
            </div>

            <Link href="/doa">
                <Button variant="default" className="mt-12">
                    Doa Lainnya
                </Button>
            </Link>
        </div>
    )
}