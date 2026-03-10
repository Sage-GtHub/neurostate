import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Zap,
  Activity,
  Target,
  Calendar,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Heart,
  Moon,
  RefreshCw,
  Battery,
} from 'lucide-react';
import { NovaNav } from '@/components/NovaNav';
import { NovaSwipeWrapper } from '@/components/NovaSwipeWrapper';
import { SEO } from '@/components/SEO';
import { HealthForecast } from '@/components/nova/HealthForecast';
import { NovaEmptyState } from '@/components/nova/NovaEmptyState';

import { WeeklySummary } from '@/components/nova/WeeklySummary';
import { MorningBriefing } from '@/components/nova/MorningBriefing';
import { WhoopScoreRing } from '@/components/nova/WhoopScoreRing';
import { WhoopMetricCard } from '@/components/nova/WhoopMetricCard';
import { useAuth } from '@/hooks/useAuth';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { useReadinessScore } from '@/hooks/useReadinessScore';
import { useRealtimeMetrics } from '@/hooks/useRealtimeMetrics';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function NovaPersonalDashboard() {
  const navigate = useNavigate();
  const { profile, isAuthenticated, loading: authLoading } = useAuth();
  const { activities } = useActivityFeed();
  const readiness = useReadinessScore();
  const { metrics: realtimeMetrics, isLoading: metricsLoading, lastSync, syncDevices } = useRealtimeMetrics();
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState({
    totalProtocols: 0,
    activeGoals: 0,
    insightsGenerated: 0,
    chatMessages: 0,
    connectedDevices: 0,
    checkInsCompleted: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncDevices();
      readiness.refresh();
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      try {
        const [protocolsRes, goalsRes, insightsRes, messagesRes, devicesRes, checkInsRes] = await Promise.all([
          supabase.from('user_protocols').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('performance_goals').select('id', { count: 'exact' }).eq('user_id', user.id).eq('status', 'active'),
          supabase.from('ai_insights').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('nova_chat_messages').select('id', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('connected_devices').select('id', { count: 'exact' }).eq('user_id', user.id).eq('connection_status', 'connected'),
          supabase.from('protocol_check_ins').select('id', { count: 'exact' }).eq('user_id', user.id),
        ]);
        setStats({
          totalProtocols: protocolsRes.count || 0,
          activeGoals: goalsRes.count || 0,
          insightsGenerated: insightsRes.count || 0,
          chatMessages: messagesRes.count || 0,
          connectedDevices: devicesRes.count || 0,
          checkInsCompleted: checkInsRes.count || 0,
        });
      } catch (error) { console.error('Error fetching stats:', error); }
      finally { setLoading(false); }
    };
    if (isAuthenticated) fetchStats();
  }, [isAuthenticated]);

  const quickActions = [
    { label: 'Chat with Nova', icon: Brain, route: '/nova/chat' },
    { label: 'View Insights', icon: Sparkles, route: '/nova/insights' },
    { label: 'Manage Protocols', icon: Target, route: '/nova/protocols' },
    { label: 'Connect Device', icon: Activity, route: '/nova/devices' },
  ];

  const recentActivities = activities.slice(0, 5);

  const hasMetrics = realtimeMetrics.hrv || realtimeMetrics.sleep || realtimeMetrics.recovery;

  if (authLoading || loading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <div className="w-10 h-10 rounded-xl border-2 border-foreground/5 border-t-foreground/30 animate-spin" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO title="Personal Dashboard | Readiness & Recovery | Nova AI" description="Track your daily readiness score, recovery metrics, energy levels, and cognitive performance trends with real-time wearable data." noindex={true} />
      <div className="min-h-screen bg-background relative">
        <NovaNav />

        <motion.div 
          className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5 font-mono">Personal</p>
                <h1 className="text-2xl font-medium text-foreground tracking-tight">
                  Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
                </h1>
              </div>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-[10px] font-mono"
              >
                <RefreshCw className={cn("w-3 h-3", syncing && "animate-spin")} />
                {syncing ? 'Syncing...' : 'Sync'}
                {lastSync && (
                  <span className="text-muted-foreground/50 ml-1">
                    {formatDistanceToNow(lastSync, { addSuffix: true })}
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* Morning Briefing */}
          <motion.div variants={fadeUp}>
            <MorningBriefing />
          </motion.div>

          {/* Readiness + Biometric Cards */}
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4 font-mono">Live Biometrics</p>
            
            {hasMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* Readiness Ring */}
                <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-card border border-border/50">
                  <WhoopScoreRing
                    score={readiness.score ?? 0}
                    label="Readiness"
                    sublabel={readiness.score !== null ? (
                      readiness.score >= 80 ? 'Optimal' :
                      readiness.score >= 60 ? 'Good' :
                      readiness.score >= 40 ? 'Moderate' : 'Low'
                    ) : undefined}
                    size="md"
                  />
                  {readiness.recommendation && (
                    <p className="text-[10px] text-muted-foreground text-center mt-3 max-w-[180px] leading-relaxed">
                      {readiness.recommendation}
                    </p>
                  )}
                </div>

                {/* Metric Cards */}
                <WhoopMetricCard
                  icon={Heart}
                  label="HRV"
                  value={realtimeMetrics.hrv?.value ?? '--'}
                  unit={realtimeMetrics.hrv ? 'ms' : undefined}
                  trend={realtimeMetrics.hrv?.trend ? (
                    realtimeMetrics.hrv.trend.startsWith('+') ? 'up' :
                    realtimeMetrics.hrv.trend.startsWith('-') ? 'down' : 'neutral'
                  ) : undefined}
                  trendValue={realtimeMetrics.hrv?.trend}
                  color="cyan"
                />

                <WhoopMetricCard
                  icon={Moon}
                  label="Sleep"
                  value={realtimeMetrics.sleep?.value ?? '--'}
                  trend={realtimeMetrics.sleep?.trend ? (
                    realtimeMetrics.sleep.trend.startsWith('+') ? 'up' :
                    realtimeMetrics.sleep.trend.startsWith('-') ? 'down' : 'neutral'
                  ) : undefined}
                  trendValue={realtimeMetrics.sleep?.trend}
                  color="purple"
                />

                <WhoopMetricCard
                  icon={Battery}
                  label="Recovery"
                  value={realtimeMetrics.recovery?.value ?? '--'}
                  trend={realtimeMetrics.recovery?.trend ? (
                    realtimeMetrics.recovery.trend.startsWith('+') ? 'up' :
                    realtimeMetrics.recovery.trend.startsWith('-') ? 'down' : 'neutral'
                  ) : undefined}
                  trendValue={realtimeMetrics.recovery?.trend}
                  color="green"
                />

                <WhoopMetricCard
                  icon={Brain}
                  label="Focus"
                  value={realtimeMetrics.focus?.value ?? '--'}
                  trend={realtimeMetrics.focus?.trend ? (
                    realtimeMetrics.focus.trend.startsWith('+') ? 'up' :
                    realtimeMetrics.focus.trend.startsWith('-') ? 'down' : 'neutral'
                  ) : undefined}
                  trendValue={realtimeMetrics.focus?.trend}
                  color="yellow"
                />
              </div>
            ) : (
              <NovaEmptyState
                variant="devices"
                title="No biometric data yet"
                description="Connect a wearable device to unlock real-time readiness scoring, recovery tracking, and personalised energy predictions."
                primaryAction={{
                  label: "Connect a Device",
                  to: "/nova/devices",
                }}
                secondaryAction={{
                  label: "Learn More",
                  onClick: () => navigate('/nova/insights'),
                }}
              />
            )}

            {/* Readiness Factor Breakdown */}
            {hasMetrics && readiness.score !== null && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[
                  { label: 'HRV', value: readiness.factors.hrv },
                  { label: 'Sleep', value: readiness.factors.sleep },
                  { label: 'Recovery', value: readiness.factors.recovery },
                  { label: 'Check-in', value: readiness.factors.checkin },
                ].map((f) => (
                  <div key={f.label} className="p-3 rounded-xl bg-card border border-border/30 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1 font-mono">{f.label}</p>
                    <p className={cn(
                      "text-sm font-medium",
                      f.value === null ? "text-muted-foreground/30" :
                      f.value >= 80 ? "text-signal-green" :
                      f.value >= 60 ? "text-accent" :
                      f.value >= 40 ? "text-warning-amber" : "text-destructive"
                    )}>
                      {f.value !== null ? `${Math.round(f.value)}%` : '--'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: 'Protocols', value: stats.totalProtocols, icon: Target },
              { label: 'Goals', value: stats.activeGoals, icon: TrendingUp },
              { label: 'Insights', value: stats.insightsGenerated, icon: Zap },
              { label: 'Messages', value: stats.chatMessages, icon: MessageCircle },
              { label: 'Devices', value: stats.connectedDevices, icon: Activity },
              { label: 'Check-ins', value: stats.checkInsCompleted, icon: Calendar },
            ].map((metric) => (
              <motion.div 
                key={metric.label}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl bg-card border border-border/50 text-center hover:border-border hover:shadow-sm transition-all duration-300"
              >
                <metric.icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-2.5" />
                <p className="text-xl font-semibold text-foreground tracking-tight">{metric.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4 font-mono">Quick Actions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(action.route)}
                  className="group p-5 rounded-xl bg-card border border-border/50 text-left hover:bg-foreground hover:border-foreground transition-all duration-300"
                >
                  <action.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent mb-3 transition-colors" />
                  <p className="text-xs font-medium text-foreground group-hover:text-background transition-colors">{action.label}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Weekly Summary */}
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4 font-mono">Your Week</p>
            <WeeklySummary />
          </motion.div>

          {/* Health Forecast */}
          <motion.div variants={fadeUp} className="mb-10">
            <HealthForecast />
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">Recent Activity</p>
              <button 
                onClick={() => navigate('/nova/insights')}
                className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors font-mono"
              >
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            
            {recentActivities.length === 0 ? (
              <NovaEmptyState
                variant="generic"
                title="No recent activity"
                description="Start chatting with Nova, connect a device, or begin a protocol to see your activity here."
                primaryAction={{
                  label: "Chat with Nova",
                  to: "/nova/chat",
                }}
              />
            ) : (
              <div className="space-y-0.5">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </NovaSwipeWrapper>
  );
}
