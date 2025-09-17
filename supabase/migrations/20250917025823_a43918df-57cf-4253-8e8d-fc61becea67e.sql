-- Create pages table for link-in-bio functionality
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  handle TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  theme JSONB NOT NULL DEFAULT '{"preset": "minimal", "accent": "#8B5CF6"}',
  pixels JSONB,
  password_hash TEXT,
  blocks JSONB NOT NULL DEFAULT '[]',
  seo JSONB,
  custom_domain TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clicks table for analytics
CREATE TABLE public.clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  block_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  country TEXT,
  referrer TEXT,
  ab_group TEXT
);

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  stripe_customer_id TEXT,
  subscription_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Users can view their own pages" 
ON public.pages 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pages" 
ON public.pages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pages" 
ON public.pages 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pages" 
ON public.pages 
FOR DELETE 
USING (auth.uid() = user_id);

-- Allow public access to pages by handle for viewing
CREATE POLICY "Public can view pages by handle" 
ON public.pages 
FOR SELECT 
USING (true);

-- Create policies for clicks
CREATE POLICY "Users can view clicks for their pages" 
ON public.clicks 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.pages 
    WHERE public.pages.id = clicks.page_id 
    AND public.pages.user_id = auth.uid()
  )
);

CREATE POLICY "Anyone can insert clicks" 
ON public.clicks 
FOR INSERT 
WITH CHECK (true);

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_pages_handle ON public.pages(handle);
CREATE INDEX idx_pages_user_id ON public.pages(user_id);
CREATE INDEX idx_pages_custom_domain ON public.pages(custom_domain);
CREATE INDEX idx_clicks_page_id ON public.clicks(page_id);
CREATE INDEX idx_clicks_timestamp ON public.clicks(timestamp);
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();