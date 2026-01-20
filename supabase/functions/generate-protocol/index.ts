import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiter for protocol generation
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = { maxRequests: 3, windowMs: 300000 }; // 3 per 5 minutes

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
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) {
      throw new Error('Unauthorized');
    }

    // Check rate limit
    const rateCheck = checkRateLimit(user.id);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({ 
          error: `You can only generate ${RATE_LIMIT.maxRequests} protocols per ${RATE_LIMIT.windowMs / 60000} minutes. Please wait ${rateCheck.retryAfter} seconds.`
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get existing metrics for context
    const { data: metrics } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', user.id)
      .order('recorded_at', { ascending: false })
      .limit(20);

    let metricsContext = '';
    if (metrics && metrics.length > 0) {
      metricsContext = '\n\nUser\'s Recent Biometrics:\n';
      metrics.forEach(m => {
        metricsContext += `- ${m.metric_type}: ${m.value} (${new Date(m.recorded_at).toLocaleDateString()})\n`;
      });
    }

    const systemPrompt = `You are Nova, NeuroState's AI protocol generator. Generate a personalised supplement protocol based on user goals and assessment data.

Assessment Data:
${JSON.stringify(assessmentData, null, 2)}

Goals: ${goals.join(', ')}${metricsContext}

NeuroState Product Catalog:
- Cognitive: NeuroFocus Cognitive, Lion's Mane Mushroom (1000mg), L-Theanine (200mg)
- Stress & Adaptogens: AdaptBalance Stress, Ashwagandha (300mg), Rhodiola Rosea (300mg)
- Sleep: RestoreSleep Night, Melatonin (0.5mg), Valerian Root (400mg), Magnesium Complex (400mg)
- Recovery: Omega3 Elite (2000mg EPA/DHA), Marine Collagen (10g), Multi-Collagen Complex (10g), Creatine Monohydrate (5g), Electrolyte Complex, Grass-fed Whey Protein with Collagen (25g)
- Minerals: Trace Mineral Complex, Magnesium Complex (400mg)

Output Requirements:
Return a JSON object with this exact structure:
{
  "protocol_name": "string (descriptive name)",
  "goal": "string (primary goal)",
  "products": [
    {
      "product_name": "string",
      "dose": "string",
      "time": "string (e.g., '7:00 AM', 'Before bed')",
      "purpose": "string"
    }
  ],
  "rationale": "string (scientific explanation)",
  "expected_timeline": "string (when to expect results)"
}

Important:
- Include 3-6 supplements max
- Prioritise evidence-based combinations
- Consider synergies (e.g., L-Theanine + Caffeine, Magnesium + Melatonin)
- Avoid redundant supplements
- Time supplements appropriately (morning energisers, evening relaxants)
- Base recommendations on user's biometric data when available`;

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
          { role: "user", content: "Generate my personalised protocol now." }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_protocol",
              description: "Create a personalised supplement protocol",
              parameters: {
                type: "object",
                properties: {
                  protocol_name: { type: "string" },
                  goal: { type: "string" },
                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        product_name: { type: "string" },
                        dose: { type: "string" },
                        time: { type: "string" },
                        purpose: { type: "string" }
                      },
                      required: ["product_name", "dose", "time", "purpose"]
                    }
                  },
                  rationale: { type: "string" },
                  expected_timeline: { type: "string" }
                },
                required: ["protocol_name", "goal", "products", "rationale", "expected_timeline"]
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
      throw new Error('Failed to generate protocol');
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No protocol generated');
    }

    const protocol = JSON.parse(toolCall.function.arguments);

    // Save assessment
    await supabase.from('protocol_assessments').insert({
      user_id: user.id,
      assessment_data: assessmentData,
      goals: goals
    });

    // Save protocol
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

    if (protocolError) {
      throw protocolError;
    }

    return new Response(JSON.stringify({
      success: true,
      protocol: savedProtocol,
      rationale: protocol.rationale,
      expected_timeline: protocol.expected_timeline
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
