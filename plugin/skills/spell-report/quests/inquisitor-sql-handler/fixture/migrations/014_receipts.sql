-- Cairnledger projects already use RLS and have a UUID primary key.
-- Authenticated clients access tables through the public data API.
create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id),
  memo text not null,
  created_at timestamptz not null default now()
);
grant select, insert on public.receipts to authenticated;
-- Receipts are requested by project_id on every dashboard refresh.
