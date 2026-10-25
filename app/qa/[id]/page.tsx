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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
          <div className="w-8 h-8 border-3 border-blue-700 border-t-transparent rounded-full animate-spin" />
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="w-8 h-8 border-3 border-blue-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 p-4">
        <div className="card-shell p-8 text-center space-y-4 max-w-md bg-white border border-slate-200 rounded-3xl shadow-sm">
          <WarningCircle size={40} className="text-rose-600 mx-auto" />
          <p className="text-slate-700">{error || "প্রশ্ন পাওয়া যায়নি"}</p>
          <Link href="/qa" className="px-5 py-2 rounded-xl bg-blue-700 text-white text-xs font-bold inline-block">
            তালিকায় ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-12 pb-24 container-x max-w-4xl">
        <div className="mb-6">
          <Link
            href="/qa"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={16} /> সকল প্রশ্নে ফিরুন
          </Link>
        </div>

        {/* Question Header Card */}
        <div className="card-shell p-7 sm:p-9 space-y-6 mb-10 bg-white border border-slate-200/90 shadow-lg rounded-3xl">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-blue-800 font-bold">
                  #{question.topic}
                </span>
                {question.is_solved && (
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
                    <CheckCircle size={14} weight="fill" /> মেন্টর যাচাইকৃত সমাধান
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 leading-tight">
                {question.title}
              </h1>

              <div className="text-xs text-slate-500 flex items-center gap-3 pt-1 font-medium">
                <span>👤 {question.author_name} {question.author_class ? `(${question.author_class})` : ""}</span>
                <span>•</span>
                <span>{new Date(question.created_at).toLocaleDateString("bn-BD")}</span>
              </div>
            </div>

            {/* Upvote Button */}
            <button
              onClick={handleVote}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-600 transition-colors flex flex-col items-center gap-1 shrink-0"
            >
              <ThumbsUp size={22} weight="bold" />
              <span className="font-mono text-xs font-bold">{question.upvotes || 0}</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-5 text-slate-800 leading-relaxed text-base whitespace-pre-line">
            {question.body}
          </div>
        </div>

        {/* Answers List */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
            <span>সমাধান ও আলোচনা ({question.answers?.length || 0}টি)</span>
          </h2>

          {(!question.answers || question.answers.length === 0) ? (
            <div className="card-shell p-8 text-center text-slate-500 text-sm bg-white border border-slate-200 rounded-2xl">
              এখনও কোনো সমাধান দেওয়া হয়নি। তুমি কি এর সঠিক উত্তর জানো? নিচে লেখো!
            </div>
          ) : (
            question.answers.map((ans: any) => (
              <div
                key={ans.id}
                className={`card-shell p-6 sm:p-7 space-y-4 bg-white border rounded-2xl shadow-sm ${
                  ans.is_mentor
                    ? "border-blue-400 bg-gradient-to-br from-blue-50/40 to-white shadow-md"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        ans.is_mentor ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {ans.author_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{ans.author_name}</span>
                        {ans.is_mentor && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                            <ShieldCheck size={14} weight="fill" /> মেন্টর
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {new Date(ans.created_at).toLocaleDateString("bn-BD")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line pl-10 border-l border-slate-200">
                  {ans.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Answer Form */}
        <div className="card-shell p-7 sm:p-8 space-y-5 bg-white border border-slate-200/90 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold font-display text-slate-900">
            তোমার সমাধান বা ব্যাখ্যা লিখুন
          </h3>

          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">তোমার নাম *</label>
                <input
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="উদাঃ তামিম ইকবাল"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
                />
              </div>

              <div className="space-y-1.5 flex items-end pb-2">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isMentor}
                    onChange={(e) => setIsMentor(e.target.checked)}
                    className="size-4 rounded accent-blue-700"
                  />
                  <span>আমি অফিসিয়াল মেন্টর হিসেবে উত্তর দিচ্ছি</span>
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                ধাপে ধাপে সমাধান বা উত্তর *
              </label>
              <textarea
                required
                rows={4}
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="সমস্যাটির সহজ ব্যাখ্যা বা গাণিতিক যুক্তি বিশদভাবে লেখো..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-700/20 active:scale-95 transition-all disabled:opacity-50"
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
