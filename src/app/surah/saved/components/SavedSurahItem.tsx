"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { queryClient } from "@/providers/ReactQueryProvider";
import { SavedSurah } from "@/types/surah";
import { useMutation } from "@tanstack/react-query";
import { ArrowRightCircle, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type SavedSurahItemProps = {
    surah: SavedSurah;
};

export default function SavedSurahItem({ surah }: SavedSurahItemProps) {
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                throw new Error('No active session');
            }

            const res = await fetch(`/api/delete_saved_surah/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ 
                    id_surah: surah.id_surah,
                    id_user: session.user.id,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to delete saved surah');
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['saved-surah'] });
            toast.success('Surah berhasil dihapus dari daftar tersimpan');
        },
        onError: (error) => {
            toast.error(`Gagal menghapus surah: ${error.message}`);
        },
    })

    return (
        <div className="gap-5 py-6 bg-secondary-purple dark:bg-muted/20 text-black rounded-2xl p-5 md:p-8 mb-5">
            <h3 className="text-2xl font-bold text-primary-purple">{surah.arab}</h3>
            <p className="text-foreground">{surah.latin}</p>
            <audio controls src={surah.audio} className="mt-4" preload="none" />
            <div className="flex items-center gap-3 mt-8">
                <Link href={`/surah/${surah.id_surah}`}>
                    <Button>
                        Baca Surah
                        <ArrowRightCircle className="w-5 h-5" />
                    </Button>
                </Link>
                <Button 
                    variant="destructive"
                    onClick={() => mutate()}
                >
                    Hapus
                    {isPending && (
                        <Loader2Icon className="animate-spin" />
                    )}
                </Button>
            </div>
        </div>
    );
}