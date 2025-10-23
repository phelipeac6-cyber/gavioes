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

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const email = body?.email as string
    const password = body?.password as string
    const desiredPulse = (body?.pulseira_id as string) || "SUPER-ADMIN-001"

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      })
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    // Tentar criar o usuário
    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: "Super",
        last_name: "Admin",
      },
    })

    let userId = created?.user?.id || null

    // Se email já existir, retornar conflito mais informativo
    if (createErr) {
      return new Response(JSON.stringify({ error: createErr.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 409,
      })
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not created" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      })
    }

    // Aguardar criação do profile pela trigger (polling simples)
    let attempts = 0
    let profileExists = false
    while (attempts < 10 && !profileExists) {
      const { data: prof } = await supabase.from("profiles").select("id").eq("id", userId).maybeSingle()
      if (prof?.id) {
        profileExists = true
        break
      }
      attempts++
      await new Promise((r) => setTimeout(r, 200))
    }

    // Atualizar role no profile
    const { error: updateErr } = await supabase
      .from("profiles")
      .update({ role: "super_admin", first_name: "Super", last_name: "Admin" })
      .eq("id", userId)

    if (updateErr) {
      return new Response(JSON.stringify({ error: updateErr.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      })
    }

    // Atribuir pulseira: usar a existente por código ou criar uma nova
    const { data: existingPulse } = await supabase
      .from("pulseira")
      .select("id, assigned_profile_id, status")
      .eq("codigo", desiredPulse)
      .maybeSingle();

    if (existingPulse) {
      if (existingPulse.assigned_profile_id && existingPulse.assigned_profile_id !== userId) {
        return new Response(JSON.stringify({ error: "Pulseira já atribuída a outro usuário" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 409,
        })
      }
      const { error: assignErr } = await supabase
        .from("pulseira")
        .update({ assigned_profile_id: userId, status: "atribuida", assigned_at: new Date().toISOString() })
        .eq("id", existingPulse.id);
      if (assignErr) {
        return new Response(JSON.stringify({ error: assignErr.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        })
      }
    } else {
      const { error: createPulseErr } = await supabase
        .from("pulseira")
        .insert({
          codigo: desiredPulse,
          status: "atribuida",
          assigned_profile_id: userId,
          assigned_at: new Date().toISOString(),
        } as any);
      if (createPulseErr) {
        return new Response(JSON.stringify({ error: createPulseErr.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        })
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        user_id: userId,
        email,
        role: "super_admin",
        pulseira_id: desiredPulse,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    )
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    })
  }
})