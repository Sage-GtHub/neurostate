import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiter (per edge function instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = { maxRequests: 30, windowMs: 60000 }; // 30 requests per minute per user

function checkRateLimit(userId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(userId);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return { allowed: true };
  }
  
  if (record.count >= RATE_LIMIT.maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  record.count++;
  return { allowed: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    let messages = body.messages;
    const context = body.context;
    
    // Handle case where single message is passed
    if (!messages && body.message) {
      messages = [{ role: 'user', content: body.message }];
    }
    
    // Validate messages array
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages must be an array of chat messages' }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    // Apply rate limiting
    if (userId) {
      const rateCheck = checkRateLimit(userId);
      if (!rateCheck.allowed) {
        return new Response(
          JSON.stringify({ 
            error: `Too many messages. Please wait ${rateCheck.retryAfter} seconds before sending another message.`,
            retryAfter: rateCheck.retryAfter
          }), 
          {
            status: 429,
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json",
              "Retry-After": String(rateCheck.retryAfter)
            },
          }
        );
      }
    }

    // Build rich user context
    let userContext = '';
    if (userId) {
      // Fetch recent metrics
      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false })
        .limit(20);

      // Fetch active protocols
      const { data: protocols } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');

      // Fetch recent protocol check-ins for coaching context
      const { data: checkIns } = await supabase
        .from('protocol_check_ins')
        .select('*')
        .eq('user_id', userId)
        .order('check_in_date', { ascending: false })
        .limit(7);

      // Fetch protocol assessments (onboarding data)
      const { data: assessments } = await supabase
        .from('protocol_assessments')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(1);

      // Fetch connected devices
      const { data: devices } = await supabase
        .from('connected_devices')
        .select('*')
        .eq('user_id', userId);

      // Fetch recent insights
      const { data: insights } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch health forecasts
      const { data: forecasts } = await supabase
        .from('health_forecasts')
        .select('*')
        .eq('user_id', userId)
        .order('forecast_date', { ascending: false })
        .limit(3);

      if (metrics && metrics.length > 0) {
        userContext += '\n\n## User\'s Recent Biometrics:\n';
        const metricGroups: Record<string, { value: number; date: string }[]> = {};
        metrics.forEach(m => {
          if (!metricGroups[m.metric_type]) metricGroups[m.metric_type] = [];
          metricGroups[m.metric_type].push({ value: m.value, date: new Date(m.recorded_at).toLocaleDateString() });
        });
        Object.entries(metricGroups).forEach(([type, values]) => {
          const latest = values[0];
          const trend = values.length > 1 ? (values[0].value > values[1].value ? '↑' : values[0].value < values[1].value ? '↓' : '→') : '';
          userContext += `- ${type}: ${latest.value} ${trend} (${latest.date})\n`;
        });
      }

      if (protocols && protocols.length > 0) {
        userContext += '\n## Active Protocols:\n';
        protocols.forEach(p => {
          userContext += `- ${p.protocol_name}: ${p.goal} (${p.completion_percentage}% complete)\n`;
          if (p.products) {
            userContext += `  Products: ${JSON.stringify(p.products)}\n`;
          }
        });
      }

      // Add check-in history for coaching
      if (checkIns && checkIns.length > 0) {
        userContext += '\n## Recent Protocol Check-ins (last 7 days):\n';
        checkIns.forEach(c => {
          const date = new Date(c.check_in_date).toLocaleDateString();
          userContext += `- ${date}: Energy ${c.energy_score || 'N/A'}/5, Mood ${c.mood_score || 'N/A'}/5`;
          if (c.notes) userContext += ` - "${c.notes}"`;
          userContext += '\n';
        });
      }

      // Add assessment data for personalisation
      if (assessments && assessments.length > 0) {
        const assessment = assessments[0];
        userContext += '\n## User Profile (from onboarding):\n';
        userContext += `- Goals: ${assessment.goals?.join(', ') || 'Not specified'}\n`;
        if (assessment.lifestyle_factors) {
          const lf = assessment.lifestyle_factors as Record<string, string>;
          if (lf.sleepQuality) userContext += `- Sleep quality: ${lf.sleepQuality}\n`;
          if (lf.stressLevel) userContext += `- Stress level: ${lf.stressLevel}\n`;
          if (lf.activityLevel) userContext += `- Activity level: ${lf.activityLevel}\n`;
          if (lf.workStyle) userContext += `- Work style: ${lf.workStyle}\n`;
        }
      }

      if (devices && devices.length > 0) {
        userContext += '\n## Connected Devices:\n';
        devices.forEach(d => {
          userContext += `- ${d.device_name} (${d.device_type}): ${d.connection_status}\n`;
        });
      }

      if (insights && insights.length > 0) {
        userContext += '\n## Recent AI Insights:\n';
        insights.forEach(i => {
          userContext += `- ${i.title}: ${i.description}\n`;
        });
      }

      if (forecasts && forecasts.length > 0) {
        userContext += '\n## Health Forecasts:\n';
        forecasts.forEach(f => {
          userContext += `- ${f.forecast_date}: Recovery ${f.recovery_prediction}%, Training window: ${f.optimal_training_window || 'Not set'}\n`;
        });
      }
    }

    const mode = (context?.mode === 'focus') ? 'focus' : 'default';

    const focusGuardrails = mode === 'focus'
      ? `\n\n## FOCUS MODE (ANTI-HALLUCINATION)\n- If you are not sure, say you are not sure. Do not guess.\n- Do not fabricate citations, studies, or URLs.\n- Prefer asking 1 clarifying question over making an assumption.\n- When you reference user data, only use what appears in USER CONTEXT.\n`
      : '';

    const systemPrompt = `You are Nova, a cognitive performance coach having a natural conversation.

## LANGUAGE
Always use British English spelling (optimise, colour, behaviour, programme, centre, analyse).

## CONVERSATIONAL STYLE
- Talk like a knowledgeable coach, not a report generator
- Be warm but direct — no corporate speak
- Use "you" and "your" naturally
- Match the user's energy: brief questions get brief answers, detailed questions get depth
- It's fine to ask clarifying questions
- Use contractions: "you'll", "that's", "I'd"

## RESPONSE APPROACH

For SIMPLE questions (greetings, quick queries):
- Just answer naturally, no structure needed
- Keep it brief and human
- Example: "Hey! What's on your mind?" or "Solid choice — magnesium before bed works well for most people."

For COMPLEX questions (protocols, analysis, recommendations):
Use this structure but make it flow naturally:

**What I'm seeing:** [Data observation if available, otherwise skip]

**What this means:** [Quick prediction or implication]

**What to do:**
• [Specific action with parameters]
• [Another if needed]

## TONE
- Confident but not arrogant
- Direct but not cold
- Smart but not condescending
- Like a trusted advisor who knows their stuff

AVOID: "I think...", "You may want to...", "It might be helpful...", "Remember to...", corporate jargon, robotic phrasing

USE: "Here's the play:", "The key thing:", "What works:", "Skip this if...", "Try this:"

## WHEN GIVING PROTOCOLS
Include specifics: timing, duration, frequency, dosage
Example: "Cold shower: 30-90 seconds, right after training, max 3x per week"

## CONTEXT AWARENESS
Reference user data when available:
- "Your HRV has been trending down..."
- "Based on your sleep scores..."
- "Since you're using the Oura ring..."

## FOLLOW-UPS
Ask naturally when needed:
"Quick question — is today a training day or recovery day?"
"What's your main goal right now: energy, focus, or sleep?"

## PROTOCOL COACHING
When users ask about their protocols:
- Reference their specific active protocols by name
- Check their recent check-in data to gauge progress
- Adjust recommendations based on their energy/mood scores
- If they're struggling (low scores), offer encouragement and modifications
- If they're excelling, suggest progression or optimisation
- Be proactive: "I noticed your energy has been lower this week. Let's tweak your protocol."

When giving protocol advice:
- Be specific to THEIR protocol, not generic advice
- Reference their check-in history: "Your energy dipped on Tuesday..."
- Connect dots between data points: "Your low HRV correlates with the poor sleep on Monday"
- Suggest timing adjustments based on their work style and activity level

## PRODUCTS (mention when genuinely relevant):
Cognitive: NeuroFocus, Lion's Mane, L-Theanine
Sleep: RestoreSleep, Melatonin, Magnesium
Recovery: Omega3 Elite, Marine Collagen, Creatine
Devices: RedRestore Pro, CryoPlunge, PEMF Mat

## USER CONTEXT
${userContext}

Be Nova. Be helpful. Be human.`;

    const finalSystemPrompt = systemPrompt + focusGuardrails;

    console.log('Sending request to Lovable AI with context length:', userContext.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: finalSystemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: mode === 'focus' ? 0.3 : 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm receiving too many requests right now. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
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
