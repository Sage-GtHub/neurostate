import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type OrgRole = 'owner' | 'admin' | 'member';
export type InviteStatus = 'pending' | 'accepted' | 'expired' | 'revoked';
export type JoinRequestStatus = 'pending' | 'approved' | 'rejected';

export interface Organisation {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  domain_verified: boolean;
  logo_url: string | null;
  billing_email: string | null;
  seat_limit: number | null;
  seats_used: number;
  price_per_seat: number;
  billing_cycle: string;
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrganisationMember {
  id: string;
  organisation_id: string;
  user_id: string;
  role: OrgRole;
  joined_at: string;
  invited_by: string | null;
  profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

export interface OrganisationInvite {
  id: string;
  organisation_id: string;
  email: string;
  role: OrgRole;
  token: string;
  status: InviteStatus;
  invited_by: string;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
}

export interface JoinRequest {
  id: string;
  organisation_id: string;
  user_id: string;
  status: JoinRequestStatus;
  message: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  profile?: {
    full_name: string | null;
    email: string | null;
  };
}

export interface MemberAnalytics {
  id: string;
  organisation_id: string;
  user_id: string;
  last_active_at: string | null;
  protocols_completed: number;
  check_ins_count: number;
  total_session_minutes: number;
  updated_at: string;
}

export function useOrganisation() {
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [members, setMembers] = useState<OrganisationMember[]>([]);
  const [invites, setInvites] = useState<OrganisationInvite[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [analytics, setAnalytics] = useState<MemberAnalytics[]>([]);
  const [userRole, setUserRole] = useState<OrgRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrganisation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's organisation membership
      const { data: membership } = await supabase
        .from('organisation_members')
        .select('organisation_id, role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!membership) {
        setLoading(false);
        return;
      }

      setUserRole(membership.role as OrgRole);

      // Fetch organisation details
      const { data: org } = await supabase
        .from('organisations')
        .select('*')
        .eq('id', membership.organisation_id)
        .single();

      if (org) {
        setOrganisation(org as Organisation);
      }
    } catch (error) {
      console.error('Error fetching organisation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    if (!organisation) return;

    const { data } = await supabase
      .from('organisation_members')
      .select('*')
      .eq('organisation_id', organisation.id);

    if (data) {
      // Fetch profiles for each member
      const memberIds = data.map(m => m.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .in('id', memberIds);

      const membersWithProfiles = data.map(member => ({
        ...member,
        role: member.role as OrgRole,
        profile: profiles?.find(p => p.id === member.user_id)
      }));

      setMembers(membersWithProfiles);
    }
  };

  const fetchInvites = async () => {
    if (!organisation) return;

    const { data } = await supabase
      .from('organisation_invites')
      .select('*')
      .eq('organisation_id', organisation.id)
      .eq('status', 'pending');

    if (data) {
      setInvites(data.map(invite => ({
        ...invite,
        role: invite.role as OrgRole,
        status: invite.status as InviteStatus
      })));
    }
  };

  const fetchJoinRequests = async () => {
    if (!organisation) return;

    const { data } = await supabase
      .from('organisation_join_requests')
      .select('*')
      .eq('organisation_id', organisation.id)
      .eq('status', 'pending');

    if (data) {
      // Fetch profiles for requesters
      const userIds = data.map(r => r.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      const requestsWithProfiles = data.map(request => ({
        ...request,
        status: request.status as JoinRequestStatus,
        profile: profiles?.find(p => p.id === request.user_id)
      }));

      setJoinRequests(requestsWithProfiles);
    }
  };

  const fetchAnalytics = async () => {
    if (!organisation) return;

    const { data } = await supabase
      .from('organisation_member_analytics')
      .select('*')
      .eq('organisation_id', organisation.id);

    if (data) {
      setAnalytics(data);
    }
  };

  const createOrganisation = async (name: string, domain?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const { data: org, error: orgError } = await supabase
      .from('organisations')
      .insert({
        name,
        slug,
        domain: domain || null,
        billing_email: user.email
      })
      .select()
      .single();

    if (orgError) throw orgError;

    // Add creator as owner
    const { error: memberError } = await supabase
      .from('organisation_members')
      .insert({
        organisation_id: org.id,
        user_id: user.id,
        role: 'owner'
      });

    if (memberError) throw memberError;

    await fetchOrganisation();
    toast({ title: 'Organisation created successfully' });
    return org;
  };

  const sendInvite = async (email: string, role: OrgRole = 'member') => {
    if (!organisation) throw new Error('No organisation');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check seat limit
    if (organisation.seat_limit && organisation.seats_used >= organisation.seat_limit) {
      throw new Error('Seat limit reached. Please upgrade your plan.');
    }

    const { error } = await supabase
      .from('organisation_invites')
      .insert({
        organisation_id: organisation.id,
        email,
        role,
        invited_by: user.id
      });

    if (error) throw error;

    await fetchInvites();
    toast({ title: 'Invite sent successfully' });
  };

  const revokeInvite = async (inviteId: string) => {
    const { error } = await supabase
      .from('organisation_invites')
      .update({ status: 'revoked' })
      .eq('id', inviteId);

    if (error) throw error;

    await fetchInvites();
    toast({ title: 'Invite revoked' });
  };

  const acceptInvite = async (token: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Get invite by token
    const { data: invite, error: inviteError } = await supabase
      .from('organisation_invites')
      .select('*')
      .eq('token', token)
      .eq('status', 'pending')
      .maybeSingle();

    if (inviteError || !invite) {
      throw new Error('Invalid or expired invite');
    }

    if (new Date(invite.expires_at) < new Date()) {
      throw new Error('Invite has expired');
    }

    // Check seat limit
    const { data: org } = await supabase
      .from('organisations')
      .select('seat_limit, seats_used')
      .eq('id', invite.organisation_id)
      .single();

    if (org?.seat_limit && org.seats_used >= org.seat_limit) {
      throw new Error('Organisation has reached its seat limit');
    }

    // Add member
    const { error: memberError } = await supabase
      .from('organisation_members')
      .insert({
        organisation_id: invite.organisation_id,
        user_id: user.id,
        role: invite.role,
        invited_by: invite.invited_by
      });

    if (memberError) throw memberError;

    // Update invite status
    await supabase
      .from('organisation_invites')
      .update({ status: 'accepted', accepted_at: new Date().toISOString() })
      .eq('id', invite.id);

    await fetchOrganisation();
    toast({ title: 'Successfully joined organisation' });
  };

  const updateMemberRole = async (memberId: string, role: OrgRole) => {
    const { error } = await supabase
      .from('organisation_members')
      .update({ role })
      .eq('id', memberId);

    if (error) throw error;

    await fetchMembers();
    toast({ title: 'Member role updated' });
  };

  const removeMember = async (memberId: string) => {
    const { error } = await supabase
      .from('organisation_members')
      .delete()
      .eq('id', memberId);

    if (error) throw error;

    await fetchMembers();
    toast({ title: 'Member removed' });
  };

  const approveJoinRequest = async (requestId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !organisation) throw new Error('Not authenticated');

    const request = joinRequests.find(r => r.id === requestId);
    if (!request) throw new Error('Request not found');

    // Check seat limit
    if (organisation.seat_limit && organisation.seats_used >= organisation.seat_limit) {
      throw new Error('Seat limit reached');
    }

    // Add member
    const { error: memberError } = await supabase
      .from('organisation_members')
      .insert({
        organisation_id: organisation.id,
        user_id: request.user_id,
        role: 'member'
      });

    if (memberError) throw memberError;

    // Update request
    await supabase
      .from('organisation_join_requests')
      .update({
        status: 'approved',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', requestId);

    await fetchJoinRequests();
    await fetchMembers();
    toast({ title: 'Join request approved' });
  };

  const rejectJoinRequest = async (requestId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    await supabase
      .from('organisation_join_requests')
      .update({
        status: 'rejected',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', requestId);

    await fetchJoinRequests();
    toast({ title: 'Join request rejected' });
  };

  const requestToJoin = async (organisationId: string, message?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('organisation_join_requests')
      .insert({
        organisation_id: organisationId,
        user_id: user.id,
        message
      });

    if (error) throw error;

    toast({ title: 'Join request sent' });
  };

  const joinByDomain = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) throw new Error('Not authenticated');

    const emailDomain = user.email.split('@')[1];

    // Find organisation with matching domain
    const { data: org } = await supabase
      .from('organisations')
      .select('*')
      .eq('domain', emailDomain)
      .eq('domain_verified', true)
      .maybeSingle();

    if (!org) {
      throw new Error('No organisation found for your email domain');
    }

    // Check seat limit
    if (org.seat_limit && org.seats_used >= org.seat_limit) {
      throw new Error('Organisation has reached its seat limit');
    }

    // Add member
    const { error } = await supabase
      .from('organisation_members')
      .insert({
        organisation_id: org.id,
        user_id: user.id,
        role: 'member'
      });

    if (error) throw error;

    await fetchOrganisation();
    toast({ title: 'Successfully joined organisation' });
  };

  const updateOrganisation = async (updates: Partial<Organisation>) => {
    if (!organisation) throw new Error('No organisation');

    const { error } = await supabase
      .from('organisations')
      .update(updates)
      .eq('id', organisation.id);

    if (error) throw error;

    await fetchOrganisation();
    toast({ title: 'Organisation updated' });
  };

  useEffect(() => {
    fetchOrganisation();
  }, []);

  useEffect(() => {
    if (organisation) {
      fetchMembers();
      fetchInvites();
      fetchJoinRequests();
      fetchAnalytics();
    }
  }, [organisation?.id]);

  const isAdmin = userRole === 'admin' || userRole === 'owner';
  const isOwner = userRole === 'owner';

  return {
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
    acceptInvite,
    updateMemberRole,
    removeMember,
    approveJoinRequest,
    rejectJoinRequest,
    requestToJoin,
    joinByDomain,
    updateOrganisation,
    refetch: fetchOrganisation
  };
}
