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
  ChatsCircle,
  User,
  CalendarBlank,
  Tag,
  Sparkle,
  ShareNetwork,
  Lightbulb,
} from "@phosphor-icons/react";
import { renderFormattedMath } from "@/lib/math-format";

export default function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
          <div className="w-8 h-8 border-3 border-[#28a745] border-t-transparent rounded-full animate-spin" />
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
  const [hasVoted, setHasVoted] = useState(false);
  const [copied, setCopied] = useState(false);

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
    if (hasVoted) return;
    setHasVoted(true);
    // Optimistic update
    setQuestion((prev: any) => ({
      ...prev,
      upvotes: (prev?.upvotes || 0) + 1,
    }));

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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        <div className="text-center space-y-3">
          <div className="w-9 h-9 border-3 border-[#28a745] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">প্রশ্নোত্তর বিস্তারিত লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 p-4">
        <div className="p-8 text-center space-y-4 max-w-md bg-white border border-slate-200 rounded-3xl shadow-sm">
          <WarningCircle size={44} className="text-rose-600 mx-auto" weight="fill" />
          <h2 className="text-xl font-bold font-shadhinata text-slate-900">
            প্রশ্ন খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-slate-600 text-sm">{error || "অনুরোধকৃত আলোচনাটি বিদ্যমান নয়।"}</p>
          <Link
            href="/qa"
            className="px-6 py-2.5 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold inline-block shadow-sm"
          >
            কমিউনিটি ফোরামে ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  // Separate mentor verified answers from community replies
  const mentorAnswers = question.answers?.filter((a: any) => a.is_mentor) || [];
  const peerAnswers = question.answers?.filter((a: any) => !a.is_mentor) || [];

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#F8FAFC] pt-10 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/qa"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#28a745] transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>সকল আলোচনা তালিকায় ফিরুন</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 transition-colors shadow-2xs"
            >
              <ShareNetwork size={16} />
              <span>{copied ? "লিংক কপি হয়েছে!" : "শেয়ার করো"}</span>
            </button>
          </div>

          {/* Question Details Header Card */}
          <article className="bg-white border border-slate-200/90 shadow-sm rounded-3xl p-6 sm:p-9 space-y-6 mb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                {/* Topic and solved status */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center gap-1">
                    <Tag size={13} weight="bold" />
                    #{question.topic}
                  </span>

                  {question.is_solved && (
                    <span className="text-xs px-3 py-1 rounded-md bg-[#28a745]/10 text-[#218838] border border-[#28a745]/30 font-bold flex items-center gap-1.5">
                      <CheckCircle size={15} weight="fill" />
                      মেন্টর সমাধানকৃত
                    </span>
                  )}
                </div>

                {/* Question Title in font-shadhinata */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-shadhinata text-slate-900 leading-tight">
                  {question.title}
                </h1>

                {/* Author Info & Date */}
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-4 pt-1 font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="size-6 rounded-full bg-emerald-100 text-[#28a745] font-bold flex items-center justify-center text-xs">
                      {question.author_name ? question.author_name.charAt(0) : "U"}
                    </div>
                    <span className="font-semibold text-slate-800">
                      {question.author_name}
                    </span>
                    {question.author_class && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">
                        {question.author_class}
                      </span>
                    )}
                  </div>

                  <span className="text-slate-300">•</span>

                  <div className="flex items-center gap-1.5 text-slate-500">
                    <CalendarBlank size={14} />
                    <span>{new Date(question.created_at).toLocaleDateString("bn-BD")}</span>
                  </div>
                </div>
              </div>

              {/* Upvote Button */}
              <button
                onClick={handleVote}
                className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col items-center gap-1 shrink-0 ${
                  hasVoted
                    ? "bg-emerald-50 border-[#28a745] text-[#28a745] shadow-xs"
                    : "bg-slate-50 hover:bg-emerald-50/60 hover:text-[#28a745] hover:border-emerald-200 border-slate-200 text-slate-600"
                }`}
                title="প্রশ্নটি ভালো লাগলে ভোট দিন"
              >
                <ThumbsUp size={22} weight={hasVoted ? "fill" : "bold"} />
                <span className="font-mono text-xs sm:text-sm font-bold">
                  {question.upvotes || 0}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider">ভোট</span>
              </button>
            </div>

            {/* Question Body with Math Formulas */}
            <div className="border-t border-slate-100 pt-5 text-slate-800 leading-relaxed text-base sm:text-lg">
              {renderFormattedMath(question.body)}
            </div>
          </article>

          {/* DISTINCTIVE: মেন্টর কর্তৃক যাচাইকৃত সমাধান Card */}
          {mentorAnswers.length > 0 && (
            <section className="mb-10 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={24} weight="fill" className="text-[#28a745]" />
                <h2 className="text-xl sm:text-2xl font-bold font-shadhinata text-slate-900">
                  মেন্টর কর্তৃক যাচাইকৃত সমাধান
                </h2>
              </div>

              {mentorAnswers.map((mentorAns: any) => (
                <div
                  key={mentorAns.id}
                  className="relative overflow-hidden rounded-3xl border-2 border-[#28a745]/60 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 p-6 sm:p-9 shadow-md shadow-emerald-700/5 space-y-5"
                >
                  {/* Verified Ribbon Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-2xl bg-[#28a745] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        <CheckCircle size={26} weight="fill" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-base sm:text-lg">
                            {mentorAns.author_name}
                          </span>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#28a745] text-white flex items-center gap-1 shadow-2xs">
                            <ShieldCheck size={14} weight="fill" />
                            অফিসিয়াল মেন্টর
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          যাচাইকৃত সমাধানের তারিখ: {new Date(mentorAns.created_at).toLocaleDateString("bn-BD")}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100/90 text-[#218838] border border-emerald-300 text-xs font-bold">
                      <Sparkle size={14} weight="fill" />
                      <span>ভেরিফায়েড অলিম্পিয়াড সলিউশন</span>
                    </div>
                  </div>

                  {/* Math Solution Body */}
                  <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-2">
                    {renderFormattedMath(mentorAns.content)}
                  </div>

                  {/* Helpful note */}
                  <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Lightbulb size={16} weight="fill" className="text-amber-500" />
                      এই সমাধানটি মেন্টর প্যানেল দ্বারা পর্যালোচিত ও নির্ভুল প্রমাণিত।
                    </span>
                    <span className="font-mono font-semibold text-emerald-700">
                      👍 {mentorAns.upvotes || 1} জনের কাছে সহায়ক
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Community Solutions & Comments List */}
          <section className="space-y-6 mb-12">
            <h2 className="text-xl font-bold font-shadhinata text-slate-900 flex items-center gap-2">
              <ChatsCircle size={22} className="text-[#28a745]" />
              <span>সহপাঠী ও অন্যান্য সমাধান ({peerAnswers.length}টি)</span>
            </h2>

            {peerAnswers.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-7 text-center space-y-2 text-slate-500 text-sm">
                <p>এখনও কোনো সহপাঠীর উত্তর যুক্ত হয়নি।</p>
                <p className="text-xs text-slate-400">
                  তুমি কি অন্য কোনো বিকল্প উপায়ে এটি সমাধান করতে পারো? নিচের বক্সে তোমার চিন্তা শেয়ার করো!
                </p>
              </div>
            ) : (
              peerAnswers.map((ans: any) => (
                <div
                  key={ans.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-200">
                        {ans.author_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{ans.author_name}</div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(ans.created_at).toLocaleDateString("bn-BD")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-slate-800 text-sm leading-relaxed pl-10 border-l-2 border-slate-100">
                    {renderFormattedMath(ans.content)}
                  </div>
                </div>
              ))
            )}
          </section>

          {/* Reply Submission Form */}
          <section className="bg-white border border-slate-200/90 shadow-sm rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold font-shadhinata text-slate-900">
                তোমার সমাধান বা গাণিতিক যুক্তি যোগ করো
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                যেকোনো স্পষ্ট পদ্ধতি, যুক্তি বা সমীকরণ দিয়ে সমাধান লিখতে পারো। সমীকরণ লিখতে $...$ ব্যবহার করো।
              </p>
            </div>

            <form onSubmit={handleAnswerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">তোমার নাম *</label>
                  <input
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="উদাঃ সাকিব আহমেদ"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] focus:ring-1 focus:ring-[#28a745] outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5 flex items-end pb-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white w-full">
                    <input
                      type="checkbox"
                      checked={isMentor}
                      onChange={(e) => setIsMentor(e.target.checked)}
                      className="size-4 rounded accent-[#28a745]"
                    />
                    <span>আমি অফিসিয়াল মেন্টর হিসেবে যাচাইকৃত উত্তর দিচ্ছি</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    ধাপে ধাপে সমাধান বা উত্তর *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {"টিপ: $x^2 + y^2 = 25$ বা $$\\binom{n}{r}$$ লিখতে পারো"}
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                  placeholder="সমস্যাটির সহজ ব্যাখ্যা বা গাণিতিক যুক্তি বিশদভাবে লেখো..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] focus:ring-1 focus:ring-[#28a745] outline-none resize-none leading-relaxed placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#28a745] hover:bg-[#218838] active:scale-95 text-white font-bold text-sm shadow-md shadow-[#28a745]/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <PaperPlaneRight size={18} weight="bold" />
                  <span>{submitting ? "পাঠানো হচ্ছে..." : "সমাধান সাবমিট করো"}</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
