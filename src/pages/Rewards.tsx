import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Gift, TrendingUp, Clock, Check, ArrowUpRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

interface Reward {
  id: string;
  title: string;
  description: string;
  points_required: number;
  reward_type: string;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  terms: string | null;
}

interface PointsTransaction {
  id: string;
  points: number;
  transaction_type: string;
  description: string;
  created_at: string;
}

interface RewardRedemption {
  id: string;
  reward_id: string;
  points_spent: number;
  status: string;
  redemption_code: string | null;
  redeemed_at: string;
  rewards: Reward;
}

export default function Rewards() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Please log in to view rewards");
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: pointsBalance = 0 } = useQuery({
    queryKey: ['pointsBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { data, error } = await supabase.rpc('get_user_points_balance', { p_user_id: user.id });
      if (error) throw error;
      return data || 0;
    },
    enabled: !!user,
  });

  const { data: pointsHistory = [] } = useQuery({
    queryKey: ['pointsHistory', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from('loyalty_points').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20);
      if (error) throw error;
      return data as PointsTransaction[];
    },
    enabled: !!user,
  });

  const { data: rewards = [] } = useQuery({
    queryKey: ['rewards'],
    queryFn: async () => {
      const { data, error } = await supabase.from('rewards').select('*').eq('is_active', true).order('points_required', { ascending: true });
      if (error) throw error;
      return data as Reward[];
    },
  });

  const { data: redemptions = [] } = useQuery({
    queryKey: ['redemptions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from('reward_redemptions').select('*, rewards(*)').eq('user_id', user.id).order('redeemed_at', { ascending: false });
      if (error) throw error;
      return data as RewardRedemption[];
    },
    enabled: !!user,
  });

  const redeemMutation = useMutation({
    mutationFn: async (reward: Reward) => {
      if (!user) throw new Error('Not authenticated');
      if (pointsBalance < reward.points_required) throw new Error('Insufficient points');

      const { data, error } = await supabase.from('reward_redemptions').insert({
        user_id: user.id,
        reward_id: reward.id,
        points_spent: reward.points_required,
        redemption_code: `RWD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }).select().single();

      if (error) throw error;

      const { error: pointsError } = await supabase.from('loyalty_points').insert({
        user_id: user.id,
        points: -reward.points_required,
        transaction_type: 'redeemed',
        description: `Redeemed: ${reward.title}`,
      });

      if (pointsError) throw pointsError;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pointsBalance'] });
      queryClient.invalidateQueries({ queryKey: ['pointsHistory'] });
      queryClient.invalidateQueries({ queryKey: ['redemptions'] });
      toast.success("Reward redeemed!", { description: "Check your redemptions tab." });
    },
    onError: (error: Error) => {
      toast.error("Redemption failed", { description: error.message });
    },
  });

  if (!user) return null;

  return (
    <>
      <SEO title="Loyalty Rewards | Earn Points & Discounts | NeuroState" description="Earn points through purchases, protocol check-ins, and learning paths. Redeem for exclusive discounts, free products, and premium features." noindex={true} />
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Floating orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-16">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Loyalty</p>
            <h1 className="text-2xl font-medium text-foreground mb-3">Rewards Program</h1>
            <p className="text-sm text-foreground/50 max-w-xl">
              Earn points with every purchase and redeem for exclusive rewards and discounts.
            </p>
          </div>

          {/* Points Balance */}
          <div className="p-8 mb-12 bg-card rounded-3xl border border-foreground/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-3">Your Balance</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-medium text-foreground">{pointsBalance}</span>
                  <span className="text-sm text-foreground/40">points</span>
                </div>
                <p className="text-[11px] text-foreground/40 mt-3">Earn 1 point for every £1 spent</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center">
                <Award className="h-7 w-7 text-foreground/30" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="catalog" className="space-y-8">
            <TabsList className="bg-foreground/[0.03] rounded-full p-1 border border-foreground/5">
              <TabsTrigger value="catalog" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5">Rewards</TabsTrigger>
              <TabsTrigger value="redemptions" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5">My Redemptions</TabsTrigger>
              <TabsTrigger value="history" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5">History</TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((reward) => {
                  const canRedeem = pointsBalance >= reward.points_required;
                  return (
                    <div key={reward.id} className="p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 transition-all">
                      <div className="flex items-start justify-between mb-5">
                        <Badge variant="outline" className="text-[9px] rounded-full border-foreground/10">{reward.points_required} pts</Badge>
                        {reward.reward_type === 'discount' && reward.discount_percentage && (
                          <Badge className="text-[9px] rounded-full bg-green-500/10 text-green-600 border-green-500/20">{reward.discount_percentage}% OFF</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center">
                          <Gift className="h-4 w-4 text-foreground/60" />
                        </div>
                        <h3 className="text-sm font-medium text-foreground">{reward.title}</h3>
                      </div>
                      
                      <p className="text-[11px] text-foreground/50 leading-relaxed mb-5">{reward.description}</p>
                      
                      {reward.terms && (
                        <p className="text-[10px] text-foreground/30 mb-5 pl-3 border-l-2 border-foreground/10">{reward.terms}</p>
                      )}
                      
                      <Button
                        onClick={() => redeemMutation.mutate(reward)}
                        disabled={!canRedeem || redeemMutation.isPending}
                        className={`w-full h-10 rounded-full text-xs ${canRedeem ? 'bg-foreground text-background' : 'bg-foreground/5 text-foreground/40'}`}
                      >
                        {redeemMutation.isPending ? "Redeeming..." : canRedeem ? "Redeem Now" : `Need ${reward.points_required - pointsBalance} more`}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="redemptions" className="space-y-4">
              {redemptions.length === 0 ? (
                <div className="p-16 text-center bg-card rounded-3xl border border-foreground/5">
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-5">
                    <Gift className="h-5 w-5 text-foreground/30" />
                  </div>
                  <p className="text-xs text-foreground/40">No redemptions yet</p>
                </div>
              ) : (
                redemptions.map((redemption) => (
                  <div key={redemption.id} className="p-6 bg-card rounded-3xl border border-foreground/5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-medium text-foreground">{redemption.rewards.title}</h3>
                          <Badge variant={redemption.status === 'approved' ? 'default' : 'secondary'} className="text-[9px] rounded-full">
                            {redemption.status}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-foreground/50 mb-4">{redemption.rewards.description}</p>
                        {redemption.redemption_code && (
                          <div className="inline-block p-3 bg-foreground/[0.02] rounded-xl">
                            <p className="text-[9px] text-foreground/40 mb-1">Code</p>
                            <p className="font-mono text-sm font-medium text-foreground">{redemption.redemption_code}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-foreground/40">Spent</p>
                        <p className="text-lg font-medium text-foreground">-{redemption.points_spent}</p>
                        <p className="text-[10px] text-foreground/30 mt-1">{new Date(redemption.redeemed_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {pointsHistory.length === 0 ? (
                <div className="p-16 text-center bg-card rounded-3xl border border-foreground/5">
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-5">
                    <TrendingUp className="h-5 w-5 text-foreground/30" />
                  </div>
                  <p className="text-xs text-foreground/40">No history yet</p>
                </div>
              ) : (
                <div className="bg-card rounded-3xl border border-foreground/5 divide-y divide-foreground/5">
                  {pointsHistory.map((transaction) => (
                    <div key={transaction.id} className="p-5 flex items-center justify-between hover:bg-foreground/[0.02] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          transaction.transaction_type === 'earned' ? 'bg-green-500/10' :
                          transaction.transaction_type === 'bonus' ? 'bg-blue-500/10' : 'bg-red-500/10'
                        }`}>
                          {transaction.transaction_type === 'earned' ? <TrendingUp className="h-4 w-4 text-green-600" /> :
                           transaction.transaction_type === 'bonus' ? <Gift className="h-4 w-4 text-blue-600" /> :
                           <Check className="h-4 w-4 text-red-600" />}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{transaction.description}</p>
                          <p className="text-[10px] text-foreground/40 flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {new Date(transaction.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className={`text-sm font-medium ${transaction.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.points > 0 ? '+' : ''}{transaction.points}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* How It Works */}
          <div className="mt-20">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-8 text-center">How It Works</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Shop & Earn", desc: "Earn 1 point for every £1 you spend" },
                { step: "2", title: "Choose Reward", desc: "Browse catalog and select your reward" },
                { step: "3", title: "Redeem", desc: "Use your code at checkout" },
              ].map((item) => (
                <div key={item.step} className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-5">
                    <span className="text-lg font-medium text-foreground/60">{item.step}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-[11px] text-foreground/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}