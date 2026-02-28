import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
import { ArrowRight, Brain, Activity, Moon, Heart, Zap, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NovaOverview() {
  const navigate = useNavigate();

  const todayScores = {
    recovery: 78,
    strain: 12.4,
    sleep: 85,
    hrv: 62
  };

  const insights = [
    { title: "Recovery trending up", description: "Your HRV has improved 12% this week.", type: "positive" },
    { title: "Optimal training window", description: "2-6pm is ideal for high intensity today.", type: "info" },
    { title: "Sleep debt detected", description: "You're 1.5 hours behind. Consider earlier bedtime.", type: "warning" }
  ];

  const quickActions = [
    { label: "Chat with Nova", icon: Brain, route: "/nova/chat" },
    { label: "View Insights", icon: TrendingUp, route: "/nova/insights" },
    { label: "My Devices", icon: Activity, route: "/nova/devices" },
    { label: "Protocols", icon: Zap, route: "/nova/protocols" }
  ];

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <NovaSwipeWrapper>
      <SEO title="Nova AI | Your Personal Health Coach | NeuroState" description="Nova is your AI health coach. It reads your wearable data, tracks your sleep, recovery, and energy, and tells you what to do to feel and perform better." keywords="Nova AI, health coach, personal wellness, sleep tracking, recovery, HRV, energy optimisation, daily health score" />
      <SoftwareApplicationStructuredData />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Organic background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <NovaNav />
        
        <motion.div 
          className="relative container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-12"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          
          {/* Greeting */}
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-mono">Good morning</p>
            <h1 className="text-2xl font-medium text-foreground tracking-tight">Your daily overview</h1>
          </motion.div>

          {/* Main Score */}
          <motion.div variants={fadeUp} className="flex justify-center mb-12">
            <div className="text-center">
              <div className="w-36 h-36 rounded-full border-2 border-accent/30 flex items-center justify-center mx-auto mb-4 bg-accent/[0.03]">
                <div>
                  <p className="text-4xl font-light text-foreground tracking-tight">{todayScores.recovery}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Recovery</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Ready to perform</p>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mb-12">
            {[
              { icon: Activity, value: todayScores.strain, label: "Strain" },
              { icon: Moon, value: `${todayScores.sleep}%`, label: "Sleep" },
              { icon: Heart, value: todayScores.hrv, label: "HRV" },
            ].map((metric, i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/40 text-center hover:bg-muted/60 transition-colors">
                <metric.icon className="w-4 h-4 text-accent mx-auto mb-3" />
                <p className="text-xl font-medium text-foreground">{metric.value}</p>
                <p className="text-[11px] text-muted-foreground font-mono">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 mb-12">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="group p-5 rounded-xl bg-muted/40 text-left hover:bg-foreground transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-accent group-hover:text-accent mb-3" />
                  <p className="text-xs font-medium text-foreground group-hover:text-background transition-colors">{action.label}</p>
                </button>
              );
            })}
          </motion.div>

          {/* Insights */}
          <motion.div variants={fadeUp} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-mono">Insights</p>
              <button onClick={() => navigate('/nova/insights')} className="text-[11px] text-accent flex items-center gap-1 hover:underline">
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                      insight.type === 'positive' ? 'bg-accent' :
                      insight.type === 'warning' ? 'bg-orange-400' :
                      'bg-blue-400'
                    }`} />
                    <div>
                      <p className="text-xs font-medium text-foreground mb-0.5">{insight.title}</p>
                      <p className="text-[11px] text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Button 
              className="w-full h-11 rounded-full text-xs bg-foreground text-background hover:bg-foreground/90"
              onClick={() => navigate('/nova/chat')}
            >
              <Brain className="w-3.5 h-3.5 mr-2" />
              Ask Nova anything
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}