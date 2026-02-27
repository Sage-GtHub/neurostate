import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { User } from "@supabase/supabase-js";
import { ArrowLeft, Building2, User as UserIcon, ChevronRight, Check } from "lucide-react";
import logoIcon from "@/assets/neurostate-icon.svg";
import { SEO } from "@/components/SEO";

const individualSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().optional(),
});

const companySchema = z.object({
  email: z.string().email("Invalid email address").refine(
    (email) => {
      const domain = email.split('@')[1];
      const freeEmails = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'mail.com', 'protonmail.com'];
      return !freeEmails.includes(domain);
    },
    "Please use your work email address"
  ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(1, "Full name is required"),
  companyName: z.string().min(1, "Company name is required"),
});

type AccountType = 'individual' | 'company' | null;

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [accountType, setAccountType] = useState<AccountType>(searchParams.get('type') === 'company' ? 'company' : null);
  const [step, setStep] = useState<'type' | 'details'>(searchParams.get('type') === 'company' ? 'details' : 'type');
  
  // Get redirect URL from query params, default to team-dashboard
  const redirectTo = searchParams.get('redirect') || '/nova/dashboard';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(redirectTo);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        supabase.functions.invoke('seed-demo-data').then(() => navigate(redirectTo));
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, redirectTo]);

  // Reset step when switching modes
  useEffect(() => {
    if (isLogin) {
      setStep('details');
      setAccountType(null);
    } else {
      setStep('type');
      setAccountType(null);
    }
  }, [isLogin]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const schema = accountType === 'company' ? companySchema : individualSchema;
      const data = accountType === 'company' 
        ? { email, password, fullName, companyName }
        : { email, password, fullName };
      
      schema.parse(data);
      setLoading(true);

      const { error, data: authData } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            account_type: accountType,
            company_name: accountType === 'company' ? companyName : null,
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Account already exists", { description: "Please login instead." });
        } else {
          toast.error("Sign up failed", { description: error.message });
        }
      } else {
        // If company account, create organisation
        if (accountType === 'company' && authData.user) {
          const domain = email.split('@')[1];
          try {
            await supabase.from('organisations').insert({
              name: companyName,
              slug: companyName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
              domain,
              billing_email: email,
            });
          } catch (orgError) {
            console.error('Failed to create organisation:', orgError);
          }
        }
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
      individualSchema.parse({ email, password });
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error("Invalid credentials", { description: "Please check your email and password." });
      } else {
        toast.success("Welcome back!");
        navigate(redirectTo);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation error", { description: error.errors[0].message });
      }
    } finally {
      setLoading(false);
    }
  };

  const selectAccountType = (type: AccountType) => {
    setAccountType(type);
    setStep('details');
  };

  if (user) return null;

  return (
    <>
    <SEO title="Sign In to NeuroState® | Cognitive Performance Platform" description="Log in or create your NeuroState account. Access Nova AI coaching, team dashboards, wearable integrations, and cognitive performance analytics." noindex={true} />
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
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-2xl bg-foreground/[0.03] flex items-center justify-center mx-auto mb-6">
              <img src={logoIcon} alt="NeuroState" className="h-6 w-6 opacity-70" />
            </div>
            <h1 className="text-2xl font-light text-foreground mb-2">
              {isLogin ? "Welcome back" : step === 'type' ? "Create your account" : accountType === 'company' ? "Company account" : "Personal account"}
            </h1>
            <p className="text-xs text-foreground/50">
              {isLogin ? "Sign in to your account" : step === 'type' ? "How will you be using NeuroState?" : "Complete your registration"}
            </p>
          </div>
          
          {/* Account Type Selection (Sign Up Only) */}
          {!isLogin && step === 'type' && (
            <div className="space-y-4">
              <button
                onClick={() => selectAccountType('company')}
                className="w-full p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-foreground">Company / Team</p>
                      <p className="text-xs text-muted-foreground mt-0.5">For organisations deploying NeuroState</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">Team dashboards</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">Member management</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">Enterprise features</span>
                </div>
              </button>

              <button
                onClick={() => selectAccountType('individual')}
                className="w-full p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-foreground/60" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-foreground">Individual</p>
                      <p className="text-xs text-muted-foreground mt-0.5">For personal cognitive tracking</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">Personal insights</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">Nova AI coaching</span>
                </div>
              </button>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsLogin(true)}
                  className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </div>
          )}

          {/* Details Form */}
          {(isLogin || step === 'details') && (
            <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-4">
              {!isLogin && (
                <>
                  <button
                    type="button"
                    onClick={() => setStep('type')}
                    className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to account type
                  </button>

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-xs text-foreground/60">Full name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={accountType === 'company'}
                      className="h-11 rounded-xl bg-foreground/[0.02] border-foreground/10 text-sm"
                    />
                  </div>

                  {accountType === 'company' && (
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-xs text-foreground/60">Company name</Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Acme Corporation"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        className="h-11 rounded-xl bg-foreground/[0.02] border-foreground/10 text-sm"
                      />
                    </div>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-foreground/60">
                  {accountType === 'company' ? 'Work email' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={accountType === 'company' ? 'you@company.com' : 'your@email.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl bg-foreground/[0.02] border-foreground/10 text-sm"
                />
                {!isLogin && accountType === 'company' && (
                  <p className="text-[10px] text-muted-foreground">Work email required for company accounts</p>
                )}
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
              
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!email) {
                        toast.error("Enter your email first", { description: "We'll send a password reset link." });
                        return;
                      }
                      const { error } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: `${window.location.origin}/auth`,
                      });
                      if (error) {
                        toast.error("Failed to send reset email", { description: error.message });
                      } else {
                        toast.success("Reset email sent", { description: "Check your inbox for a password reset link." });
                      }
                    }}
                    className="text-[10px] text-foreground/40 hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-11 rounded-full text-xs bg-foreground text-background hover:bg-foreground/90" 
                disabled={loading}
              >
                {loading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Create Account")}
              </Button>

              {!isLogin && accountType === 'company' && (
                <div className="pt-4 space-y-2">
                  <p className="text-[10px] text-muted-foreground text-center">What you'll get:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Team Dashboard', 'Member Management', 'Join Requests', 'Domain Verification'].map((feature) => (
                      <span key={feature} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Check className="w-3 h-3 text-primary" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </form>
          )}
          
          {(isLogin || step === 'details') && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}