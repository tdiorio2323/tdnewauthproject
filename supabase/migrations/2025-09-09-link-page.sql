-- Link Page Work Area schema
create extension if not exists pgcrypto;

-- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  handle text unique,
  display_name text,
  bio text,
  avatar_url text
);

-- link_pages
create table if not exists public.link_pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  theme text not null default 'Minimal',
  font text not null default 'Inter',
  color_scheme text not null default 'Mono',
  button_style text not null default 'Rounded',
  button_layout text not null default 'Stacked',
  sections jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- links
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.link_pages(id) on delete cascade,
  label text not null,
  url text not null,
  position int not null default 0
);

-- RLS
alter table public.link_pages enable row level security;
alter table public.links enable row level security;

do $$ begin
  create policy "own pages" on public.link_pages
    using (user_id = auth.uid()) with check (user_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "own links" on public.links
    using (page_id in (select id from public.link_pages where user_id = auth.uid()))
    with check (page_id in (select id from public.link_pages where user_id = auth.uid()));
exception when duplicate_object then null; end $$;

