"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import {
  ChatsCircle,
  ThumbsUp,
  CheckCircle,
  Plus,
  MagnifyingGlass,
  ArrowRight,
  Sparkle,
  ShieldCheck,
  ChatDots,
  UsersThree,
  Funnel,
  TrendUp,
} from "@phosphor-icons/react";
import { renderFormattedMath } from "@/lib/math-format";

const FILTER_CHIPS = [
  "সকল আলোচনা",
  "সংখ্যাতত্ত্ব",
  "জ্যামিতি",
  "বীজগণিত",
  "কম্বিনেটোরিক্স",
  "মেন্টর সমাধানকৃত",
];

export default function QaForumPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChip, setActiveChip] = useState("সকল আলোচনা");
  const [search, setSearch] = useState("");
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({});

  const loadQuestions = async () => {
    try {
      const res = await fetch("/api/qa");
      const data = await res.json();
      if (res.ok && data.success) {
        setQuestions(data.data);
      }
    } catch (err) {
      console.error("Failed to load QA:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleVote = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic UI update
    const alreadyVoted = votedIds[id];
    setVotedIds((prev) => ({ ...prev, [id]: true }));
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, upvotes: (q.upvotes || 0) + (alreadyVoted ? 0 : 1) } : q
      )
    );

    if (alreadyVoted) return;

    try {
      const res = await fetch(`/api/qa/${id}/vote`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === id ? { ...q, upvotes: data.upvotes } : q))
        );
      }
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  const filtered = questions.filter((q) => {
    // Filter chip logic
    let matchesChip = true;
    if (activeChip === "সকল আলোচনা") {
      matchesChip = true;
    } else if (activeChip === "মেন্টর সমাধানকৃত") {
      matchesChip = Boolean(q.is_solved);
    } else {
      matchesChip = q.topic === activeChip;
    }

    // Search query logic
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      q.title.toLowerCase().includes(term) ||
      q.body.toLowerCase().includes(term) ||
      (q.author_name && q.author_name.toLowerCase().includes(term));

    return matchesChip && matchesSearch;
  });

  const totalQuestions = questions.length;
  const solvedCount = questions.filter((q) => q.is_solved).length;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#F8FAFC] pb-24">
        {/* GonitZoggo Top Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          {/* Subtle math grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#28a745 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              backgroundPosition: "0 0, 16px 16px",
            }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
                <span className="size-2 rounded-full bg-[#28a745] animate-ping" />
                <ChatsCircle size={16} weight="bold" />
                <span>community.gonitzoggo.com • ২৪/৭ উন্মুক্ত গণিত ফোরাম</span>
              </div>

              <div className="hidden sm:flex items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ChatDots size={16} className="text-emerald-400" />
                  <span>{totalQuestions}টি আলোচনা</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#28a745]" />
                  <span>{solvedCount}টি মেন্টর সমাধান</span>
                </div>
              </div>
            </div>

            {/* Title & Action Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-shadhinata tracking-wide text-white leading-tight">
                  কমিউনিটি ও প্রশ্নোত্তর ফোরাম
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  গণিত অলিম্পিয়াডের যেকোনো কঠিন সমস্যা, উপপাদ্য বা গাণিতিক ধারণা নিয়ে আলোচনা করো।
                  জাতীয় অলিম্পিয়াড মেন্টর ও সহপাঠীদের সাথে যুক্তি দিয়ে সমাধান আবিষ্কার করো।
                </p>
              </div>

              {/* + নতুন প্রশ্ন করো button in #28a745 */}
              <Link
                href="/qa/ask"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#28a745] hover:bg-[#218838] active:scale-95 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#28a745]/30 shrink-0 border border-emerald-400/40"
              >
                <Plus size={20} weight="bold" />
                + নতুন প্রশ্ন করো
              </Link>
            </div>
          </div>
        </section>

        {/* Filters and Discussion List */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          {/* Search Box Card */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200 mb-6">
            <div className="relative">
              <MagnifyingGlass
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="যেকোনো প্রশ্ন, বিষয়, উপপাদ্য বা লেখক লিখে খুঁজুন..."
                className="w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200/90 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-900 focus:border-[#28a745] focus:ring-2 focus:ring-[#28a745]/20 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none border-t border-slate-100 mt-3">
              <span className="text-xs font-bold text-slate-400 pl-1 shrink-0 flex items-center gap-1">
                <Funnel size={14} /> ফিল্টার:
              </span>
              {FILTER_CHIPS.map((chip) => {
                const isActive = activeChip === chip;
                const isMentorSolvedChip = chip === "মেন্টর সমাধানকৃত";

                return (
                  <button
                    key={chip}
                    onClick={() => setActiveChip(chip)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-[#28a745] text-white border-[#28a745] shadow-sm shadow-[#28a745]/20"
                        : isMentorSolvedChip
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {isMentorSolvedChip && <CheckCircle size={14} weight="fill" />}
                    <span>{chip}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Info & Count */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
            <span>
              প্রদর্শিত হচ্ছে: <strong className="text-slate-800">{filtered.length}টি</strong> আলোচনা ({activeChip})
            </span>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-rose-600 hover:underline font-semibold"
              >
                অনুসন্ধান বাতিল করো
              </button>
            )}
          </div>

          {/* Questions Stream */}
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500 text-sm bg-white rounded-3xl border border-slate-200/80 p-12">
              <div className="w-9 h-9 border-3 border-[#28a745] border-t-transparent rounded-full animate-spin" />
              <p className="font-semibold text-slate-600">আলোচনা লোড হচ্ছে...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center space-y-4 bg-white border border-slate-200 rounded-3xl shadow-sm">
              <div className="size-16 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto">
                <Sparkle size={32} weight="fill" />
              </div>
              <h3 className="text-xl font-bold font-shadhinata text-slate-900">
                কোনো আলোচনা পাওয়া যায়নি
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                এই ক্যাটাগরিতে এখনও কোনো প্রশ্ন করা হয়নি। তুমি কি গণিত নিয়ে ভাবছো? প্রথম প্রশ্নকারী হও!
              </p>
              <Link
                href="/qa/ask"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white text-sm font-bold shadow-md shadow-[#28a745]/20"
              >
                <Plus size={16} weight="bold" />
                নতুন প্রশ্ন করো
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((q) => {
                const answerCount = q.answers?.length || 0;

                return (
                  <Link
                    key={q.id}
                    href={`/qa/${q.id}`}
                    className="group block bg-white border border-slate-200/90 hover:border-emerald-500/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Upvote Counter Box */}
                      <div className="shrink-0">
                        <button
                          onClick={(e) => handleVote(e, q.id)}
                          title="ভোট দিন"
                          className={`flex flex-col items-center justify-center w-12 sm:w-14 py-2.5 rounded-xl border transition-all ${
                            votedIds[q.id]
                              ? "bg-emerald-50 border-[#28a745] text-[#28a745] shadow-xs"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-emerald-50/60 hover:text-[#28a745] hover:border-emerald-200"
                          }`}
                        >
                          <ThumbsUp size={18} weight={votedIds[q.id] ? "fill" : "bold"} />
                          <span className="font-mono text-xs sm:text-sm font-bold mt-0.5">
                            {q.upvotes || 0}
                          </span>
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0 space-y-2.5">
                        {/* Topic Tags & Solved Badge */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 font-bold">
                            #{q.topic}
                          </span>

                          {q.is_solved && (
                            <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#28a745]/10 text-[#218838] border border-[#28a745]/30 font-bold flex items-center gap-1">
                              <CheckCircle size={14} weight="fill" />
                              মেন্টর সমাধান আছে
                            </span>
                          )}
                        </div>

                        {/* Question Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                          {q.title}
                        </h2>

                        {/* Question Body Excerpt */}
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {q.body}
                        </p>

                        {/* Card Footer: Author badge, reply count, and time */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            {/* Author Badge */}
                            <div className="size-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[11px] shrink-0">
                              {q.author_name ? q.author_name.charAt(0) : "U"}
                            </div>
                            <span className="font-semibold text-slate-800">
                              {q.author_name}
                            </span>
                            {q.author_class && (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">
                                {q.author_class}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Reply Count Badge */}
                            <span className="inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                              <ChatDots size={14} weight="fill" className="text-emerald-600" />
                              {answerCount}টি উত্তর
                            </span>

                            {/* Date */}
                            <span className="text-slate-400 hidden sm:inline">
                              {new Date(q.created_at).toLocaleDateString("bn-BD")}
                            </span>

                            <span className="text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold text-[11px]">
                              দেখুন <ArrowRight size={12} weight="bold" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
