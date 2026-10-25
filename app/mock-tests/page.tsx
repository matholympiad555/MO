"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import {
  Clock,
  Exam,
  CheckCircle,
  ArrowRight,
  Brain,
  Lightbulb,
  Trophy,
  Sparkle,
  HourglassHigh,
  CheckFat,
  Medal,
  CalendarCheck,
} from "@phosphor-icons/react";

type MockTestItem = {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  total_marks: number;
  syllabus_topics: string[];
  difficulty: string;
  status: "live" | "upcoming" | "completed";
  question_count: number;
};

export default function MockTestsPage() {
  const [tests, setTests] = useState<MockTestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "completed">("all");

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await fetch("/api/mock-tests");
        const data = await res.json();
        if (data.success) {
          setTests(data.data);
        }
      } catch (err) {
        console.error("Failed to load mock tests", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTests();
  }, []);

  const filteredTests = tests.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#F6F6F4] flex flex-col justify-between font-sans">
      <Nav />

      {/* GonitZoggo Style Hero Banner (#0072c6) */}
      <section className="relative bg-[#0072c6] text-white overflow-hidden py-14 sm:py-20 shadow-md">
        {/* Background Math Watermark Elements */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-10 overflow-hidden font-serif">
          <span className="absolute -top-10 left-10 text-[140px] leading-none">∑</span>
          <span className="absolute top-1/2 right-12 text-[120px] leading-none">π</span>
          <span className="absolute -bottom-8 left-1/3 text-[130px] leading-none">√</span>
          <span className="absolute top-8 right-1/4 text-[90px] leading-none">∆</span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>লাইভ অলিম্পিয়াড টেস্ট প্ল্যাটফর্ম • GonitZoggo Contest Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-shadhinata tracking-tight leading-tight text-white drop-shadow-xs">
              অনলাইন গণিত অলিম্পিয়াড মক টেস্ট
            </h1>

            <p className="text-blue-100 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              আসল বাংলাদেশ গণিত অলিম্পিয়াড (BdMO) এর আদলে সময়বদ্ধ মক টেস্ট। ৩০ মিনিট নির্ধারিত সময়ে ১০টি মানসম্মত প্রশ্ন সমাধান করো এবং টেস্ট শেষে তাত্ক্ষণিক পূর্ণাঙ্গ বাংলা ব্যাখ্যা ও শর্টকাট সমাধান দেখে প্রস্তুতি নিখুঁত করো।
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl text-xs sm:text-sm">
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
                <Clock size={20} className="text-amber-300 shrink-0" weight="bold" />
                <div>
                  <div className="font-bold font-shadhinata text-sm sm:text-base">৩০ মিনিট</div>
                  <div className="text-[11px] text-blue-100">সময়সীমা</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
                <Exam size={20} className="text-emerald-300 shrink-0" weight="bold" />
                <div>
                  <div className="font-bold font-shadhinata text-sm sm:text-base">১০টি প্রশ্ন</div>
                  <div className="text-[11px] text-blue-100">প্রতি টেস্টে</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
                <Trophy size={20} className="text-amber-300 shrink-0" weight="bold" />
                <div>
                  <div className="font-bold font-shadhinata text-sm sm:text-base">তাৎক্ষণিক স্কোর</div>
                  <div className="text-[11px] text-blue-100">স্বয়ংক্রিয় মূল্যায়ন</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
                <Sparkle size={20} className="text-sky-300 shrink-0" weight="bold" />
                <div>
                  <div className="font-bold font-shadhinata text-sm sm:text-base">বাংলা সমাধান</div>
                  <div className="text-[11px] text-blue-100">স্টেপ-বাই-স্টেপ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area (#F6F6F4 background) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1">
        {/* Navigation Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-shadhinata text-slate-900">
              উপলব্ধ অলিম্পিয়াড কন্টেস্ট তালিকা
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              তোমার পছন্দের মক টেস্ট নির্বাচন করে অংশগ্রহণ শুরু করো
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === "all"
                  ? "bg-[#0072c6] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              সকল ({tests.length})
            </button>
            <button
              onClick={() => setFilter("live")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === "live"
                  ? "bg-[#0072c6] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              লাইভ ({tests.filter((t) => t.status === "live").length})
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === "upcoming"
                  ? "bg-[#0072c6] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <HourglassHigh size={12} />
              আসন্ন ({tests.filter((t) => t.status === "upcoming").length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === "completed"
                  ? "bg-[#0072c6] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <CheckFat size={12} />
              শেষ ({tests.filter((t) => t.status === "completed").length})
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500 text-sm">
            <div className="w-9 h-9 border-3 border-[#0072c6] border-t-transparent rounded-full animate-spin" />
            <p className="font-medium text-slate-600">মক টেস্টসমূহ লোড করা হচ্ছে...</p>
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600 text-base font-medium">এই ফিল্টারে কোনো কন্টেস্ট পাওয়া যায়নি।</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 px-4 py-2 bg-[#0072c6] text-white text-xs font-bold rounded-lg"
            >
              সকল কন্টেস্ট দেখুন
            </button>
          </div>
        ) : (
          /* Contest Cards Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {filteredTests.map((test, index) => {
              const isLive = test.status === "live";
              const isUpcoming = test.status === "upcoming";
              const isCompleted = test.status === "completed";

              return (
                <div
                  key={test.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#0072c6]/60 transition-all group relative overflow-hidden"
                >
                  {/* Status & Difficulty Badges Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {isLive && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            লাইভ চলছে
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                            <HourglassHigh size={13} weight="bold" />
                            আসন্ন কন্টেস্ট
                          </span>
                        )}
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
                            <CheckFat size={13} weight="bold" />
                            শেষ / অনুশীলন
                          </span>
                        )}
                        <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          #{test.id.toUpperCase()}
                        </span>
                      </div>

                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0072c6]">
                        {test.difficulty}
                      </span>
                    </div>

                    {/* Contest Title in font-shadhinata */}
                    <h3 className="text-xl sm:text-2xl font-bold font-shadhinata text-slate-900 group-hover:text-[#0072c6] transition-colors leading-snug">
                      {test.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {test.description}
                    </p>

                    {/* Topics Tags */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        সিলেবাস ও বিষয়সমূহ:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {test.syllabus_topics?.map((topic: string) => (
                          <span
                            key={topic}
                            className="text-xs px-2.5 py-1 rounded-md bg-[#F6F6F4] text-slate-700 border border-slate-200/80 font-medium"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Meta Details & Action Button */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Meta stats */}
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-bold" title="সময়কাল">
                        <Clock size={16} className="text-[#0072c6]" weight="bold" />
                        <span>{test.duration_minutes || 30} মিনিট</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold" title="প্রশ্ন সংখ্যা">
                        <Exam size={16} className="text-[#28a745]" weight="bold" />
                        <span>{test.question_count || 10}টি প্রশ্ন</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold" title="পূর্ণমান">
                        <Trophy size={16} className="text-amber-500" weight="bold" />
                        <span>{test.total_marks || 10} নম্বর</span>
                      </div>
                    </div>

                    {/* Green Button `bg-[#28a745]` GonitZoggo Style */}
                    {isLive && (
                      <Link
                        href={`/mock-tests/${test.id}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#28a745] hover:bg-[#218838] active:scale-95 text-white text-sm font-bold shadow-md shadow-emerald-700/20 transition-all font-sans"
                      >
                        <span>অংশগ্রহণ করো</span>
                        <ArrowRight weight="bold" size={16} />
                      </Link>
                    )}

                    {isUpcoming && (
                      <button
                        disabled
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-sm font-bold cursor-not-allowed border border-slate-200"
                      >
                        <HourglassHigh size={16} />
                        <span>শীঘ্রই শুরু হবে</span>
                      </button>
                    )}

                    {isCompleted && (
                      <Link
                        href={`/mock-tests/${test.id}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0072c6] hover:bg-[#005a9e] active:scale-95 text-white text-sm font-bold shadow-sm transition-all"
                      >
                        <span>অনুশীলন শুরু করো</span>
                        <ArrowRight weight="bold" size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* GonitZoggo Guidelines Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0072c6] border border-blue-100">
              <Lightbulb size={24} weight="fill" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-shadhinata text-slate-900">
                অলিম্পিয়াড মক টেস্ট নির্দেশিকা ও নিয়মাবলী
              </h3>
              <p className="text-xs text-slate-500">কন্টেস্টে প্রবেশের পূর্বে গুরুত্বপূর্ণ বিষয়গুলো খেয়াল রাখো</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700 leading-relaxed">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F6F4]/60 border border-slate-200/60">
              <CheckCircle size={20} className="text-[#28a745] shrink-0 mt-0.5" weight="fill" />
              <div>
                <strong className="text-slate-900 block font-semibold">৪টি বিকল্প প্রশ্ন (MCQ):</strong>
                প্রতিটি প্রশ্নের জন্য ৪টি বিকল্প থাকবে। সঠিক উত্তরটি নির্বাচন করে কনফার্ম করো।
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F6F4]/60 border border-slate-200/60">
              <CheckCircle size={20} className="text-[#28a745] shrink-0 mt-0.5" weight="fill" />
              <div>
                <strong className="text-slate-900 block font-semibold">স্বয়ংক্রিয় সাবমিশন:</strong>
                নির্ধারিত ৩০ মিনিট সময় শেষ হওয়ার সাথে সাথে টেস্ট স্বয়ংক্রিয়ভাবে সাবমিট হয়ে যাবে।
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F6F4]/60 border border-slate-200/60">
              <CheckCircle size={20} className="text-[#28a745] shrink-0 mt-0.5" weight="fill" />
              <div>
                <strong className="text-slate-900 block font-semibold">রাফ পেপার ও গণনা:</strong>
                জ্যামিতি চিত্র আঁকা ও সংখ্যাতত্ত্বের সূক্ষ্ম হিসাবের জন্য সাথে খাতা-কলম প্রস্তুত রাখো।
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F6F4]/60 border border-slate-200/60">
              <CheckCircle size={20} className="text-[#28a745] shrink-0 mt-0.5" weight="fill" />
              <div>
                <strong className="text-slate-900 block font-semibold">তাৎক্ষণিক ফলাফল ও সল্যুশন:</strong>
                সাবমিটের সাথে সাথে তোমার অর্জিত স্কোর এবং প্রতিটি প্রশ্নের বিস্তারিত বাংলা অলিম্পিয়াড সল্যুশন দেখতে পাবে।
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}