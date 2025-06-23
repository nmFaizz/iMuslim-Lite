import { supabase } from "@/lib/supabase"
import { User } from "@/types/user"
import { useQuery } from "@tanstack/react-query"

export default function useSession() {
    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { data: sessionData } = await supabase.auth.getSession()
            const { data: userData } = await supabase
                .from('user')
                .select('id, email, username, kota_id')
                .eq('id', sessionData.session?.user.id)
                .single()

            return {
                ...sessionData.session,
                user: userData as User,
            }
        },
    })

    return { session };
}