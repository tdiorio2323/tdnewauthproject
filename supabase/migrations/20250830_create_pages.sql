-- Create a simple public pages table for storing per-handle customization
create table if not exists public.pages (
  handle text primary key,
  settings jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pages enable row level security;

-- Anyone can read a page by handle
create policy if not exists "Public read pages"
  on public.pages for select
  using (true);

-- Allow authenticated users to insert/update (simple dev policy)
create policy if not exists "Authenticated upsert pages"
  on public.pages for insert
  to authenticated
  with check (true);

create policy if not exists "Authenticated update pages"
  on public.pages for update
  to authenticated
  using (true)
  with check (true);

-- Helpful index for handle lookups
create index if not exists pages_handle_idx on public.pages (handle);

