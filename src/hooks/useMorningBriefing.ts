import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MorningBriefingData {
  briefing: string;
  sleepHours: number | null;
  hrvValue: number | null;
  hrvChange: number | null;
  stressValue: number | null;
  recoveryValue: number | null;
  hasData: boolean;
}

const STORAGE_KEY = 'nova_morning_briefing';

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function getCachedBriefing(): MorningBriefingData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.date !== getTodayKey()) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function cacheBriefing(data: MorningBriefingData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), data }));
}

export function useMorningBriefing() {
  const [data, setData] = useState<MorningBriefingData | null>(getCachedBriefing());
  const [isLoading, setIsLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return localStorage.getItem('nova_briefing_dismissed') === getTodayKey();
    } catch { return false; }
  });
  const [error, setError] = useState<string | null>(null);

  const dismiss = useCallback(() => {
    setIsDismissed(true);
    localStorage.setItem('nova_briefing_dismissed', getTodayKey());
  }, []);

  useEffect(() => {
    if (data || isDismissed) return;

    const generate = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch last night's sleep and recent HRV/stress/recovery
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString();

        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const twoDaysAgoStr = twoDaysAgo.toISOString();

        const { data: recentMetrics } = await supabase
          .from('user_metrics')
          .select('metric_type, value, recorded_at')
          .eq('user_id', user.id)
          .gte('recorded_at', twoDaysAgoStr)
          .order('recorded_at', { ascending: false })
          .limit(50);

        if (!recentMetrics || recentMetrics.length === 0) {
          setData({ briefing: '', sleepHours: null, hrvValue: null, hrvChange: null, stressValue: null, recoveryValue: null, hasData: false });
          return;
        }

        // Extract latest values
        const latest = (type: string) => recentMetrics.find(m => m.metric_type === type);
        const allOfType = (type: string) => recentMetrics.filter(m => m.metric_type === type);

        const sleepMetric = latest('sleep_duration');
        const hrvMetrics = allOfType('hrv');
        const stressMetric = latest('stress');
        const recoveryMetric = latest('recovery');

        const sleepHours = sleepMetric ? Number(sleepMetric.value) : null;
        const hrvValue = hrvMetrics[0] ? Number(hrvMetrics[0].value) : null;
        const hrvPrev = hrvMetrics[1] ? Number(hrvMetrics[1].value) : null;
        const hrvChange = (hrvValue !== null && hrvPrev !== null && hrvPrev > 0)
          ? Math.round(((hrvValue - hrvPrev) / hrvPrev) * 100)
          : null;
        const stressValue = stressMetric ? Number(stressMetric.value) : null;
        const recoveryValue = recoveryMetric ? Number(recoveryMetric.value) : null;

        // Build a focused morning briefing prompt
        let dataContext = 'Here is the user\'s latest biometric data:\n';
        if (sleepHours !== null) dataContext += `- Sleep last night: ${sleepHours} hours\n`;
        if (hrvValue !== null) dataContext += `- Current HRV: ${hrvValue} ms${hrvChange !== null ? ` (${hrvChange > 0 ? '+' : ''}${hrvChange}% vs previous)` : ''}\n`;
        if (stressValue !== null) dataContext += `- Stress level: ${stressValue}/100\n`;
        if (recoveryValue !== null) dataContext += `- Recovery score: ${recoveryValue}%\n`;

        const morningPrompt = `Generate a concise morning briefing (3-5 sentences max). 

${dataContext}

Based ONLY on the data above:
1. Summarise how the user's night went (if sleep data exists)
2. Flag anything concerning (low sleep, HRV drop, high stress)
3. Give ONE specific, actionable recommendation for today

If any metric is missing, do NOT mention it or guess. Only discuss what you have data for.
Keep it warm, direct, and personal. No bullet points — write it as a natural paragraph.`;

        const { data: session } = await supabase.auth.getSession();
        const token = session?.session?.access_token;

        const response = await supabase.functions.invoke('nova-chat', {
          body: {
            messages: [{ role: 'user', content: morningPrompt }],
            context: { mode: 'focus' },
          },
        });

        if (response.error) throw new Error(response.error.message);

        // Handle streaming response - read the body
        let briefingText = '';
        
        if (response.data instanceof ReadableStream) {
          const reader = response.data.getReader();
          const decoder = new TextDecoder();
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            // Parse SSE format
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6).trim();
                if (jsonStr === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(jsonStr);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) briefingText += content;
                } catch { /* skip non-JSON lines */ }
              }
            }
          }
        } else if (typeof response.data === 'string') {
          // Parse SSE from string
          const lines = response.data.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === '[DONE]') continue;
              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) briefingText += content;
              } catch { /* skip */ }
            }
          }
        } else if (response.data?.choices) {
          briefingText = response.data.choices[0]?.message?.content || '';
        }

        const result: MorningBriefingData = {
          briefing: briefingText.trim(),
          sleepHours,
          hrvValue,
          hrvChange,
          stressValue,
          recoveryValue,
          hasData: true,
        };

        setData(result);
        cacheBriefing(result);
      } catch (err) {
        console.error('Morning briefing error:', err);
        setError('Could not generate morning briefing');
      } finally {
        setIsLoading(false);
      }
    };

    generate();
  }, [data, isDismissed]);

  return { data, isLoading, isDismissed, dismiss, error };
}
