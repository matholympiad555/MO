"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export function MockTests() {
  const tests = [
    { title: "মক ০১: সংখ্যাতত্ত্ব ও প্যাটার্ন", meta: "প্রশ্ন ৫ | সময় ২০ মিনিট", status: "উন্মুক্ত" },
    { title: "মক ০২: জ্যামিতি ও গণনা তত্ত্ব", meta: "প্রশ্ন ৫ | সময় ২৫ মিনিট", status: "উন্মুক্ত" },
    { title: "মক ০৩: ফুল সিলেবাস মেগা মক", meta: "প্রশ্ন ৫০ | সময় ৯০ মিনিট", status: "শীঘ্রই" },
    { title: "মক ০৪: ফাইনাল অলিম্পিয়াড সিমুলেশন", meta: "প্রশ্ন ৫০ | সময় ১২০ মিনিট", status: "শীঘ্রই" },
  ];

  return (
    <section id="mock-tests" className="py-24 md:py-32 container-x text-paper">
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold mb-4">
          <span>অনলাইন লাইভ এক্সাম ইঞ্জিন</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-medium mb-6">পূর্ণাঙ্গ গণিত মক টেস্ট</h2>
        <p className="text-muted text-lg">
          টাইমার ধরে পরীক্ষা দাও, সাবমিট করার সাথে সাথে স্কোর, সঠিক উত্তর এবং প্রতিটি প্রশ্নের পূর্ণাঙ্গ ব্যাখ্যা দেখে প্রস্তুতি নিখুঁত করো।
        </p>
      </div>

      <div className="space-y-4">
        {tests.map((test, i) => (
          <div
            key={i}
            className="card-shell p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand/40 transition-colors"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-brand font-bold">টেস্ট #{i + 1}</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-paper">
                {test.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {test.meta.split(" | ").map((m) => (
                <span
                  key={m}
                  className="px-3.5 py-1.5 rounded-full bg-ink-2 text-xs text-muted font-num border border-white/5"
                >
                  {m}
                </span>
              ))}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand/15 text-brand border border-brand/30">
                {test.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-12">
        <Link
          href="/mock-tests"
          className="inline-flex items-center gap-2 bg-brand text-ink font-bold px-8 py-4 rounded-full hover:bg-brand-deep transition-all shadow-xl shadow-brand/20"
        >
          অনলাইনে মক টেস্ট দাও
          <ArrowRight weight="bold" size={18} />
        </Link>
        <Link
          href="/qa"
          className="inline-flex items-center gap-2 bg-white/10 text-paper font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all"
        >
          প্রশ্নোত্তর ফোরাম (Q&A) দেখুন
        </Link>
      </div>
    </section>
  );
}
