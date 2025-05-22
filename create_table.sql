-- Enable uuid extension (should be enabled by default in Supabase)
create extension if not exists "uuid-ossp";

-- ===================== USERS =====================
create table users (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text unique,
  avatar_url text,
  created_at timestamp default now()
);

-- ===================== CITIES =====================
create table cities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  province text,
  population int,
  location point,
  created_at timestamp default now()
);

-- ===================== DISTRICTS =====================
create table districts (
  id uuid primary key default uuid_generate_v4(),
  city_id uuid references cities(id) on delete cascade,
  name text not null,
  description text,
  population int,
  location point,
  created_at timestamp default now()
);

-- ===================== RATINGS =====================
create table ratings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  district_id uuid references districts(id) on delete cascade,
  safety_security int,
  cost_of_living int,
  healthcare_access int,
  transportation_mobility int,
  environment_nature int,
  education_schools int,
  shops_amenities int,
  sports_recreation int,
  quality_of_life int,
  comment text,
  created_at timestamp default now(),

  -- optional: enforce 1 rating per user per district
  unique(user_id, district_id)
);

-- ===================== RATING VOTES =====================

-- First, create an enum for vote_type
create type vote_type_enum as enum ('up', 'down');

create table rating_votes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  rating_id uuid references ratings(id) on delete cascade,
  vote_type vote_type_enum not null,
  created_at timestamp default now(),

  unique(user_id, rating_id) -- only 1 vote per rating per user
);

-- ===================== RATING COMMENTS =====================
create table rating_comments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  rating_id uuid references ratings(id) on delete cascade,
  content text not null,
  created_at timestamp default now()
);

-- ===================== OPTIONAL: AVERAGE RATINGS =====================
-- Later, you can either:
-- (1) Create a "district_rating_averages" materialized view (recommended for real-time data)
-- (2) Add average fields directly to the `districts` table and update them with triggers or CRON jobs
