import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { supabase } from "@/integrations/supabase/client";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ChevronRight, Target, Activity, TrendingUp, Zap } from "lucide-react";
import { WhoopScoreRing } from "@/components/nova/WhoopScoreRing";

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

  useEffect(() => {
    loadProtocols();
  }, []);

  const loadProtocols = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false });

      if (error) throw error;
      setProtocols((data || []) as Protocol[]);
    } catch (error) {
      console.error("Error loading protocols:", error);
      toast({
        title: "Error",
        description: "Failed to load protocols",
        variant: "destructive",
      });
    }
  };

  const getDaysSince = (dateString: string) => {
    const start = new Date(dateString);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <NovaSwipeWrapper>
      <div className="min-h-screen bg-black">
        <NovaNav />
        
        {/* Hero Section with Recovery Ring */}
        <div className="px-6 pt-8 pb-12">
          <div className="flex flex-col items-center text-center mb-12">
            {/* Main Score Ring */}
            <div className="relative mb-8">
              <WhoopScoreRing 
                score={protocols.length > 0 ? Math.round(protocols.reduce((acc, p) => acc + p.completion_percentage, 0) / protocols.length) : 0} 
                size={200} 
                strokeWidth={10}
                label="PROTOCOL"
                sublabel="ADHERENCE"
              />
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-foreground">{protocols.length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Active</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {protocols.length > 0 ? getDaysSince(protocols[0]?.started_at) : 0}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Days</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">
                  {protocols.reduce((acc, p) => acc + (p.products?.length || 0), 0)}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Items</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setShowAssessment(true)}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm transition-all active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              New Protocol
            </button>
          </div>

          {/* Protocols List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Protocols</h2>
            </div>

            {protocols.length > 0 ? (
              protocols.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => navigate(`/nova/protocols/${protocol.id}`)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all active:scale-[0.99]"
                >
                  {/* Mini Ring */}
                  <div className="flex-shrink-0">
                    <WhoopScoreRing 
                      score={protocol.completion_percentage} 
                      size={56} 
                      strokeWidth={4}
                      showLabel={false}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-foreground text-base mb-1">{protocol.protocol_name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{getDaysSince(protocol.started_at)} days</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>{protocol.products?.length || 0} items</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="capitalize">{protocol.status}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mb-6">
                  <Target className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                  No active protocols yet. Create your first protocol to start optimising.
                </p>
                <button
                  onClick={() => setShowAssessment(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Create Protocol
                </button>
              </div>
            )}
          </div>

          {/* Journey Progress */}
          {protocols.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Your Journey</h2>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  { phase: 1, label: "Discover", icon: Activity, active: true },
                  { phase: 2, label: "Optimise", icon: TrendingUp, active: getDaysSince(protocols[0]?.started_at) > 7 },
                  { phase: 3, label: "Predict", icon: Target, active: getDaysSince(protocols[0]?.started_at) > 30 },
                  { phase: 4, label: "Autonomy", icon: Zap, active: getDaysSince(protocols[0]?.started_at) > 90 },
                ].map((item) => (
                  <div
                    key={item.phase}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      item.active 
                        ? "bg-card border border-primary/30" 
                        : "bg-card/50 border border-border/30 opacity-50"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mb-2 ${item.active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-medium ${item.active ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <ProtocolAssessment 
          open={showAssessment} 
          onOpenChange={setShowAssessment}
          onComplete={loadProtocols}
        />
      </div>
    </NovaSwipeWrapper>
  );
}
