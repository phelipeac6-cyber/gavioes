import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

type CreatedUser = {
  id: string
  email: string
  first_name: string
  last_name: string
  role?: string
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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    // 1) Criar 3 usuários em auth
    const samples = [
      { email: "carlos@example.com", password: "Password123!", first_name: "Carlos", last_name: "Eduardo", role: "user" },
      { email: "ana@example.com", password: "Password123!", first_name: "Ana", last_name: "Beatriz", role: "user" },
      { email: "roberto@example.com", password: "Password123!", first_name: "Roberto", last_name: "Carlos", role: "admin" },
    ]

    const created: CreatedUser[] = []

    for (const u of samples) {
      const { data: createdUser, error: createErr } = await supabase.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: {
          first_name: u.first_name,
          last_name: u.last_name,
        },
      })

      if (createErr) {
        return new Response(JSON.stringify({ error: `auth user create failed: ${createErr.message}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 409,
        })
      }

      const id = createdUser?.user?.id
      if (!id) {
        return new Response(JSON.stringify({ error: "auth user id not returned" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        })
      }

      // Aguardar profile via trigger ou garantir via upsert
      let attempts = 0
      let profileOk = false
      while (attempts < 10 && !profileOk) {
        const { data: prof } = await supabase.from("profiles").select("id").eq("id", id).maybeSingle()
        if (prof?.id) {
          profileOk = true
          break
        }
        attempts++
        await new Promise(r => setTimeout(r, 200))
      }

      if (!profileOk) {
        // Se trigger não executou, garantir perfil mínimo
        const { error: upErr } = await supabase.from("profiles").upsert({ 
          id, 
          first_name: u.first_name, 
          last_name: u.last_name, 
          username: `user_${id.slice(0,8)}`, 
          role: u.role 
        }, { onConflict: "id" })
        if (upErr) {
          return new Response(JSON.stringify({ error: `profile upsert failed: ${upErr.message}` }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          })
        }
      } else {
        // Atualizar campos adicionais
        const { error: updErr } = await supabase.from("profiles").update({
          first_name: u.first_name,
          last_name: u.last_name,
          username: `user_${id.slice(0,8)}`,
          role: u.role
        }).eq("id", id)
        if (updErr) {
          return new Response(JSON.stringify({ error: `profile update failed: ${updErr.message}` }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          })
        }
      }

      created.push({ id, email: u.email, first_name: u.first_name, last_name: u.last_name, role: u.role })
    }

    const carlos = created[0]
    const ana = created[1]
    const roberto = created[2]

    // 2) Completar perfis com dados ricos
    const richProfiles = [
      {
        id: carlos.id,
        sub_sede: "São Paulo - Centro",
        gender: "male",
        cep: "01310-100",
        endereco: "Avenida Paulista",
        numero: "1234",
        complemento: "Apto 45",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        bio: "Torcedor desde criança, apaixonado pelo Corinthians e pela cultura Gavião. Vai a todos os jogos!",
        facebook_url: "https://facebook.com/carlos.eduardo.gaviao",
        instagram_url: "https://instagram.com/carlos_gaviao",
        whatsapp_number: "11987654321",
        site_url: "https://carlos-gaviao.com",
        pix_key: "carlos.eduardo@pix",
        tipo_sanguineo: "O+",
        diabetes: "Não",
        cardiaco: "Não",
        pressao: "Normal",
        remedios: "Nenhum",
        alergia_medicamento: "Penicilina",
        contato_emergencia_nome: "Maria Eduardo",
        contato_emergencia_telefone: "11912345678",
        contato_emergencia_parentesco: "Esposa",
        contato_emergencia_email: "maria.eduardo@email.com",
      },
      {
        id: ana.id,
        sub_sede: "Rio de Janeiro - Zona Sul",
        gender: "female",
        cep: "22041-001",
        endereco: "Avenida Atlântica",
        numero: "567",
        complemento: "Cobertura",
        bairro: "Copacabana",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        bio: "Médica e torcedora fiel. Presente em todas as mobilizações e eventos da nação Gavião.",
        facebook_url: "https://facebook.com/ana.beatriz.gaviao",
        instagram_url: "https://instagram.com/ana_gaviao_med",
        whatsapp_number: "21987654321",
        site_url: null,
        pix_key: "ana.beatriz@pix",
        tipo_sanguineo: "A-",
        diabetes: "Não",
        cardiaco: "Não",
        pressao: "Normal",
        remedios: "Vitamina D",
        alergia_medicamento: "Nenhuma",
        contato_emergencia_nome: "José Beatriz",
        contato_emergencia_telefone: "21912345678",
        contato_emergencia_parentesco: "Pai",
        contato_emergencia_email: "jose.beatriz@email.com",
      },
      {
        id: roberto.id,
        sub_sede: "Minas Gerais - Belo Horizonte",
        gender: "male",
        cep: "30130-010",
        endereco: "Avenida Afonso Pena",
        numero: "890",
        complemento: "Sala 1501",
        bairro: "Centro",
        cidade: "Belo Horizonte",
        estado: "MG",
        bio: "Advogado e líder de torcida. Organizador de caravanas e eventos Gaviões em Minas.",
        facebook_url: "https://facebook.com/roberto.carlos.gaviao",
        instagram_url: "https://instagram.com/beto_gaviao_mg",
        whatsapp_number: "31987654321",
        site_url: "https://roberto-gaviao.mg.com.br",
        pix_key: "roberto.carlos@pix",
        tipo_sanguineo: "B+",
        diabetes: "Sim",
        cardiaco: "Não",
        pressao: "Normal",
        remedios: "Metformina",
        alergia_medicamento: "Nenhuma",
        contato_emergencia_nome: "Teresa Carlos",
        contato_emergencia_telefone: "31912345678",
        contato_emergencia_parentesco: "Mãe",
        contato_emergencia_email: "teresa.carlos@email.com",
      },
    ]

    for (const rp of richProfiles) {
      const { error: updErr } = await supabase.from("profiles").update(rp).eq("id", rp.id)
      if (updErr) {
        return new Response(JSON.stringify({ error: `profile rich update failed: ${updErr.message}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        })
      }
    }

    // 3) Inserir 10 pulseiras (3 atribuídas, 7 disponíveis) usando id como identificador público
    const pulses = [
      { id: "550e8400-e29b-41d4-a716-446655440001", status: "atribuida", sub_sede: "São Paulo - Centro", assigned_profile_id: carlos.id },
      { id: "550e8400-e29b-41d4-a716-446655440002", status: "atribuida", sub_sede: "Rio de Janeiro - Zona Sul", assigned_profile_id: ana.id },
      { id: "550e8400-e29b-41d4-a716-446655440003", status: "atribuida", sub_sede: "Minas Gerais - Belo Horizonte", assigned_profile_id: roberto.id },
      { id: "550e8400-e29b-41d4-a716-446655440004", status: "disponivel", sub_sede: "São Paulo - Zona Norte", assigned_profile_id: null },
      { id: "550e8400-e29b-41d4-a716-446655440005", status: "disponivel", sub_sede: "Rio de Janeiro - Zona Norte", assigned_profile_id: null },
      { id: "550e8400-e29b-41d4-a716-446655440006", status: "disponivel", sub_sede: "Minas Gerais - Uberlândia", assigned_profile_id: null },
      { id: "550e8400-e29b-41d4-a716-446655440007", status: "disponivel", sub_sede: "Bahia - Salvador", assigned_profile_id: null },
      { id: "550e8400-e29b-41d4-a716-446655440008", status: "disponivel", sub_sede: "Pernambuco - Recife", assigned_profile_id: null },
      { id: "550e8400-e29b-41d4-a716-446655440009", status: "disponivel", sub_sede: "Paraná - Curitiba", assigned_profile_id: null },
      { id: "550e8400-e29b-41d4-a716-446655440010", status: "disponivel", sub_sede: "Santa Catarina - Florianópolis", assigned_profile_id: null },
    ]

    for (const p of pulses) {
      const row: any = {
        id: p.id,
        codigo: p.id,
        status: p.status,
        sub_sede: p.sub_sede,
        assigned_profile_id: p.assigned_profile_id,
        assigned_at: p.assigned_profile_id ? new Date().toISOString() : null,
        metadata: { lote: "L-SEED", entregue: !!p.assigned_profile_id }
      }
      const { error: upErr } = await supabase.from("pulseira").upsert(row, { onConflict: "id" })
      if (upErr) {
        return new Response(JSON.stringify({ error: `pulse upsert failed (${p.id}): ${upErr.message}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        })
      }
    }

    // 4) Configurações de privacidade (usar valores válidos: 'public' ou 'private')
    const privacyRows = [
      { user_id: carlos.id, profile_visibility: "public", show_phone: true, show_email: false, show_social_media: true, allow_location: true, allow_push_notifications: true, allow_email_notifications: true, allow_marketing: false, data_sharing: false },
      { user_id: ana.id,    profile_visibility: "private", show_phone: false, show_email: false, show_social_media: true, allow_location: false, allow_push_notifications: true, allow_email_notifications: true, allow_marketing: false, data_sharing: false },
      { user_id: roberto.id,profile_visibility: "public", show_phone: true, show_email: true, show_social_media: true, allow_location: true, allow_push_notifications: true, allow_email_notifications: true, allow_marketing: true, data_sharing: false },
    ]
    for (const pr of privacyRows) {
      const { error: prvErr } = await supabase.from("privacy_settings").upsert(pr, { onConflict: "user_id" })
      if (prvErr) {
        return new Response(JSON.stringify({ error: `privacy upsert failed: ${prvErr.message}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        })
      }
    }

    // 5) Canais de chat (created_by deve referenciar auth.users => usar admin)
    const channels = [
      { name: "São Paulo - Centro", is_admin_channel: false, created_by: roberto.id },
      { name: "Rio de Janeiro - Zona Sul", is_admin_channel: false, created_by: roberto.id },
      { name: "Minas Gerais - Belo Horizonte", is_admin_channel: false, created_by: roberto.id },
      { name: "Anúncios Oficiais", is_admin_channel: true, created_by: roberto.id },
    ]
    for (const ch of channels) {
      const { error: chErr } = await supabase.from("channels").insert(ch)
      // Ignorar conflito de nome caso já exista
      if (chErr && !String(chErr.message).toLowerCase().includes("duplicate")) {
        return new Response(JSON.stringify({ error: `channels insert failed: ${chErr.message}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        })
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      users: created,
      pulses_assigned: [carlos.id, ana.id, roberto.id],
      pulses_available: 7
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