import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ArrowRight, Target } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      <div className="bg-gradient-to-b from-pearl/30 to-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[2rem] font-semibold text-carbon tracking-tight">Active Protocols</h1>
            <Button onClick={() => setShowAssessment(true)} size="sm" className="gap-2 rounded-full">
              <Plus className="w-4 h-4" />
              <span>New</span>
            </Button>
          </div>
          <p className="text-sm text-ash">Track daily stacks and protocol progress</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16">
        <div className="space-y-12 animate-fade-in">
          {protocols.length > 0 ? (
            protocols.map((protocol) => (
              <div key={protocol.id} className="group transition-all duration-700">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-carbon to-slate flex items-center justify-center transition-transform group-hover:scale-110">
                      <Target className="w-6 h-6 text-ivory" />
                    </div>
                    <div>
                      <h3 className="text-[1.25rem] font-semibold text-carbon mb-1">{protocol.protocol_name}</h3>
                      <p className="text-sm text-ash">
                        Started {new Date(protocol.started_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {protocol.status}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(`/nova/protocols/${protocol.id}`)}
                    className="gap-2 hover:bg-pearl/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-10">
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-ash font-medium tracking-wide uppercase text-[0.6875rem]">Progress</span>
                    <span className="font-semibold text-carbon text-[1.125rem]">{protocol.completion_percentage}%</span>
                  </div>
                  <Progress value={protocol.completion_percentage} className="h-1.5 bg-mist/40" />
                </div>

                <div className="pt-10 border-t border-mist/20">
                  <h4 className="text-[0.6875rem] font-semibold text-carbon uppercase tracking-[0.15em] mb-6">Today's Stack</h4>
                  <div className="space-y-3">
                    {protocol.products.map((product: any, index: number) => (
                      <div key={index} className="flex items-center justify-between py-4 transition-all hover:translate-x-2">
                        <span className="text-[0.9375rem] font-medium text-carbon">{product.product_name}</span>
                        <span className="text-[0.875rem] text-ash">{product.dose} – {product.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-mist/30 to-transparent mt-12" />
              </div>
            ))
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pearl/60 to-mist/40 mx-auto mb-8 flex items-center justify-center">
                <Target className="w-10 h-10 text-ash/70" />
              </div>
              <p className="text-[1.125rem] text-ash mb-8 max-w-md mx-auto leading-relaxed">
                No active protocols yet. Create your first personalised protocol to start optimising your performance.
              </p>
              <Button onClick={() => setShowAssessment(true)} size="lg" className="gap-2 rounded-full">
                <Plus className="w-4 h-4" />
                <span>Create Your First Protocol</span>
              </Button>
            </div>
          )}

          {protocols.length > 0 && (
            <div className="text-center py-16 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
              <h3 className="text-[1.25rem] font-semibold text-carbon mb-4">Ready to optimise something new?</h3>
              <p className="text-[0.9375rem] text-ash mb-8 leading-relaxed max-w-xl mx-auto">
                Take another assessment to create a specialised protocol for different performance goals.
              </p>
              <Button variant="outline" onClick={() => setShowAssessment(true)} className="gap-2 rounded-full">
                <Plus className="w-4 h-4" />
                <span>Create Protocol</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <ProtocolAssessment 
        open={showAssessment} 
        onOpenChange={setShowAssessment}
        onComplete={loadProtocols}
      />
    </div>
  );
}
