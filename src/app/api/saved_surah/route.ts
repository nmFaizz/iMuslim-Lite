import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "No authorization header" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const token = authHeader.replace('Bearer ', '');
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return new Response(JSON.stringify({ error: error?.message || "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const userId = user.id;
  
  const { data: savedSurah, error: dbError } = await supabase
    .from('saved_surah')
    .select('*')
    .eq('id_user', userId);

  if (dbError) {
    return new Response(JSON.stringify({ error: dbError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

if (!savedSurah || savedSurah.length === 0) {
    return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

  return new Response(JSON.stringify(savedSurah), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}