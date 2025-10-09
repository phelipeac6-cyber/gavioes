import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // --- 1. Get Total Torcedores ---
    const { count: totalTorcedores, error: countError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // --- 2. Get Latest Torcedores ---
    const { data: latestTorcedores, error: latestError } = await supabase
      .from('profiles')
      .select('first_name, last_name, estado, associated_at')
      .order('associated_at', { ascending: false })
      .limit(5);

    if (latestError) throw latestError;

    // --- 3. Get Torcedores by State using RPC ---
    const { data: torcedoresByState, error: stateError } = await supabase
      .rpc('get_torcedores_by_state');

    if (stateError) throw stateError;

    // --- Combine and return data ---
    const data = {
      totalTorcedores: totalTorcedores ?? 0,
      latestTorcedores: latestTorcedores ?? [],
      torcedoresByState: torcedoresByState ?? [],
      // Placeholders for other metrics that can be implemented later
      totalSponsors: 1,
      totalViews: "19.6M",
      possibleRevenue: "R$393k",
      totalCampaigns: 15,
      totalSales: 1525,
      totalEvents: 35,
      ticketsSold: 50000,
      totalSubSedes: 200,
      totalAccesses: "5.8M",
    };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})