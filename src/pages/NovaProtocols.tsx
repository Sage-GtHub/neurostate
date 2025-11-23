import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { useToast } from "@/components/ui/use-toast";

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
      
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-h3 font-semibold text-carbon">My Active Protocols</h1>
            <Button onClick={() => setShowAssessment(true)}>Create New Protocol</Button>
          </div>
          <p className="text-body text-ash mt-2">Track your daily supplement stacks and protocol progress</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="space-y-6">
          {protocols.length > 0 ? (
            protocols.map((protocol) => (
              <Card key={protocol.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-body font-semibold text-carbon mb-2">{protocol.protocol_name}</h3>
                      <p className="text-sm text-ash">
                        Started {new Date(protocol.started_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • {protocol.status}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-ash">Completion</span>
                      <span className="font-medium text-carbon">{protocol.completion_percentage}%</span>
                    </div>
                    <Progress value={protocol.completion_percentage} className="h-2" />
                  </div>

                  <div className="border-t border-mist pt-4">
                    <h4 className="text-caption font-semibold text-carbon uppercase tracking-wider mb-3">TODAY'S STACK</h4>
                    <div className="space-y-2">
                      {protocol.products.map((product: any, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-carbon">{product.product_name}</span>
                          <span className="text-ash">{product.dose} – {product.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-body text-ash mb-4">No active protocols yet</p>
                <Button onClick={() => setShowAssessment(true)}>Create Your First Protocol</Button>
              </CardContent>
            </Card>
          )}

          {protocols.length > 0 && (
            <Card className="bg-pearl">
              <CardContent className="p-8 text-center">
                <h3 className="text-body font-semibold text-carbon mb-3">Ready to optimise something new?</h3>
                <p className="text-sm text-ash mb-6 leading-relaxed max-w-xl mx-auto">
                  Take another assessment to create a specialised protocol for different goals.
                </p>
                <Button variant="outline" onClick={() => setShowAssessment(true)}>Create Protocol</Button>
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