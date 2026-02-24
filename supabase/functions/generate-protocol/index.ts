import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = { maxRequests: 3, windowMs: 300000 };

function checkRateLimit(userId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(userId);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { allowed: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { assessmentData, goals } = await req.json();

    if (!goals || !Array.isArray(goals) || goals.length === 0) {
      return new Response(JSON.stringify({ error: 'Goals are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) throw new Error('Unauthorized');

    const rateCheck = checkRateLimit(user.id);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({ error: `Rate limited. Please wait ${rateCheck.retryAfter} seconds.` }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Gather rich biometric context
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [metricsRes, checkInsRes, protocolsRes] = await Promise.all([
      supabase
        .from('user_metrics')
        .select('metric_type, value, recorded_at, device_source')
        .eq('user_id', user.id)
        .gte('recorded_at', thirtyDaysAgo)
        .order('recorded_at', { ascending: false })
        .limit(100),
      supabase
        .from('protocol_check_ins')
        .select('check_in_date, mood_score, energy_score, products_completed, notes')
        .eq('user_id', user.id)
        .gte('check_in_date', thirtyDaysAgo.slice(0, 10))
        .order('check_in_date', { ascending: false })
        .limit(30),
      supabase
        .from('user_protocols')
        .select('protocol_name, goal, status, products, completion_percentage')
        .eq('user_id', user.id)
        .eq('status', 'active'),
    ]);

    // Build biometric summary
    let biometricContext = '';
    if (metricsRes.data && metricsRes.data.length > 0) {
      const byType: Record<string, number[]> = {};
      for (const m of metricsRes.data) {
        if (!byType[m.metric_type]) byType[m.metric_type] = [];
        byType[m.metric_type].push(Number(m.value));
      }
      biometricContext = '\n\n30-Day Biometric Summary:\n';
      for (const [type, values] of Object.entries(byType)) {
        const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
        const latest = values[0];
        const trend = values.length > 3
          ? (values.slice(0, 3).reduce((a, b) => a + b, 0) / 3 > values.slice(-3).reduce((a, b) => a + b, 0) / 3 ? 'improving' : 'declining')
          : 'insufficient data';
        biometricContext += `- ${type}: latest=${latest}, avg=${avg}, trend=${trend}, samples=${values.length}\n`;
      }
    }

    let checkInContext = '';
    if (checkInsRes.data && checkInsRes.data.length > 0) {
      const avgMood = checkInsRes.data.filter(c => c.mood_score).reduce((a, c) => a + (c.mood_score || 0), 0) / (checkInsRes.data.filter(c => c.mood_score).length || 1);
      const avgEnergy = checkInsRes.data.filter(c => c.energy_score).reduce((a, c) => a + (c.energy_score || 0), 0) / (checkInsRes.data.filter(c => c.energy_score).length || 1);
      checkInContext = `\n\nRecent Check-In Averages (${checkInsRes.data.length} check-ins):\n- Average mood: ${avgMood.toFixed(1)}/10\n- Average energy: ${avgEnergy.toFixed(1)}/10\n`;
    }

    let activeProtocolContext = '';
    if (protocolsRes.data && protocolsRes.data.length > 0) {
      activeProtocolContext = '\n\nCurrently Active Protocols (avoid duplicating these):\n';
      for (const p of protocolsRes.data) {
        const products = Array.isArray(p.products) ? p.products.map((pr: any) => pr.product_name || pr.name).join(', ') : '';
        activeProtocolContext += `- ${p.protocol_name} (${p.goal}): ${products}\n`;
      }
    }

    const systemPrompt = `You are Nova, NeuroState's evidence-based protocol generator. Generate a personalised supplement protocol using scientific evidence grading.

Assessment Data:
${JSON.stringify(assessmentData || {}, null, 2)}

Goals: ${goals.join(', ')}${biometricContext}${checkInContext}${activeProtocolContext}

NeuroState Product Catalogue:
- Cognitive: NeuroFocus Cognitive, Lion's Mane Mushroom (1000mg), L-Theanine (200mg)
- Stress & Adaptogens: AdaptBalance Stress, Ashwagandha (300mg KSM-66), Rhodiola Rosea (300mg)
- Sleep: RestoreSleep Night, Melatonin (0.5mg), Valerian Root (400mg), Magnesium Complex (400mg)
- Recovery: Omega-3 Elite (2000mg EPA/DHA), Marine Collagen (10g), Multi-Collagen Complex (10g), Creatine Monohydrate (5g), Electrolyte Complex, Grass-fed Whey Protein with Collagen (25g)
- Minerals: Trace Mineral Complex, Magnesium Complex (400mg)

Evidence Grading Scale:
- A: Multiple large RCTs with consistent results
- B: Single large RCT or multiple small RCTs
- C: Observational studies with strong signal
- D: Preliminary clinical evidence
- E: Mechanistic/in-vitro evidence only
- F: Traditional use, minimal clinical data

Rules:
- 3-6 supplements maximum
- Each product MUST have an evidence_grade (A-F)
- Consider synergies (e.g. L-Theanine + caffeine, Magnesium + Melatonin)
- Time supplements correctly (energisers morning, relaxants evening)
- DO NOT duplicate products from active protocols
- Base dosing on biometric data when available
- Provide a clear scientific rationale and expected timeline`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate my personalised evidence-graded protocol now." }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_protocol",
              description: "Create a personalised evidence-graded supplement protocol",
              parameters: {
                type: "object",
                properties: {
                  protocol_name: { type: "string", description: "Descriptive protocol name" },
                  goal: { type: "string", description: "Primary goal summary" },
                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        product_name: { type: "string" },
                        dose: { type: "string" },
                        time: { type: "string", description: "e.g. '7:00 AM', 'Before bed'" },
                        purpose: { type: "string", description: "Why this product for this user" },
                        evidence_grade: { type: "string", enum: ["A", "B", "C", "D", "E", "F"], description: "Scientific evidence strength" },
                        key_studies: { type: "string", description: "Brief citation or study reference" }
                      },
                      required: ["product_name", "dose", "time", "purpose", "evidence_grade"],
                      additionalProperties: false
                    }
                  },
                  rationale: { type: "string", description: "Scientific explanation of the protocol design" },
                  expected_timeline: { type: "string", description: "When user should expect results" },
                  synergy_notes: { type: "string", description: "Explanation of product synergies in this stack" },
                  contraindications: { type: "string", description: "Any warnings or interactions to note" }
                },
                required: ["protocol_name", "goal", "products", "rationale", "expected_timeline"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_protocol" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "AI rate limited. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      throw new Error('Failed to generate protocol');
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('No protocol generated');

    const protocol = JSON.parse(toolCall.function.arguments);

    // Save assessment
    await supabase.from('protocol_assessments').insert({
      user_id: user.id,
      assessment_data: assessmentData || {},
      goals: goals,
      lifestyle_factors: {
        synergy_notes: protocol.synergy_notes,
        contraindications: protocol.contraindications,
      }
    });

    // Save protocol with evidence-graded products
    const { data: savedProtocol, error: protocolError } = await supabase
      .from('user_protocols')
      .insert({
        user_id: user.id,
        protocol_name: protocol.protocol_name,
        goal: protocol.goal,
        products: protocol.products,
        status: 'active',
        completion_percentage: 0
      })
      .select()
      .single();

    if (protocolError) throw protocolError;

    return new Response(JSON.stringify({
      success: true,
      protocol: savedProtocol,
      rationale: protocol.rationale,
      expected_timeline: protocol.expected_timeline,
      synergy_notes: protocol.synergy_notes,
      contraindications: protocol.contraindications,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("generate-protocol error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
