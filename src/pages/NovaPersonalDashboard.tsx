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
  Clock,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
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
import { AutonomousNudgePanel } from '@/components/nova/AutonomousNudgePanel';
import { WeeklySummary } from '@/components/nova/WeeklySummary';
import { WhoopScoreRing } from '@/components/nova/WhoopScoreRing';
import { WhoopMetricCard } from '@/components/nova/WhoopMetricCard';
import { useAuth } from '@/hooks/useAuth';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { useReadinessScore } from '@/hooks/useReadinessScore';
import { useRealtimeMetrics } from '@/hooks/useRealtimeMetrics';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

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
            <div className="w-10 h-10 rounded-full border-2 border-foreground/5 border-t-foreground/30 animate-spin" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO title="Personal Dashboard | Readiness & Recovery | Nova AI" description="Track your daily readiness score, recovery metrics, energy levels, and cognitive performance trends with real-time wearable data." noindex={true} />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <NovaNav />

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-3xl animate-float" />
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Personal</p>
                <h1 className="text-2xl font-medium text-foreground mb-2">
                  Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
                </h1>
                <p className="text-sm text-foreground/50">Your cognitive performance summary</p>
              </div>
              {/* Sync button */}
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground/60 hover:text-foreground transition-all text-xs"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", syncing && "animate-spin")} />
                {syncing ? 'Syncing...' : 'Sync'}
                {lastSync && (
                  <span className="text-foreground/30 ml-1">
                    {formatDistanceToNow(lastSync, { addSuffix: true })}
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* Readiness + Biometric Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-4">Live Biometrics</p>
            
            {hasMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Readiness Ring - spans 1 col */}
                <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-foreground/[0.02]">
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
                    <p className="text-[10px] text-foreground/40 text-center mt-3 max-w-[180px] leading-relaxed">
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
              <div className="flex flex-col items-center justify-center py-16 rounded-3xl bg-foreground/[0.02]">
                <div className="w-16 h-16 rounded-full bg-foreground/[0.03] flex items-center justify-center mb-4">
                  <Activity className="w-7 h-7 text-foreground/20" />
                </div>
                <p className="text-sm text-foreground/50 mb-1">No biometric data yet</p>
                <p className="text-xs text-foreground/30 mb-4">Connect a wearable to see live readiness & recovery</p>
                <button
                  onClick={() => navigate('/nova/devices')}
                  className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/90 transition-colors"
                >
                  Connect Device
                </button>
              </div>
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
                  <div key={f.label} className="p-3 rounded-2xl bg-foreground/[0.02] text-center">
                    <p className="text-[9px] text-foreground/30 uppercase tracking-wider mb-1">{f.label}</p>
                    <p className={cn(
                      "text-sm font-medium",
                      f.value === null ? "text-foreground/20" :
                      f.value >= 80 ? "text-green-500" :
                      f.value >= 60 ? "text-accent" :
                      f.value >= 40 ? "text-orange-500" : "text-red-500"
                    )}>
                      {f.value !== null ? `${Math.round(f.value)}%` : '--'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12"
          >
            {[
              { label: 'Protocols', value: stats.totalProtocols, icon: Target },
              { label: 'Goals', value: stats.activeGoals, icon: TrendingUp },
              { label: 'Insights', value: stats.insightsGenerated, icon: Zap },
              { label: 'Messages', value: stats.chatMessages, icon: MessageCircle },
              { label: 'Devices', value: stats.connectedDevices, icon: Activity },
              { label: 'Check-ins', value: stats.checkInsCompleted, icon: Calendar },
            ].map((metric) => (
              <div 
                key={metric.label}
                className="p-5 rounded-3xl bg-foreground/[0.02] text-center"
              >
                <metric.icon className="w-4 h-4 text-foreground/30 mx-auto mb-3" />
                <p className="text-xl font-light text-foreground">{metric.value}</p>
                <p className="text-[10px] text-foreground/40 mt-1">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-4">Quick Actions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="group p-5 rounded-3xl bg-foreground/[0.02] text-left hover:bg-foreground transition-all duration-500"
                >
                  <action.icon className="w-4 h-4 text-foreground/40 group-hover:text-accent mb-3 transition-colors" />
                  <p className="text-xs font-medium text-foreground group-hover:text-background transition-colors">{action.label}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Health Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-12"
          >
            <HealthForecast />
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30">Recent Activity</p>
                <button 
                  onClick={() => navigate('/nova/insights')}
                  className="text-[10px] text-foreground/40 hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  View all <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              
              {recentActivities.length === 0 ? (
                <div className="text-center py-12 rounded-3xl bg-foreground/[0.02]">
                  <div className="w-12 h-12 rounded-full bg-foreground/[0.03] flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-foreground/20" />
                  </div>
                  <p className="text-xs text-foreground/40">No recent activity</p>
                  <p className="text-[10px] text-foreground/30 mt-1">Start chatting with Nova to see activity here</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center gap-3 p-4 rounded-2xl hover:bg-foreground/[0.02] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-foreground/[0.03] flex items-center justify-center flex-shrink-0">
                        <Zap className="w-3.5 h-3.5 text-foreground/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{activity.title}</p>
                        <p className="text-[10px] text-foreground/30">
                          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Autonomous Coaching */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AutonomousNudgePanel />
            </motion.div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
