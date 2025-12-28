import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Check, Loader2, AlertCircle, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useOrganisation } from '@/hooks/useOrganisation';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function JoinOrganisation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { acceptInvite, joinByDomain, requestToJoin, organisation } = useOrganisation();
  
  const [loading, setLoading] = useState(false);
  const [inviteToken, setInviteToken] = useState('');
  const [inviteDetails, setInviteDetails] = useState<any>(null);
  const [inviteError, setInviteError] = useState('');
  const [requestOrgSlug, setRequestOrgSlug] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [domainOrg, setDomainOrg] = useState<any>(null);

  // Get token from URL if present
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setInviteToken(token);
      fetchInviteDetails(token);
    }
  }, [searchParams]);

  // Check for domain-based org
  useEffect(() => {
    const checkDomainOrg = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) return;
      setUser(user);

      const emailDomain = user.email.split('@')[1];
      const { data: org } = await supabase
        .from('organisations')
        .select('*')
        .eq('domain', emailDomain)
        .eq('domain_verified', true)
        .maybeSingle();

      if (org) {
        setDomainOrg(org);
      }
    };
    checkDomainOrg();
  }, []);

  // If user already has an org, redirect
  useEffect(() => {
    if (organisation) {
      navigate('/team');
    }
  }, [organisation, navigate]);

  const fetchInviteDetails = async (token: string) => {
    setLoading(true);
    setInviteError('');
    
    try {
      const { data: invite, error } = await supabase
        .from('organisation_invites')
        .select(`
          *,
          organisation:organisations(name, slug, logo_url)
        `)
        .eq('token', token)
        .eq('status', 'pending')
        .maybeSingle();

      if (error || !invite) {
        setInviteError('Invalid or expired invite link');
        return;
      }

      if (new Date(invite.expires_at) < new Date()) {
        setInviteError('This invite has expired');
        return;
      }

      setInviteDetails(invite);
    } catch (error) {
      setInviteError('Failed to load invite details');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvite = async () => {
    if (!inviteToken) return;
    setLoading(true);
    
    try {
      await acceptInvite(inviteToken);
      navigate('/team');
    } catch (error: any) {
      toast({
        title: 'Error joining organisation',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinByDomain = async () => {
    setLoading(true);
    try {
      await joinByDomain();
      navigate('/team');
    } catch (error: any) {
      toast({
        title: 'Error joining organisation',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestToJoin = async () => {
    if (!requestOrgSlug) return;
    setLoading(true);
    
    try {
      // Find org by slug
      const { data: org } = await supabase
        .from('organisations')
        .select('id')
        .eq('slug', requestOrgSlug)
        .maybeSingle();

      if (!org) {
        toast({
          title: 'Organisation not found',
          description: 'Please check the organisation name and try again',
          variant: 'destructive'
        });
        return;
      }

      await requestToJoin(org.id, requestMessage || undefined);
      toast({
        title: 'Request sent',
        description: 'Your request to join has been sent to the organisation admin'
      });
    } catch (error: any) {
      toast({
        title: 'Error sending request',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // If there's a token in URL, show the invite acceptance UI
  if (inviteToken && (inviteDetails || inviteError)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                {inviteError ? (
                  <>
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
                    <CardTitle>Invalid Invite</CardTitle>
                    <CardDescription>{inviteError}</CardDescription>
                  </>
                ) : inviteDetails ? (
                  <>
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <CardTitle>You're invited!</CardTitle>
                    <CardDescription>
                      You've been invited to join{' '}
                      <span className="font-semibold text-foreground">
                        {inviteDetails.organisation?.name}
                      </span>
                    </CardDescription>
                  </>
                ) : null}
              </CardHeader>
              <CardContent>
                {inviteError ? (
                  <Button className="w-full" onClick={() => navigate('/join')}>
                    Try Another Method
                  </Button>
                ) : inviteDetails ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted text-center">
                      <p className="text-sm text-muted-foreground">You'll join as</p>
                      <p className="font-semibold capitalize">{inviteDetails.role}</p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleAcceptInvite}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Accept Invite
                        </>
                      )}
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold mb-2">Join an Organisation</h1>
            <p className="text-muted-foreground">
              Get access to your company's team workspace
            </p>
          </div>

          {/* Domain-based auto-join option */}
          {domainOrg && (
            <Card className="mb-6 border-primary">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Auto-Join Available</CardTitle>
                </div>
                <CardDescription>
                  Your email domain matches an organisation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{domainOrg.name}</p>
                    <p className="text-sm text-muted-foreground">@{domainOrg.domain}</p>
                  </div>
                  <Button onClick={handleJoinByDomain} disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Join Now'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="invite" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="invite">Have an Invite</TabsTrigger>
              <TabsTrigger value="request">Request Access</TabsTrigger>
            </TabsList>

            <TabsContent value="invite">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Enter Invite Code
                  </CardTitle>
                  <CardDescription>
                    Paste the invite link or code you received
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invite-code">Invite Link or Code</Label>
                    <Input
                      id="invite-code"
                      placeholder="https://... or paste code"
                      value={inviteToken}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Extract token from URL if full URL pasted
                        if (value.includes('token=')) {
                          const url = new URL(value);
                          setInviteToken(url.searchParams.get('token') || '');
                        } else {
                          setInviteToken(value);
                        }
                      }}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => fetchInviteDetails(inviteToken)}
                    disabled={!inviteToken || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Invite'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="request">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Request to Join
                  </CardTitle>
                  <CardDescription>
                    Send a request to your organisation's admin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-slug">Organisation Name</Label>
                    <Input
                      id="org-slug"
                      placeholder="e.g., acme-corp"
                      value={requestOrgSlug}
                      onChange={(e) => setRequestOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Ask your HR admin for the organisation name
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Hi, I'd like to join the team..."
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleRequestToJoin}
                    disabled={!requestOrgSlug || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Request'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
