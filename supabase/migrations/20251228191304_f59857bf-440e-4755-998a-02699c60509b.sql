-- Create enum for organisation member roles
CREATE TYPE public.org_role AS ENUM ('owner', 'admin', 'member');

-- Create enum for invite status
CREATE TYPE public.invite_status AS ENUM ('pending', 'accepted', 'expired', 'revoked');

-- Create enum for join request status
CREATE TYPE public.join_request_status AS ENUM ('pending', 'approved', 'rejected');

-- Create organisations table
CREATE TABLE public.organisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  domain TEXT UNIQUE, -- For domain verification (e.g., @company.com)
  domain_verified BOOLEAN DEFAULT false,
  logo_url TEXT,
  billing_email TEXT,
  seat_limit INTEGER, -- NULL means unlimited within their plan
  seats_used INTEGER DEFAULT 0,
  price_per_seat NUMERIC(10,2) DEFAULT 0,
  billing_cycle TEXT DEFAULT 'monthly', -- monthly, yearly
  subscription_status TEXT DEFAULT 'active', -- active, cancelled, past_due
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create organisation members table
CREATE TABLE public.organisation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES public.organisations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role org_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  invited_by UUID REFERENCES auth.users(id),
  UNIQUE(organisation_id, user_id)
);

-- Create organisation invites table
CREATE TABLE public.organisation_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES public.organisations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role org_role NOT NULL DEFAULT 'member',
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  status invite_status NOT NULL DEFAULT 'pending',
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '7 days') NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create join requests table (for manual approval)
CREATE TABLE public.organisation_join_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES public.organisations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status join_request_status NOT NULL DEFAULT 'pending',
  message TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(organisation_id, user_id)
);

-- Create organisation analytics table
CREATE TABLE public.organisation_member_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES public.organisations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_active_at TIMESTAMP WITH TIME ZONE,
  protocols_completed INTEGER DEFAULT 0,
  check_ins_count INTEGER DEFAULT 0,
  total_session_minutes INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisation_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisation_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisation_member_analytics ENABLE ROW LEVEL SECURITY;

-- Function to check if user is org admin or owner
CREATE OR REPLACE FUNCTION public.is_org_admin(org_id UUID, user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organisation_members
    WHERE organisation_id = org_id
    AND user_id = user_uuid
    AND role IN ('admin', 'owner')
  );
$$;

-- Function to check if user is org member
CREATE OR REPLACE FUNCTION public.is_org_member(org_id UUID, user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organisation_members
    WHERE organisation_id = org_id
    AND user_id = user_uuid
  );
$$;

-- RLS Policies for organisations
CREATE POLICY "Members can view their organisation"
ON public.organisations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organisation_members
    WHERE organisation_members.organisation_id = organisations.id
    AND organisation_members.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update their organisation"
ON public.organisations FOR UPDATE
USING (public.is_org_admin(id, auth.uid()));

CREATE POLICY "Anyone can create an organisation"
ON public.organisations FOR INSERT
WITH CHECK (true);

-- RLS Policies for organisation_members
CREATE POLICY "Members can view org members"
ON public.organisation_members FOR SELECT
USING (public.is_org_member(organisation_id, auth.uid()));

CREATE POLICY "Admins can add members"
ON public.organisation_members FOR INSERT
WITH CHECK (
  public.is_org_admin(organisation_id, auth.uid())
  OR user_id = auth.uid() -- Allow self-join via invite
);

CREATE POLICY "Admins can update member roles"
ON public.organisation_members FOR UPDATE
USING (public.is_org_admin(organisation_id, auth.uid()));

CREATE POLICY "Admins can remove members"
ON public.organisation_members FOR DELETE
USING (
  public.is_org_admin(organisation_id, auth.uid())
  OR user_id = auth.uid() -- Members can leave
);

-- RLS Policies for organisation_invites
CREATE POLICY "Admins can view org invites"
ON public.organisation_invites FOR SELECT
USING (public.is_org_admin(organisation_id, auth.uid()));

CREATE POLICY "Anyone can view invite by token"
ON public.organisation_invites FOR SELECT
USING (true);

CREATE POLICY "Admins can create invites"
ON public.organisation_invites FOR INSERT
WITH CHECK (public.is_org_admin(organisation_id, auth.uid()));

CREATE POLICY "Admins can update invites"
ON public.organisation_invites FOR UPDATE
USING (public.is_org_admin(organisation_id, auth.uid()));

CREATE POLICY "Admins can delete invites"
ON public.organisation_invites FOR DELETE
USING (public.is_org_admin(organisation_id, auth.uid()));

-- RLS Policies for join_requests
CREATE POLICY "Admins can view join requests"
ON public.organisation_join_requests FOR SELECT
USING (public.is_org_admin(organisation_id, auth.uid()));

CREATE POLICY "Users can view their own requests"
ON public.organisation_join_requests FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create join requests"
ON public.organisation_join_requests FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can update join requests"
ON public.organisation_join_requests FOR UPDATE
USING (public.is_org_admin(organisation_id, auth.uid()));

-- RLS Policies for analytics
CREATE POLICY "Admins can view org analytics"
ON public.organisation_member_analytics FOR SELECT
USING (public.is_org_admin(organisation_id, auth.uid()));

CREATE POLICY "Users can view own analytics"
ON public.organisation_member_analytics FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "System can insert analytics"
ON public.organisation_member_analytics FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "System can update analytics"
ON public.organisation_member_analytics FOR UPDATE
USING (user_id = auth.uid());

-- Trigger to update seats_used when members change
CREATE OR REPLACE FUNCTION public.update_org_seats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.organisations
    SET seats_used = seats_used + 1, updated_at = now()
    WHERE id = NEW.organisation_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.organisations
    SET seats_used = seats_used - 1, updated_at = now()
    WHERE id = OLD.organisation_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER on_member_change
AFTER INSERT OR DELETE ON public.organisation_members
FOR EACH ROW EXECUTE FUNCTION public.update_org_seats();

-- Trigger to update updated_at
CREATE TRIGGER update_organisations_updated_at
BEFORE UPDATE ON public.organisations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for domain lookups
CREATE INDEX idx_organisations_domain ON public.organisations(domain) WHERE domain IS NOT NULL;
CREATE INDEX idx_organisation_invites_token ON public.organisation_invites(token);
CREATE INDEX idx_organisation_invites_email ON public.organisation_invites(email);