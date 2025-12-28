-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can create an organisation" ON public.organisations;

-- Create a permissive INSERT policy for authenticated users
CREATE POLICY "Authenticated users can create organisations"
ON public.organisations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Also need to allow the creator to SELECT their new organisation immediately
-- Update the SELECT policy to be more permissive for new orgs
DROP POLICY IF EXISTS "Members can view their organisation" ON public.organisations;

CREATE POLICY "Members can view their organisation"
ON public.organisations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.organisation_members
    WHERE organisation_members.organisation_id = organisations.id
    AND organisation_members.user_id = auth.uid()
  )
  OR 
  -- Allow viewing during creation flow (when no members exist yet)
  NOT EXISTS (
    SELECT 1 FROM public.organisation_members
    WHERE organisation_members.organisation_id = organisations.id
  )
);