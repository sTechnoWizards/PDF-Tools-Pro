-- Run this once in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/cpycrxnmicsxwgzkcrrb/sql/new

-- 1. profiles table (one row per user, mirrors auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  is_premium  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- 2. Row-level security
alter table public.profiles enable row level security;

-- Users can only read/update their own row
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Auto-create profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
