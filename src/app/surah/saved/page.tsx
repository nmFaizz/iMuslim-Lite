"use client"
import MainLayout from "@/layouts/MainLayout";
import { SavedSurah } from "@/types/surah";
import { useQuery } from "@tanstack/react-query";
import withAuth from "@/components/hoc/withAuth";
import { supabase } from "@/lib/supabase";
import SavedSurahItem from "@/app/surah/saved/components/SavedSurahItem";
import ListSkeleton from "@/components/ListSkeleton";

function SavedSurahPage() {
  const { data, isLoading, isSuccess } = useQuery<SavedSurah[]>({
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

      {isLoading && (
        <ListSkeleton className="my-8" />
      )}

      {isSuccess && (
        <div>
          {data?.map((surah, i) => (
              <SavedSurahItem 
                  key={i} 
                  surah={surah} 
              />
          ))}
        </div>
      )}

    </MainLayout>
  )
}


export default withAuth(SavedSurahPage);