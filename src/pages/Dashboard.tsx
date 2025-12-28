import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, CreditCard, Settings, Award, Calendar, Loader2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total_amount: number;
  currency: string;
  status: string;
  tracking_number: string | null;
}

interface Subscription {
  id: string;
  product_title: string;
  variant_title: string;
  frequency: string;
  next_delivery_date: string;
  status: string;
  price: number;
  currency: string;
}

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const hero = useScrollAnimation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pointsBalance, setPointsBalance] = useState(0);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const { data: ordersData } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
      if (ordersData) setOrders(ordersData);

      const { data: subsData } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (subsData) setSubscriptions(subsData);

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profileData) setProfile(profileData);

      const { data: pointsData } = await supabase.rpc("get_user_points_balance", { p_user_id: user.id });
      if (pointsData !== null) setPointsBalance(pointsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePauseSubscription = async (subscriptionId: string) => {
    const { error } = await supabase.from("subscriptions").update({ status: "paused" }).eq("id", subscriptionId);
    if (error) toast.error("Failed to pause subscription");
    else { toast.success("Subscription paused"); fetchDashboardData(); }
  };

  const handleResumeSubscription = async (subscriptionId: string) => {
    const { error } = await supabase.from("subscriptions").update({ status: "active" }).eq("id", subscriptionId);
    if (error) toast.error("Failed to resume subscription");
    else { toast.success("Subscription resumed"); fetchDashboardData(); }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <SEO title="Dashboard | NeuroState" description="Manage your orders, subscriptions, and account settings." />
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Floating orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div 
          ref={hero.ref}
          className={`relative px-6 md:px-12 lg:px-20 xl:px-32 py-16 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Dashboard</p>
            <h1 className="text-2xl font-medium text-foreground">My Account</h1>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              { icon: Package, label: "Orders", value: orders.length },
              { icon: Calendar, label: "Subscriptions", value: subscriptions.filter(s => s.status === "active").length },
              { icon: Award, label: "Points", value: pointsBalance, action: () => navigate("/rewards") },
            ].map((stat, i) => (
              <button 
                key={i} 
                onClick={stat.action}
                className="group p-6 rounded-3xl bg-white border border-foreground/5 hover:border-foreground/10 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300 text-left"
              >
                <stat.icon className="w-4 h-4 text-foreground/40 mb-5 group-hover:text-foreground/60 transition-colors" />
                <p className="text-3xl font-medium text-foreground mb-1">{stat.value}</p>
                <p className="text-[11px] text-foreground/40">{stat.label}</p>
              </button>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="space-y-8">
            <TabsList className="bg-foreground/[0.03] rounded-full p-1 border border-foreground/5">
              <TabsTrigger value="orders" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5">Orders</TabsTrigger>
              <TabsTrigger value="subscriptions" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5">Subscriptions</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="rounded-3xl bg-white border border-foreground/5 p-8">
                <h2 className="text-sm font-medium text-foreground mb-8">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-5">
                      <Package className="h-5 w-5 text-foreground/30" />
                    </div>
                    <p className="text-xs text-foreground/40 mb-6">No orders yet</p>
                    <Button size="sm" className="rounded-full h-10 px-6 text-xs bg-foreground text-background" onClick={() => navigate("/shop")}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-5 rounded-2xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-foreground">#{order.order_number}</p>
                          <p className="text-[10px] text-foreground/40">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-foreground">{order.currency} {order.total_amount.toFixed(2)}</p>
                          <Badge variant="outline" className="text-[9px] mt-1 rounded-full border-foreground/10">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="subscriptions">
              <div className="rounded-3xl bg-white border border-foreground/5 p-8">
                <h2 className="text-sm font-medium text-foreground mb-8">Subscriptions</h2>
                {subscriptions.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-5">
                      <Calendar className="h-5 w-5 text-foreground/30" />
                    </div>
                    <p className="text-xs text-foreground/40 mb-6">No active subscriptions</p>
                    <Button size="sm" className="rounded-full h-10 px-6 text-xs bg-foreground text-background" onClick={() => navigate("/shop")}>
                      Browse Supplements
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="p-5 rounded-2xl bg-foreground/[0.02]">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-xs font-medium text-foreground">{sub.product_title}</p>
                            <p className="text-[10px] text-foreground/40 mt-1">Next: {new Date(sub.next_delivery_date).toLocaleDateString()}</p>
                          </div>
                          <Badge variant={sub.status === "active" ? "default" : "secondary"} className="text-[9px] rounded-full">{sub.status}</Badge>
                        </div>
                        <div className="flex gap-2">
                          {sub.status === "active" ? (
                            <button className="px-4 py-2 rounded-full text-[10px] border border-foreground/10 text-foreground/60 hover:bg-foreground/5 transition-all" onClick={() => handlePauseSubscription(sub.id)}>Pause</button>
                          ) : (
                            <button className="px-4 py-2 rounded-full text-[10px] border border-foreground/10 text-foreground/60 hover:bg-foreground/5 transition-all" onClick={() => handleResumeSubscription(sub.id)}>Resume</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <div className="rounded-3xl bg-white border border-foreground/5 p-8">
                <h2 className="text-sm font-medium text-foreground mb-8">Profile</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] text-foreground/30 mb-1">Email</p>
                    <p className="text-xs text-foreground">{profile?.email || user.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/30 mb-1">Name</p>
                    <p className="text-xs text-foreground">{profile?.full_name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/30 mb-1">Phone</p>
                    <p className="text-xs text-foreground">{profile?.phone || "Not set"}</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-full h-10 px-6 text-xs bg-foreground text-background mt-8" onClick={() => navigate("/profile")}>
                  <Settings className="h-3 w-3 mr-2" />Edit Profile
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}