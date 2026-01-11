import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Zap,
  Activity,
  Moon,
  Heart,
  Target,
  Calendar,
  Clock,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Plus,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NovaNav } from '@/components/NovaNav';
import { NovaSwipeWrapper } from '@/components/NovaSwipeWrapper';
import { SEO } from '@/components/SEO';
import { useAuth } from '@/hooks/useAuth';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  time: string;
}

export default function NovaPersonalDashboard() {
  const navigate = useNavigate();
  const { profile, isAuthenticated, loading: authLoading } = useAuth();
  const { activities } = useActivityFeed();
  const [stats, setStats] = useState({
    totalProtocols: 0,
    activeGoals: 0,
    insightsGenerated: 0,
    chatMessages: 0,
    connectedDevices: 0,
    checkInsCompleted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all stats in parallel
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
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const metrics: DashboardMetric[] = [
    { label: 'Active Protocols', value: stats.totalProtocols, icon: Target, color: 'text-accent' },
    { label: 'Goals Tracking', value: stats.activeGoals, icon: TrendingUp, color: 'text-green-500' },
    { label: 'AI Insights', value: stats.insightsGenerated, icon: Zap, color: 'text-purple-500' },
    { label: 'Chat Messages', value: stats.chatMessages, icon: MessageCircle, color: 'text-blue-500' },
    { label: 'Devices', value: stats.connectedDevices, icon: Activity, color: 'text-indigo-500' },
    { label: 'Check-ins', value: stats.checkInsCompleted, icon: Calendar, color: 'text-orange-500' },
  ];

  const quickActions = [
    { label: 'Chat with Nova', icon: Brain, route: '/nova/chat', color: 'bg-accent/10 text-accent' },
    { label: 'View Insights', icon: Sparkles, route: '/nova/insights', color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Manage Protocols', icon: Target, route: '/nova/protocols', color: 'bg-green-500/10 text-green-500' },
    { label: 'Connect Device', icon: Activity, route: '/nova/devices', color: 'bg-blue-500/10 text-blue-500' },
  ];

  const recentActivities = activities.slice(0, 5);

  if (authLoading || loading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <div className="w-10 h-10 rounded-full border-2 border-muted border-t-foreground animate-spin" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Personal Dashboard | Nova AI" 
        description="Your personal cognitive performance dashboard with AI insights and analytics."
      />
      <div className="min-h-screen bg-background">
        <NovaNav />

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Personal</p>
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-sm text-foreground/50">
              Here's your cognitive performance summary
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          >
            {metrics.map((metric, index) => (
              <div 
                key={metric.label}
                className="p-5 rounded-2xl bg-card border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <metric.icon className={cn("w-4 h-4", metric.color)} />
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
                <p className="text-2xl font-medium text-foreground">
                  {metric.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-sm font-medium text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="group p-5 rounded-2xl bg-card border border-border/50 hover:border-border text-left transition-all hover:shadow-lg"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", action.color)}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-medium text-foreground group-hover:text-accent transition-colors">
                    {action.label}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-card border border-border/50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-foreground">Recent Activity</h2>
                <button 
                  onClick={() => navigate('/nova/insights')}
                  className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  View all <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              
              {recentActivities.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-muted-foreground/50" />
                  </div>
                  <p className="text-xs text-muted-foreground">No recent activity</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">
                    Start chatting with Nova to see activity here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {activity.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Getting Started / Suggestions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-medium text-foreground">Suggested Actions</h2>
              </div>
              
              <div className="space-y-3">
                {stats.connectedDevices === 0 && (
                  <button
                    onClick={() => navigate('/nova/devices')}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">Connect a Device</p>
                      <p className="text-[10px] text-muted-foreground">Sync your wearable for personalised insights</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}

                {stats.totalProtocols === 0 && (
                  <button
                    onClick={() => navigate('/nova/protocols?new=true')}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">Create Your First Protocol</p>
                      <p className="text-[10px] text-muted-foreground">Build a personalised optimisation routine</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}

                <button
                  onClick={() => navigate('/nova/chat')}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Ask Nova Anything</p>
                    <p className="text-[10px] text-muted-foreground">Get AI-powered advice and recommendations</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
