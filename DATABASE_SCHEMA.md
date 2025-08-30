# CABANA Pre-Launch Database Schema

## Overview
This schema supports the tdnewauthproject pre-launch flow:
1. **Waitlist** - Users join waitlist for early access
2. **Creator Signup** - Creators reserve custom pages with handles
3. **Dynamic Pages** - Live creator pages accessible via `/[handle]`

## Required Tables

### 1. `waitlist` table
```sql
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  vip_code VARCHAR(50),
  source VARCHAR(50) DEFAULT 'ui',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_vip_code ON waitlist(vip_code);
```

### 2. `signup_requests` table
```sql
CREATE TABLE signup_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  handle VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255),
  links JSONB DEFAULT '[]',
  notes TEXT,
  choices JSONB DEFAULT '{}',
  logo_path VARCHAR(500),
  claim_token_hash VARCHAR(64),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_signup_handle ON signup_requests(handle);
CREATE INDEX idx_signup_status ON signup_requests(status);
CREATE INDEX idx_signup_token_hash ON signup_requests(claim_token_hash);
CREATE INDEX idx_signup_email ON signup_requests(email);
```

### 3. Required Storage Bucket
```sql
-- Create storage bucket for logos/images
INSERT INTO storage.buckets (id, name, public) VALUES ('intake', 'intake', true);

-- Set up RLS policies for storage
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'intake');
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'intake' AND auth.role() = 'authenticated');
```

## Required Functions

### 1. Claim Lookup Functions
```sql
-- Function to lookup claim by token
CREATE OR REPLACE FUNCTION claim_lookup(token TEXT)
RETURNS TABLE(
  email TEXT,
  handle TEXT,
  title TEXT,
  links JSONB,
  choices JSONB,
  notes TEXT,
  logo_path TEXT
) AS $$
DECLARE
  token_hash TEXT;
BEGIN
  -- Hash the provided token
  token_hash := encode(digest(token, 'sha256'), 'hex');
  
  RETURN QUERY
  SELECT 
    sr.email,
    sr.handle,
    sr.title,
    sr.links,
    sr.choices,
    sr.notes,
    sr.logo_path
  FROM signup_requests sr
  WHERE sr.claim_token_hash = token_hash
    AND sr.status = 'pending';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to lookup claim by hash
CREATE OR REPLACE FUNCTION claim_lookup_by_hash(hash TEXT)
RETURNS TABLE(
  email TEXT,
  handle TEXT,
  title TEXT,
  links JSONB,
  choices JSONB,
  notes TEXT,
  logo_path TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sr.email,
    sr.handle,
    sr.title,
    sr.links,
    sr.choices,
    sr.notes,
    sr.logo_path
  FROM signup_requests sr
  WHERE sr.claim_token_hash = hash
    AND sr.status = 'pending';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to approve claim by token
CREATE OR REPLACE FUNCTION claim_use_by_token(token TEXT)
RETURNS VOID AS $$
DECLARE
  token_hash TEXT;
BEGIN
  token_hash := encode(digest(token, 'sha256'), 'hex');
  
  UPDATE signup_requests 
  SET status = 'approved', updated_at = NOW()
  WHERE claim_token_hash = token_hash 
    AND status = 'pending';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to approve claim by hash
CREATE OR REPLACE FUNCTION claim_use_by_hash(hash TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE signup_requests 
  SET status = 'approved', updated_at = NOW()
  WHERE claim_token_hash = hash 
    AND status = 'pending';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Row Level Security (RLS)

```sql
-- Enable RLS on tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE signup_requests ENABLE ROW LEVEL SECURITY;

-- Waitlist policies
CREATE POLICY "Anyone can insert to waitlist" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can read waitlist" ON waitlist FOR SELECT USING (auth.role() = 'service_role');

-- Signup requests policies  
CREATE POLICY "Anyone can insert signup requests" ON signup_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read approved requests" ON signup_requests FOR SELECT USING (status = 'approved');
CREATE POLICY "Service role full access" ON signup_requests FOR ALL USING (auth.role() = 'service_role');
```

## Environment Variables Required

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_FORM_ENDPOINT=optional_form_endpoint
```

## Data Flow

1. **Waitlist Flow**: `/` → VipModule → `waitlist` table
2. **Creator Flow**: `/` → `/signup` → `signup_requests` table → claim token generated
3. **Claim Flow**: `/claim?t=token` → validates → updates status to 'approved'
4. **Live Pages**: `/:handle` → fetches approved `signup_requests` → renders dynamic page

## Admin Operations

To manually approve creators:
```sql
UPDATE signup_requests 
SET status = 'approved' 
WHERE handle = 'creator_handle';
```

To view waitlist:
```sql
SELECT email, vip_code, created_at 
FROM waitlist 
ORDER BY created_at DESC;
```

To view pending creator requests:
```sql
SELECT handle, email, title, created_at 
FROM signup_requests 
WHERE status = 'pending'
ORDER BY created_at DESC;
```