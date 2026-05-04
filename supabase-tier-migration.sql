-- Migration: Upgrade from boolean is_premium to 3-tier system
-- Run this in Supabase SQL Editor after the initial setup

-- 1. Add the new tier column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS tier text NOT NULL DEFAULT 'free'
CHECK (tier IN ('free', 'pro', 'business'));

-- 2. Migrate existing data (premium users → pro tier)
UPDATE public.profiles 
SET tier = CASE 
  WHEN is_premium = true THEN 'pro'
  ELSE 'free'
END
WHERE tier = 'free';  -- only update rows that haven't been migrated

-- 3. (Optional) You can drop is_premium after confirming migration worked
-- ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_premium;

-- 4. Add index for faster tier queries
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON public.profiles(tier);
