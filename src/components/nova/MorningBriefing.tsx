import { motion, AnimatePresence } from 'framer-motion';
import { Sunrise, X, Moon, Heart, Activity, Battery, Loader2 } from 'lucide-react';
import { useMorningBriefing } from '@/hooks/useMorningBriefing';
import { cn } from '@/lib/utils';

export function MorningBriefing() {
  const { data, isLoading, isDismissed, dismiss, error } = useMorningBriefing();

  // Don't render if dismissed, errored, or no data available
  if (isDismissed || error) return null;
  if (!isLoading && data && !data.hasData) return null;

  return (
    <AnimatePresence>
      {(isLoading || (data?.hasData && data.briefing)) && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-accent/[0.06] to-foreground/[0.02] border border-accent/10 overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400/80 to-amber-500/80 flex items-center justify-center">
                    <Sunrise className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Good Morning</h3>
                    <p className="text-[10px] text-foreground/40 uppercase tracking-wider">Nova's Daily Briefing</p>
                  </div>
                </div>
                <button
                  onClick={dismiss}
                  className="p-1.5 rounded-full hover:bg-foreground/[0.05] text-foreground/30 hover:text-foreground/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  <p className="text-sm text-foreground/50">Nova is analysing your overnight data...</p>
                </div>
              ) : data?.hasData && (
                <>
                  {/* Metric pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {data.sleepHours !== null && (
                      <MetricPill
                        icon={Moon}
                        label="Sleep"
                        value={`${data.sleepHours}h`}
                        status={data.sleepHours >= 7 ? 'good' : data.sleepHours >= 6 ? 'moderate' : 'low'}
                      />
                    )}
                    {data.hrvValue !== null && (
                      <MetricPill
                        icon={Heart}
                        label="HRV"
                        value={`${data.hrvValue}ms`}
                        change={data.hrvChange}
                        status={data.hrvChange !== null ? (data.hrvChange >= 0 ? 'good' : data.hrvChange > -15 ? 'moderate' : 'low') : 'moderate'}
                      />
                    )}
                    {data.stressValue !== null && (
                      <MetricPill
                        icon={Activity}
                        label="Stress"
                        value={`${data.stressValue}/100`}
                        status={data.stressValue <= 40 ? 'good' : data.stressValue <= 70 ? 'moderate' : 'low'}
                      />
                    )}
                    {data.recoveryValue !== null && (
                      <MetricPill
                        icon={Battery}
                        label="Recovery"
                        value={`${data.recoveryValue}%`}
                        status={data.recoveryValue >= 70 ? 'good' : data.recoveryValue >= 50 ? 'moderate' : 'low'}
                      />
                    )}
                  </div>

                  {/* Briefing text */}
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {data.briefing}
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetricPill({
  icon: Icon,
  label,
  value,
  change,
  status,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change?: number | null;
  status: 'good' | 'moderate' | 'low';
}) {
  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs",
      status === 'good' && "bg-signal-green/10 text-signal-green",
      status === 'moderate' && "bg-warning-amber/10 text-warning-amber",
      status === 'low' && "bg-destructive/10 text-destructive",
    )}>
      <Icon className="w-3 h-3" />
      <span className="font-medium">{label}</span>
      <span>{value}</span>
      {change !== null && change !== undefined && (
        <span className="text-[10px]">
          ({change > 0 ? '+' : ''}{change}%)
        </span>
      )}
    </div>
  );
}
