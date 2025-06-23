import { supabase } from "@/lib/supabase";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id_surah, id_user } = body;

  if (!id_surah || !id_user) {
    return new Response(JSON.stringify({ error: "Bad entity: missing required fields" }), {
      status: 422,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { data: dataExist, error: checkError } = await supabase
    .from("saved_surah")
    .select("*")
    .eq("id_user", id_user)
    .eq("id_surah", id_surah)
    .maybeSingle();

  if (checkError) {
    return new Response(JSON.stringify({ error: checkError.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!dataExist) {
    return new Response(JSON.stringify({ error: "Surah not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { error: deleteError } = await supabase
    .from("saved_surah")
    .delete()
    .eq("id_user", id_user)
    .eq("id_surah", id_surah);

  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ message: "Saved surah deleted successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
