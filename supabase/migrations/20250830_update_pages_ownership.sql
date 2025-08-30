-- Add user ownership to pages and tighten RLS
alter table if exists public.pages
  add column if not exists user_id uuid;

-- Optional FK to auth.users for clarity (Supabase allows it)
do $$ begin
  alter table public.pages
    add constraint pages_user_fk foreign key (user_id) references auth.users (id) on delete set null;
exception when duplicate_object then null; end $$;

-- RLS policies: keep public read; restrict writes to owner
drop policy if exists "Authenticated upsert pages" on public.pages;
drop policy if exists "Authenticated update pages" on public.pages;

create policy if not exists "Insert own page"
  on public.pages for insert
  to authenticated
  with check (user_id = auth.uid());

create policy if not exists "Update own page"
  on public.pages for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create index if not exists pages_user_idx on public.pages (user_id);

