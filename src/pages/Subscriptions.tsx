import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Package, 
  Calendar, 
  Pause, 
  Play, 
  Settings,
  Trash2,
  Plus
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LiveChat } from "@/components/LiveChat";

const Subscriptions = () => {
  const [chatOpen, setChatOpen] = useState(false);
  
  // Mock data - in production this would come from your backend
  const [subscriptions, setSubscriptions] = useState([
    {
      id: "1",
      productName: "Omega-3 Elite",
      productImage: "/placeholder.svg",
      variant: "60 capsules",
      price: 33.99,
      frequency: "monthly",
      nextDelivery: "2025-12-15",
      status: "active",
    },
    {
      id: "2",
      productName: "NeuroFocus™ Cognitive",
      productImage: "/placeholder.svg",
      variant: "30 servings",
      price: 42.49,
      frequency: "bi-monthly",
      nextDelivery: "2026-01-20",
      status: "active",
    },
    {
      id: "3",
      productName: "Marine Collagen",
      productImage: "/placeholder.svg",
      variant: "500g",
      price: 38.24,
      frequency: "monthly",
      nextDelivery: "2025-12-10",
      status: "paused",
    },
  ]);

  const formatFrequency = (freq: string) => {
    switch(freq) {
      case "monthly": return "Every month";
      case "bi-monthly": return "Every 2 months";
      case "quarterly": return "Every 3 months";
      default: return freq;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handlePauseResume = (id: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id 
        ? { ...sub, status: sub.status === 'active' ? 'paused' : 'active' }
        : sub
    ));
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const totalSavings = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + (sub.price / 0.85 * 0.15), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold">My Subscriptions</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Manage your recurring deliveries, save 15% on every order, and never run out of your wellness essentials.
              </p>
            </div>
          </div>
        </section>

        {/* Savings Summary */}
        {subscriptions.length > 0 && (
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Monthly Savings</p>
                      <p className="text-3xl font-bold text-primary">£{totalSavings.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        You're saving 15% on {subscriptions.filter(s => s.status === 'active').length} active subscription{subscriptions.filter(s => s.status === 'active').length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <Package className="h-16 w-16 text-primary opacity-20" />
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Subscriptions List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {subscriptions.length === 0 ? (
                <Card className="p-12 text-center">
                  <RefreshCw className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h2 className="text-2xl font-bold mb-2">No Active Subscriptions</h2>
                  <p className="text-muted-foreground mb-6">
                    Start saving 15% with Subscribe & Save on your favorite products.
                  </p>
                  <Link to="/">
                    <Button size="lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Products
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <Card key={subscription.id} className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-secondary/20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={subscription.productImage}
                            alt={subscription.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{subscription.productName}</h3>
                              <p className="text-sm text-muted-foreground">{subscription.variant}</p>
                            </div>
                            <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                              {subscription.status === 'active' ? 'Active' : 'Paused'}
                            </Badge>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-muted-foreground">Frequency</p>
                                <p className="font-medium">{formatFrequency(subscription.frequency)}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-muted-foreground">Next Delivery</p>
                                <p className="font-medium">{formatDate(subscription.nextDelivery)}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <RefreshCw className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-muted-foreground">Price (15% off)</p>
                                <p className="font-bold text-primary">£{subscription.price.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePauseResume(subscription.id)}
                            >
                              {subscription.status === 'active' ? (
                                <>
                                  <Pause className="h-4 w-4 mr-2" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Resume
                                </>
                              )}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Modify
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleCancel(subscription.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="p-6 text-center">
                  <RefreshCw className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Flexible Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose monthly, bi-monthly, or quarterly deliveries
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <Pause className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Pause Anytime</h3>
                  <p className="text-sm text-muted-foreground">
                    Skip or pause deliveries whenever you need to
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <Settings className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Easy Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Update frequency, address, or cancel with one click
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Save More?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Add Subscribe & Save to any product and get 15% off every order.
              </p>
              <Link to="/">
                <Button size="lg">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Subscriptions;
