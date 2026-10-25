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

export default function MockTestRunnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">লোড হচ্ছে...</p>
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
  const [timeLeft, setTimeLeft] = useState<number>(1200); // in seconds
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
          setTimeLeft((data.data.duration_minutes || 20) * 60);
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

    const timeTaken = (test.duration_minutes * 60) - timeLeft;

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">প্রশ্নপত্র প্রস্তুত হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 p-4">
        <div className="card-shell p-8 max-w-md text-center space-y-4 bg-white border border-slate-200 rounded-3xl shadow-lg">
          <WarningCircle size={48} className="text-rose-600 mx-auto" />
          <h2 className="text-xl font-bold font-display text-slate-900">{error || "টেস্ট পাওয়া যায়নি"}</h2>
          <Link
            href="/mock-tests"
            className="inline-block px-6 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-800"
          >
            মক টেস্ট তালিকায় ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  // Pre-Start Splash Screen
  if (!hasStarted && !result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="card-shell max-w-xl w-full p-7 sm:p-10 space-y-6 bg-white border border-slate-200/90 rounded-3xl shadow-xl">
          <Link
            href="/mock-tests"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
          >
            <ArrowLeft size={14} /> টেস্ট তালিকায় ফিরুন
          </Link>

          <div>
            <span className="text-xs font-mono font-bold text-amber-800 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              {test.difficulty}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-3">
              {test.title}
            </h1>
            <p className="text-sm text-slate-600 mt-2">{test.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 text-center">
            <div>
              <div className="text-2xl font-black font-mono text-blue-700">{test.questions.length}টি</div>
              <div className="text-xs text-slate-500 font-bold">মোট প্রশ্ন</div>
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-amber-600">{test.duration_minutes} মিনিট</div>
              <div className="text-xs text-slate-500 font-bold">সময়সীমা</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">তোমার নাম (ঐচ্ছিক):</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="উদাঃ সাকিব আহমেদ"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
            />
          </div>

          <button
            onClick={() => setHasStarted(true)}
            className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-display font-black text-lg shadow-lg shadow-blue-700/20 active:scale-95 transition-all"
          >
            পরীক্ষা শুরু করো
          </button>
        </div>
      </div>
    );
  }

  // ----------------- RESULTS SCREEN -----------------
  if (result) {
    const formatTime = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m} মিনিট ${s} সেকেন্ড`;
    };

    const getVerdict = (pct: number) => {
      if (pct >= 80) return { title: "অসাধারণ পারফরম্যান্স! 🌟", msg: "অলিম্পিয়াডের জন্য তোমার প্রস্তুতি চমৎকার। এই ধারাবাহিকতা ধরে রাখো!" };
      if (pct >= 60) return { title: "বেশ ভালো প্রস্তুতি! 🎯", msg: "তোমার প্রাথমিক ধারণা স্পষ্ট। কঠিন সমস্যাগুলো আরেকটু বেশি অনুশীলন করো।" };
      return { title: "আরও অনুশীলনের সুযোগ আছে! 📚", msg: "নিচের ব্যাখ্যা ও সমাধানগুলো মনোযোগ দিয়ে পড়ে নাও এবং পুনরায় টেস্ট দাও।" };
    };

    const verdict = getVerdict(result.percentage);

    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 container-x max-w-4xl">
        <div className="card-shell p-7 sm:p-10 mb-10 text-center space-y-6 bg-white border border-slate-200/90 rounded-3xl shadow-xl">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-blue-50 border border-blue-100 text-blue-700 mx-auto shadow-inner">
            <CheckCircle size={48} weight="fill" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-900">
              {verdict.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              {verdict.msg}
            </p>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4 border-y border-slate-100">
            <div>
              <div className="text-3xl font-black font-mono text-blue-700">
                {result.score}/{result.total}
              </div>
              <div className="text-xs text-slate-500 font-bold">অর্জিত নম্বর</div>
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-emerald-600">
                {result.percentage}%
              </div>
              <div className="text-xs text-slate-500 font-bold">সঠিকতার হার</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-800 pt-1">
                {formatTime(result.time_taken_seconds)}
              </div>
              <div className="text-xs text-slate-500 font-bold">ব্যয়িত সময়</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
                setFlagged({});
                setCurrentIndex(0);
                setTimeLeft(test.duration_minutes * 60);
                setHasStarted(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-all"
            >
              <ArrowCounterClockwise size={18} weight="bold" />
              আবার পরীক্ষা দাও
            </button>
            <Link
              href="/mock-tests"
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-all border border-slate-200"
            >
              অন্যান্য মক টেস্ট
            </Link>
          </div>
        </div>

        {/* Detailed Solutions Breakdown */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <span>প্রশ্নোত্তর ও অলিম্পিয়াড সমাধান বিশ্লেষণ</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 font-bold">
              {result.review.length}টি প্রশ্ন
            </span>
          </h2>

          {result.review.map((item, idx) => {
            const bengaliLabels = ["(ক)", "(খ)", "(গ)", "(ঘ)"];
            return (
              <div
                key={item.id}
                className={`card-shell p-6 sm:p-8 space-y-4 bg-white border rounded-2xl shadow-sm ${
                  item.isCorrect ? "border-emerald-300" : "border-rose-200"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    প্রশ্ন {idx + 1}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.isCorrect
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {item.isCorrect ? "সঠিক উত্তর (+১)" : "ভুল / অনুত্তরিত (০)"}
                  </span>
                </div>

                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {item.question}
                </p>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {item.options.map((opt, optIdx) => {
                    const isCorrectOption = optIdx === item.correctIndex;
                    const isStudentChoice = optIdx === item.selectedIndex;

                    let style = "bg-slate-50 border-slate-200 text-slate-700";
                    if (isCorrectOption) {
                      style = "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold";
                    } else if (isStudentChoice && !isCorrectOption) {
                      style = "bg-rose-50 border-rose-300 text-rose-950";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-xl border text-sm flex items-center justify-between ${style}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs opacity-75">
                            {bengaliLabels[optIdx]}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isCorrectOption && (
                          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                            <Check size={14} weight="bold" /> সঠিক
                          </span>
                        )}
                        {isStudentChoice && !isCorrectOption && (
                          <span className="text-xs text-rose-700 font-bold">তোমার উত্তর</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm space-y-1 text-slate-800">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    💡 অলিম্পিয়াড ব্যাখ্যা ও শর্টকাট সমাধান:
                  </div>
                  <p className="leading-relaxed">{item.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------- ACTIVE TEST RUNNER -----------------
  const currentQ = test.questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isTimeCritical = timeLeft < 120;
  const answeredCount = Object.keys(answers).length;
  const bengaliOptions = ["ক", "খ", "গ", "ঘ"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="container-x max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-blue-700 text-white font-bold font-display flex items-center justify-center text-sm shadow-sm">
              B
            </span>
            <div className="hidden sm:block">
              <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">লাইভ অলিম্পিয়াড টেস্ট</h2>
              <p className="text-sm font-bold text-slate-900 line-clamp-1">{test.title}</p>
            </div>
          </div>

          {/* Live Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold text-sm sm:text-base border transition-colors ${
              isTimeCritical
                ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <Clock size={18} weight="bold" />
            <span>{timeFormatted}</span>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            পরীক্ষা সমাপ্ত করো
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="container-x max-w-6xl flex-1 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Question Pane */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card-shell p-6 sm:p-9 space-y-6 bg-white border border-slate-200/90 shadow-md rounded-3xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800">
                  প্রশ্ন {currentIndex + 1} / {test.questions.length}
                </span>
                {flagged[currentQ.id] && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Flag size={12} weight="fill" /> ফ্ল্যাগড
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  flagged[currentQ.id]
                    ? "bg-amber-100 border-amber-300 text-amber-900 font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Flag size={14} weight={flagged[currentQ.id] ? "fill" : "regular"} />
                <span>{flagged[currentQ.id] ? "চিহ্ন তুলে নাও" : "পরে দেখব (Flag)"}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed min-h-[4.5rem]">
              {currentQ.question}
            </div>

            {/* Options list */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt: string, optIdx: number) => {
                const isSelected = answers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-600 text-slate-900 shadow-sm font-semibold"
                        : "bg-slate-50/60 border-slate-200 text-slate-800 hover:bg-slate-100/70"
                    }`}
                  >
                    <span
                      className={`size-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isSelected ? "bg-blue-700 text-white" : "bg-white border border-slate-200 text-slate-600"
                      }`}
                    >
                      {bengaliOptions[optIdx]}
                    </span>
                    <span className="text-sm sm:text-base leading-normal">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
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
                  className="text-xs text-slate-500 hover:text-rose-600 transition-colors"
                >
                  উত্তর মুছুন (Clear)
                </button>
              )}

              {currentIndex < test.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-xs sm:text-sm font-bold hover:bg-blue-800 transition-all shadow-sm"
                >
                  পরের প্রশ্ন <ArrowRight size={16} weight="bold" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm"
                >
                  সাবমিট করুন
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Question Palette */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-shell p-6 space-y-5 bg-white border border-slate-200/90 shadow-md rounded-3xl">
            <h3 className="text-sm font-bold font-display text-slate-900">প্রশ্ন প্যালেট (Question Grid)</h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-blue-700" />
                <span>উত্তর দেওয়া ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-slate-200" />
                <span>বাকি আছে ({test.questions.length - answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-amber-400" />
                <span>ফ্ল্যাগড ({Object.values(flagged).filter(Boolean).length})</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {test.questions.map((q: any, idx: number) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged[q.id];

                let btnStyle = "bg-slate-100 text-slate-700 border-slate-200";
                if (isAnswered) {
                  btnStyle = "bg-blue-700 text-white font-bold border-blue-700";
                } else if (isFlagged) {
                  btnStyle = "bg-amber-100 text-amber-900 border-amber-300 font-bold";
                }

                if (isCurrent) {
                  btnStyle += " ring-2 ring-blue-600 ring-offset-2";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl border flex items-center justify-center font-mono text-sm transition-all hover:scale-105 active:scale-95 ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all border border-slate-200"
              >
                ফলাফল দেখতে সাবমিট করো
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-shell max-w-md w-full p-7 space-y-5 bg-white border border-slate-200 rounded-3xl shadow-2xl">
            <h3 className="text-xl font-bold font-display text-slate-900">
              পরীক্ষা সাবমিট করতে চাও?
            </h3>
            <div className="text-sm text-slate-600 space-y-2">
              <p>
                তুমি মোট <strong>{test.questions.length}</strong>টি প্রশ্নের মধ্যে <strong>{answeredCount}</strong>টির উত্তর দিয়েছ।
              </p>
              {test.questions.length - answeredCount > 0 && (
                <p className="text-amber-700 font-bold">
                  ⚠️ এখনও {test.questions.length - answeredCount}টি প্রশ্নের উত্তর দেওয়া বাকি আছে!
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200"
              >
                পরীক্ষায় ফিরে যাও
              </button>
              <button
                onClick={() => handleSubmitTest(false)}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 disabled:opacity-50"
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
