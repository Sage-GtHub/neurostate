import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  // Include any custom headers the frontend sends (e.g. X-Request-ID for diagnostics)
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
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
      // Fetch recent metrics (wider window for 7-day trends)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', userId)
        .gte('recorded_at', sevenDaysAgo)
        .order('recorded_at', { ascending: false })
        .limit(100);

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

      // --- KEY BIOMETRIC SIGNALS ---
      if (metrics && metrics.length > 0) {
        const metricGroups: Record<string, { value: number; date: string; recorded_at: string }[]> = {};
        metrics.forEach(m => {
          if (!metricGroups[m.metric_type]) metricGroups[m.metric_type] = [];
          metricGroups[m.metric_type].push({ 
            value: Number(m.value), 
            date: new Date(m.recorded_at).toLocaleDateString('en-GB'),
            recorded_at: m.recorded_at
          });
        });

        // Extract key signals with 7-day context
        const keyMetrics = ['sleep_duration', 'sleep_score', 'hrv', 'heart_rate', 'stress', 'steps', 'readiness', 'recovery', 'respiratory_rate', 'spo2', 'body_temperature'];
        
        userContext += '\n\n## LIVE BIOMETRIC SNAPSHOT (last reading → 7-day context):\n';
        
        for (const key of keyMetrics) {
          const values = metricGroups[key];
          if (!values || values.length === 0) continue;
          
          const latest = values[0];
          const avg7d = values.length > 1 
            ? (values.reduce((sum, v) => sum + v.value, 0) / values.length).toFixed(1) 
            : null;
          const min7d = values.length > 1 ? Math.min(...values.map(v => v.value)) : null;
          const max7d = values.length > 1 ? Math.max(...values.map(v => v.value)) : null;
          const trend = values.length >= 3 
            ? (values[0].value > values[Math.floor(values.length / 2)].value ? 'trending up' : values[0].value < values[Math.floor(values.length / 2)].value ? 'trending down' : 'stable')
            : 'insufficient data for trend';
          
          let unit = '';
          if (key === 'sleep_duration') unit = ' hrs';
          else if (key === 'hrv') unit = ' ms';
          else if (key === 'heart_rate' || key === 'respiratory_rate') unit = ' bpm';
          else if (key === 'steps') unit = ' steps';
          else if (key === 'stress') unit = '/100';
          else if (key === 'spo2') unit = '%';
          else if (key === 'body_temperature') unit = '°C';
          
          userContext += `- **${key}**: ${latest.value}${unit} (${latest.date})`;
          if (avg7d) userContext += ` | 7d avg: ${avg7d}${unit}, range: ${min7d}–${max7d}${unit}, ${trend}`;
          userContext += '\n';
        }

        // Flag any concerning patterns
        const flags: string[] = [];
        const sleepVals = metricGroups['sleep_duration'];
        const hrvVals = metricGroups['hrv'];
        const stressVals = metricGroups['stress'];
        
        if (sleepVals && sleepVals[0]?.value < 6) flags.push(`⚠️ Low sleep: ${sleepVals[0].value} hrs last night`);
        if (hrvVals && hrvVals.length >= 2 && hrvVals[0].value < hrvVals[1].value * 0.85) flags.push(`⚠️ HRV dropped ${Math.round((1 - hrvVals[0].value / hrvVals[1].value) * 100)}% from previous reading`);
        if (stressVals && stressVals[0]?.value > 70) flags.push(`⚠️ Elevated stress: ${stressVals[0].value}/100`);
        
        if (flags.length > 0) {
          userContext += '\n## ⚠️ BIOMETRIC ALERTS (proactively address these):\n';
          flags.forEach(f => { userContext += `${f}\n`; });
        }

        // Other metrics not in key list
        const otherMetrics = Object.entries(metricGroups).filter(([key]) => !keyMetrics.includes(key));
        if (otherMetrics.length > 0) {
          userContext += '\n## Other Metrics:\n';
          otherMetrics.forEach(([type, values]) => {
            const latest = values[0];
            const trend = values.length > 1 ? (values[0].value > values[1].value ? '↑' : values[0].value < values[1].value ? '↓' : '→') : '';
            userContext += `- ${type}: ${latest.value} ${trend} (${latest.date})\n`;
          });
        }
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

    // Current date/time for temporal grounding
    const now = new Date();
    const currentDateTime = now.toLocaleString('en-GB', { 
      timeZone: 'Europe/London', 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const focusExtra = mode === 'focus'
      ? `\n## FOCUS MODE\n- Extra precision: prefer asking 1 clarifying question over making any assumption.\n`
      : '';

    const systemPrompt = `You are Nova, a cognitive performance coach having a natural conversation.

## CURRENT DATE & TIME
${currentDateTime} (Europe/London)
Use this for all temporal references. "Last night" = the night before today. "This week" = the current calendar week.

## CRITICAL: DATA INTEGRITY RULES
These rules override everything else. Violating them destroys user trust.

1. **NEVER fabricate, invent, or hallucinate biometric data.** If USER CONTEXT below does not contain a specific metric, say: "I don't have that data yet — have you connected your wearable?" or "I can't see your [metric] — let's get that synced."
2. **NEVER guess numbers.** If sleep data isn't in USER CONTEXT, do NOT say "you got 6.5 hours last night." Say "I don't have your sleep data for last night."
3. **NEVER invent trends.** Only reference trends that appear in the 7-day data below.
4. **NEVER fabricate studies, citations, or URLs.** If you cite research, use only well-known, verifiable findings. Prefer saying "research suggests" over inventing specific study names.
5. **When USER CONTEXT is empty or has no biometric data:** Acknowledge this openly. Ask about their devices. Don't pretend you have data you don't.
6. **If unsure about anything, say so.** "I'm not certain about that — let me know more" is always better than guessing.

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

For COMPLEX questions (protocols, analysis, recommendations):
Use this structure but make it flow naturally:

**What I'm seeing:** [ONLY cite data from USER CONTEXT below — if none, say so]

**What this means:** [Inference based on real data only]

**What to do:**
• [Specific action with parameters]

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
ONLY reference user data that appears in USER CONTEXT below:
- If HRV data exists: "Your HRV has been trending down..."
- If sleep data exists: "Based on your sleep scores..."
- If device data exists: "Since you're using the Oura ring..."
- If NO data exists: "I don't have visibility on that yet. Connect your wearable and I'll have real numbers to work with."

## FOLLOW-UPS
Ask naturally when needed:
"Quick question — is today a training day or recovery day?"
"What's your main goal right now: energy, focus, or sleep?"

## BIOMETRIC-AWARE COACHING
You have access to the user's LIVE biometric data in USER CONTEXT below — but ONLY what's there. Never invent data that isn't shown.

1. **Proactive alerts**: If you see ⚠️ BIOMETRIC ALERTS, address them immediately.
   - Low sleep (<6 hrs) → suggest recovery protocol, lighter training, earlier bedtime
   - HRV drop (>15%) → flag potential overtraining or stress
   - High stress (>70/100) → suggest breathwork, cold exposure

2. **Pattern recognition**: Connect dots across metrics ONLY when both data points exist.

3. **Quantified recommendations**: Use real numbers from USER CONTEXT, never invented ones.

4. **Trend awareness**: Use 7-day averages and trends from USER CONTEXT.

5. **Missing data**: If a user asks about a metric not in USER CONTEXT, say you don't have it and suggest connecting their device or doing a check-in.

## PROTOCOL COACHING
- Reference their specific active protocols by name (from USER CONTEXT)
- Check their recent check-in data to gauge progress
- If no protocol data exists, ask what they're working on
- Be proactive but data-grounded

## PRODUCTS (mention when genuinely relevant):
Cognitive: NeuroFocus, Lion's Mane, L-Theanine
Sleep: RestoreSleep, Melatonin, Magnesium
Recovery: Omega3 Elite, Marine Collagen, Creatine
Devices: RedRestore Pro, CryoPlunge, PEMF Mat

## USER CONTEXT
${userContext || 'No biometric data available. The user may not have connected a wearable device yet or has no recent metrics.'}

Be Nova. Be helpful. Be human. Be accurate.`;

    const finalSystemPrompt = systemPrompt + focusExtra;

    console.log('Sending request to Lovable AI with context length:', userContext.length, 'mode:', mode);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: finalSystemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: mode === 'focus' ? 0.2 : 0.4,
        max_tokens: 4096,
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
