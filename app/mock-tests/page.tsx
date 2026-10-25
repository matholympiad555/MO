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
      <main className="min-h-screen pt-12 pb-24 container-x max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <Exam size={16} weight="bold" />
            <span>লাইভ অলিম্পিয়াড টেস্ট প্ল্যাটফর্ম</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
            প্রাইমারি গণিত অলিম্পিয়াড <span className="text-blue-700">মক টেস্ট</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            আসল পরীক্ষার আদলে সাজানো প্রশ্নপত্র। টাইমার ধরে পরীক্ষা দাও, সাবমিট করার সাথে সাথে স্কোর, সঠিক উত্তর এবং প্রতিটি প্রশ্নের পূর্ণাঙ্গ ব্যাখ্যা দেখে প্রস্তুতি নিখুঁত করো।
          </p>
        </div>

        {/* Test Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500 text-sm">
            <div className="w-8 h-8 border-3 border-blue-700 border-t-transparent rounded-full animate-spin" />
            <p>মক টেস্ট লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {tests.map((test, index) => (
              <div
                key={test.id}
                className="card-shell p-7 sm:p-8 flex flex-col justify-between bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all group relative overflow-hidden rounded-3xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                      মক #{index + 1}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                      {test.difficulty}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 group-hover:text-blue-700 transition-colors">
                    {test.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {test.description}
                  </p>

                  {/* Topics Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {test.syllabus_topics?.map((topic: string) => (
                      <span
                        key={topic}
                        className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-100 font-medium"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta bar & Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Clock size={16} className="text-blue-700" weight="bold" />
                      <span>{test.duration_minutes} মিনিট</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <Brain size={16} className="text-amber-600" weight="bold" />
                      <span>{test.question_count}টি প্রশ্ন ({test.total_marks} নম্বর)</span>
                    </div>
                  </div>

                  <Link
                    href={`/mock-tests/${test.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-bold hover:bg-blue-800 active:scale-95 transition-all shadow-md shadow-blue-700/20"
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
        <div className="card-shell p-7 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Lightbulb size={24} weight="fill" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900">
              পরীক্ষা শুরুর আগে নির্দেশনাবলী
            </h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" weight="fill" />
              <span>প্রতিটি প্রশ্নের জন্য ৪টি বিকল্প থাকবে, সঠিকটি নির্বাচন করো।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" weight="fill" />
              <span>নির্ধারিত সময় শেষ হলে পরীক্ষা স্বয়ংক্রিয়ভাবে সাবমিট হয়ে যাবে।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" weight="fill" />
              <span>কাঁচা হিসাবের (rough work) জন্য পাশে খাতা-কলম প্রস্তুত রাখো।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" weight="fill" />
              <span>সাবমিট করার পরই সম্পূর্ণ সমাধান ও অলিম্পিয়াড ট্রিকস দেখতে পারবে।</span>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
