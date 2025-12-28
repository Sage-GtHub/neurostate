import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import { z } from "zod";
import { Package, Settings, User as UserIcon, ExternalLink, Truck, Loader2, ArrowUpRight } from "lucide-react";
import { getTrackingUrl } from "@/lib/orders";
import { SEO } from "@/components/SEO";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  currency: string;
  shopify_checkout_url: string | null;
  created_at: string;
  tracking_number: string | null;
  carrier: string | null;
  shipped_at: string | null;
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  product_title: string;
  product_handle: string | null;
  variant_title: string | null;
  quantity: number;
  price: number;
  image_url: string | null;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        } else {
          setTimeout(() => {
            fetchOrders(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        setNewEmail(session.user.email || "");
        fetchOrders(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchOrders = async (userId: string) => {
    try {
      setLoadingOrders(true);
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id, order_number, status, total_amount, currency, shopify_checkout_url, created_at, tracking_number, carrier, shipped_at,
          order_items (id, product_title, product_handle, variant_title, quantity, price, image_url)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = emailSchema.parse(newEmail);
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ email: validated });
      if (error) toast.error("Failed to update email", { description: error.message });
      else toast.success("Email update sent", { description: "Check your new email to confirm." });
    } catch (error) {
      if (error instanceof z.ZodError) toast.error("Validation error", { description: error.errors[0].message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      passwordSchema.parse(newPassword);
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) toast.error("Failed to update password", { description: error.message });
      else { toast.success("Password updated"); setNewPassword(""); setConfirmPassword(""); }
    } catch (error) {
      if (error instanceof z.ZodError) toast.error("Validation error", { description: error.errors[0].message });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'shipped': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'processing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-foreground/5 text-foreground/60 border-foreground/10';
    }
  };

  if (!user) return null;

  return (
    <>
      <SEO title="Profile | NeuroState" description="Manage your account settings and view order history." />
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Floating orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Account</p>
              <h1 className="text-2xl font-medium text-foreground">My Profile</h1>
            </div>

            <Tabs defaultValue="account" className="space-y-8">
              <TabsList className="bg-foreground/[0.03] rounded-full p-1 border border-foreground/5">
                <TabsTrigger value="account" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5 gap-2">
                  <Settings className="h-3 w-3" />Account
                </TabsTrigger>
                <TabsTrigger value="orders" className="rounded-full text-[11px] data-[state=active]:bg-foreground data-[state=active]:text-background px-5 gap-2">
                  <Package className="h-3 w-3" />Orders
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6">
                {/* Account Info */}
                <div className="p-6 bg-white rounded-3xl border border-foreground/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-foreground/60" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Account Information</h3>
                      <p className="text-[11px] text-foreground/40">Your current details</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-foreground/40 mb-1">Email</p>
                      <p className="text-xs text-foreground">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-foreground/40 mb-1">Member Since</p>
                      <p className="text-xs text-foreground">{new Date(user.created_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* Update Email */}
                <div className="p-6 bg-white rounded-3xl border border-foreground/5">
                  <h3 className="text-sm font-medium text-foreground mb-1">Update Email</h3>
                  <p className="text-[11px] text-foreground/40 mb-6">You'll need to verify your new email.</p>
                  <form onSubmit={handleUpdateEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] text-foreground/50">New Email</Label>
                      <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="your@newemail.com" className="border-foreground/10 text-xs h-11 rounded-xl" required />
                    </div>
                    <Button type="submit" disabled={loading} className="h-10 px-6 rounded-full bg-foreground text-background text-xs">
                      {loading ? "Updating..." : "Update Email"}
                    </Button>
                  </form>
                </div>

                {/* Update Password */}
                <div className="p-6 bg-white rounded-3xl border border-foreground/5">
                  <h3 className="text-sm font-medium text-foreground mb-1">Update Password</h3>
                  <p className="text-[11px] text-foreground/40 mb-6">At least 6 characters required.</p>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] text-foreground/50">New Password</Label>
                      <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="border-foreground/10 text-xs h-11 rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] text-foreground/50">Confirm Password</Label>
                      <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="border-foreground/10 text-xs h-11 rounded-xl" required />
                    </div>
                    <Button type="submit" disabled={loading} className="h-10 px-6 rounded-full bg-foreground text-background text-xs">
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                {loadingOrders ? (
                  <div className="p-16 text-center bg-white rounded-3xl border border-foreground/5">
                    <Loader2 className="w-5 h-5 animate-spin text-foreground/40 mx-auto" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-16 text-center bg-white rounded-3xl border border-foreground/5">
                    <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-5">
                      <Package className="h-5 w-5 text-foreground/30" />
                    </div>
                    <p className="text-xs text-foreground/40 mb-6">No orders yet</p>
                    <Button className="rounded-full h-10 px-6 text-xs bg-foreground text-background" onClick={() => navigate("/shop")}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 bg-white rounded-3xl border border-foreground/5">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <p className="text-sm font-medium text-foreground">Order #{order.order_number}</p>
                            <p className="text-[10px] text-foreground/40 mt-1">{new Date(order.created_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                          <Badge className={`text-[9px] rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="w-14 h-14 bg-foreground/5 rounded-xl overflow-hidden flex-shrink-0">
                                {item.image_url && <img src={item.image_url} alt={item.product_title} className="w-full h-full object-cover" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground">{item.product_title}</p>
                                {item.variant_title && <p className="text-[10px] text-foreground/40">{item.variant_title}</p>}
                                <p className="text-[10px] text-foreground/40">Qty: {item.quantity} × {order.currency} {parseFloat(item.price.toString()).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {order.tracking_number && order.carrier && (
                          <div className="p-4 bg-foreground/[0.02] rounded-2xl mb-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Truck className="w-4 h-4 text-foreground/40" />
                              <p className="text-xs font-medium text-foreground">Tracking</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
                              <div><span className="text-foreground/40">Carrier: </span><span className="text-foreground">{order.carrier}</span></div>
                              <div><span className="text-foreground/40">Number: </span><span className="text-foreground">{order.tracking_number}</span></div>
                            </div>
                            <a href={getTrackingUrl(order.carrier, order.tracking_number)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-foreground/60 hover:text-foreground transition-colors">
                              Track Package <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-4 border-t border-foreground/5">
                          <p className="text-[10px] text-foreground/40">Total</p>
                          <p className="text-sm font-medium text-foreground">{order.currency} {order.total_amount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}