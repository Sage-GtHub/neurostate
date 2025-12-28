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
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
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
  owner: 'bg-amber-500/10 text-amber-600 border-amber-200',
  admin: 'bg-blue-500/10 text-blue-600 border-blue-200',
  member: 'bg-foreground/5 text-foreground/60 border-foreground/10'
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
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-foreground/20" />
      </div>
    );
  }

  // No organisation - show create/join options
  if (!organisation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-8">
              <Building2 className="h-5 w-5 text-foreground/40" />
            </div>
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-4">
              Team Management
            </h1>
            <p className="text-sm text-foreground/50 mb-10 max-w-md mx-auto leading-relaxed">
              Create an organisation to manage your team's access to the platform and track performance together.
            </p>

            <Dialog open={showCreateOrg} onOpenChange={setShowCreateOrg}>
              <DialogTrigger asChild>
                <Button 
                  className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full transition-all duration-300"
                >
                  <Plus className="h-3.5 w-3.5 mr-2" />
                  Create Organisation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium">Create Organisation</DialogTitle>
                  <DialogDescription className="text-sm text-foreground/50">
                    Set up your company's team workspace
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-5 py-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name" className="text-xs font-medium text-foreground/70">
                      Organisation Name
                    </Label>
                    <Input
                      id="org-name"
                      placeholder="Acme Corporation"
                      value={newOrgName}
                      onChange={(e) => setNewOrgName(e.target.value)}
                      className="h-11 bg-foreground/[0.03] border-foreground/10 text-sm rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-domain" className="text-xs font-medium text-foreground/70">
                      Email Domain
                      <span className="text-foreground/40 ml-2 font-normal">Optional</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/40 text-sm">@</span>
                      <Input
                        id="org-domain"
                        placeholder="acme.com"
                        value={newOrgDomain}
                        onChange={(e) => setNewOrgDomain(e.target.value)}
                        className="h-11 bg-foreground/[0.03] border-foreground/10 text-sm rounded-lg"
                      />
                    </div>
                    <p className="text-[11px] text-foreground/40">
                      Team members with this email domain can request to join automatically.
                    </p>
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowCreateOrg(false)}
                    className="h-10 px-4 text-xs rounded-full"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateOrg} 
                    disabled={!newOrgName || createLoading}
                    className="h-10 px-5 text-xs bg-foreground text-background hover:bg-foreground/90 rounded-full"
                  >
                    {createLoading ? 'Creating...' : 'Create'}
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
      <main className="px-6 md:px-12 lg:px-20 xl:px-32 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-foreground/5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Organisation</p>
                <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                  {organisation.name}
                </h1>
                <p className="text-sm text-foreground/50 mt-2">
                  {organisation.seats_used} {organisation.seats_used === 1 ? 'member' : 'members'}
                  {organisation.seat_limit && ` of ${organisation.seat_limit} seats`}
                </p>
              </div>
              {isAdmin && (
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/team/settings')}
                  className="h-10 px-4 text-xs text-foreground/60 hover:text-foreground rounded-full border border-foreground/10 hover:border-foreground/20"
                >
                  <Settings className="h-3.5 w-3.5 mr-2" />
                  Settings
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                  <Users className="h-3.5 w-3.5 text-foreground/40" />
                </div>
                <p className="text-xl font-medium text-foreground">{members.length}</p>
                <p className="text-[11px] text-foreground/40 mt-1">Team Members</p>
              </div>
              <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                  <Mail className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <p className="text-xl font-medium text-foreground">{invites.length}</p>
                <p className="text-[11px] text-foreground/40 mt-1">Pending Invites</p>
              </div>
              <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <UserPlus className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <p className="text-xl font-medium text-foreground">{joinRequests.length}</p>
                <p className="text-[11px] text-foreground/40 mt-1">Join Requests</p>
              </div>
              <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-3.5 w-3.5 text-green-600" />
                </div>
                <p className="text-xl font-medium text-foreground">
                  {analytics.reduce((acc, a) => acc + (a.protocols_completed || 0), 0)}
                </p>
                <p className="text-[11px] text-foreground/40 mt-1">Protocols Completed</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="members" className="space-y-8">
              <TabsList className="bg-transparent border-b border-foreground/5 rounded-none p-0 h-auto w-full justify-start gap-6">
                <TabsTrigger 
                  value="members" 
                  className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground px-0 pb-3 text-xs font-normal text-foreground/50 data-[state=active]:text-foreground"
                >
                  Members
                </TabsTrigger>
                {isAdmin && (
                  <>
                    <TabsTrigger 
                      value="invites"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground px-0 pb-3 text-xs font-normal text-foreground/50 data-[state=active]:text-foreground"
                    >
                      Invites
                      {invites.length > 0 && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                          {invites.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="requests"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground px-0 pb-3 text-xs font-normal text-foreground/50 data-[state=active]:text-foreground"
                    >
                      Requests
                      {joinRequests.length > 0 && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
                          {joinRequests.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground px-0 pb-3 text-xs font-normal text-foreground/50 data-[state=active]:text-foreground"
                    >
                      Analytics
                    </TabsTrigger>
                  </>
                )}
              </TabsList>

              {/* Members Tab */}
              <TabsContent value="members" className="mt-0">
                <div className="space-y-6">
                  {isAdmin && (
                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="h-9 px-4 text-xs bg-foreground text-background hover:bg-foreground/90 rounded-full">
                            <UserPlus className="h-3.5 w-3.5 mr-2" />
                            Invite Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-background border-border/50">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-medium">Invite Team Member</DialogTitle>
                            <DialogDescription className="text-sm text-foreground/50">
                              Send an invitation to join your organisation
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-5 py-6">
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-foreground/70">Email Address</Label>
                              <Input
                                type="email"
                                placeholder="colleague@company.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                className="h-11 bg-foreground/[0.03] border-foreground/10 text-sm rounded-lg"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-foreground/70">Role</Label>
                              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as OrgRole)}>
                                <SelectTrigger className="h-11 bg-foreground/[0.03] border-foreground/10 text-sm rounded-lg">
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
                            <Button 
                              onClick={handleSendInvite} 
                              disabled={!inviteEmail || inviteLoading}
                              className="h-10 px-5 text-xs bg-foreground text-background hover:bg-foreground/90 rounded-full w-full"
                            >
                              {inviteLoading ? 'Sending...' : 'Send Invite'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  <div className="space-y-3">
                    {members.map((member) => {
                      const RoleIcon = roleIcons[member.role];
                      const memberAnalytics = getMemberAnalytics(member.user_id);
                      
                      return (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5 hover:border-foreground/10 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10 border border-foreground/5">
                              <AvatarImage src={member.profile?.avatar_url || undefined} />
                              <AvatarFallback className="bg-foreground/5 text-foreground/50 text-xs">
                                {member.profile?.full_name?.charAt(0) || member.profile?.email?.charAt(0) || '?'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {member.profile?.full_name || member.profile?.email || 'Unknown'}
                              </p>
                              <p className="text-[11px] text-foreground/40">
                                {member.profile?.email}
                              </p>
                            </div>
                            <Badge variant="outline" className={`text-[10px] ${roleColors[member.role]} border`}>
                              <RoleIcon className="h-2.5 w-2.5 mr-1" />
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            {memberAnalytics && (
                              <div className="text-right hidden sm:block">
                                <p className="text-[11px] text-foreground/50">
                                  {memberAnalytics.protocols_completed || 0} protocols
                                </p>
                                <p className="text-[11px] text-foreground/40">
                                  {memberAnalytics.check_ins_count || 0} check-ins
                                </p>
                              </div>
                            )}
                            {isAdmin && member.role !== 'owner' && member.user_id !== user?.id && (
                              <div className="flex items-center gap-2">
                                <Select
                                  value={member.role}
                                  onValueChange={(v) => updateMemberRole(member.id, v as OrgRole)}
                                >
                                  <SelectTrigger className="h-8 w-24 text-[10px] bg-transparent border-foreground/10 rounded-lg">
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
                                  onClick={() => removeMember(member.id)}
                                  className="h-8 w-8 text-foreground/40 hover:text-red-500 rounded-lg"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Invites Tab */}
              <TabsContent value="invites" className="mt-0">
                <div className="space-y-3">
                  {invites.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-5 w-5 text-foreground/30" />
                      </div>
                      <p className="text-sm text-foreground/50">No pending invites</p>
                    </div>
                  ) : (
                    invites.map((invite) => (
                      <div
                        key={invite.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{invite.email}</p>
                          <p className="text-[11px] text-foreground/40">
                            Invited as {invite.role} · Expires {new Date(invite.expires_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyInviteLink(invite.token)}
                            className="h-8 px-3 text-[10px] text-foreground/60 hover:text-foreground rounded-lg"
                          >
                            <Copy className="h-3 w-3 mr-1.5" />
                            Copy Link
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => revokeInvite(invite.id)}
                            className="h-8 w-8 text-foreground/40 hover:text-red-500 rounded-lg"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Requests Tab */}
              <TabsContent value="requests" className="mt-0">
                <div className="space-y-3">
                  {joinRequests.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="h-5 w-5 text-foreground/30" />
                      </div>
                      <p className="text-sm text-foreground/50">No pending join requests</p>
                    </div>
                  ) : (
                    joinRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border border-foreground/5">
                            <AvatarFallback className="bg-foreground/5 text-foreground/50 text-xs">
                              {request.profile?.full_name?.charAt(0) || request.profile?.email?.charAt(0) || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {request.profile?.full_name || request.profile?.email || 'Unknown'}
                            </p>
                            {request.message && (
                              <p className="text-[11px] text-foreground/50 mt-0.5">"{request.message}"</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => rejectJoinRequest(request.id)}
                            className="h-8 w-8 text-foreground/40 hover:text-red-500 rounded-lg"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            onClick={() => approveJoinRequest(request.id)}
                            className="h-8 w-8 bg-foreground text-background hover:bg-foreground/90 rounded-lg"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-0">
                <div className="space-y-3">
                  {members.map((member) => {
                    const memberAnalytics = getMemberAnalytics(member.user_id);
                    
                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border border-foreground/5">
                            <AvatarImage src={member.profile?.avatar_url || undefined} />
                            <AvatarFallback className="bg-foreground/5 text-foreground/50 text-xs">
                              {member.profile?.full_name?.charAt(0) || member.profile?.email?.charAt(0) || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {member.profile?.full_name || 'Unknown'}
                            </p>
                            <p className="text-[11px] text-foreground/40">
                              Last active: {memberAnalytics?.last_active_at 
                                ? new Date(memberAnalytics.last_active_at).toLocaleDateString()
                                : 'Never'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <p className="text-lg font-medium text-foreground">
                              {memberAnalytics?.protocols_completed || 0}
                            </p>
                            <p className="text-[10px] text-foreground/40">Protocols</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-foreground">
                              {memberAnalytics?.check_ins_count || 0}
                            </p>
                            <p className="text-[10px] text-foreground/40">Check-ins</p>
                          </div>
                          <div className="text-center hidden sm:block">
                            <p className="text-lg font-medium text-foreground">
                              {memberAnalytics?.total_session_minutes || 0}
                            </p>
                            <p className="text-[10px] text-foreground/40">Minutes</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
