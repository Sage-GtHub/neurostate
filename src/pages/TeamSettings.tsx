import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Globe, 
  CreditCard, 
  ArrowLeft,
  Loader2,
  Check,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useOrganisation } from '@/hooks/useOrganisation';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TeamSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { organisation, isOwner, isAdmin, updateOrganisation, loading } = useOrganisation();

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [pricePerSeat, setPricePerSeat] = useState('');
  const [seatLimit, setSeatLimit] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (organisation) {
      setName(organisation.name);
      setDomain(organisation.domain || '');
      setBillingEmail(organisation.billing_email || '');
      setPricePerSeat(organisation.price_per_seat?.toString() || '');
      setSeatLimit(organisation.seat_limit?.toString() || '');
      setBillingCycle(organisation.billing_cycle);
    }
  }, [organisation]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/team');
    }
  }, [loading, isAdmin, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateOrganisation({
        name,
        domain: domain || null,
        billing_email: billingEmail || null,
        price_per_seat: pricePerSeat ? parseFloat(pricePerSeat) : 0,
        seat_limit: seatLimit ? parseInt(seatLimit) : null,
        billing_cycle: billingCycle
      });
    } catch (error: any) {
      toast({
        title: 'Error saving settings',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !organisation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate('/team')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Team
          </Button>

          <div>
            <h1 className="text-2xl font-bold">Organisation Settings</h1>
            <p className="text-muted-foreground">
              Manage your organisation's settings and billing
            </p>
          </div>

          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                General
              </CardTitle>
              <CardDescription>
                Basic organisation information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organisation Name</Label>
                <Input
                  id="org-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-slug">Organisation URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">neurostate.co.uk/org/</span>
                  <Input
                    id="org-slug"
                    value={organisation.slug}
                    disabled
                    className="max-w-[200px]"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This cannot be changed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Domain Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Domain Verification
              </CardTitle>
              <CardDescription>
                Allow users with matching email domains to auto-join
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Email Domain</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">@</span>
                  <Input
                    id="domain"
                    placeholder="company.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Users with this email domain can automatically join your organisation
                </p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">Domain Verified</p>
                  <p className="text-sm text-muted-foreground">
                    {organisation.domain_verified 
                      ? 'Your domain has been verified'
                      : 'Domain verification pending'}
                  </p>
                </div>
                {organisation.domain_verified ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <Check className="h-5 w-5" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-500">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Pending</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Billing Settings */}
          {isOwner && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price-per-seat">Price per Seat (£)</Label>
                    <Input
                      id="price-per-seat"
                      type="number"
                      value={pricePerSeat}
                      onChange={(e) => setPricePerSeat(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-cycle">Billing Cycle</Label>
                    <Select value={billingCycle} onValueChange={setBillingCycle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seat-limit">Seat Limit</Label>
                  <Input
                    id="seat-limit"
                    type="number"
                    placeholder="Unlimited"
                    value={seatLimit}
                    onChange={(e) => setSeatLimit(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for unlimited seats
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Usage</p>
                      <p className="text-sm text-muted-foreground">
                        {organisation.seats_used} seats used
                        {organisation.seat_limit && ` of ${organisation.seat_limit}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        £{(organisation.seats_used * Number(organisation.price_per_seat)).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        /{organisation.billing_cycle === 'monthly' ? 'month' : 'year'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate('/team')}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
