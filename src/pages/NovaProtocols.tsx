import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
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
      
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[2rem] font-semibold text-carbon tracking-tight">Active Protocols</h1>
            <Button onClick={() => setShowAssessment(true)} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span>New Protocol</span>
            </Button>
          </div>
          <p className="text-sm text-ash">Track your daily stacks and protocol progress</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="space-y-6 animate-fade-in">
          {protocols.length > 0 ? (
            protocols.map((protocol) => (
              <Card key={protocol.id} className="border-mist/30 hover:border-mist transition-all hover:shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
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
                    <Progress value={protocol.completion_percentage} className="h-3" />
                  </div>

                  <div className="border-t border-mist/30 pt-6">
                    <h4 className="text-caption font-semibold text-carbon uppercase tracking-wider mb-4">TODAY'S STACK</h4>
                    <div className="space-y-3">
                      {protocol.products.map((product: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-pearl/30 hover:bg-pearl/50 transition-colors">
                          <span className="text-sm font-medium text-carbon">{product.product_name}</span>
                          <span className="text-sm text-ash">{product.dose} – {product.time}</span>
                        </div>
                      ))}
                    </div>
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

      <ProtocolAssessment 
        open={showAssessment} 
        onOpenChange={setShowAssessment}
        onComplete={loadProtocols}
      />
    </div>
  );
}
