import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, CheckCircle2, Clock, XCircle, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface OrderItem {
  id: string;
  product_title: string;
  product_handle: string | null;
  variant_title: string | null;
  quantity: number;
  price: number;
  image_url: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  currency: string;
  tracking_number: string | null;
  carrier: string | null;
  created_at: string;
  shipped_at: string | null;
  order_items?: OrderItem[];
}

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserOrders();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserOrders();
      } else {
        setUserOrders([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      toast.error("Please enter an order number");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('order_number', orderNumber.trim())
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSearchedOrder(data);
        toast.success("Order found!");
      } else {
        toast.error("Order not found", {
          description: "Please check your order number and try again.",
        });
        setSearchedOrder(null);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      toast.error("Failed to track order");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <div className="overflow-hidden border-b pb-8 mb-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Order #{order.order_number}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Placed on {formatDate(order.created_at)}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)} variant="outline">
            <span className="flex items-center gap-1.5">
              {getStatusIcon(order.status)}
              {order.status.toUpperCase()}
            </span>
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Order Timeline */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Order Status</h4>
          <div className="flex items-center gap-2 text-sm">
            <div className={`flex items-center gap-2 ${order.status === 'pending' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <CheckCircle2 className="h-4 w-4" />
              <span>Ordered</span>
            </div>
            <Separator className="flex-1" />
            <div className={`flex items-center gap-2 ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <CheckCircle2 className="h-4 w-4" />
              <span>Processing</span>
            </div>
            <Separator className="flex-1" />
            <div className={`flex items-center gap-2 ${order.status === 'shipped' || order.status === 'delivered' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <CheckCircle2 className="h-4 w-4" />
              <span>Shipped</span>
            </div>
            <Separator className="flex-1" />
            <div className={`flex items-center gap-2 ${order.status === 'delivered' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <CheckCircle2 className="h-4 w-4" />
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Tracking Information */}
        {order.tracking_number && (
          <div className="space-y-2 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Truck className="h-4 w-4 text-primary" />
              <span>Tracking Information</span>
            </div>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Carrier:</span>{" "}
                <span className="font-medium">{order.carrier || "Standard Delivery"}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Tracking Number:</span>{" "}
                <span className="font-mono font-medium">{order.tracking_number}</span>
              </p>
              {order.shipped_at && (
                <p>
                  <span className="text-muted-foreground">Shipped on:</span>{" "}
                  <span className="font-medium">{formatDate(order.shipped_at)}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Order Items */}
        {order.order_items && order.order_items.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Items in this order</h4>
            <div className="space-y-3">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.product_title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    {item.product_handle ? (
                      <Link
                        to={`/product/${item.product_handle}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {item.product_title}
                      </Link>
                    ) : (
                      <p className="font-medium text-sm">{item.product_title}</p>
                    )}
                    {item.variant_title && (
                      <p className="text-xs text-muted-foreground">{item.variant_title}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-sm">
                    £{(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Total */}
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold">
            £{Number(order.total_amount).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background mobile-nav-padding">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
          <div className="container mx-auto px-4 py-16 lg:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Track Your Order
              </h1>
              <p className="text-xl text-muted-foreground">
                Enter your order number to check the status of your delivery
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Guest Order Tracking */}
              {!user && (
                <div className="p-8 border-b">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                      <Search className="h-5 w-5" />
                      Track Your Order
                    </h2>
                  </div>
                  <form onSubmit={handleTrackOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Order Number</Label>
                      <Input
                        id="orderNumber"
                        placeholder="e.g., NS-2024-001"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        You can find your order number in your confirmation email
                      </p>
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Tracking..." : "Track Order"}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Have an account?{" "}
                      <Link to="/auth" className="text-primary hover:underline font-medium">
                        Sign in
                      </Link>{" "}
                      to view all your orders
                    </p>
                  </div>
                </div>
              )}

              {/* Searched Order Results */}
              {searchedOrder && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <OrderCard order={searchedOrder} />
                </div>
              )}

              {/* User's Orders (when logged in) */}
              {user && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Your Orders</h2>
                    <Link to="/profile">
                      <Button variant="outline">View Profile</Button>
                    </Link>
                  </div>

                  {userOrders.length === 0 ? (
                    <div className="py-12 text-center space-y-4 border-b">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <h3 className="font-semibold mb-2">No orders yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          When you place an order, it will appear here
                        </p>
                        <Link to="/">
                          <Button>Start Shopping</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default OrderTracking;
