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
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
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
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <div 
          ref={hero.ref}
          className={`relative container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-light text-foreground">My Account</h1>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Package, label: "Orders", value: orders.length },
              { icon: Calendar, label: "Subscriptions", value: subscriptions.filter(s => s.status === "active").length },
              { icon: Award, label: "Points", value: pointsBalance, action: () => navigate("/rewards") },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-6 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors cursor-pointer group"
                onClick={stat.action}
              >
                <stat.icon className="w-4 h-4 text-accent mb-4" />
                <p className="text-3xl font-light text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="bg-foreground/[0.02] rounded-full p-1">
              <TabsTrigger value="orders" className="rounded-full text-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Orders</TabsTrigger>
              <TabsTrigger value="subscriptions" className="rounded-full text-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Subscriptions</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-full text-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="rounded-3xl bg-foreground/[0.02] p-6 sm:p-8">
                <h2 className="text-sm font-medium text-foreground mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-10 w-10 text-foreground/20 mx-auto mb-4" />
                    <p className="text-xs text-foreground/40 mb-4">No orders yet</p>
                    <Button size="sm" className="rounded-full h-9 px-5 text-xs bg-foreground text-background" onClick={() => navigate("/shop")}>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-foreground">#{order.order_number}</p>
                          <p className="text-[10px] text-foreground/40">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-foreground">{order.currency} {order.total_amount.toFixed(2)}</p>
                          <Badge variant="outline" className="text-[10px] mt-1 rounded-full">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="subscriptions">
              <div className="rounded-3xl bg-foreground/[0.02] p-6 sm:p-8">
                <h2 className="text-sm font-medium text-foreground mb-6">Subscriptions</h2>
                {subscriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-10 w-10 text-foreground/20 mx-auto mb-4" />
                    <p className="text-xs text-foreground/40 mb-4">No active subscriptions</p>
                    <Button size="sm" className="rounded-full h-9 px-5 text-xs bg-foreground text-background" onClick={() => navigate("/shop")}>Browse Supplements</Button>
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
                          <Badge variant={sub.status === "active" ? "default" : "secondary"} className="text-[10px] rounded-full">{sub.status}</Badge>
                        </div>
                        <div className="flex gap-2">
                          {sub.status === "active" ? (
                            <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-[10px]" onClick={() => handlePauseSubscription(sub.id)}>Pause</Button>
                          ) : (
                            <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-[10px]" onClick={() => handleResumeSubscription(sub.id)}>Resume</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <div className="rounded-3xl bg-foreground/[0.02] p-6 sm:p-8">
                <h2 className="text-sm font-medium text-foreground mb-6">Profile</h2>
                <div className="space-y-4">
                  <div><p className="text-[10px] text-foreground/40 mb-1">Email</p><p className="text-xs text-foreground">{profile?.email || user.email}</p></div>
                  <div><p className="text-[10px] text-foreground/40 mb-1">Name</p><p className="text-xs text-foreground">{profile?.full_name || "Not set"}</p></div>
                  <div><p className="text-[10px] text-foreground/40 mb-1">Phone</p><p className="text-xs text-foreground">{profile?.phone || "Not set"}</p></div>
                </div>
                <Button size="sm" className="rounded-full h-9 px-5 text-xs bg-foreground text-background mt-6" onClick={() => navigate("/profile")}>
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
