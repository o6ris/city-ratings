-- Enable uuid extension (should be enabled by default in Supabase)
create extension if not exists "uuid-ossp";

-- ===================== USERS =====================
create table public.users (
  id uuid not null default extensions.uuid_generate_v4 (),
  name text null,
  email text null,
  avatar_url text null,
  created_at timestamp without time zone null default now(),
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email)
) TABLESPACE pg_default;

-- ===================== CITIES =====================
create table public.cities (
  id uuid not null default extensions.uuid_generate_v4 (),
  name text not null,
  province text null,
  population integer null,
  location point null,
  created_at timestamp without time zone null default now(),
  constraint cities_pkey primary key (id)
) TABLESPACE pg_default;

-- ===================== DISTRICTS =====================
create table public.districts (
  id uuid not null default extensions.uuid_generate_v4 (),
  city_id uuid null,
  name text not null,
  description text null,
  population integer null,
  created_at timestamp without time zone null default now(),
  sector public.sector_type null,
  geojson jsonb null,
  lat numeric null,
  lon numeric null,
  constraint districts_pkey primary key (id),
  constraint districts_city_id_fkey foreign KEY (city_id) references cities (id) on delete CASCADE
) TABLESPACE pg_default;

-- ===================== RATINGS =====================
create table public.ratings (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  district_id uuid null,
  safety_security integer null,
  cost_of_living integer null,
  healthcare_access integer null,
  transportation_mobility integer null,
  environment_nature integer null,
  education_schools integer null,
  shops_amenities integer null,
  sports_recreation integer null,
  comment text null,
  created_at timestamp without time zone null default now(),
  average_rating real null,
  constraint ratings_pkey primary key (id),
  constraint ratings_user_id_district_id_key unique (user_id, district_id),
  constraint ratings_district_id_fkey foreign KEY (district_id) references districts (id) on delete CASCADE,
  constraint ratings_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE,
  constraint chk_safety_security check (
    (
      (safety_security >= 1)
      and (safety_security <= 10)
    )
  ),
  constraint chk_shops_amenities check (
    (
      (shops_amenities >= 1)
      and (shops_amenities <= 10)
    )
  ),
  constraint chk_cost_of_living check (
    (
      (cost_of_living >= 1)
      and (cost_of_living <= 10)
    )
  ),
  constraint chk_transportation_mobility check (
    (
      (transportation_mobility >= 1)
      and (transportation_mobility <= 10)
    )
  ),
  constraint chk_sports_recreation check (
    (
      (sports_recreation >= 1)
      and (sports_recreation <= 10)
    )
  ),
  constraint chk_education_schools check (
    (
      (education_schools >= 1)
      and (education_schools <= 10)
    )
  ),
  constraint chk_environment_nature check (
    (
      (environment_nature >= 1)
      and (environment_nature <= 10)
    )
  ),
  constraint chk_healthcare_access check (
    (
      (healthcare_access >= 1)
      and (healthcare_access <= 10)
    )
  )
) TABLESPACE pg_default;

-- ===================== RATING VOTES =====================

-- First, create an enum for vote_type
create type vote_type_enum as enum ('up', 'down');

create table public.rating_votes (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  rating_id uuid null,
  vote_type public.vote_type_enum not null,
  created_at timestamp without time zone null default now(),
  constraint rating_votes_pkey primary key (id),
  constraint rating_votes_user_id_rating_id_key unique (user_id, rating_id),
  constraint rating_votes_rating_id_fkey foreign KEY (rating_id) references ratings (id) on delete CASCADE,
  constraint rating_votes_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

-- ===================== RATING COMMENTS =====================
create table public.rating_comments (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  rating_id uuid null,
  content text not null,
  created_at timestamp without time zone null default now(),
  constraint rating_comments_pkey primary key (id),
  constraint rating_comments_rating_id_fkey foreign KEY (rating_id) references ratings (id) on delete CASCADE,
  constraint rating_comments_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

-- ===================== DISTRICT_RATINGS =====================
create table public.district_ratings (
  district_id uuid not null,
  average_rating numeric(4, 2) null,
  safety_security numeric(4, 2) null,
  cost_of_living numeric(4, 2) null,
  healthcare_access numeric(4, 2) null,
  transportation_mobility numeric(4, 2) null,
  environment_nature numeric(4, 2) null,
  education_schools numeric(4, 2) null,
  shops_amenities numeric(4, 2) null,
  sports_recreation numeric(4, 2) null,
  rating_count integer null default 1,
  rank integer null,
  updated_at timestamp without time zone null default now(),
  constraint district_ratings_pkey primary key (district_id),
  constraint district_ratings_district_id_fkey foreign KEY (district_id) references districts (id)
) TABLESPACE pg_default;