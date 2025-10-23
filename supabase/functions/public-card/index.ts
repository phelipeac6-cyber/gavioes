import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 405,
      })
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const body = await req.json().catch(() => ({}))
    const uuid = (body?.uuid as string || "").trim()

    if (!uuid) {
      return new Response(JSON.stringify({ error: "Missing uuid" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      })
    }

    const { data: pulse, error: pulseErr } = await supabase
      .from("pulseira")
      .select("id, status, assigned_profile_id")
      .eq("id", uuid)
      .maybeSingle()

    if (pulseErr) {
      return new Response(JSON.stringify({ error: pulseErr.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      })
    }

    if (!pulse) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      })
    }

    if (pulse.status !== "atribuida" || !pulse.assigned_profile_id) {
      return new Response(JSON.stringify({ error: "Inactive or unassigned" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      })
    }

    const { data: prof, error: profErr } = await supabase
      .from("profiles")
      .select("first_name, avatar_url, sub_sede, tipo_sanguineo, alergia_medicamento, diabetes, cardiaco, pressao, remedios, contato_emergencia_nome, contato_emergencia_telefone")
      .eq("id", pulse.assigned_profile_id)
      .maybeSingle()

    if (profErr) {
      return new Response(JSON.stringify({ error: profErr.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      })
    }

    if (!prof) {
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      })
    }

    return new Response(JSON.stringify({ 
      ok: true, 
      data: {
        first_name: prof.first_name,
        avatar_url: prof.avatar_url,
        sub_sede: prof.sub_sede,
        tipo_sanguineo: prof.tipo_sanguineo,
        alergia_medicamento: prof.alergia_medicamento,
        diabetes: prof.diabetes,
        cardiaco: prof.cardiaco,
        pressao: prof.pressao,
        remedios: prof.remedios,
        contato_emergencia_nome: prof.contato_emergencia_nome,
        contato_emergencia_telefone: prof.contato_emergencia_telefone,
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    })
  }
})