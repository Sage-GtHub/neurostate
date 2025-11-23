import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, CreditCard, Settings, Award, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";

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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pointsBalance, setPointsBalance] = useState(0);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    
    try {
      // Fetch orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (ordersData) setOrders(ordersData);

      // Fetch subscriptions
      const { data: subsData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (subsData) setSubscriptions(subsData);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) setProfile(profileData);

      // Fetch loyalty points
      const { data: pointsData } = await supabase
        .rpc("get_user_points_balance", { p_user_id: user.id });

      if (pointsData !== null) setPointsBalance(pointsData);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePauseSubscription = async (subscriptionId: string) => {
    const { error } = await supabase
      .from("subscriptions")
      .update({ status: "paused" })
      .eq("id", subscriptionId);

    if (error) {
      toast.error("Failed to pause subscription");
    } else {
      toast.success("Subscription paused");
      fetchDashboardData();
    }
  };

  const handleResumeSubscription = async (subscriptionId: string) => {
    const { error } = await supabase
      .from("subscriptions")
      .update({ status: "active" })
      .eq("id", subscriptionId);

    if (error) {
      toast.error("Failed to resume subscription");
    } else {
      toast.success("Subscription resumed");
      fetchDashboardData();
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-ash">Loading your dashboard...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <div className="mb-8">
            <h1 className="text-h1 text-carbon mb-2">My Account</h1>
            <p className="text-body text-ash">Manage your orders, subscriptions, and account settings</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-caption">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-ash" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 text-carbon">{orders.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-caption">Active Subscriptions</CardTitle>
                <Calendar className="h-4 w-4 text-ash" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 text-carbon">
                  {subscriptions.filter(s => s.status === "active").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-caption">Rewards Points</CardTitle>
                <Award className="h-4 w-4 text-ash" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 text-carbon">{pointsBalance}</div>
                <Button 
                  variant="link" 
                  className="px-0 h-auto text-caption"
                  onClick={() => navigate("/rewards")}
                >
                  Redeem points
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="bg-pearl">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-ash mx-auto mb-4" />
                      <p className="text-body text-ash mb-4">No orders yet</p>
                      <Button onClick={() => navigate("/#products")}>Start Shopping</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div 
                          key={order.id}
                          className="flex items-center justify-between p-4 border border-mist rounded-lg hover:border-stone transition-colors"
                        >
                          <div className="space-y-1">
                            <p className="text-body-large text-carbon">
                              Order #{order.order_number}
                            </p>
                            <p className="text-caption text-ash">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                            {order.tracking_number && (
                              <p className="text-caption text-ash">
                                Tracking: {order.tracking_number}
                              </p>
                            )}
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-body-large text-carbon">
                              {order.currency} {order.total_amount.toFixed(2)}
                            </p>
                            <Badge variant={
                              order.status === "delivered" ? "default" :
                              order.status === "shipped" ? "secondary" :
                              "outline"
                            }>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions">
              <Card>
                <CardHeader>
                  <CardTitle>My Subscriptions</CardTitle>
                  <CardDescription>Manage your active subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  {subscriptions.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-ash mx-auto mb-4" />
                      <p className="text-body text-ash mb-4">No active subscriptions</p>
                      <Button onClick={() => navigate("/#products")}>Browse Supplements</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {subscriptions.map((sub) => (
                        <div 
                          key={sub.id}
                          className="p-4 border border-mist rounded-lg space-y-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <p className="text-body-large text-carbon">{sub.product_title}</p>
                              {sub.variant_title && (
                                <p className="text-caption text-ash">{sub.variant_title}</p>
                              )}
                              <p className="text-caption text-ash">
                                Delivers {sub.frequency} • Next: {new Date(sub.next_delivery_date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-body-large text-carbon">
                                {sub.currency} {sub.price.toFixed(2)}
                              </p>
                              <Badge variant={sub.status === "active" ? "default" : "secondary"}>
                                {sub.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex gap-2">
                            {sub.status === "active" ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handlePauseSubscription(sub.id)}
                              >
                                Pause Subscription
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleResumeSubscription(sub.id)}
                              >
                                Resume Subscription
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate("/subscriptions")}
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-caption text-carbon">Email</label>
                    <p className="text-body text-ash">{profile?.email || user.email}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-caption text-carbon">Full Name</label>
                    <p className="text-body text-ash">{profile?.full_name || "Not set"}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-caption text-carbon">Phone</label>
                    <p className="text-body text-ash">{profile?.phone || "Not set"}</p>
                  </div>

                  <Separator />

                  <Button onClick={() => navigate("/profile")} className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
