import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple rate limiter
const rateLimitMap = new Map<string, number[]>();
function checkRateLimit(userId: string, maxRequests = 3, windowMs = 5 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(userId) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) return false;
  timestamps.push(now);
  rateLimitMap.set(userId, timestamps);
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const isCronCall = authHeader && authHeader.replace('Bearer ', '') === anonKey;

    let userIds: string[] = [];

    if (isCronCall) {
      // Cron mode: process all users who have active protocols or recent metrics
      const { data: activeUsers } = await supabase
        .from('user_preferences')
        .select('user_id')
        .eq('onboarding_completed', true)
        .limit(50);
      userIds = (activeUsers || []).map((u: any) => u.user_id);

      if (userIds.length === 0) {
        return new Response(JSON.stringify({ success: true, message: 'No active users to process' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      // User-initiated mode
      if (!authHeader) throw new Error('No authorization header');
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      if (!user) throw new Error('Unauthorized');

      if (!checkRateLimit(user.id)) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a few minutes." }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      userIds = [user.id];
    }

    // Process each user
    let totalGenerated = 0;
    for (const userId of userIds) {
      try {
        const generated = await processUserCoaching(supabase, userId, LOVABLE_API_KEY);
        totalGenerated += generated;
      } catch (err) {
        console.error(`Error processing user ${userId}:`, err);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      users_processed: userIds.length,
      actions_generated: totalGenerated,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("autonomous-coaching error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/** Analyse the user's historical response patterns to adapt future nudges */
function analyseResponsePatterns(history: any[]) {
  const byCategory: Record<string, { completed: number; dismissed: number; expired: number }> = {};
  const byType: Record<string, { completed: number; dismissed: number; expired: number }> = {};
  const recentDismissedTitles: string[] = [];

  for (const item of history) {
    const cat = item.category || 'general';
    const type = item.nudge_type || 'nudge';
    
    if (!byCategory[cat]) byCategory[cat] = { completed: 0, dismissed: 0, expired: 0 };
    if (!byType[type]) byType[type] = { completed: 0, dismissed: 0, expired: 0 };

    if (item.status === 'completed') {
      byCategory[cat].completed++;
      byType[type].completed++;
    } else if (item.status === 'dismissed') {
      byCategory[cat].dismissed++;
      byType[type].dismissed++;
      recentDismissedTitles.push(item.title);
    } else if (item.status === 'expired') {
      byCategory[cat].expired++;
      byType[type].expired++;
    }
  }

  // Compute engagement rates per category
  const categoryEngagement: Record<string, { rate: number; preference: string }> = {};
  for (const [cat, counts] of Object.entries(byCategory)) {
    const total = counts.completed + counts.dismissed + counts.expired;
    const rate = total > 0 ? Math.round((counts.completed / total) * 100) : 50;
    categoryEngagement[cat] = {
      rate,
      preference: rate >= 70 ? 'high_engagement' : rate >= 40 ? 'moderate' : 'low_engagement',
    };
  }

  // Find preferred and avoided categories
  const preferred = Object.entries(categoryEngagement)
    .filter(([, v]) => v.preference === 'high_engagement')
    .map(([k]) => k);
  const avoided = Object.entries(categoryEngagement)
    .filter(([, v]) => v.preference === 'low_engagement')
    .map(([k]) => k);

  const totalCompleted = history.filter(h => h.status === 'completed').length;
  const totalDismissed = history.filter(h => h.status === 'dismissed').length;
  const overallRate = (totalCompleted + totalDismissed) > 0
    ? Math.round((totalCompleted / (totalCompleted + totalDismissed)) * 100)
    : 50;

  const summary = `Overall engagement: ${overallRate}%. Preferred: ${preferred.join(', ') || 'none yet'}. Avoided: ${avoided.join(', ') || 'none yet'}. Total history: ${history.length} nudges.`;

  return {
    byCategory,
    byType,
    categoryEngagement,
    preferredCategories: preferred,
    avoidedCategories: avoided,
    overallEngagementRate: overallRate,
    recentDismissedTitles: recentDismissedTitles.slice(0, 10),
    totalHistory: history.length,
    summary,
  };
}
