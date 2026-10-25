-- ============================================================
-- TIGER MATH / BANGLAR MATH OLYMPIAD — FULL DATABASE SCHEMA
-- Compatible with Supabase & PostgreSQL (No 42P01 or order errors)
-- Run this ONCE in Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ============================================================

-- ---------- 1. HELPERS & EXTENSIONS ----------
create extension if not exists "pgcrypto";

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

-- ---------- 2. ADMINS TABLE & CHECK ----------
-- (Must be created before is_admin() function so relation exists)
create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);

-- Default admin email
insert into public.admins (email) values ('admin@banglarmatholympiad.com')
on conflict (email) do nothing;

-- Admin check helper
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

-- ---------- 3. USER PROFILES (All Student Records) ----------
create table if not exists public.profiles (
  id             uuid primary key default gen_random_uuid(),
  phone          text unique not null,
  full_name      text not null,
  email          text,
  student_class  text,                            -- ৩য় শ্রেণি, ৫ম শ্রেণি, ৮ম শ্রেণি, ইত্যাদি
  institution    text,                            -- স্কুল / কলেজের নাম
  points         integer not null default 0,      -- বর্তমান পয়েন্ট (প্রতি প্রশ্নে +১০)
  streak_days    integer not null default 1,      -- একটানা পড়ার স্ট্রিক
  solved_count   integer not null default 0,      -- মোট সমাধান করা প্রশ্ন
  total_earned_tk numeric(10,2) default 0.00,     -- মোট ক্যাশআউট নেওয়া টাকা
  role           text not null default 'student' check (role in ('student', 'mentor', 'admin')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create index if not exists profiles_points_idx on public.profiles (points desc);
create index if not exists profiles_phone_idx  on public.profiles (phone);

-- ---------- 4. PRE-BOOKINGS (Course Registrations: 199৳) ----------
create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null,
  phone          text not null,
  email          text,
  student_class  text,
  institution    text,
  bkash_number   text not null,                   -- যে বিকাশ নম্বর থেকে টাকা এসেছে
  transaction_id text not null,                   -- bKash TrxID
  status         text not null default 'pending'
                 check (status in ('pending', 'verified', 'rejected')),
  course_fee     numeric(10,2) not null default 199.00,
  admin_note     text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- এক TrxID কেবল একবারই ব্যবহার করা যাবে
create unique index if not exists bookings_txid_unique
  on public.bookings (lower(transaction_id));

create index if not exists bookings_status_idx    on public.bookings (status);
create index if not exists bookings_created_idx   on public.bookings (created_at desc);
create index if not exists bookings_phone_idx     on public.bookings (phone);

-- ---------- 5. SOLVED PROBLEMS TRACKER (+10 Points per solve) ----------
create table if not exists public.solved_problems (
  id             uuid primary key default gen_random_uuid(),
  user_phone     text not null,
  problem_id     text not null,
  category       text not null,                   -- সংখ্যাতত্ত্ব, জ্যামিতি, বীজগণিত, কম্বিনেটোরিক্স, পদার্থ
  is_correct     boolean not null default true,
  points_awarded integer not null default 10,
  solved_at      timestamptz not null default now()
);

create index if not exists solved_phone_idx on public.solved_problems (user_phone);
create index if not exists solved_cat_idx   on public.solved_problems (category);

-- ---------- 6. POINT TRANSACTIONS LEDGER ----------
create table if not exists public.point_transactions (
  id          uuid primary key default gen_random_uuid(),
  user_phone  text not null,
  amount      integer not null,                   -- +10, +50, -1000 ইত্যাদি
  reason      text not null,                      -- 'problem_solve', 'mock_test', 'cashout_redemption', 'bonus'
  reference   text,                               -- problem_id বা cashout_id
  created_at  timestamptz not null default now()
);

create index if not exists point_tx_phone_idx on public.point_transactions (user_phone);

-- ---------- 7. CASHOUT REQUESTS (1000 Points = 100৳ bKash) ----------
create table if not exists public.cashout_requests (
  id              uuid primary key default gen_random_uuid(),
  user_phone      text not null,
  points_redeemed integer not null default 1000,
  bdt_amount      numeric(10,2) not null default 100.00,
  bkash_number    text not null,                  -- যে নম্বরে টাকা পাঠাতে হবে
  status          text not null default 'pending' check (status in ('pending', 'sent', 'rejected')),
  trx_id_sent     text,                           -- অ্যাডমিন কর্তৃক পাঠানো বিকাশ TrxID
  admin_note      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger cashout_updated_at
  before update on public.cashout_requests
  for each row execute function public.set_updated_at();

create index if not exists cashout_status_idx on public.cashout_requests (status);
create index if not exists cashout_phone_idx  on public.cashout_requests (user_phone);

-- ---------- 8. MOCK TEST SUBMISSIONS (Results & Scores) ----------
create table if not exists public.mock_submissions (
  id                 uuid primary key default gen_random_uuid(),
  test_id            text not null,
  student_name       text not null,
  student_phone      text not null,
  score              integer not null,
  total_questions    integer not null,
  percentage         numeric(5,2) not null,
  time_spent_seconds integer not null default 0,
  answers            jsonb not null default '{}'::jsonb,
  created_at         timestamptz not null default now()
);

create index if not exists mock_sub_phone_idx on public.mock_submissions (student_phone);
create index if not exists mock_sub_test_idx  on public.mock_submissions (test_id);

-- ---------- 9. COMMUNITY Q&A (Questions & Mentor Answers) ----------
create table if not exists public.qa_questions (
  id           uuid primary key default gen_random_uuid(),
  author_name  text not null,
  author_phone text,
  category     text not null,                     -- সংখ্যাতত্ত্ব, জ্যামিতি, বীজগণিত, ইত্যাদি
  student_class text,
  title        text not null,
  description  text not null,
  upvotes      integer not null default 0,
  has_mentor_solution boolean not null default false,
  created_at   timestamptz not null default now()
);

create table if not exists public.qa_answers (
  id           uuid primary key default gen_random_uuid(),
  question_id  uuid not null references public.qa_questions(id) on delete cascade,
  author_name  text not null,
  is_mentor    boolean not null default false,
  body         text not null,
  upvotes      integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists qa_answers_qid_idx on public.qa_answers (question_id);

-- ---------- 10. ROW LEVEL SECURITY (RLS) POLICIES ----------
alter table public.admins             enable row level security;
alter table public.profiles           enable row level security;
alter table public.bookings           enable row level security;
alter table public.solved_problems    enable row level security;
alter table public.point_transactions enable row level security;
alter table public.cashout_requests   enable row level security;
alter table public.mock_submissions   enable row level security;
alter table public.qa_questions       enable row level security;
alter table public.qa_answers         enable row level security;

-- (A) Bookings Policies
drop policy if exists "anyone can insert booking" on public.bookings;
create policy "anyone can insert booking"
  on public.bookings for insert to anon, authenticated with check (true);

drop policy if exists "anyone can view own booking" on public.bookings;
create policy "anyone can view own booking"
  on public.bookings for select to anon, authenticated using (true);

drop policy if exists "admins full booking control" on public.bookings;
create policy "admins full booking control"
  on public.bookings for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- (B) Profiles & Leaderboard Policies
drop policy if exists "anyone can read profiles for leaderboard" on public.profiles;
create policy "anyone can read profiles for leaderboard"
  on public.profiles for select to anon, authenticated using (true);

drop policy if exists "anyone can upsert profile" on public.profiles;
create policy "anyone can upsert profile"
  on public.profiles for insert to anon, authenticated with check (true);

drop policy if exists "anyone can update profile points" on public.profiles;
create policy "anyone can update profile points"
  on public.profiles for update to anon, authenticated using (true);

-- (C) Solved Problems & Points Ledger
drop policy if exists "anyone can insert solved problem" on public.solved_problems;
create policy "anyone can insert solved problem"
  on public.solved_problems for insert to anon, authenticated with check (true);

drop policy if exists "anyone can view solved problems" on public.solved_problems;
create policy "anyone can view solved problems"
  on public.solved_problems for select to anon, authenticated using (true);

drop policy if exists "anyone can insert point transaction" on public.point_transactions;
create policy "anyone can insert point transaction"
  on public.point_transactions for insert to anon, authenticated with check (true);

drop policy if exists "anyone can view point transactions" on public.point_transactions;
create policy "anyone can view point transactions"
  on public.point_transactions for select to anon, authenticated using (true);

-- (D) Cashout Requests
drop policy if exists "anyone can request cashout" on public.cashout_requests;
create policy "anyone can request cashout"
  on public.cashout_requests for insert to anon, authenticated with check (true);

drop policy if exists "anyone can view cashout status" on public.cashout_requests;
create policy "anyone can view cashout status"
  on public.cashout_requests for select to anon, authenticated using (true);

drop policy if exists "admins update cashouts" on public.cashout_requests;
create policy "admins update cashouts"
  on public.cashout_requests for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- (E) Mock Submissions
drop policy if exists "anyone can submit mock test" on public.mock_submissions;
create policy "anyone can submit mock test"
  on public.mock_submissions for insert to anon, authenticated with check (true);

drop policy if exists "anyone can read mock submissions" on public.mock_submissions;
create policy "anyone can read mock submissions"
  on public.mock_submissions for select to anon, authenticated using (true);

-- (F) Q&A Questions & Answers
drop policy if exists "anyone can read questions" on public.qa_questions;
create policy "anyone can read questions"
  on public.qa_questions for select to anon, authenticated using (true);

drop policy if exists "anyone can ask question" on public.qa_questions;
create policy "anyone can ask question"
  on public.qa_questions for insert to anon, authenticated with check (true);

drop policy if exists "anyone can read answers" on public.qa_answers;
create policy "anyone can read answers"
  on public.qa_answers for select to anon, authenticated using (true);

drop policy if exists "anyone can post answer" on public.qa_answers;
create policy "anyone can post answer"
  on public.qa_answers for insert to anon, authenticated with check (true);

-- ---------- 11. DEMO SEED DATA (For Immediate Verification) ----------
insert into public.profiles (phone, full_name, student_class, institution, points, streak_days, solved_count)
values 
  ('01711000001', 'তাহমিদ হাসান', '১০ম শ্রেণি', 'নটর ডেম কলেজ', 1450, 14, 145),
  ('01811000002', 'নুসরাত জাহান', '৮ম শ্রেণি', 'ভিকারুননিসা নূন স্কুল', 980, 7, 98),
  ('01911000003', 'রাহাত আল মামুন', '৫ম শ্রেণি', 'আইডিয়াল স্কুল ও কলেজ', 620, 5, 62)
on conflict (phone) do nothing;

insert into public.bookings (full_name, phone, bkash_number, transaction_id, status, student_class, institution)
values 
  ('আহমেদ সায়ান', '01712345678', '01712345678', 'BK992817AX', 'verified', 'Class 5', 'ঢাকা রেসিডেনসিয়াল মডেল কলেজ'),
  ('ফারহান কবির', '01987654321', '01987654321', 'BK773410PL', 'pending', 'Class 4', 'সেন্ট যোসেফ উচ্চ মাধ্যমিক বিদ্যালয়')
on conflict do nothing;
