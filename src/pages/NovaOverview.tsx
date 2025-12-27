import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
import { WhoopScoreRing } from "@/components/nova/WhoopScoreRing";
import { WhoopMetricCard } from "@/components/nova/WhoopMetricCard";
import { 
  ArrowRight, 
  Brain, 
  Activity, 
  Moon,
  Heart,
  Zap,
  TrendingUp,
  ChevronRight
} from "lucide-react";

export default function NovaOverview() {
  const navigate = useNavigate();

  // Simulated daily scores
  const todayScores = {
    recovery: 78,
    strain: 12.4,
    sleep: 85,
    hrv: 62
  };

  const insights = [
    {
      title: "Recovery trending up",
      description: "Your HRV has improved 12% this week. Keep your current sleep schedule.",
      type: "positive"
    },
    {
      title: "Optimal training window",
      description: "Based on your recovery, 2-6pm is ideal for high intensity today.",
      type: "info"
    },
    {
      title: "Sleep debt detected",
      description: "You're 1.5 hours behind. Consider an earlier bedtime tonight.",
      type: "warning"
    }
  ];

  const quickActions = [
    { label: "Chat with Nova", icon: Brain, route: "/nova/chat" },
    { label: "View Insights", icon: TrendingUp, route: "/nova/insights" },
    { label: "My Devices", icon: Activity, route: "/nova/devices" },
    { label: "Protocols", icon: Zap, route: "/nova/protocols" }
  ];

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Nova – AI Cognitive Performance Assistant | NeuroState"
        description="Personalised protocols, predictive insights and real-time guidance to enhance focus, sleep and mental resilience. 72-hour health forecasting powered by AI."
      />
      <SoftwareApplicationStructuredData />
      <div className="min-h-screen bg-void">
        <NovaNav />
        
        <div className="pt-16 pb-24 px-4 sm:px-6 max-w-lg mx-auto">
          
          {/* Greeting */}
          <div className="mb-8">
            <p className="text-muted text-sm uppercase tracking-widest mb-1">Good morning</p>
            <h1 className="text-2xl font-semibold text-foreground">Your daily overview</h1>
          </div>

          {/* Main Score Ring */}
          <div className="flex justify-center mb-8">
            <WhoopScoreRing 
              score={todayScores.recovery} 
              label="Recovery"
              sublabel="Ready to perform"
              size={200}
              animated
            />
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Activity className="w-4 h-4 text-whoop-strain" />
              </div>
              <p className="text-xl font-bold text-foreground">{todayScores.strain}</p>
              <p className="text-xs text-muted">Strain</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Moon className="w-4 h-4 text-whoop-sleep" />
              </div>
              <p className="text-xl font-bold text-foreground">{todayScores.sleep}%</p>
              <p className="text-xs text-muted">Sleep</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart className="w-4 h-4 text-whoop-hrv" />
              </div>
              <p className="text-xl font-bold text-foreground">{todayScores.hrv}</p>
              <p className="text-xs text-muted">HRV</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="bg-card rounded-xl p-4 border border-border text-left hover:border-primary/50 transition-colors group"
                >
                  <Icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </button>
              );
            })}
          </div>

          {/* Insights */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today's Insights</h2>
              <button 
                onClick={() => navigate('/nova/insights')}
                className="text-xs text-primary flex items-center gap-1"
              >
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-4 border border-border"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.type === 'positive' ? 'bg-primary' :
                      insight.type === 'warning' ? 'bg-whoop-strain' :
                      'bg-whoop-sleep'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">{insight.title}</p>
                      <p className="text-xs text-muted leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium"
            onClick={() => navigate('/nova/chat')}
          >
            <Brain className="w-4 h-4 mr-2" />
            Ask Nova anything
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
