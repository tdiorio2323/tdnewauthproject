-- Fix the security issue properly
-- Remove public access to the main table (this prevents password_hash exposure)
DROP POLICY IF EXISTS "Public can view pages" ON public.pages;

-- The view (pages_public) with SECURITY INVOKER will handle public access safely
-- Keep existing authenticated user policies intact:
-- - "Users can view their own pages" (allows owners full access including password_hash)
-- - "Users can create their own pages" 
-- - "Users can update their own pages"
-- - "Users can delete their own pages"

-- For public access, applications should use the pages_public view, not the main table
-- This ensures password_hash is never exposed publicly