-- Fernhollow schema (Postgres). Generated from migrations.
create table users (
  id uuid primary key,
  email text not null unique,
  first_name text not null,
  last_name text not null,
  phone text
);

create table events (
  id uuid primary key,
  organizer_id uuid not null references users(id),
  title text not null,
  venue text not null,
  starts_at timestamptz not null,
  price_cents integer not null check (price_cents >= 0),
  booking_fee_cents bigint not null default 0 check (booking_fee_cents >= 0),
  currency char(3) not null,
  seats_left integer not null check (seats_left >= 0),
  published boolean not null default false,
  show_attendees boolean not null default false,
  payout_account text,
  organizer_notes text
);

create table holds (
  id uuid primary key,
  event_id uuid not null references events(id),
  buyer_id uuid not null references users(id),
  seats integer not null check (seats between 1 and 8),
  status text not null check (status in ('active', 'paid', 'released', 'expired')),
  order_id uuid,
  expires_at timestamptz not null
);
create index holds_active_expiry on holds (expires_at) where status = 'active';

create table orders (
  id uuid primary key default gen_random_uuid(),
  hold_id uuid unique references holds(id),
  event_id uuid not null references events(id),
  buyer_id uuid not null references users(id),
  seats integer not null,
  amount_cents integer not null,
  currency char(3) not null,
  charge_id text not null,
  created_at timestamptz not null default now()
);
create index orders_event on orders (event_id);
