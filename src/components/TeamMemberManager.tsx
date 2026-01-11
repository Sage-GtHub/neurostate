import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  UserMinus,
  Search,
  ChevronDown,
  ChevronRight,
  Shield,
  User,
  Crown,
  MoreVertical,
  Check,
  X,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Team, TeamMember } from '@/hooks/useTeamDashboard';

interface OrgMember {
  user_id: string;
  role: string;
  profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

interface TeamMemberManagerProps {
  teams: Team[];
  teamMembers: TeamMember[];
  orgMembers: OrgMember[];
  isAdmin: boolean;
  onAddMember: (teamId: string, userId: string, role?: string) => Promise<void>;
  onRemoveMember: (teamMemberId: string) => Promise<void>;
  onUpdateMemberRole?: (teamMemberId: string, newRole: string) => Promise<void>;
}

const roleIcons: Record<string, React.ReactNode> = {
  owner: <Crown className="w-3 h-3 text-amber-500" />,
  admin: <Shield className="w-3 h-3 text-primary" />,
  lead: <Shield className="w-3 h-3 text-blue-500" />,
  member: <User className="w-3 h-3 text-muted-foreground" />,
};

const roleLabels: Record<string, string> = {
  owner: 'Owner',
  admin: 'Admin',
  lead: 'Team Lead',
  member: 'Member',
};

export function TeamMemberManager({
  teams,
  teamMembers,
  orgMembers,
  isAdmin,
  onAddMember,
  onRemoveMember,
  onUpdateMemberRole,
}: TeamMemberManagerProps) {
  const { toast } = useToast();
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [selectedTeamForAdd, setSelectedTeamForAdd] = useState<string | null>(null);
  const [selectedUserForAdd, setSelectedUserForAdd] = useState<string>('');
  const [selectedRoleForAdd, setSelectedRoleForAdd] = useState<string>('member');
  const [isLoading, setIsLoading] = useState(false);

  // Get members for a specific team
  const getTeamMembersList = (teamId: string) => {
    return teamMembers.filter((m) => m.team_id === teamId);
  };

  // Get org members not in a specific team
  const getAvailableMembers = (teamId: string) => {
    const teamMemberIds = getTeamMembersList(teamId).map((m) => m.user_id);
    return orgMembers.filter((m) => !teamMemberIds.includes(m.user_id));
  };

  // Filter teams by search query
  const filteredTeams = useMemo(() => {
    if (!searchQuery) return teams;
    const query = searchQuery.toLowerCase();
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(query) ||
        getTeamMembersList(team.id).some(
          (m) =>
            m.profile?.full_name?.toLowerCase().includes(query) ||
            m.profile?.email?.toLowerCase().includes(query)
        )
    );
  }, [teams, teamMembers, searchQuery]);

  const toggleTeamExpanded = (teamId: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId);
    } else {
      newExpanded.add(teamId);
    }
    setExpandedTeams(newExpanded);
  };

  const handleOpenAddMemberDialog = (teamId: string) => {
    setSelectedTeamForAdd(teamId);
    setSelectedUserForAdd('');
    setSelectedRoleForAdd('member');
    setShowAddMemberDialog(true);
  };

  const handleAddMember = async () => {
    if (!selectedTeamForAdd || !selectedUserForAdd) return;

    setIsLoading(true);
    try {
      await onAddMember(selectedTeamForAdd, selectedUserForAdd, selectedRoleForAdd);
      setShowAddMemberDialog(false);
      toast({ title: 'Member added to team' });
    } catch (error) {
      toast({ title: 'Failed to add member', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (teamMemberId: string, memberName: string) => {
    setIsLoading(true);
    try {
      await onRemoveMember(teamMemberId);
      toast({ title: `${memberName} removed from team` });
    } catch (error) {
      toast({ title: 'Failed to remove member', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const selectedTeam = teams.find((t) => t.id === selectedTeamForAdd);
  const availableMembers = selectedTeamForAdd
    ? getAvailableMembers(selectedTeamForAdd)
    : [];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search teams or members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Teams List */}
      <div className="space-y-3">
        {filteredTeams.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No teams found</p>
          </div>
        ) : (
          filteredTeams.map((team) => {
            const members = getTeamMembersList(team.id);
            const isExpanded = expandedTeams.has(team.id);

            return (
              <motion.div
                key={team.id}
                className="rounded-xl border border-border/50 bg-card overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Team Header */}
                <button
                  onClick={() => toggleTeamExpanded(team.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: team.color + '20' }}
                    >
                      <Users className="w-4 h-4" style={{ color: team.color }} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">{team.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {members.length} member{members.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAddMemberDialog(team.id);
                        }}
                      >
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Team Members */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 p-4 space-y-2">
                        {members.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No members yet.{' '}
                            {isAdmin && (
                              <button
                                onClick={() => handleOpenAddMemberDialog(team.id)}
                                className="text-primary hover:underline"
                              >
                                Add the first member
                              </button>
                            )}
                          </p>
                        ) : (
                          members.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.profile?.avatar_url || undefined} />
                                  <AvatarFallback className="text-xs">
                                    {getInitials(member.profile?.full_name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    {member.profile?.full_name || 'Unknown'}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {member.profile?.email || 'No email'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1 text-xs"
                                >
                                  {roleIcons[member.role] || roleIcons.member}
                                  {roleLabels[member.role] || 'Member'}
                                </Badge>
                                {isAdmin && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                      >
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {onUpdateMemberRole && (
                                        <>
                                          <DropdownMenuItem
                                            onClick={() =>
                                              onUpdateMemberRole(member.id, 'lead')
                                            }
                                          >
                                            <Shield className="w-4 h-4 mr-2 text-blue-500" />
                                            Make Team Lead
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() =>
                                              onUpdateMemberRole(member.id, 'member')
                                            }
                                          >
                                            <User className="w-4 h-4 mr-2" />
                                            Set as Member
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleRemoveMember(
                                            member.id,
                                            member.profile?.full_name || 'Member'
                                          )
                                        }
                                        className="text-destructive"
                                      >
                                        <UserMinus className="w-4 h-4 mr-2" />
                                        Remove from Team
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Add Member Dialog */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member to {selectedTeam?.name}</DialogTitle>
            <DialogDescription>
              Select an organisation member to add to this team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {availableMembers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                All organisation members are already in this team.
              </p>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Member
                  </label>
                  <Select
                    value={selectedUserForAdd}
                    onValueChange={setSelectedUserForAdd}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a member..." />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="max-h-[200px]">
                        {availableMembers.map((member) => (
                          <SelectItem key={member.user_id} value={member.user_id}>
                            <div className="flex items-center gap-2">
                              <span>
                                {member.profile?.full_name || member.profile?.email || 'Unknown'}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Role</label>
                  <Select
                    value={selectedRoleForAdd}
                    onValueChange={setSelectedRoleForAdd}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="lead">Team Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddMemberDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddMember}
                    disabled={!selectedUserForAdd || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <UserPlus className="w-4 h-4 mr-2" />
                    )}
                    Add Member
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
