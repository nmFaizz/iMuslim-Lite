import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    const body = await req.json();
    const { 
        id_surah, 
        arab,
        description,
        indo,
        audio,
        latin,
        id_user,    
    } = body;

    if (
        !id_surah ||
        !arab ||
        !description ||
        !indo ||
        !audio ||
        !latin ||
        !id_user
    ) {
        return new Response(JSON.stringify({ error: 'Bad entity: missing required fields' }), {
            status: 422,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    const { data: dataExist, error } = await supabase
        .from('saved_surah')
        .select("*")
        .eq('id_user', id_user)
        .eq('id_surah', id_surah)
        .maybeSingle();
    
    if (dataExist) {
        return new Response(JSON.stringify({ error: 'Surah already saved' }), {
            status: 400,
            headers: { 
                'Content-Type': 'application/json' 
            },
        });
    }

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json' 
            },
        });
    }

    const { data, error: insertError } = await supabase
        .from('saved_surah')
        .insert({
            id_user,
            id_surah,
            arab,
            description,
            indo,
            audio,
            latin,
        })
        .select()
        .single();

    if (insertError) {
        return new Response(JSON.stringify({ error: insertError.message }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json' 
            },
        });
    }

    return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { 
            'Content-Type': 'application/json' 
        },
    });
    
}