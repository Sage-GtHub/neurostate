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
} from 'lucide-react';
import { NovaNav } from '@/components/NovaNav';
import { NovaSwipeWrapper } from '@/components/NovaSwipeWrapper';
import { SEO } from '@/components/SEO';
import { useAuth } from '@/hooks/useAuth';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

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

  const metrics = [
    { label: 'Protocols', value: stats.totalProtocols, icon: Target },
    { label: 'Goals', value: stats.activeGoals, icon: TrendingUp },
    { label: 'Insights', value: stats.insightsGenerated, icon: Zap },
    { label: 'Messages', value: stats.chatMessages, icon: MessageCircle },
    { label: 'Devices', value: stats.connectedDevices, icon: Activity },
    { label: 'Check-ins', value: stats.checkInsCompleted, icon: Calendar },
  ];

  const quickActions = [
    { label: 'Chat with Nova', icon: Brain, route: '/nova/chat' },
    { label: 'View Insights', icon: Sparkles, route: '/nova/insights' },
    { label: 'Manage Protocols', icon: Target, route: '/nova/protocols' },
    { label: 'Connect Device', icon: Activity, route: '/nova/devices' },
  ];

  const recentActivities = activities.slice(0, 5);

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
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Personal</p>
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-sm text-foreground/50">Your cognitive performance summary</p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12"
          >
            {metrics.map((metric, index) => (
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
            transition={{ delay: 0.2 }}
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

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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

            {/* Suggested Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30">Suggested</p>
              </div>
              
              <div className="space-y-2">
                {stats.connectedDevices === 0 && (
                  <button
                    onClick={() => navigate('/nova/devices')}
                    className="w-full flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">Connect a Device</p>
                      <p className="text-[10px] text-foreground/40">Sync your wearable for personalised insights</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/20" />
                  </button>
                )}
                {stats.totalProtocols === 0 && (
                  <button
                    onClick={() => navigate('/nova/protocols?new=true')}
                    className="w-full flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-foreground/60" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">Create Your First Protocol</p>
                      <p className="text-[10px] text-foreground/40">Build a personalised optimisation routine</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/20" />
                  </button>
                )}
                <button
                  onClick={() => navigate('/nova/chat')}
                  className="w-full flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-foreground/60" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Ask Nova Anything</p>
                    <p className="text-[10px] text-foreground/40">Get AI-powered advice and recommendations</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/20" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
