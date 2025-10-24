import { supabase } from "@/integrations/supabase/client";

type UserMeta = Record<string, any> | null | undefined;

export async function ensureProfile(userId: string, meta?: UserMeta): Promise<{ id: string; username: string } | null> {
  // Busca perfil existente
  const { data: existingProfile, error: selectErr } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("id", userId)
    .maybeSingle();

  if (selectErr) {
    return null;
  }

  // Define username de fallback
  const fallbackUsername =
    (meta && typeof meta.username === "string" && meta.username.trim().length > 0
      ? (meta.username as string)
      : `user_${String(userId).slice(0, 8)}`);

  // Se não existir perfil, cria
  if (!existingProfile) {
    const { data: inserted, error: insertErr } = await supabase
      .from("profiles")
      .insert({ id: userId, username: fallbackUsername })
      .select("id, username")
      .single();

    if (insertErr) {
      return null;
    }

    return inserted ?? { id: userId, username: fallbackUsername };
  }

  // Se existir mas sem username, atualiza
  if (!existingProfile.username || existingProfile.username.trim().length === 0) {
    const { data: updated, error: updateErr } = await supabase
      .from("profiles")
      .update({ username: fallbackUsername })
      .eq("id", userId)
      .select("id, username")
      .single();

    if (updateErr) {
      return { id: userId, username: fallbackUsername };
    }

    return updated ?? { id: userId, username: fallbackUsername };
  }

  // Perfil já OK
  return existingProfile as { id: string; username: string };
}

export async function getUsername(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .maybeSingle();

  if (error) return null;
  return data?.username ?? null;
}