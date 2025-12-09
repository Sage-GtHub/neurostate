import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ArrowRight, Target } from "lucide-react";
import { PhaseProgressTracker } from "@/components/nova/PhaseProgressTracker";
import { ProtocolBuilder } from "@/components/nova/ProtocolBuilder";
import { ProtocolCheckIn } from "@/components/nova/ProtocolCheckIn";

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
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4>(2);
  const [daysInPhase, setDaysInPhase] = useState(14);
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

  return (
    <NovaSwipeWrapper>
      <div className="min-h-screen bg-background">
        <NovaNav />
      
      <div className="border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl md:text-h1 font-semibold text-foreground">Active Protocols</h1>
            <Button onClick={() => setShowAssessment(true)} size="sm" className="gap-2 min-h-[44px]">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Protocol</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
          <p className="text-xs sm:text-body-sm text-muted-foreground">Track your daily stacks and protocol progress</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-12 animate-fade-in">
          {/* Phase Progress Tracker */}
          <PhaseProgressTracker currentPhase={currentPhase} daysInPhase={daysInPhase} />

          {/* Protocol Builder */}
          <ProtocolBuilder />

          {/* Protocols List */}
          <div className="space-y-4 sm:space-y-6">
            {protocols.length > 0 ? (
            protocols.map((protocol) => (
              <Card key={protocol.id} className="border-mist/30 hover:border-mist transition-all hover:shadow-md">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-carbon to-slate flex items-center justify-center">
                          <Target className="w-5 h-5 text-ivory" />
                        </div>
                        <h3 className="text-[1.125rem] font-semibold text-carbon">{protocol.protocol_name}</h3>
                      </div>
                      <p className="text-sm text-ash ml-13">
                        Started {new Date(protocol.started_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • {protocol.status}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate(`/nova/protocols/${protocol.id}`)}
                      className="gap-2 hover:bg-pearl"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-ash font-medium">Progress</span>
                      <span className="font-semibold text-carbon">{protocol.completion_percentage}%</span>
                    </div>
                    <Progress value={protocol.completion_percentage} className="h-2.5" />
                  </div>

                  {/* Protocol Check-In */}
                  <div className="border-t border-mist/30 pt-6">
                    <ProtocolCheckIn 
                      protocolId={protocol.id} 
                      products={protocol.products}
                      onComplete={loadProtocols}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-mist/30">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pearl to-mist mx-auto mb-6 flex items-center justify-center">
                  <Target className="w-8 h-8 text-ash" />
                </div>
                <p className="text-body text-ash mb-6 max-w-md mx-auto">
                  No active protocols yet. Create your first personalised protocol to start optimising your performance.
                </p>
                <Button onClick={() => setShowAssessment(true)} size="lg" className="gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Protocol</span>
                </Button>
              </CardContent>
            </Card>
          )}

          {protocols.length > 0 && (
            <Card className="border-carbon/10 bg-gradient-to-br from-pearl/50 to-mist/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-[1.125rem] font-semibold text-carbon mb-3">Ready to optimise something new?</h3>
                <p className="text-sm text-ash mb-6 leading-relaxed max-w-xl mx-auto">
                  Take another assessment to create a specialised protocol for different performance goals.
                </p>
                <Button variant="outline" onClick={() => setShowAssessment(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Protocol</span>
                </Button>
              </CardContent>
            </Card>
          )}
          </div>
        </div>
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
