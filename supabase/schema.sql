-- ============================================================
-- BANGLAR MATH OLYMPIAD — PRE-BOOK 2026
-- Full Supabase database schema
-- Run this ONCE in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ---------- helpers ----------

-- auto-update "updated_at" on row change
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- admin check: any authenticated user whose email is listed in admins
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(admins.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---------- admins ----------
-- paste the email you will use to log into /admin
create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);

-- ⬇⬇ REPLACE with your real admin email before running ⬇⬇
insert into public.admins (email) values ('admin@banglarmatholympiad.com')
on conflict (email) do nothing;

-- ---------- bookings (pre-book form submissions) ----------
create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null,
  phone          text not null,
  email          text,
  student_class  text,                      -- শ্রেণি (e.g. "Class 8", "HSC")
  institution    text,
  bkash_number   text not null,             -- number paid FROM
  transaction_id text not null,
  status         text not null default 'pending'
                 check (status in ('pending', 'verified', 'rejected')),
  admin_note     text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- one transaction id can only be used once
create unique index bookings_txid_unique
  on public.bookings (lower(transaction_id));

create index bookings_status_idx    on public.bookings (status);
create index bookings_created_idx   on public.bookings (created_at desc);
create index bookings_phone_idx     on public.bookings (phone);

alter table public.bookings enable row level security;

-- anyone can submit a booking
drop policy if exists "anyone can insert booking" on public.bookings;
create policy "anyone can insert booking"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

-- only admins can read / update / delete
drop policy if exists "admins read bookings" on public.bookings;
create policy "admins read bookings"
  on public.bookings for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins update bookings" on public.bookings;
create policy "admins update bookings"
  on public.bookings for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete bookings" on public.bookings;
create policy "admins delete bookings"
  on public.bookings for delete
  to authenticated
  using (public.is_admin());

-- ---------- faqs (Q/A section) ----------
create table if not exists public.faqs (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  category   text not null default 'general'
             check (category in ('general', 'course', 'payment', 'mock_test')),
  sort_order int not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.faqs enable row level security;

drop policy if exists "public read published faqs" on public.faqs;
create policy "public read published faqs"
  on public.faqs for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admins write faqs" on public.faqs;
create policy "admins write faqs"
  on public.faqs for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- mock tests (info + schedule, tests are NOT taken here) ----------
create table if not exists public.mock_tests (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  description      text,
  scheduled_at     timestamptz,
  duration_minutes int,
  question_count   int,
  syllabus_topics  text[] default '{}',
  status           text not null default 'upcoming'
                   check (status in ('upcoming', 'ongoing', 'completed')),
  sort_order       int not null default 0,
  published        boolean not null default true,
  created_at       timestamptz not null default now()
);

alter table public.mock_tests enable row level security;

drop policy if exists "public read published mock tests" on public.mock_tests;
create policy "public read published mock tests"
  on public.mock_tests for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admins write mock tests" on public.mock_tests;
create policy "admins write mock tests"
  on public.mock_tests for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- announcements ----------
create table if not exists public.announcements (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text,
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

drop policy if exists "public read published announcements" on public.announcements;
create policy "public read published announcements"
  on public.announcements for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admins write announcements" on public.announcements;
create policy "admins write announcements"
  on public.announcements for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- SEED DATA
-- ============================================================

insert into public.faqs (question, answer, category, sort_order) values
('কোর্সটি কাদের জন্য?', 'যারা ক্লাস ৬ থেকে HSC পর্যন্ত গণিত অলিম্পিয়াডে অংশ নিতে চাও, বা গণিতের ভিত্তি মজবুত করতে চাও — কোর্সটি তোমাদের জন্য।', 'course', 1),
('কোর্সে কী কী থাকছে?', '৭+ মাসের কোর্স, রেকর্ডেড ক্লাস, ২০+ পূর্ণাঙ্গ মক টেস্ট, ২৪/৭ প্রশ্ন সমাধানের সুবিধা, এবং সৃজনশীল দক্ষতা বৃদ্ধির ফোকাস।', 'course', 2),
('পেমেন্ট কীভাবে করব?', 'bKash Personal নম্বর +8801331366865 এ ৯৯৯ টাকা সেন্ড মানি করো। Reference এ লিখবে PRE_BOOK। এরপর এখানে ফর্ম পূরণ করো।', 'payment', 3),
('প্রি-বুক করলে কী সুবিধা?', 'প্রি-বুক করলে তুমি সিট কনফার্ম করবে এবং কোর্স শুরুর সব আপডেট সবার আগে পাবে।', 'payment', 4),
('মক টেস্ট কীভাবে হবে?', 'মোট ২০+ পূর্ণাঙ্গ মক টেস্ট হবে — নিয়মিত প্র্যাকটিস এবং আসল পরীক্ষার আগে নিজেকে যাচাই করার জন্য।', 'mock_test', 5),
('প্রশ্ন করলে কত দ্রুত উত্তর পাব?', 'আমাদের গ্রুপে ২৪/৭ মেন্টর থাকে — যেকোনো সময় প্রশ্ন করলে দ্রুত সমাধান পাবে।', 'mock_test', 6)
on conflict do nothing;

insert into public.mock_tests (title, description, status, sort_order) values
('প্র্যাকটিস মক ০১ — নাম্বার থিওরি', 'পূর্ণসংখ্যা, ভাগশেষ, LCM/GCD ভিত্তিক প্রশ্ন।', 'upcoming', 1),
('প্র্যাকটিস মক ০২ — জ্যামিতি', 'ত্রিভুজ, বৃত্ত ও পূর্ণাঙ্গ জ্যামিতিক সমস্যা।', 'upcoming', 2),
('ফুল সিলেবাস মক — অ্যাডভান্সড', 'আসল অলিম্পিয়াড প্যাটার্নের পূর্ণাঙ্গ পরীক্ষা।', 'upcoming', 3)
on conflict do nothing;

insert into public.announcements (title, body) values
('প্রি-বুকিং চালু!', 'গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬ এর প্রি-বুকিং এখন খোলা। ৯৯৯ টাকায় সিট কনফার্ম করো।')
on conflict do nothing;
