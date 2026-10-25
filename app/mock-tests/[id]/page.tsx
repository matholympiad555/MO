"use client";

import { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle,
  WarningCircle,
  ArrowLeft,
  ArrowRight,
  Flag,
  ArrowCounterClockwise,
  Check,
  X,
  Trophy,
  Lightbulb,
  Exam,
  Sparkle,
  HourglassHigh,
  ListNumbers,
  House,
  ShieldCheck,
  CheckSquareOffset,
} from "@phosphor-icons/react";

type QuestionReview = {
  id: string;
  question: string;
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
};

type ResultData = {
  submission_id: string;
  test_title: string;
  score: number;
  total: number;
  percentage: number;
  time_taken_seconds: number;
  review: QuestionReview[];
};

const BENGALI_NUMERALS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];
const toBengaliNumber = (num: number): string => {
  return String(num).replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[parseInt(digit)]);
};

export default function MockTestRunnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F6F4] flex items-center justify-center text-slate-800">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#0072c6] border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 font-medium text-sm">কন্টেস্ট পোর্টাল লোড হচ্ছে...</p>
          </div>
        </div>
      }
    >
      <MockTestRunnerAsync params={params} />
    </Suspense>
  );
}

function MockTestRunnerAsync({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <MockTestRunner id={id} />;
}

function MockTestRunner({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);

  const [studentName, setStudentName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  // Fetch test questions
  useEffect(() => {
    async function loadTest() {
      try {
        const res = await fetch(`/api/mock-tests/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || "টেস্ট লোড করা যায়নি।");
        } else {
          setTest(data.data);
          setTimeLeft((data.data.duration_minutes || 30) * 60);
        }
      } catch {
        setError("সার্ভার ত্রুটি। অনুগ্রহ করে রিফ্রেশ করুন।");
      } finally {
        setLoading(false);
      }
    }
    loadTest();
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (!hasStarted || result || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted, result, timeLeft]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSubmitTest = async (auto = false) => {
    if (!test || isSubmitting) return;
    setIsSubmitting(true);
    setShowConfirmModal(false);

    const totalSeconds = (test.duration_minutes || 30) * 60;
    const timeTaken = totalSeconds - timeLeft;

    try {
      const res = await fetch(`/api/mock-tests/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: studentName.trim() || "শিক্ষার্থী",
          answers,
          time_taken_seconds: timeTaken > 0 ? timeTaken : 1,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert(data.error || "সাবমিট করতে সমস্যা হয়েছে।");
      }
    } catch {
      alert("সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6F4] text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0072c6] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium text-sm">অলিম্পিয়াড প্রশ্নপত্র প্রস্তুত হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6F4] text-slate-800 p-4">
        <div className="max-w-md w-full text-center space-y-4 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <WarningCircle size={48} className="text-rose-600 mx-auto" />
          <h2 className="text-xl font-bold font-shadhinata text-slate-900">{error || "টেস্ট পাওয়া যায়নি"}</h2>
          <p className="text-sm text-slate-600">অনুগ্রহ করে মক টেস্টের মূল তালিকায় ফিরে যান।</p>
          <Link
            href="/mock-tests"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0072c6] text-white font-bold text-sm hover:bg-[#005a9e] transition-all"
          >
            <ArrowLeft size={16} /> মক টেস্ট তালিকায় ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  // ----------------- PRE-START BRIEFING SCREEN -----------------
  if (!hasStarted && !result) {
    return (
      <div className="min-h-screen bg-[#F6F6F4] flex flex-col justify-between">
        {/* GonitZoggo Styled Portal Header */}
        <header className="bg-[#0072c6] text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/mock-tests" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <ArrowLeft size={18} weight="bold" />
              <span className="text-sm font-semibold">সকল টেস্টে ফিরে যান</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center text-sm font-serif">∑</span>
              <span className="font-shadhinata font-bold text-base hidden sm:inline">বাংলার গণিত অলিম্পিয়াড</span>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-10 w-full flex-1 flex items-center justify-center">
          <div className="w-full bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 space-y-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  লাইভ অলিম্পিয়াড কন্টেস্ট
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0072c6]">
                {test.difficulty || "অলিম্পিয়াড স্ট্যান্ডার্ড"}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-shadhinata text-slate-900 leading-tight">
                {test.title}
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{test.description}</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 py-4 bg-[#F6F6F4] rounded-xl border border-slate-200/80 text-center">
              <div>
                <div className="text-2xl font-bold font-shadhinata text-[#0072c6]">
                  {toBengaliNumber(test.questions.length)}টি
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">মোট প্রশ্ন</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-shadhinata text-[#28a745]">
                  {toBengaliNumber(test.duration_minutes || 30)} মিনিট
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">নির্ধারিত সময়</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-shadhinata text-amber-600">
                  {toBengaliNumber(test.total_marks || 10)} নম্বর
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">পূর্ণমান</div>
              </div>
            </div>

            {/* Student Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>তোমার নাম (ঐচ্ছিক):</span>
                <span className="text-slate-400 font-normal">রিপোর্ট কার্ডে প্রদর্শিত হবে</span>
              </label>
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="উদাঃ আবরার ফাইয়াজ"
                className="w-full bg-[#F6F6F4]/50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all"
              />
            </div>

            {/* Rules Check */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-[#0072c6] flex items-center gap-1.5">
                <ShieldCheck size={16} weight="bold" />
                <span>কন্টেস্ট শুরু করার পূর্বে নিশ্চিত করো:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                <li>৩০ মিনিট সময় অবিচ্ছিন্নভাবে চালু থাকবে।</li>
                <li>যেকোনো প্রশ্নের উত্তরে ক্লিক করে পরিবর্তন বা বাতিল করা যাবে।</li>
                <li>পরীক্ষা শেষে প্রতিটি প্রশ্নের বিস্তারিত বাংলা সমাধান উন্মুক্ত হবে।</li>
              </ul>
            </div>

            {/* Start Button - GonitZoggo Green */}
            <button
              onClick={() => setHasStarted(true)}
              className="w-full py-3.5 rounded-xl bg-[#28a745] hover:bg-[#218838] active:scale-98 text-white font-shadhinata font-bold text-lg shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
            >
              <span>কন্টেস্টে অংশগ্রহণ শুরু করো</span>
              <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
          GonitZoggo Inspired Mock Engine • বাংলাদেশ গণিত অলিম্পিয়াড প্রস্তুতি প্ল্যাটফর্ম
        </footer>
      </div>
    );
  }

  // ----------------- RESULTS SCREEN -----------------
  if (result) {
    const formatTime = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${toBengaliNumber(m)} মিনিট ${toBengaliNumber(s)} সেকেন্ড`;
    };

    const getVerdict = (pct: number) => {
      if (pct >= 80)
        return {
          title: "অসাধারণ পারফরম্যান্স! 🌟",
          badge: "অলিম্পিয়াড চ্যাম্পিয়ন লেভেল",
          msg: "তোমার অলিম্পিয়াড প্রস্তুতি চমৎকার স্তরে রয়েছে! এই ধারাবাহিকতা ধরে রাখলে মূল অলিম্পিয়াডে চমৎকার ফলাফল নিশ্চিত।",
        };
      if (pct >= 60)
        return {
          title: "বেশ ভালো প্রস্তুতি! 🎯",
          badge: "অলিম্পিয়াড কোয়ালিফাইং লেভেল",
          msg: "তোমার প্রাথমিক ধারণা ও গাণিতিক ভিত্তি বেশ স্পষ্ট। নিচের ব্যাখ্যাগুলো পড়ে ট্রিকি সমস্যাগুলো আরেকটু ঝালাই করে নাও।",
        };
      return {
        title: "আরও অনুশীলনের সুযোগ আছে! 📚",
        badge: "অনুশীলনকারী লেভেল",
        msg: "হতাশ হওয়ার কিছু নেই। অলিম্পিয়াডের প্রশ্নগুলো চিন্তা করার কৌশল শেখায়। নিচের প্রতিটি প্রশ্নের পূর্ণাঙ্গ বাংলা সমাধান দেখে নাও।",
      };
    };

    const verdict = getVerdict(result.percentage);

    return (
      <div className="min-h-screen bg-[#F6F6F4] flex flex-col justify-between">
        {/* Top Header */}
        <header className="bg-[#0072c6] text-white shadow-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/mock-tests" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <ArrowLeft size={18} weight="bold" />
              <span className="text-sm font-semibold">সকল কন্টেস্টে ফিরুন</span>
            </Link>
            <div className="font-shadhinata font-bold text-base">
              ফলাফল ও সমাধান বিশ্লেষণ
            </div>
            <Link href="/" className="text-white/80 hover:text-white text-xs">
              মূল পাতা
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-10 w-full flex-1 space-y-8">
          {/* Result Summary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 text-center space-y-6 shadow-sm">
            <div className="inline-flex items-center justify-center size-20 rounded-full bg-blue-50 border border-blue-100 text-[#0072c6] mx-auto shadow-inner">
              <Trophy size={44} weight="fill" />
            </div>

            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-2">
                {verdict.badge}
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-shadhinata text-slate-900">
                {verdict.title}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg mx-auto leading-relaxed">
                {verdict.msg}
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-5 border-y border-slate-100">
              <div>
                <div className="text-3xl font-bold font-shadhinata text-[#0072c6]">
                  {toBengaliNumber(result.score)} / {toBengaliNumber(result.total)}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">অর্জিত নম্বর</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-shadhinata text-[#28a745]">
                  {toBengaliNumber(result.percentage)}%
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">সঠিকতার হার</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold font-shadhinata text-slate-800 pt-1">
                  {formatTime(result.time_taken_seconds)}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">ব্যয়িত সময়</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                  setFlagged({});
                  setCurrentIndex(0);
                  setTimeLeft((test.duration_minutes || 30) * 60);
                  setHasStarted(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0072c6] hover:bg-[#005a9e] text-white font-bold text-sm shadow-md transition-all"
              >
                <ArrowCounterClockwise size={18} weight="bold" />
                <span>আবার পরীক্ষা দাও</span>
              </button>
              <Link
                href="/mock-tests"
                className="px-6 py-3 rounded-xl bg-[#F6F6F4] text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-all border border-slate-200"
              >
                অন্যান্য মক টেস্ট দেখুন
              </Link>
            </div>
          </div>

          {/* Detailed Solutions Breakdown */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-shadhinata text-slate-900">
                  স্টেপ-বাই-স্টেপ বাংলা অলিম্পিয়াড সমাধান
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  প্রতিটি প্রশ্নের লজিক, শর্টকাট ও বিস্তারিত ব্যাখ্যা
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
                মোট {toBengaliNumber(result.review.length)}টি সমাধান
              </span>
            </div>

            {result.review.map((item, idx) => {
              const bengaliLabels = ["(ক)", "(খ)", "(গ)", "(ঘ)"];
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs transition-all ${
                    item.isCorrect ? "border-emerald-300" : "border-rose-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-shadhinata">
                      প্রশ্ন নং {toBengaliNumber(idx + 1)}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        item.isCorrect
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {item.isCorrect ? "✓ সঠিক উত্তর (+১)" : "✗ ভুল / অনুত্তরিত (০)"}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
                    {item.question}
                  </p>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {item.options.map((opt, optIdx) => {
                      const isCorrectOption = optIdx === item.correctIndex;
                      const isStudentChoice = optIdx === item.selectedIndex;

                      let style = "bg-[#F6F6F4]/60 border-slate-200 text-slate-700";
                      if (isCorrectOption) {
                        style = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold";
                      } else if (isStudentChoice && !isCorrectOption) {
                        style = "bg-rose-50 border-rose-300 text-rose-950";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3.5 rounded-xl border text-sm flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs opacity-75">
                              {bengaliLabels[optIdx]}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isCorrectOption && (
                            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                              <Check size={15} weight="bold" /> সঠিক উত্তর
                            </span>
                          )}
                          {isStudentChoice && !isCorrectOption && (
                            <span className="text-xs text-rose-700 font-bold flex items-center gap-1">
                              <X size={15} weight="bold" /> তোমার পছন্দ
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm space-y-1.5 text-slate-800">
                    <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb size={16} weight="fill" className="text-amber-600" />
                      <span>অলিম্পিয়াড বিশ্লেষণ ও সমাধান কৌশল:</span>
                    </div>
                    <p className="leading-relaxed font-sans text-slate-700">{item.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
          বাংলার গণিত অলিম্পিয়াড • GonitZoggo Online Contest Engine
        </footer>
      </div>
    );
  }

  // ----------------- ACTIVE TEST RUNNER -----------------
  const currentQ = test.questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isTimeCritical = timeLeft < 180; // less than 3 minutes
  const answeredCount = Object.keys(answers).length;
  const bengaliOptions = ["ক", "খ", "গ", "ঘ"];

  return (
    <div className="min-h-screen bg-[#F6F6F4] flex flex-col justify-between font-sans">
      {/* GonitZoggo Styled Fixed Top Bar in #0072c6 */}
      <header className="sticky top-0 z-40 bg-[#0072c6] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand & Contest Title */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-white/20 text-white font-serif flex items-center justify-center text-base shrink-0 shadow-inner">
              ∑
            </span>
            <div className="min-w-0">
              <div className="text-[11px] text-blue-100 font-semibold uppercase tracking-wider hidden sm:block">
                লাইভ অলিম্পিয়াড পোর্টাল
              </div>
              <h2 className="text-sm sm:text-base font-bold font-shadhinata text-white truncate max-w-xs sm:max-w-md">
                {test.title}
              </h2>
            </div>
          </div>

          {/* Center Countdown Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold text-sm sm:text-base border transition-all ${
              isTimeCritical
                ? "bg-rose-600 border-rose-400 text-white animate-pulse shadow-md shadow-rose-900/30"
                : "bg-white/15 border-white/25 text-white backdrop-blur-xs"
            }`}
            title="অবশিষ্ট সময়"
          >
            <Clock size={18} weight="bold" className={isTimeCritical ? "animate-spin" : ""} />
            <span>{timeFormatted}</span>
            <span className="text-[11px] opacity-80 hidden sm:inline">বাকি</span>
          </div>

          {/* Submit Button - GonitZoggo Green */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-[#28a745] hover:bg-[#218838] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <CheckSquareOffset size={16} weight="bold" />
            <span>সাবমিট করো</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Problem Statement Box (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Header row: Question Number & Flag */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0072c6] font-shadhinata">
                  প্রশ্ন {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(test.questions.length)}
                </span>
                {currentQ.topic && (
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#F6F6F4] text-slate-600 border border-slate-200">
                    #{currentQ.topic}
                  </span>
                )}
                {flagged[currentQ.id] && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Flag size={12} weight="fill" /> চিহ্নিত
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  flagged[currentQ.id]
                    ? "bg-amber-100 border-amber-300 text-amber-900 font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Flag size={14} weight={flagged[currentQ.id] ? "fill" : "regular"} />
                <span>{flagged[currentQ.id] ? "ফ্ল্যাগ সরান" : "পরে দেখব (Flag)"}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed min-h-[4rem] font-sans">
              {currentQ.question}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt: string, optIdx: number) => {
                const isSelected = answers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 group cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/70 border-[#0072c6] text-slate-900 font-semibold shadow-xs"
                        : "bg-[#F6F6F4]/50 border-slate-200 text-slate-800 hover:bg-slate-100/70 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`size-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all font-shadhinata ${
                        isSelected
                          ? "bg-[#0072c6] text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-600 group-hover:border-slate-300"
                      }`}
                    >
                      {bengaliOptions[optIdx]}
                    </span>
                    <span className="text-sm sm:text-base leading-normal">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-2 flex-wrap">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ArrowLeft size={16} /> আগের প্রশ্ন
              </button>

              {answers[currentQ.id] !== undefined && (
                <button
                  onClick={() => {
                    const copy = { ...answers };
                    delete copy[currentQ.id];
                    setAnswers(copy);
                  }}
                  className="text-xs text-slate-500 hover:text-rose-600 transition-colors py-1 px-2 rounded-lg"
                >
                  উত্তর মুছুন (Clear)
                </button>
              )}

              {currentIndex < test.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0072c6] text-white text-xs sm:text-sm font-bold hover:bg-[#005a9e] transition-all shadow-xs"
                >
                  পরের প্রশ্ন <ArrowRight size={16} weight="bold" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#28a745] text-white text-xs sm:text-sm font-bold hover:bg-[#218838] transition-all shadow-md"
                >
                  কন্টেস্ট সাবমিট করো
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Question Navigator Palette (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold font-shadhinata text-slate-900 flex items-center gap-1.5">
                <ListNumbers size={18} className="text-[#0072c6]" />
                <span>প্রশ্ন প্যালেট (Navigator)</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-500 font-shadhinata">
                {toBengaliNumber(answeredCount)} / {toBengaliNumber(test.questions.length)} সম্পন্ন
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#0072c6]" />
                <span className="text-[11px]">উত্তর ({toBengaliNumber(answeredCount)})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="text-[11px]">ফ্ল্যাগড ({toBengaliNumber(Object.values(flagged).filter(Boolean).length)})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-slate-300" />
                <span className="text-[11px]">বাকি ({toBengaliNumber(test.questions.length - answeredCount)})</span>
              </div>
            </div>

            {/* Palette 10 Buttons Grid (১ থেকে ১০) */}
            <div className="grid grid-cols-5 gap-2.5">
              {test.questions.map((q: any, idx: number) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged[q.id];

                let btnStyle = "bg-[#F6F6F4] text-slate-700 border-slate-200 hover:border-slate-300";
                if (isAnswered) {
                  btnStyle = "bg-[#0072c6] text-white font-bold border-[#0072c6] shadow-2xs";
                } else if (isFlagged) {
                  btnStyle = "bg-amber-100 text-amber-900 border-amber-300 font-bold";
                }

                if (isCurrent) {
                  btnStyle += " ring-2 ring-[#0072c6] ring-offset-2";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-xl border flex items-center justify-center font-shadhinata text-base transition-all hover:scale-105 active:scale-95 ${btnStyle}`}
                    title={`প্রশ্ন নং ${idx + 1}`}
                  >
                    {toBengaliNumber(idx + 1)}
                  </button>
                );
              })}
            </div>

            {/* Finish & Submit Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-3 rounded-xl bg-[#28a745] text-white font-bold text-xs sm:text-sm hover:bg-[#218838] transition-all shadow-md shadow-emerald-700/15"
              >
                ফলাফল দেখতে সাবমিট করো
              </button>
            </div>
          </div>

          {/* Quick Help Tip */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs text-slate-600 leading-relaxed space-y-1">
            <span className="font-bold text-[#0072c6] block">অলিম্পিয়াড টিপ:</span>
            যেসব প্রশ্নে দ্বিধা আছে সেগুলো &lsquo;Flag&rsquo; করে রাখো। অন্য সহজ প্রশ্নগুলো দ্রুত শেষ করে শেষে ফ্ল্যাগড প্রশ্নে ফিরে আসো।
          </div>
        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 sm:p-7 space-y-5 bg-white border border-slate-200 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-blue-50 text-[#0072c6] flex items-center justify-center font-bold">
                <CheckSquareOffset size={22} weight="bold" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-shadhinata text-slate-900">
                  কন্টেস্ট সাবমিট করতে চাও?
                </h3>
                <p className="text-xs text-slate-500">চূড়ান্ত ফলাফল গণনা করা হবে</p>
              </div>
            </div>

            <div className="text-sm text-slate-600 space-y-2 bg-[#F6F6F4] p-3.5 rounded-xl border border-slate-200/80">
              <p>
                তুমি মোট <strong>{toBengaliNumber(test.questions.length)}</strong>টি প্রশ্নের মধ্যে <strong>{toBengaliNumber(answeredCount)}</strong>টির উত্তর দিয়েছ।
              </p>
              {test.questions.length - answeredCount > 0 && (
                <p className="text-amber-800 font-bold text-xs flex items-center gap-1.5">
                  <WarningCircle size={15} weight="bold" />
                  <span>এখনও {toBengaliNumber(test.questions.length - answeredCount)}টি প্রশ্নের উত্তর দেওয়া বাকি আছে!</span>
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                পরীক্ষায় ফিরে যাও
              </button>
              <button
                onClick={() => handleSubmitTest(false)}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-[#28a745] text-white text-sm font-bold hover:bg-[#218838] disabled:opacity-50 transition-all shadow-md"
              >
                {isSubmitting ? "গণনা হচ্ছে..." : "হ্যাঁ, সাবমিট করো"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}