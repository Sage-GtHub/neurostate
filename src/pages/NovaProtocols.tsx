import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { supabase } from "@/integrations/supabase/client";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ArrowUpRight, Target, Activity, TrendingUp, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";

interface Protocol {
  id: string;
  protocol_name: string;
  goal: string;
  status: string;
  completion_percentage: number;
  started_at: string;
  products: any[];
}

export default function NovaProtocols() {
  const navigate = useNavigate();
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const { toast } = useToast();

  useEffect(() => { loadProtocols(); }, []);

  const loadProtocols = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('user_protocols').select('*').eq('user_id', user.id).order('started_at', { ascending: false });
      if (error) throw error;
      setProtocols((data || []) as Protocol[]);
    } catch (error) {
      console.error("Error loading protocols:", error);
      toast({ title: "Error", description: "Failed to load protocols", variant: "destructive" });
    }
  };

  const getDaysSince = (dateString: string) => {
    const start = new Date(dateString);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const averageProgress = protocols.length > 0 ? Math.round(protocols.reduce((acc, p) => acc + p.completion_percentage, 0) / protocols.length) : 0;

  return (
    <NovaSwipeWrapper>
      <SEO title="Protocols | Nova AI" description="Manage your cognitive performance protocols." />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <NovaNav />
        
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Your journey</p>
            <h1 className="text-2xl font-light text-foreground mb-6">Protocols</h1>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8">
              {[
                { value: protocols.length, label: "Active" },
                { value: `${averageProgress}%`, label: "Adherence", accent: true },
                { value: protocols.reduce((acc, p) => acc + (p.products?.length || 0), 0), label: "Items" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-light ${stat.accent ? 'text-accent' : 'text-foreground'}`}>{stat.value}</div>
                  <div className="text-[10px] text-foreground/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* New Protocol Button */}
          <button
            onClick={() => setShowAssessment(true)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-foreground text-background text-xs font-medium transition-all hover:bg-foreground/90 mb-8"
          >
            <Plus className="w-4 h-4" />
            New Protocol
          </button>

          {/* Protocols List */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Your Protocols</p>

            {protocols.length > 0 ? (
              protocols.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => navigate(`/nova/protocols/${protocol.id}`)}
                  className="w-full flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all text-left group"
                >
                  {/* Progress Circle */}
                  <div className="w-12 h-12 rounded-full border-2 border-accent/30 flex items-center justify-center flex-shrink-0 bg-accent/[0.02]">
                    <span className="text-sm font-light text-foreground">{protocol.completion_percentage}%</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-foreground mb-1">{protocol.protocol_name}</h3>
                    <p className="text-[10px] text-foreground/40">
                      {getDaysSince(protocol.started_at)} days · {protocol.products?.length || 0} items · <span className="capitalize">{protocol.status}</span>
                    </p>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="w-14 h-14 rounded-3xl bg-foreground/[0.02] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-foreground/20" />
                </div>
                <p className="text-xs text-foreground/40 mb-6 max-w-xs">
                  No active protocols yet. Create your first protocol to start optimising.
                </p>
                <button
                  onClick={() => setShowAssessment(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-xs font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Protocol
                </button>
              </div>
            )}
          </div>

          {/* Journey Progress */}
          {protocols.length > 0 && (
            <div className="mt-12 pt-8 border-t border-foreground/5">
              <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Your Journey</p>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  { phase: 1, label: "Discover", icon: Activity, active: true },
                  { phase: 2, label: "Optimise", icon: TrendingUp, active: getDaysSince(protocols[0]?.started_at) > 7 },
                  { phase: 3, label: "Predict", icon: Target, active: getDaysSince(protocols[0]?.started_at) > 30 },
                  { phase: 4, label: "Autonomy", icon: Zap, active: getDaysSince(protocols[0]?.started_at) > 90 },
                ].map((item) => (
                  <div
                    key={item.phase}
                    className={`flex flex-col items-center p-4 rounded-2xl transition-all ${
                      item.active ? "bg-foreground/[0.03]" : "bg-foreground/[0.01] opacity-50"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mb-2 ${item.active ? "text-accent" : "text-foreground/30"}`} />
                    <span className={`text-[10px] ${item.active ? "text-foreground" : "text-foreground/30"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <ProtocolAssessment open={showAssessment} onOpenChange={setShowAssessment} onComplete={loadProtocols} />
      </div>
    </NovaSwipeWrapper>
  );
}
