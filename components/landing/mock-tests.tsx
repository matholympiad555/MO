"use client";

import Link from "next/link";
import { ArrowRight, Exam } from "@phosphor-icons/react";

export function MockTests() {
  const tests = [
    { title: "মক ০১: সংখ্যাতত্ত্ব ও প্যাটার্ন", meta: "প্রশ্ন ৫ | সময় ২০ মিনিট", status: "উন্মুক্ত" },
    { title: "মক ০২: জ্যামিতি ও গণনা তত্ত্ব", meta: "প্রশ্ন ৫ | সময় ২৫ মিনিট", status: "উন্মুক্ত" },
    { title: "মক ০৩: ফুল সিলেবাস মেগা মক", meta: "প্রশ্ন ৫০ | সময় ৯০ মিনিট", status: "শীঘ্রই আসছে" },
    { title: "মক ০৪: ফাইনাল অলিম্পিয়াড সিমুলেশন", meta: "প্রশ্ন ৫০ | সময় ১২০ মিনিট", status: "শীঘ্রই আসছে" },
  ];

  return (
    <section id="mock-tests" className="py-20 md:py-28 container-x">
      <div className="max-w-3xl mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Exam size={15} weight="bold" />
          <span>অনলাইন লাইভ এক্সাম ইঞ্জিন</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
          পূর্ণাঙ্গ গণিত মক টেস্ট
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          টাইমার ধরে পরীক্ষা দাও, সাবমিট করার সাথে সাথে স্কোর, সঠিক উত্তর এবং প্রতিটি প্রশ্নের পূর্ণাঙ্গ ব্যাখ্যা দেখে প্রস্তুতি নিখুঁত করো।
        </p>
      </div>

      <div className="space-y-4">
        {tests.map((test, i) => (
          <div
            key={i}
            className="card-shell p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-700 font-bold block">টেস্ট #{i + 1}</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {test.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {test.meta.split(" | ").map((m) => (
                <span
                  key={m}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-num border border-slate-200"
                >
                  {m}
                </span>
              ))}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
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
          <span>অনলাইনে মক টেস্ট শুরু করো</span>
          <ArrowRight weight="bold" size={18} />
        </Link>
        <Link
          href="/qa"
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-xl border border-slate-200/90 shadow-xs transition-all text-sm sm:text-base"
        >
          প্রশ্নোত্তর ফোরাম (Q&A) দেখুন
        </Link>
      </div>
    </section>
  );
}
