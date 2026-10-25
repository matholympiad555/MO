"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { Clock, Exam, CheckCircle, ArrowRight, Brain, Lightbulb } from "@phosphor-icons/react";

export default function MockTestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 container-x max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold">
            <Exam size={16} weight="bold" />
            <span>লাইভ অলিম্পিয়াড টেস্ট প্ল্যাটফর্ম</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-paper tracking-tight">
            প্রাইমারি গণিত অলিম্পিয়াড <span className="text-brand">মক টেস্ট</span>
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            আসল পরীক্ষার আদলে সাজানো প্রশ্নপত্র। টাইমার ধরে পরীক্ষা দাও, সাবমিট করার সাথে সাথে স্কোর, সঠিক উত্তর এবং প্রতিটি প্রশ্নের পূর্ণাঙ্গ ব্যাখ্যা দেখে প্রস্তুতি নিখুঁত করো।
          </p>
        </div>

        {/* Test Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted text-sm">
            <div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin" />
            <p>মক টেস্ট লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {tests.map((test, index) => (
              <div
                key={test.id}
                className="card-shell p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-brand/5 rounded-full blur-2xl group-hover:bg-brand/10 transition-colors pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
                      মক #{index + 1}
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky">
                      {test.difficulty}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-paper group-hover:text-brand transition-colors">
                    {test.title}
                  </h2>

                  <p className="text-sm text-muted leading-relaxed">
                    {test.description}
                  </p>

                  {/* Topics Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {test.syllabus_topics?.map((topic: string) => (
                      <span
                        key={topic}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-paper/70 border border-white/5"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta bar & Button */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-brand" />
                      <span>{test.duration_minutes} মিনিট</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Brain size={16} className="text-sky" />
                      <span>{test.question_count}টি প্রশ্ন ({test.total_marks} নম্বর)</span>
                    </div>
                  </div>

                  <Link
                    href={`/mock-tests/${test.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-ink text-sm font-bold hover:bg-brand-deep active:scale-95 transition-all shadow-lg shadow-brand/10"
                  >
                    পরীক্ষা শুরু করো
                    <ArrowRight weight="bold" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Olympiad Test Guidelines Card */}
        <div className="card-shell p-6 sm:p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Lightbulb size={24} weight="fill" />
            </div>
            <h3 className="text-lg font-bold font-display text-paper">
              পরীক্ষা শুরুর আগে নির্দেশনাবলী
            </h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-brand shrink-0 mt-0.5" weight="bold" />
              <span>প্রতিটি প্রশ্নের জন্য ৪টি বিকল্প থাকবে, সঠিকটি নির্বাচন করো।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-brand shrink-0 mt-0.5" weight="bold" />
              <span>নির্ধারিত সময় শেষ হলে পরীক্ষা স্বয়ংক্রিয়ভাবে সাবমিট হয়ে যাবে।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-brand shrink-0 mt-0.5" weight="bold" />
              <span>কাঁচা হিসাবের (rough work) জন্য পাশে খাতা-কলম প্রস্তুত রাখো।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-brand shrink-0 mt-0.5" weight="bold" />
              <span>সাবমিট করার পরই সম্পূর্ণ সমাধান ও অলিম্পিয়াড ট্রিকস দেখতে পারবে।</span>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
