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

    // Autenticação manual (verify_jwt=false por padrão)
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      })
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const body = await req.json().catch(() => ({}))
    const uuid = (body?.uuid as string || "").trim()
    const userId = (body?.user_id as string || "").trim()

    if (!uuid || !userId) {
      return new Response(JSON.stringify({ error: "Missing uuid or user_id" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      })
    }

    // Verificar se a pulseira existe e está disponível/reservada para ativação
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
      return new Response(JSON.stringify({ error: "Pulseira not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      })
    }

    if (pulse.assigned_profile_id) {
      return new Response(JSON.stringify({ error: "Pulseira already assigned" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 409,
      })
    }

    if (!["disponivel", "reservada"].includes(pulse.status)) {
      return new Response(JSON.stringify({ error: `Invalid status: ${pulse.status}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      })
    }

    const { error: updateErr } = await supabase
      .from("pulseira")
      .update({ 
        assigned_profile_id: userId, 
        status: "atribuida", 
        assigned_at: new Date().toISOString() 
      } as any)
      .eq("id", uuid)

    if (updateErr) {
      return new Response(JSON.stringify({ error: updateErr.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      })
    }

    return new Response(JSON.stringify({ ok: true }), {
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