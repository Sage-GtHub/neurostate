import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { User } from "@supabase/supabase-js";
import { ArrowLeft, Sparkles } from "lucide-react";
import logoIcon from "@/assets/neurostate-icon.png";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Auth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/nova');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        supabase.functions.invoke('seed-demo-data').then(() => navigate('/nova'));
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = authSchema.parse({ email, password });
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: { emailRedirectTo: `${window.location.origin}/` }
      });
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Account already exists", { description: "Please login instead." });
        } else {
          toast.error("Sign up failed", { description: error.message });
        }
      } else {
        toast.success("Account created!", { description: "Check your email to confirm." });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation error", { description: error.errors[0].message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = authSchema.parse({ email, password });
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password,
      });
      if (error) {
        toast.error("Invalid credentials", { description: "Please check your email and password." });
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation error", { description: error.errors[0].message });
      }
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Organic background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] text-foreground/40 hover:text-foreground/60 transition-colors">
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
      </div>
      
      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-2xl bg-foreground/[0.03] flex items-center justify-center mx-auto mb-6">
              <img src={logoIcon} alt="Neurostate" className="h-6 w-6 opacity-70" />
            </div>
            <h1 className="text-2xl font-light text-foreground mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-xs text-foreground/50">
              {isLogin ? "Sign in to your account" : "Start your cognitive journey"}
            </p>
          </div>
          
          <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs text-foreground/60">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl bg-foreground/[0.02] border-foreground/10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs text-foreground/60">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl bg-foreground/[0.02] border-foreground/10 text-sm"
              />
              {!isLogin && (
                <p className="text-[10px] text-foreground/40">At least 6 characters</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 rounded-full text-xs bg-foreground text-background hover:bg-foreground/90" 
              disabled={loading}
            >
              {loading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
