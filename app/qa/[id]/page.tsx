"use client";

import { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import {
  ArrowLeft,
  ThumbsUp,
  CheckCircle,
  PaperPlaneRight,
  ShieldCheck,
  WarningCircle,
} from "@phosphor-icons/react";

export default function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ink text-paper">
          <div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <QuestionDetailAsync params={params} />
    </Suspense>
  );
}

function QuestionDetailAsync({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <QuestionDetailContent id={id} />;
}

function QuestionDetailContent({ id }: { id: string }) {

  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [authorName, setAuthorName] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [isMentor, setIsMentor] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadQuestion = async () => {
    try {
      const res = await fetch(`/api/qa/${id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setQuestion(data.data);
      } else {
        setError(data.error || "প্রশ্ন পাওয়া যায়নি।");
      }
    } catch {
      setError("সার্ভার ত্রুটি।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, [id]);

  const handleVote = async () => {
    try {
      const res = await fetch(`/api/qa/${id}/vote`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setQuestion((prev: any) => ({ ...prev, upvotes: data.upvotes }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !answerContent.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/qa/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: authorName,
          content: answerContent,
          is_mentor: isMentor,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAnswerContent("");
        await loadQuestion();
      } else {
        alert(data.error || "উত্তর জমা দেওয়া যায়নি।");
      }
    } catch {
      alert("সার্ভার ত্রুটি।");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink text-paper">
        <div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink text-paper p-4">
        <div className="card-shell p-8 text-center space-y-4 max-w-md">
          <WarningCircle size={40} className="text-red-400 mx-auto" />
          <p>{error || "প্রশ্ন পাওয়া যায়নি"}</p>
          <Link href="/qa" className="px-5 py-2 rounded-full bg-brand text-ink text-xs font-bold inline-block">
            তালিকায় ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 container-x max-w-4xl">
        <div className="mb-6">
          <Link
            href="/qa"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-paper transition-colors"
          >
            <ArrowLeft size={16} /> সকল প্রশ্নে ফিরুন
          </Link>
        </div>

        {/* Question Header Card */}
        <div className="card-shell p-6 sm:p-8 space-y-6 mb-10">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-brand font-medium">
                  #{question.topic}
                </span>
                {question.is_solved && (
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1">
                    <CheckCircle size={14} weight="fill" /> মেন্টর যাচাইকৃত সমাধান
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black font-display text-paper leading-tight">
                {question.title}
              </h1>

              <div className="text-xs text-muted flex items-center gap-3 pt-1">
                <span>👤 {question.author_name} {question.author_class ? `(${question.author_class})` : ""}</span>
                <span>•</span>
                <span>{new Date(question.created_at).toLocaleDateString("bn-BD")}</span>
              </div>
            </div>

            {/* Upvote Button */}
            <button
              onClick={handleVote}
              className="p-3 rounded-2xl bg-white/5 hover:bg-brand/15 hover:text-brand border border-white/10 text-muted transition-colors flex flex-col items-center gap-1 shrink-0"
            >
              <ThumbsUp size={22} weight="bold" />
              <span className="font-mono text-xs font-bold">{question.upvotes || 0}</span>
            </button>
          </div>

          <div className="border-t border-white/10 pt-5 text-paper/90 leading-relaxed text-base whitespace-pre-line">
            {question.body}
          </div>
        </div>

        {/* Answers List */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-display text-paper flex items-center gap-2">
            <span>সমাধান ও আলোচনা ({question.answers?.length || 0}টি)</span>
          </h2>

          {(!question.answers || question.answers.length === 0) ? (
            <div className="card-shell p-8 text-center text-muted text-sm">
              এখনও কোনো সমাধান দেওয়া হয়নি। তুমি কি এর সঠিক উত্তর জানো? নিচে লেখো!
            </div>
          ) : (
            question.answers.map((ans: any) => (
              <div
                key={ans.id}
                className={`card-shell p-6 sm:p-7 space-y-4 ${
                  ans.is_mentor
                    ? "border-brand/40 bg-gradient-to-br from-brand/[0.04] to-transparent shadow-lg shadow-brand/5"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        ans.is_mentor ? "bg-brand text-ink" : "bg-white/10 text-paper"
                      }`}
                    >
                      {ans.author_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-paper">{ans.author_name}</span>
                        {ans.is_mentor && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand/15 text-brand border border-brand/30 flex items-center gap-1">
                            <ShieldCheck size={14} weight="fill" /> মেন্টর
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted">
                        {new Date(ans.created_at).toLocaleDateString("bn-BD")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-paper/90 text-sm sm:text-base leading-relaxed whitespace-pre-line pl-10 border-l border-white/10">
                  {ans.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Answer Form */}
        <div className="card-shell p-6 sm:p-8 space-y-5">
          <h3 className="text-lg font-bold font-display text-paper">
            তোমার সমাধান বা ব্যাখ্যা লিখুন
          </h3>

          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-paper/80">তোমার নাম *</label>
                <input
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="উদাঃ তামিম ইকবাল"
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
              </div>

              <div className="space-y-1.5 flex items-end pb-2">
                <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isMentor}
                    onChange={(e) => setIsMentor(e.target.checked)}
                    className="size-4 rounded accent-brand"
                  />
                  <span>আমি অফিসিয়াল মেন্টর হিসেবে উত্তর দিচ্ছি</span>
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-paper/80">
                ধাপে ধাপে সমাধান বা উত্তর *
              </label>
              <textarea
                required
                rows={4}
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="সমস্যাটির সহজ ব্যাখ্যা বা গাণিতিক যুক্তি বিশদভাবে লেখো..."
                className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-ink font-bold text-sm hover:bg-brand-deep active:scale-95 transition-all disabled:opacity-50"
            >
              <PaperPlaneRight size={18} weight="bold" />
              {submitting ? "পাঠানো হচ্ছে..." : "সমাধান সাবমিট করো"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
