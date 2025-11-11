import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Gift, TrendingUp, Clock, Check, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LiveChat } from "@/components/LiveChat";

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
  const [chatOpen, setChatOpen] = useState(false);

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
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch user's points balance
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

  // Fetch points history
  const { data: pointsHistory = [] } = useQuery({
    queryKey: ['pointsHistory', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as PointsTransaction[];
    },
    enabled: !!user,
  });

  // Fetch available rewards
  const { data: rewards = [] } = useQuery({
    queryKey: ['rewards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('is_active', true)
        .order('points_required', { ascending: true });
      if (error) throw error;
      return data as Reward[];
    },
  });

  // Fetch user's redemptions
  const { data: redemptions = [] } = useQuery({
    queryKey: ['redemptions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('reward_redemptions')
        .select('*, rewards(*)')
        .eq('user_id', user.id)
        .order('redeemed_at', { ascending: false });
      if (error) throw error;
      return data as RewardRedemption[];
    },
    enabled: !!user,
  });

  // Redeem reward mutation
  const redeemMutation = useMutation({
    mutationFn: async (reward: Reward) => {
      if (!user) throw new Error('Not authenticated');
      
      if (pointsBalance < reward.points_required) {
        throw new Error('Insufficient points');
      }

      // Create redemption
      const { data, error } = await supabase
        .from('reward_redemptions')
        .insert({
          user_id: user.id,
          reward_id: reward.id,
          points_spent: reward.points_required,
          redemption_code: `RWD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        })
        .select()
        .single();

      if (error) throw error;

      // Deduct points
      const { error: pointsError } = await supabase
        .from('loyalty_points')
        .insert({
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
      toast.success("Reward redeemed!", {
        description: "Check your redemptions tab for your code.",
      });
    },
    onError: (error: Error) => {
      toast.error("Redemption failed", {
        description: error.message,
      });
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rewards Program</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Earn points with every purchase and redeem them for exclusive rewards, discounts, and perks.
          </p>
        </div>

        {/* Points Balance Card */}
        <div className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-accent/5 border-l-4 border-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Your Points Balance</p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-accent">{pointsBalance}</span>
                <span className="text-xl text-muted-foreground">points</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Earn 1 point for every £1 spent
              </p>
            </div>
            <Award className="h-20 w-20 text-accent/30" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="catalog">Rewards Catalog</TabsTrigger>
            <TabsTrigger value="redemptions">My Redemptions</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
          </TabsList>

          {/* Rewards Catalog Tab */}
          <TabsContent value="catalog" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const canRedeem = pointsBalance >= reward.points_required;
                return (
                  <div key={reward.id} className="overflow-hidden border-b pb-6">
                    <div className="h-2 bg-gradient-to-r from-accent/20 to-accent/60 mb-6" />
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="text-accent">
                          {reward.points_required} points
                        </Badge>
                        {reward.reward_type === 'discount' && reward.discount_percentage && (
                          <Badge className="bg-green-500/10 text-green-700">
                            {reward.discount_percentage}% OFF
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <Gift className="h-6 w-6 text-accent" />
                        <h3 className="text-xl font-semibold">{reward.title}</h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 min-h-[3rem]">
                        {reward.description}
                      </p>
                      
                      {reward.terms && (
                        <p className="text-xs text-muted-foreground mb-4 italic border-l-2 border-accent/30 pl-3">
                          {reward.terms}
                        </p>
                      )}
                      
                      <Button
                        onClick={() => redeemMutation.mutate(reward)}
                        disabled={!canRedeem || redeemMutation.isPending}
                        className="w-full"
                        variant={canRedeem ? "default" : "outline"}
                      >
                        {redeemMutation.isPending ? "Redeeming..." : canRedeem ? "Redeem Now" : `Need ${reward.points_required - pointsBalance} more points`}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Redemptions Tab */}
          <TabsContent value="redemptions" className="space-y-4">
            {redemptions.length === 0 ? (
              <div className="p-12 text-center border-b">
                <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No redemptions yet. Start earning points to unlock rewards!</p>
              </div>
            ) : (
              redemptions.map((redemption) => (
                <div key={redemption.id} className="p-6 border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{redemption.rewards.title}</h3>
                        <Badge 
                          variant={redemption.status === 'approved' ? 'default' : 'secondary'}
                          className={redemption.status === 'approved' ? 'bg-green-500' : ''}
                        >
                          {redemption.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {redemption.rewards.description}
                      </p>
                      {redemption.redemption_code && (
                        <div className="bg-secondary/50 p-3 rounded-lg inline-block">
                          <p className="text-xs text-muted-foreground mb-1">Redemption Code:</p>
                          <p className="font-mono font-bold text-accent text-lg">
                            {redemption.redemption_code}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Points Spent</p>
                      <p className="text-2xl font-bold text-accent">-{redemption.points_spent}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(redemption.redeemed_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            {pointsHistory.length === 0 ? (
              <div className="p-12 text-center border-b">
                <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No points history yet. Make a purchase to start earning!</p>
              </div>
            ) : (
              <div className="divide-y border-b">
                {pointsHistory.map((transaction) => (
                  <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.transaction_type === 'earned' ? 'bg-green-500/10' :
                        transaction.transaction_type === 'bonus' ? 'bg-blue-500/10' :
                        'bg-red-500/10'
                      }`}>
                        {transaction.transaction_type === 'earned' ? <TrendingUp className="h-5 w-5 text-green-600" /> :
                         transaction.transaction_type === 'bonus' ? <Gift className="h-5 w-5 text-blue-600" /> :
                         <Check className="h-5 w-5 text-red-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${
                      transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.points > 0 ? '+' : ''}{transaction.points}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* How It Works Section */}
        <div className="mt-12 p-8 border-t">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="font-semibold mb-2">Shop & Earn</h3>
              <p className="text-sm text-muted-foreground">
                Earn 1 point for every £1 you spend on any product
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Your Reward</h3>
              <p className="text-sm text-muted-foreground">
                Browse our rewards catalog and select what you want
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="font-semibold mb-2">Redeem & Enjoy</h3>
              <p className="text-sm text-muted-foreground">
                Use your code at checkout to claim your reward
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}