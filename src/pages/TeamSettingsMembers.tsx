import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus,
  Settings,
  ArrowLeft,
  Mail,
  Check,
  X,
  Clock,
  Shield,
  Crown,
  User,
  MoreVertical,
  Trash2,
  RefreshCw,
  Building2,
  LogOut,
  ChevronRight,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useOrganisation, OrgRole } from '@/hooks/useOrganisation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const roleIcons: Record<OrgRole, typeof Crown> = {
  owner: Crown,
  admin: Shield,
  member: User
};

const roleLabels: Record<OrgRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  member: 'Member'
};

export default function TeamSettingsMembers() {
  const navigate = useNavigate();
  const { 
    organisation, 
    members, 
    invites, 
    joinRequests, 
    isAdmin, 
    isOwner,
    sendInvite,
    revokeInvite,
    updateMemberRole,
    removeMember,
    approveJoinRequest,
    rejectJoinRequest,
    loading
  } = useOrganisation();

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OrgRole>('member');
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('members');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSendInvite = async () => {
    if (!inviteEmail) return;
    setSending(true);
    try {
      await sendInvite(inviteEmail, inviteRole);
      setInviteEmail('');
      toast.success('Invite sent successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send invite');
    } finally {
      setSending(false);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveJoinRequest(requestId);
      toast.success('Request approved');
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectJoinRequest(requestId);
      toast.success('Request rejected');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!organisation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-2xl mx-auto px-6 py-24 text-center">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-medium text-foreground mb-4">No Organisation</h1>
          <p className="text-muted-foreground mb-8">You're not a member of any organisation yet.</p>
          <Link to="/join-organisation">
            <Button className="rounded-full">Join or Create Organisation</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEO title="Team Settings | NeuroState" description="Manage your team members, invites, and settings" />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-5xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/team-dashboard">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="rounded-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* Organisation Info */}
            <div className="flex items-center justify-between pb-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-medium text-foreground">{organisation.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {members.length} member{members.length !== 1 ? 's' : ''} • {organisation.domain || 'No domain set'}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <Link to="/team/settings">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Organisation Settings
                  </Button>
                </Link>
              )}
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50 rounded-full p-1">
                <TabsTrigger value="members" className="rounded-full text-xs">
                  <Users className="w-3.5 h-3.5 mr-2" />
                  Members ({members.length})
                </TabsTrigger>
                <TabsTrigger value="invites" className="rounded-full text-xs">
                  <Mail className="w-3.5 h-3.5 mr-2" />
                  Pending Invites ({invites.length})
                </TabsTrigger>
                <TabsTrigger value="requests" className="rounded-full text-xs relative">
                  <Clock className="w-3.5 h-3.5 mr-2" />
                  Join Requests ({joinRequests.length})
                  {joinRequests.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                      {joinRequests.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Members Tab */}
              <TabsContent value="members" className="mt-8 space-y-6">
                {/* Invite Form */}
                {isAdmin && (
                  <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                    <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Invite New Member
                    </h3>
                    <div className="flex gap-3">
                      <Input
                        type="email"
                        placeholder="email@company.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="flex-1 h-10 rounded-full bg-background"
                      />
                      <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as OrgRole)}>
                        <SelectTrigger className="w-32 h-10 rounded-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        onClick={handleSendInvite} 
                        disabled={!inviteEmail || sending}
                        className="h-10 px-6 rounded-full"
                      >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Invite'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Members List */}
                <div className="space-y-2">
                  {members.map((member) => {
                    const RoleIcon = roleIcons[member.role];
                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {member.profile?.full_name || member.profile?.email || 'Unknown User'}
                            </p>
                            <p className="text-xs text-muted-foreground">{member.profile?.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="rounded-full text-[10px] flex items-center gap-1">
                            <RoleIcon className="w-3 h-3" />
                            {roleLabels[member.role]}
                          </Badge>
                          {isAdmin && member.role !== 'owner' && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'admin')}>
                                  <Shield className="w-4 h-4 mr-2" />
                                  Make Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'member')}>
                                  <User className="w-4 h-4 mr-2" />
                                  Make Member
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => removeMember(member.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Invites Tab */}
              <TabsContent value="invites" className="mt-8 space-y-4">
                {invites.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-10 h-10 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">No pending invites</p>
                  </div>
                ) : (
                  invites.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{invite.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Invited as {roleLabels[invite.role]} • Expires {new Date(invite.expires_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {isAdmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive rounded-full"
                          onClick={() => revokeInvite(invite.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </TabsContent>

              {/* Join Requests Tab */}
              <TabsContent value="requests" className="mt-8 space-y-4">
                {joinRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-10 h-10 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">No pending join requests</p>
                  </div>
                ) : (
                  joinRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {request.profile?.full_name || request.profile?.email || 'Unknown User'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.profile?.email} • Requested {new Date(request.created_at).toLocaleDateString()}
                          </p>
                          {request.message && (
                            <p className="text-xs text-muted-foreground mt-1 italic">"{request.message}"</p>
                          )}
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="rounded-full h-8"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive rounded-full h-8"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}