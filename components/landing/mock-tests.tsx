"use client";

import Link from "next/link";
import { ArrowRight, Exam } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

export function MockTests() {
  const { t, language } = useLanguage();

  const tests = [
    {
      title: language === "bn" ? "মক ০১: সংখ্যাতত্ত্ব ও প্যাটার্ন" : "Mock 01: Number Theory & Patterns",
      meta:
        language === "bn"
          ? ["১০টি প্রশ্ন", "৩০ মিনিট সময়"]
          : ["10 Questions", "30 Mins Duration"],
      status: t.mockStatusLive,
      isLive: true,
    },
    {
      title: language === "bn" ? "মক ০২: জ্যামিতি ও গণনা তত্ত্ব (গ্র্যান্ড টেস্ট)" : "Mock 02: Geometry & Combinatorics (Grand Mock)",
      meta:
        language === "bn"
          ? ["১০টি প্রশ্ন", "৩০ মিনিট সময়"]
          : ["10 Questions", "30 Mins Duration"],
      status: t.mockStatusLive,
      isLive: true,
    },
    {
      title: language === "bn" ? "মক ০৩: ফুল সিলেবাস মেগা মক" : "Mock 03: Full Syllabus Mega Mock",
      meta:
        language === "bn"
          ? ["৫০টি প্রশ্ন", "৯০ মিনিট সময়"]
          : ["50 Questions", "90 Mins Duration"],
      status: t.mockStatusUpcoming,
      isLive: false,
    },
    {
      title: language === "bn" ? "মক ০৪: ফাইনাল অলিম্পিয়াড সিমুলেশন" : "Mock 04: Final Olympiad Simulation",
      meta:
        language === "bn"
          ? ["৫০টি প্রশ্ন", "১২০ মিনিট সময়"]
          : ["50 Questions", "120 Mins Duration"],
      status: t.mockStatusUpcoming,
      isLive: false,
    },
  ];

  return (
    <section id="mock-tests" className="py-20 md:py-28 container-x">
      <div className="max-w-3xl mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Exam size={15} weight="bold" />
          <span>{t.mockTag}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
          {t.mockTitle}
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {t.mockSubtitle}
        </p>
      </div>

      <div className="space-y-4">
        {tests.map((test, i) => (
          <div
            key={i}
            className="card-shell p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-700 font-bold block">
                {language === "bn" ? `টেস্ট #${i + 1}` : `Test #${i + 1}`}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {test.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {test.meta.map((m) => (
                <span
                  key={m}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-num border border-slate-200"
                >
                  {m}
                </span>
              ))}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  test.isLive
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-amber-100 text-amber-800 border-amber-200"
                }`}
              >
                {test.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-10">
        <Link
          href="/mock-tests"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-blue-700/20 active:scale-95 transition-all text-sm sm:text-base"
        >
          <span>{t.mockStartBtn}</span>
          <ArrowRight weight="bold" size={18} />
        </Link>
        <Link
          href="/qa"
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-xl border border-slate-200/90 shadow-xs transition-all text-sm sm:text-base"
        >
          {language === "bn" ? "প্রশ্নোত্তর ফোরাম (Q&A) দেখুন" : "View Q&A Forum"}
        </Link>
      </div>
    </section>
  );
}
