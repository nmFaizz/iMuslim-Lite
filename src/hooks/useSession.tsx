import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"

export default function useSession() {
    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { data } = await supabase.auth.getSession()
            return data.session
        },
    })

    return { session };
}