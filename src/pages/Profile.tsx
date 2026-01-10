import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import { z } from "zod";
import { Settings, User as UserIcon } from "lucide-react";
import { SEO } from "@/components/SEO";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  
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
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  if (!user) return null;

  return (
    <>
      <SEO title="Profile | NeuroState" description="Manage your account settings." />
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

            <div className="space-y-6">
              {/* Account Info */}
              <div className="p-6 bg-card rounded-3xl border border-foreground/5">
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
              <div className="p-6 bg-card rounded-3xl border border-foreground/5">
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
              <div className="p-6 bg-card rounded-3xl border border-foreground/5">
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}