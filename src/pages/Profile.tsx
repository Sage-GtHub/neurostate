import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import { z } from "zod";
import { Package, Settings, User as UserIcon, ExternalLink, Truck } from "lucide-react";
import { getTrackingUrl } from "@/lib/orders";

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
  
  // Email update
  const [newEmail, setNewEmail] = useState("");
  
  // Password update
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        } else {
          // Fetch orders when user is authenticated
          setTimeout(() => {
            fetchOrders(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
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
      
      // Fetch orders with their items
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          total_amount,
          currency,
          shopify_checkout_url,
          created_at,
          tracking_number,
          carrier,
          shipped_at,
          order_items (
            id,
            product_title,
            product_handle,
            variant_title,
            quantity,
            price,
            image_url
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      
      setOrders(ordersData || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error("Failed to load orders", {
        description: error.message
      });
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = emailSchema.parse(newEmail);
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        email: validated
      });

      if (error) {
        toast.error("Failed to update email", { description: error.message });
      } else {
        toast.success("Email update sent", {
          description: "Check your new email to confirm the change."
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation error", { description: error.errors[0].message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure both passwords are the same."
      });
      return;
    }

    try {
      passwordSchema.parse(newPassword);
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        toast.error("Failed to update password", { description: error.message });
      } else {
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation error", { description: error.errors[0].message });
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="account" className="gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" />
                Order History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your current account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Email Address</Label>
                    <p className="text-lg font-medium">{user.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account Created</Label>
                    <p className="text-lg font-medium">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Update Email */}
              <Card>
                <CardHeader>
                  <CardTitle>Update Email Address</CardTitle>
                  <CardDescription>
                    Change your email address. You'll need to verify your new email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-email">New Email Address</Label>
                      <Input
                        id="new-email"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="your@newemail.com"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="rounded-full">
                      {loading ? "Updating..." : "Update Email"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Update Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Update Password</CardTitle>
                  <CardDescription>
                    Change your password. Make sure it's at least 6 characters long.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="rounded-full">
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              {loadingOrders ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <p className="text-muted-foreground">Loading orders...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : orders.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your past orders and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg mb-2">
                        No orders yet
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        Your order history will appear here once you make your first purchase.
                      </p>
                      <Button className="rounded-full" onClick={() => navigate("/")}>
                        Start Shopping
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Order History</h2>
                      <p className="text-muted-foreground">
                        {orders.length} order{orders.length !== 1 ? 's' : ''} total
                      </p>
                    </div>
                  </div>

                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              Order #{order.order_number}
                            </CardTitle>
                            <CardDescription>
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="w-16 h-16 bg-secondary/20 rounded-lg overflow-hidden flex-shrink-0">
                                {item.image_url && (
                                  <img
                                    src={item.image_url}
                                    alt={item.product_title}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{item.product_title}</p>
                                {item.variant_title && (
                                  <p className="text-sm text-muted-foreground">
                                    {item.variant_title}
                                  </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × {order.currency} {parseFloat(item.price.toString()).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        {/* Tracking Information */}
                        {order.tracking_number && order.carrier && (
                          <>
                            <div className="p-4 bg-secondary/20 rounded-lg border">
                              <div className="flex items-start gap-3">
                                <Truck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium mb-2">Shipment Tracking</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                                    <div>
                                      <span className="text-muted-foreground">Carrier: </span>
                                      <span className="font-medium">{order.carrier}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Tracking: </span>
                                      <span className="font-medium">{order.tracking_number}</span>
                                    </div>
                                    {order.shipped_at && (
                                      <div>
                                        <span className="text-muted-foreground">Shipped: </span>
                                        <span className="font-medium">
                                          {new Date(order.shipped_at).toLocaleDateString()}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full sm:w-auto"
                                    onClick={() => window.open(getTrackingUrl(order.carrier!, order.tracking_number!), '_blank')}
                                  >
                                    Track Shipment <ExternalLink className="w-3 h-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Separator />
                          </>
                        )}

                        {/* Order Total */}
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="text-xl font-bold">
                            {order.currency} {parseFloat(order.total_amount.toString()).toFixed(2)}
                          </span>
                        </div>

                        {/* Actions */}
                        {order.shopify_checkout_url && (
                          <Button
                            variant="outline"
                            className="w-full rounded-full"
                            onClick={() => window.open(order.shopify_checkout_url!, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View in Shopify
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
