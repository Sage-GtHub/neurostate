import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
  Plus,
  ArrowUpRight
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const Subscriptions = () => {
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
    return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handlePauseResume = (id: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id ? { ...sub, status: sub.status === 'active' ? 'paused' : 'active' } : sub
    ));
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const totalSavings = subscriptions.filter(sub => sub.status === 'active').reduce((sum, sub) => sum + (sub.price / 0.85 * 0.15), 0);

  return (
    <>
      <SEO title="Subscriptions | NeuroState" description="Manage your recurring supplement deliveries." />
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Floating orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-16">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Subscribe & Save</p>
            <h1 className="text-2xl font-medium text-foreground mb-3">My Subscriptions</h1>
            <p className="text-sm text-foreground/50 max-w-xl">
              Manage your recurring deliveries, save 15% on every order, and never run out of essentials.
            </p>
          </div>

          {/* Savings Summary */}
          {subscriptions.length > 0 && (
            <div className="p-8 mb-12 bg-white rounded-3xl border border-foreground/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-3">Monthly Savings</p>
                  <p className="text-4xl font-medium text-foreground">£{totalSavings.toFixed(2)}</p>
                  <p className="text-[11px] text-foreground/40 mt-2">
                    15% off {subscriptions.filter(s => s.status === 'active').length} active subscription{subscriptions.filter(s => s.status === 'active').length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Package className="h-6 w-6 text-foreground/30" />
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions List */}
          {subscriptions.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-foreground/5">
              <div className="w-14 h-14 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="h-6 w-6 text-foreground/30" />
              </div>
              <h2 className="text-lg font-medium text-foreground mb-2">No Active Subscriptions</h2>
              <p className="text-sm text-foreground/50 mb-8">Start saving 15% with Subscribe & Save.</p>
              <Link to="/shop">
                <Button className="h-11 px-8 rounded-full bg-foreground text-background text-xs">
                  <Plus className="h-3.5 w-3.5 mr-2" />Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 mb-16">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="p-6 bg-white rounded-3xl border border-foreground/5">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-foreground/5 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={subscription.productImage} alt={subscription.productName} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-sm font-medium text-foreground mb-1">{subscription.productName}</h3>
                          <p className="text-[10px] text-foreground/40">{subscription.variant}</p>
                        </div>
                        <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'} className="text-[9px] rounded-full">
                          {subscription.status === 'active' ? 'Active' : 'Paused'}
                        </Badge>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 mt-4 mb-5">
                        <div className="flex items-center gap-2 text-[10px]">
                          <Package className="h-3 w-3 text-foreground/30" />
                          <div>
                            <p className="text-foreground/40">Frequency</p>
                            <p className="text-foreground">{formatFrequency(subscription.frequency)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <Calendar className="h-3 w-3 text-foreground/30" />
                          <div>
                            <p className="text-foreground/40">Next Delivery</p>
                            <p className="text-foreground">{formatDate(subscription.nextDelivery)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <RefreshCw className="h-3 w-3 text-foreground/30" />
                          <div>
                            <p className="text-foreground/40">Price (15% off)</p>
                            <p className="font-medium text-foreground">£{subscription.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handlePauseResume(subscription.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] border border-foreground/10 text-foreground/60 hover:bg-foreground/5 transition-all"
                        >
                          {subscription.status === 'active' ? <><Pause className="h-3 w-3" />Pause</> : <><Play className="h-3 w-3" />Resume</>}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] border border-foreground/10 text-foreground/60 hover:bg-foreground/5 transition-all">
                          <Settings className="h-3 w-3" />Modify
                        </button>
                        <button 
                          onClick={() => handleCancel(subscription.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] border border-red-500/20 text-red-500/70 hover:bg-red-500/5 transition-all"
                        >
                          <Trash2 className="h-3 w-3" />Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: RefreshCw, title: "Flexible Delivery", desc: "Monthly, bi-monthly, or quarterly" },
              { icon: Pause, title: "Pause Anytime", desc: "Skip or pause whenever you need" },
              { icon: Settings, title: "Easy Management", desc: "Update or cancel with one click" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-4 w-4 text-foreground/40" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-[11px] text-foreground/50">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center p-12 bg-foreground/[0.02] rounded-3xl">
            <h2 className="text-lg font-medium text-foreground mb-3">Ready to Save More?</h2>
            <p className="text-sm text-foreground/50 mb-8">Add Subscribe & Save to any product and get 15% off.</p>
            <Link to="/shop">
              <Button className="h-11 px-8 rounded-full bg-foreground text-background text-xs">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Subscriptions;