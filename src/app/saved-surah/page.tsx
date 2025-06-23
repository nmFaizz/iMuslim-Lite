"use client"
import MainLayout from "@/layouts/MainLayout";
import { SavedSurah } from "@/types/surah";
import { useQuery, useMutation } from "@tanstack/react-query";
import withAuth from "@/components/hoc/withAuth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightCircle, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { queryClient } from "@/providers/ReactQueryProvider";

function SavedSurahPage() {
  const { data } = useQuery<SavedSurah[]>({
    queryKey: ['saved-surah'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const res = await fetch('/api/saved_surah', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch saved surah');
      }

      return res.json();
    },
    refetchOnWindowFocus: false,
  })

  return (
    <MainLayout withNavbar containerSize="1200">
        <h1 className="text-3xl font-bold my-12">
            Surah Tersimpan
        </h1>

      <div>
        {data?.map((surah, i) => (
            <SavedSurahItem 
                key={i} 
                surah={surah} 
            />
        ))}
      </div>
    </MainLayout>
  )
}

type SavedSurahItemProps = {
    surah: SavedSurah;
};

export function SavedSurahItem({ surah }: SavedSurahItemProps) {
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
            <h3 className="text-2xl font-bold">{surah.arab}</h3>
            <p>{surah.latin}</p>
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


export default withAuth(SavedSurahPage);