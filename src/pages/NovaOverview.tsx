import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
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
        title="Nova AI | Cognitive Performance Forecasting Engine"
        description="Nova is a multi-model AI engine that forecasts cognitive performance using wearable data, behavioural signals, and predictive analytics."
      />
      <SoftwareApplicationStructuredData />
      <div className="min-h-screen bg-background">
        <NovaNav />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16">
          
          {/* Greeting */}
          <div className="mb-12">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Good morning</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Your daily overview</h1>
          </div>

          {/* Main Score */}
          <div className="flex justify-center mb-12">
            <div className="text-center">
              <div className="w-40 h-40 rounded-full border-4 border-accent flex items-center justify-center mx-auto mb-4">
                <div>
                  <p className="text-4xl font-bold text-foreground">{todayScores.recovery}%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Recovery</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Ready to perform</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <Activity className="w-4 h-4 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{todayScores.strain}</p>
              <p className="text-xs text-muted-foreground">Strain</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <Moon className="w-4 h-4 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{todayScores.sleep}%</p>
              <p className="text-xs text-muted-foreground">Sleep</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <Heart className="w-4 h-4 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{todayScores.hrv}</p>
              <p className="text-xs text-muted-foreground">HRV</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="bg-card rounded-lg p-6 border border-border text-left hover:border-accent/30 transition-all group"
                >
                  <Icon className="w-5 h-5 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </button>
              );
            })}
          </div>

          {/* Insights */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Today's Insights</h2>
              <button 
                onClick={() => navigate('/nova/insights')}
                className="text-xs text-accent flex items-center gap-1 hover:underline"
              >
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-lg p-5 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.type === 'positive' ? 'bg-accent' :
                      insight.type === 'warning' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">{insight.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button 
            className="w-full h-12"
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
