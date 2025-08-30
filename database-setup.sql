-- Database schema for tdnewauthproject
-- Run these commands in your Supabase SQL editor

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  vip_code TEXT,
  is_vip BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create signup_requests table for creators
CREATE TABLE IF NOT EXISTS signup_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  handle TEXT NOT NULL UNIQUE,
  display_name TEXT,
  bio TEXT,
  style_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vip_codes table
CREATE TABLE IF NOT EXISTS vip_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE signup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE vip_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed)
CREATE POLICY "Allow anonymous inserts to waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts to signup_requests" ON signup_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous reads from vip_codes" ON vip_codes
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous updates to vip_codes" ON vip_codes
  FOR UPDATE USING (true);

-- Insert some sample VIP codes for testing
INSERT INTO vip_codes (code) VALUES 
  ('VIP2024A'),
  ('EARLY001'),
  ('BETA2024'),
  ('LAUNCH01'),
  ('PREMIUM1')
ON CONFLICT (code) DO NOTHING;