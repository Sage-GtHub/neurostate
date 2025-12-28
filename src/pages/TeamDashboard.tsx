import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Settings, 
  BarChart3, 
  Crown, 
  Shield, 
  User,
  Copy,
  Trash2,
  Check,
  X,
  Building2,
  Globe,
  CreditCard,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useOrganisation, OrgRole } from '@/hooks/useOrganisation';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const roleIcons = {
  owner: Crown,
  admin: Shield,
  member: User
};

const roleColors = {
  owner: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  admin: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  member: 'bg-muted text-muted-foreground'
};

export default function TeamDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    organisation,
    members,
    invites,
    joinRequests,
    analytics,
    userRole,
    isAdmin,
    isOwner,
    loading,
    createOrganisation,
    sendInvite,
    revokeInvite,
    updateMemberRole,
    removeMember,
    approveJoinRequest,
    rejectJoinRequest,
    updateOrganisation
  } = useOrganisation();

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OrgRole>('member');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDomain, setNewOrgDomain] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);
    };
    checkAuth();
  }, [navigate]);

  const handleSendInvite = async () => {
    if (!inviteEmail) return;
    setInviteLoading(true);
    try {
      await sendInvite(inviteEmail, inviteRole);
      setInviteEmail('');
      setInviteRole('member');
    } catch (error: any) {
      toast({
        title: 'Error sending invite',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setInviteLoading(false);
    }
  };

  const handleCreateOrg = async () => {
    if (!newOrgName) return;
    setCreateLoading(true);
    try {
      await createOrganisation(newOrgName, newOrgDomain || undefined);
      setShowCreateOrg(false);
      setNewOrgName('');
      setNewOrgDomain('');
    } catch (error: any) {
      toast({
        title: 'Error creating organisation',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const copyInviteLink = (token: string) => {
    const link = `${window.location.origin}/join?token=${token}`;
    navigator.clipboard.writeText(link);
    toast({ title: 'Invite link copied to clipboard' });
  };

  const getMemberAnalytics = (userId: string) => {
    return analytics.find(a => a.user_id === userId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  // No organisation - show create/join options
  if (!organisation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Building2 className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Team Management</h1>
            <p className="text-muted-foreground mb-8">
              Create an organisation to manage your team's access to the platform.
            </p>

            <Dialog open={showCreateOrg} onOpenChange={setShowCreateOrg}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Building2 className="h-5 w-5" />
                  Create Organisation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Organisation</DialogTitle>
                  <DialogDescription>
                    Set up your company's team workspace
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organisation Name</Label>
                    <Input
                      id="org-name"
                      placeholder="Acme Corporation"
                      value={newOrgName}
                      onChange={(e) => setNewOrgName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-domain">
                      Email Domain (optional)
                      <span className="text-muted-foreground text-sm ml-2">
                        For automatic team joining
                      </span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">@</span>
                      <Input
                        id="org-domain"
                        placeholder="acme.com"
                        value={newOrgDomain}
                        onChange={(e) => setNewOrgDomain(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateOrg(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateOrg} disabled={!newOrgName || createLoading}>
                    {createLoading ? 'Creating...' : 'Create Organisation'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </main>
        <Footer />
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
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{organisation.name}</h1>
              <p className="text-muted-foreground">
                {organisation.seats_used} {organisation.seats_used === 1 ? 'member' : 'members'}
                {organisation.seat_limit && ` / ${organisation.seat_limit} seats`}
              </p>
            </div>
            {isAdmin && (
              <Button variant="outline" onClick={() => navigate('/team/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{members.length}</p>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/10">
                    <Mail className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{invites.length}</p>
                    <p className="text-sm text-muted-foreground">Pending Invites</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{joinRequests.length}</p>
                    <p className="text-sm text-muted-foreground">Join Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <CreditCard className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      £{(organisation.seats_used * Number(organisation.price_per_seat)).toFixed(0)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      /{organisation.billing_cycle === 'monthly' ? 'mo' : 'yr'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="members" className="space-y-6">
            <TabsList>
              <TabsTrigger value="members" className="gap-2">
                <Users className="h-4 w-4" />
                Members
              </TabsTrigger>
              {isAdmin && (
                <>
                  <TabsTrigger value="invites" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Invites
                    {invites.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {invites.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Requests
                    {joinRequests.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {joinRequests.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            {/* Members Tab */}
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>
                        Manage your organisation's team members
                      </CardDescription>
                    </div>
                    {isAdmin && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <UserPlus className="h-4 w-4" />
                            Invite Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invite Team Member</DialogTitle>
                            <DialogDescription>
                              Send an invitation to join your organisation
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="invite-email">Email Address</Label>
                              <Input
                                id="invite-email"
                                type="email"
                                placeholder="colleague@company.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Role</Label>
                              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as OrgRole)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="member">Member</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleSendInvite} disabled={!inviteEmail || inviteLoading}>
                              {inviteLoading ? 'Sending...' : 'Send Invite'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members.map((member) => {
                      const RoleIcon = roleIcons[member.role];
                      const memberAnalytics = getMemberAnalytics(member.user_id);
                      
                      return (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={member.profile?.avatar_url || undefined} />
                              <AvatarFallback>
                                {member.profile?.full_name?.charAt(0) || member.profile?.email?.charAt(0) || '?'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {member.profile?.full_name || member.profile?.email || 'Unknown'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {member.profile?.email}
                              </p>
                            </div>
                            <Badge variant="outline" className={roleColors[member.role]}>
                              <RoleIcon className="h-3 w-3 mr-1" />
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            {memberAnalytics && (
                              <div className="text-right text-sm text-muted-foreground">
                                <p>{memberAnalytics.protocols_completed} protocols</p>
                                <p>{memberAnalytics.check_ins_count} check-ins</p>
                              </div>
                            )}
                            {isAdmin && member.role !== 'owner' && member.user_id !== user?.id && (
                              <div className="flex items-center gap-2">
                                <Select
                                  value={member.role}
                                  onValueChange={(v) => updateMemberRole(member.id, v as OrgRole)}
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => removeMember(member.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invites Tab */}
            <TabsContent value="invites">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Invites</CardTitle>
                  <CardDescription>
                    Invitations that haven't been accepted yet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {invites.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No pending invites
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {invites.map((invite) => (
                        <div
                          key={invite.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{invite.email}</p>
                              <p className="text-sm text-muted-foreground">
                                Expires {new Date(invite.expires_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline" className={roleColors[invite.role]}>
                              {invite.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyInviteLink(invite.token)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Link
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => revokeInvite(invite.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Join Requests Tab */}
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Join Requests</CardTitle>
                  <CardDescription>
                    People requesting to join your organisation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {joinRequests.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No pending join requests
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {joinRequests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarFallback>
                                {request.profile?.full_name?.charAt(0) || '?'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {request.profile?.full_name || request.profile?.email}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.profile?.email}
                              </p>
                              {request.message && (
                                <p className="text-sm mt-1 italic">"{request.message}"</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500 border-green-500/30 hover:bg-green-500/10"
                              onClick={() => approveJoinRequest(request.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => rejectJoinRequest(request.id)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Team Analytics</CardTitle>
                  <CardDescription>
                    Track your team's engagement and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members.map((member) => {
                      const memberAnalytics = getMemberAnalytics(member.user_id);
                      
                      return (
                        <div
                          key={member.id}
                          className="p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={member.profile?.avatar_url || undefined} />
                                <AvatarFallback>
                                  {member.profile?.full_name?.charAt(0) || '?'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.profile?.full_name || member.profile?.email}</p>
                                <p className="text-sm text-muted-foreground">
                                  Last active: {memberAnalytics?.last_active_at 
                                    ? new Date(memberAnalytics.last_active_at).toLocaleDateString()
                                    : 'Never'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold">{memberAnalytics?.protocols_completed || 0}</p>
                              <p className="text-xs text-muted-foreground">Protocols</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold">{memberAnalytics?.check_ins_count || 0}</p>
                              <p className="text-xs text-muted-foreground">Check-ins</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold">{memberAnalytics?.total_session_minutes || 0}</p>
                              <p className="text-xs text-muted-foreground">Minutes</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
