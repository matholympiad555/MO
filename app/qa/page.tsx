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
} from "@phosphor-icons/react";

const TOPICS = ["সব", "সংখ্যাতত্ত্ব", "জ্যামিতি", "প্যাটার্ন ও যুক্তি", "গণনাতত্ত্ব", "সাধারণ"];

export default function QaForumPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState("সব");
  const [search, setSearch] = useState("");

  const loadQuestions = async () => {
    try {
      const res = await fetch("/api/qa");
      const data = await res.json();
      if (res.ok && data.success) {
        setQuestions(data.data);
      }
    } catch (err) {
      console.error(err);
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
    try {
      const res = await fetch(`/api/qa/${id}/vote`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === id ? { ...q, upvotes: data.upvotes } : q)),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = questions.filter((q) => {
    const matchesTopic = activeTopic === "সব" || q.topic === activeTopic;
    const matchesSearch =
      !search ||
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.body.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 container-x max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold">
              <ChatsCircle size={16} weight="bold" />
              <span>২৪/৭ গণিত জিজ্ঞাসা ও সমাধান</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-paper tracking-tight">
              অলিম্পিয়াড <span className="text-brand">প্রশ্নোত্তর ফোরাম</span>
            </h1>
            <p className="text-muted text-sm sm:text-base max-w-xl">
              গণিতের যেকোনো অলিম্পিয়াড সমস্যা বা কনসেপ্ট নিয়ে প্রশ্ন করো। মেন্টর ও সহপাঠীদের সাথে যুক্তি দিয়ে সমাধান খোঁজো।
            </p>
          </div>

          <Link
            href="/qa/ask"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand text-ink font-display font-bold text-sm sm:text-base hover:bg-brand-deep active:scale-95 transition-all shadow-lg shadow-brand/15 shrink-0"
          >
            <Plus size={18} weight="bold" />
            নতুন প্রশ্ন করো
          </Link>
        </div>

        {/* Search & Topic Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <MagnifyingGlass
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="যেকোনো প্রশ্ন বা বিষয় লিখে খুঁজুন..."
              className="w-full bg-ink-2/80 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/60"
            />
          </div>

          {/* Topic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeTopic === topic
                    ? "bg-brand text-ink border-brand"
                    : "bg-white/[0.03] text-paper/70 border-white/10 hover:border-white/20"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted text-sm">
            <div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin" />
            <p>প্রশ্নোত্তর লোড হচ্ছে...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-shell p-12 text-center space-y-4">
            <Sparkle size={48} className="text-brand mx-auto" />
            <h3 className="text-lg font-bold font-display text-paper">
              কোনো প্রশ্ন পাওয়া যায়নি
            </h3>
            <p className="text-sm text-muted">
              তোমার কি কোনো গণিত সমস্যা আটকে আছে? প্রথম প্রশ্নকারী হও!
            </p>
            <Link
              href="/qa/ask"
              className="inline-block px-5 py-2.5 rounded-full bg-brand text-ink text-xs font-bold"
            >
              প্রশ্ন জিজ্ঞেস করো
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((q) => (
              <Link
                key={q.id}
                href={`/qa/${q.id}`}
                className="block card-shell p-6 hover:border-brand/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-brand font-medium">
                        #{q.topic}
                      </span>
                      {q.is_solved && (
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1">
                          <CheckCircle size={14} weight="fill" /> মেন্টর সমাধানকৃত
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold font-display text-paper group-hover:text-brand transition-colors">
                      {q.title}
                    </h2>

                    <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                      {q.body}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted/80 pt-2">
                      <span>👤 {q.author_name} {q.author_class ? `(${q.author_class})` : ""}</span>
                      <span>💬 {q.answers?.length || 0}টি উত্তর</span>
                    </div>
                  </div>

                  {/* Upvote Button */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={(e) => handleVote(e, q.id)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-brand/15 hover:text-brand border border-white/10 text-muted transition-colors flex flex-col items-center gap-1 min-w-[3rem]"
                    >
                      <ThumbsUp size={18} weight="bold" />
                      <span className="font-mono text-xs font-bold">{q.upvotes || 0}</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
