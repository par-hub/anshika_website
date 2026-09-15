-- Create outings table from scratch
create table if not exists public.outings (
  id uuid primary key default gen_random_uuid(),
  place text not null,
  date date not null,
  time time not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.outings enable row level security;

-- Drop old/conflicting policies if any
drop policy if exists "Allow public outing submissions" on public.outings;
drop policy if exists "Allow anonymous public inserts" on public.outings;

-- Minimum required INSERT policy: allows public/anon insertions
-- In PostgreSQL, 'to public' grants insertion to all roles (anon, authenticated, etc.)
-- Public SELECT, UPDATE, and DELETE are strictly disallowed
create policy "Allow public outing submissions"
  on public.outings
  for insert
  to public
  with check (true);
