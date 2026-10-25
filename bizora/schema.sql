-- BIZORA database. Paste this whole file into Supabase > SQL Editor > Run.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, bio text, phone text, country text, city text, avatar_url text,
  created_at timestamptz default now()
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null, category text not null, country text not null, city text not null,
  description text, phone text, website text, hours text,
  verified boolean default false, promoted boolean default false,
  created_at timestamptz default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5), comment text,
  created_at timestamptz default now(),
  unique (business_id, user_id)
);

create table public.saved (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  primary key (user_id, business_id)
);

create view public.business_list with (security_invoker = on) as
select b.*, coalesce(avg(r.rating), 0)::numeric(2,1) as rating, count(r.id)::int as review_count
from public.businesses b left join public.reviews r on r.business_id = b.id
group by b.id;

-- Row level security: this is what keeps data safe even though the anon key is public.
alter table public.profiles   enable row level security;
alter table public.businesses enable row level security;
alter table public.reviews    enable row level security;
alter table public.saved      enable row level security;

create policy "profiles are public"   on public.profiles for select using (true);
create policy "edit own profile"      on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "businesses are public" on public.businesses for select using (true);
create policy "add own business"      on public.businesses for insert with check (auth.uid() = owner_id);
create policy "edit own business"     on public.businesses for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "delete own business"   on public.businesses for delete using (auth.uid() = owner_id);
create policy "reviews are public"    on public.reviews for select using (true);
create policy "add own review"        on public.reviews for insert with check (auth.uid() = user_id);
create policy "edit own review"       on public.reviews for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own review"     on public.reviews for delete using (auth.uid() = user_id);
create policy "see own saved"         on public.saved for select using (auth.uid() = user_id);
create policy "add own saved"         on public.saved for insert with check (auth.uid() = user_id);
create policy "remove own saved"      on public.saved for delete using (auth.uid() = user_id);

-- Owners cannot give themselves the Verified badge or a Promoted spot.
-- Only you (in the Supabase Table Editor) can change those two columns.
create function public.protect_flags() returns trigger language plpgsql as $$
begin
  if auth.uid() is not null then
    if tg_op = 'INSERT' then new.verified := false; new.promoted := false;
    else new.verified := old.verified; new.promoted := old.promoted; end if;
  end if;
  return new;
end $$;
create trigger protect_flags before insert or update on public.businesses
  for each row execute function public.protect_flags();

-- Create a profile row automatically when someone signs up.
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Profile pictures.
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict do nothing;
create policy "avatars are public" on storage.objects for select using (bucket_id = 'avatars');
create policy "upload own avatar"  on storage.objects for insert with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "replace own avatar" on storage.objects for update using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
