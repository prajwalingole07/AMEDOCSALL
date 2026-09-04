-- Run this in Supabase SQL Editor (https://zxkzynzeizikzqafccud.supabase.co → SQL Editor)
-- Creates table for colleges with global persistence (Netlify)

create table if not exists public.colleges (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default now()
);

-- Enable RLS and allow public read/write for demo (restrict later)
alter table public.colleges enable row level security;

drop policy if exists "Allow all" on public.colleges;
create policy "Allow all" on public.colleges for all using (true) with check (true);

-- Optional: Enable realtime
-- Go to Database → Realtime → Enable for colleges

-- Seed with existing 68 colleges (run after table creation):
-- Use the script: node scripts/seed_supabase.js
-- Or manually insert via: insert into colleges (id, data) values ('slug', '{...json}'::jsonb);

-- For Netlify: set env vars in Netlify Dashboard → Site Settings → Environment Variables:
-- NEXT_PUBLIC_SUPABASE_URL=https://zxkzynzeizikzqafccud.supabase.co
-- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_JXULQCMWTVDIsfflJpvTnA_XgHE7rM3
