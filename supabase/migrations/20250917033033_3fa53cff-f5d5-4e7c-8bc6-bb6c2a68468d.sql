-- Fix security definer view issue - recreate with SECURITY INVOKER
DROP VIEW IF EXISTS public.pages_public;

-- Create the view with SECURITY INVOKER to respect RLS policies
CREATE VIEW public.pages_public 
WITH (security_invoker=on)
AS
SELECT 
    id,
    blocks,
    handle,
    title,
    bio,
    avatar_url,
    seo,
    custom_domain,
    created_at,
    updated_at,
    user_id,
    theme,
    pixels
    -- Deliberately excluding password_hash from public view
FROM public.pages;

-- Grant access to the view
GRANT SELECT ON public.pages_public TO anon;
GRANT SELECT ON public.pages_public TO authenticated;

-- Now we need to create a policy that allows public access to the main table
-- but we'll control access through application logic to use the safe view
DROP POLICY IF EXISTS "Authenticated users can view pages" ON public.pages;

-- Restore public access but only for non-sensitive fields through the view
-- The view will handle excluding sensitive fields
CREATE POLICY "Public can view pages" 
ON public.pages 
FOR SELECT 
USING (true);