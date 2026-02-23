import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Settings, Award, Loader2, ArrowUpRight, Brain, Users, Activity, Target } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        } else {
          setTimeout(() => fetchProfile(session.user.id), 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, phone')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const quickActions = [
    { 
      title: "Nova AI", 
      description: "Your personal cognitive assistant", 
      icon: Brain, 
      href: "/nova",
      color: "from-purple-500/10 to-indigo-500/10"
    },
    { 
      title: "Team Dashboard", 
      description: "Manage your organisation", 
      icon: Users, 
      href: "/team-dashboard",
      color: "from-blue-500/10 to-cyan-500/10"
    },
    { 
      title: "Insights", 
      description: "View your performance data", 
      icon: Activity, 
      href: "/nova/insights",
      color: "from-green-500/10 to-emerald-500/10"
    },
    { 
      title: "Goals", 
      description: "Track your objectives", 
      icon: Target, 
      href: "/nova/goals",
      color: "from-amber-500/10 to-orange-500/10"
    },
  ];

  return (
    <>
      <SEO 
        title="Performance Dashboard | Cognitive Analytics | NeuroState"
        description="Monitor your cognitive performance metrics, track protocol progress, manage wearable devices, and access AI-powered health insights in one dashboard."
        noindex={true}
      />
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Welcome */}
            <div 
              ref={hero.ref}
              className={`mb-12 transition-all duration-700 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Dashboard</p>
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}
              </h1>
              <p className="text-xs text-foreground/50">{user.email}</p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {quickActions.map((action, i) => (
                <Link 
                  key={action.title}
                  to={action.href}
                  className={`group p-6 rounded-3xl bg-gradient-to-br ${action.color} border border-foreground/5 hover:border-foreground/10 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                      <action.icon className="w-5 h-5 text-foreground/60" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1">{action.title}</h3>
                  <p className="text-xs text-foreground/50">{action.description}</p>
                </Link>
              ))}
            </div>

            {/* Account Settings Card */}
            <div className="rounded-3xl bg-card border border-foreground/5 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-foreground/30" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-foreground">Account</h2>
                  <p className="text-[11px] text-foreground/40">Manage your settings</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  to="/profile"
                  className="p-4 rounded-2xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors group"
                >
                  <p className="text-xs font-medium text-foreground mb-1">Profile Settings</p>
                  <p className="text-[10px] text-foreground/40">Update email and password</p>
                </Link>
                <Link 
                  to="/nova/settings"
                  className="p-4 rounded-2xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors group"
                >
                  <p className="text-xs font-medium text-foreground mb-1">Nova Settings</p>
                  <p className="text-[10px] text-foreground/40">Configure your AI assistant</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}