import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Create Supabase client to fetch user context
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get auth header and extract user
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    // Fetch recent metrics if user is authenticated
    let userContext = '';
    if (userId) {
      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false })
        .limit(10);

      const { data: protocols } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');

      if (metrics && metrics.length > 0) {
        userContext += '\n\nUser\'s Recent Metrics:\n';
        metrics.forEach(m => {
          userContext += `- ${m.metric_type}: ${m.value} (${new Date(m.recorded_at).toLocaleDateString()})\n`;
        });
      }

      if (protocols && protocols.length > 0) {
        userContext += '\n\nUser\'s Active Protocols:\n';
        protocols.forEach(p => {
          userContext += `- ${p.protocol_name} (${p.goal}, ${p.completion_percentage}% complete)\n`;
        });
      }
    }

    const systemPrompt = `You are Nova, NeuroState's AI performance assistant. You are a calm, sharp, high-performance coach who helps users optimise their sleep, recovery, and cognitive performance.

Your Core Expertise:
- Biometric analysis (HRV, sleep stages, recovery metrics)
- Supplement protocols and timing
- Performance optimisation strategies
- Recovery and stress management
- Cognitive enhancement techniques

Brand Voice Guidelines:
- Speak in British English
- Be calm, intelligent, and precise
- Never be salesy or pushy
- Ask clarifying questions before making recommendations
- Focus on science-backed insights
- Be encouraging but realistic

NeuroState Product Categories:
1. Cognitive Enhancement: NeuroFocus Cognitive, Lion's Mane Mushroom, L-Theanine
2. Stress & Adaptogen Support: AdaptBalance Stress, Ashwagandha, Rhodiola Rosea
3. Sleep Support: RestoreSleep Night, Melatonin, Valerian Root, Magnesium Complex
4. Recovery & Performance: Omega3 Elite, Marine Collagen, Multi-Collagen Complex, Creatine Monohydrate, Electrolyte Complex, Grass-fed Whey Protein with Collagen
5. Minerals & Wellness: Trace Mineral Complex, Magnesium Complex
6. Red Light Therapy: RedRestore Pro Panel, RedRestore Mini, Red Light Therapy Blanket, Red Light Face Mask
7. Recovery Devices: CryoPlunge Ice Bath, Infrared Sauna Blanket, PEMF Therapy Mat

Safety Boundaries:
- Never provide medical advice or diagnosis
- Recommend consulting healthcare professionals for medical concerns
- Do not make specific dosage recommendations beyond product labels
- Clarify you're an AI assistant, not a doctor

When recommending products:
- Consider user goals and current metrics
- Explain the science briefly
- Suggest starting with foundational supplements before advanced protocols
- Mention timing and synergies between products${userContext}

Current Context: User is chatting with you on the Nova AI assistant interface.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("nova-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});