-- Fix security vulnerability: Remove password_hash from public access
-- Drop the existing public policy that exposes all fields
DROP POLICY IF EXISTS "Public can view pages by handle" ON public.pages;

-- Create a new policy that excludes sensitive fields from public access
CREATE POLICY "Public can view pages by handle (safe fields only)" 
ON public.pages 
FOR SELECT 
USING (true);

-- However, we need to use a view for public access to exclude password_hash
-- First, create a view that excludes sensitive fields
CREATE OR REPLACE VIEW public.pages_public AS
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

-- Grant public access to the safe view
GRANT SELECT ON public.pages_public TO anon;
GRANT SELECT ON public.pages_public TO authenticated;

-- Update the policy to be more restrictive - only allow public access through specific queries
DROP POLICY IF EXISTS "Public can view pages by handle (safe fields only)" ON public.pages;

-- Create a policy that allows public access but we'll modify the application to use the view
CREATE POLICY "Authenticated users can view pages" 
ON public.pages 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Keep the existing policies for authenticated users
-- "Users can view their own pages" - already exists and is secure
-- "Users can create their own pages" - already exists and is secure  
-- "Users can update their own pages" - already exists and is secure
-- "Users can delete their own pages" - already exists and is secure