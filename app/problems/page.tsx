"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { HalumAIModal } from "@/components/halum-ai-modal";
import { CashoutModal } from "@/components/cashout-modal";
import {
  Trophy,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";

interface Problem {
  id: number;
  category: "সংখ্যাতত্ত্ব" | "জ্যামিতি" | "বীজগণিত" | "কম্বিনেটোরিক্স";
  level: "প্রাইমারি" | "জুনিয়র" | "সেকেন্ডারি";
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_PROBLEMS: Problem[] = [
  {
    id: 1,
    category: "সংখ্যাতত্ত্ব",
    level: "প্রাইমারি",
    title: "মৌলিক সংখ্যার যোগফল",
    question: "১ থেকে ২০ এর মধ্যবর্তী সকল মৌলিক সংখ্যার মোট সংখ্যা কয়টি?",
    options: ["৭টি", "৮টি", "৯টি", "১০টি"],
    correctIndex: 1,
    explanation: "১ থেকে ২০ এর মধ্যে মৌলিক সংখ্যাগুলো হলো: ২, ৩, ৫, ৭, ১১, ১৩, ১৭, ১৯। মোট ৮টি মৌলিক সংখ্যা রয়েছে।",
  },
  {
    id: 2,
    category: "জ্যামিতি",
    level: "প্রাইমারি",
    title: "ত্রিভুজের ক্ষেত্রফল অনুপাত",
    question: "একটি সমকোণী ত্রিভুজের ভূমি ৬ সেমি এবং উচ্চতা ৮ সেমি। ত্রিভুজটির ক্ষেত্রফল কত বর্গ সেমি?",
    options: ["১২", "২৪", "৪৮", "১৪"],
    correctIndex: 1,
    explanation: "ত্রিভুজের ক্ষেত্রফল = ১/২ × ভূমি × উচ্চতা = ১/২ × ৬ × ৮ = ২৪ বর্গ সেমি।",
  },
  {
    id: 3,
    category: "কম্বিনেটোরিক্স",
    level: "জুনিয়র",
    title: "পায়রার খোপ নীতি",
    question: "একটি ড্রয়ারে লাল রঙের ১০টি এবং কালো রঙের ১০টি মোজা আছে। অন্ধকারে হাত দিয়ে অন্তত একটি নিশ্চিত জোড়া (একই রঙের ২টি) পেতে হলে ন্যূনতম কয়টি মোজা তুলতে হবে?",
    options: ["২টি", "৩টি", "১১টি", "২১টি"],
    correctIndex: 1,
    explanation: "যেহেতু রঙের সংখ্যা মাত্র ২টি (লাল ও কালো), পায়রার খোপ নীতি অনুযায়ী ৩টি মোজা তুললে নিশ্চিতভাবে অন্তত ২টি একই রঙের হবে।",
  },
  {
    id: 4,
    category: "বীজগণিত",
    level: "প্রাইমারি",
    title: "সংখ্যা প্যাটার্ন বিশ্লেষণ",
    question: "ধারাটির পরবর্তী পদ কত হবে: ২, ৫, ১০, ১৭, ২৬, ...?",
    options: ["৩৫", "৩৬", "৩৭", "৩৮"],
    correctIndex: 2,
    explanation: "প্যাটার্নটি লক্ষ্য করো: ১²+১=২, ২²+১=৫, ৩²+১=১০, ৪²+১=১৭, ৫²+১=২৬। সুতরাং পরবর্তী পদ হবে ৬²+১ = ৩৭।",
  },
  {
    id: 5,
    category: "সংখ্যাতত্ত্ব",
    level: "জুনিয়র",
    title: "বিভাজ্যতা ও শেষ অঙ্ক",
    question: "৭¹⁰⁰ এর একক স্থানীয় অঙ্ক (Last Digit) কত হবে?",
    options: ["১", "৩", "৭", "৯"],
    correctIndex: 0,
    explanation: "৭ এর ঘাতের চক্র: ৭¹=৭, ৭²=৯, ৭³=৩, ৭⁴=১ (প্রতি ৪ ঘাতে পুনরাবৃত্তি হয়)। ১০০ সংখ্যাটি ৪ দ্বারা নিঃশেষে বিভাজ্য, তাই একক অঙ্কটি হবে ১।",
  },
];

export default function ProblemsPage() {
  const [points, setPoints] = useState(120);
  const [streak] = useState(4);
  const [isHalumOpen, setIsHalumOpen] = useState(false);
  const [isCashoutOpen, setIsCashoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("সকল");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [rewardToast, setRewardToast] = useState<string | null>(null);

  const categories = ["সকল", "সংখ্যাতত্ত্ব", "জ্যামিতি", "বীজগণিত", "কম্বিনেটোরিক্স"];

  const filteredProblems =
    selectedCategory === "সকল"
      ? SAMPLE_PROBLEMS
      : SAMPLE_PROBLEMS.filter((p) => p.category === selectedCategory);

  const handleSelectOption = (problemId: number, optionIndex: number) => {
    if (solvedIds.includes(problemId)) return;

    setAnswers((prev) => ({ ...prev, [problemId]: optionIndex }));
    const problem = SAMPLE_PROBLEMS.find((p) => p.id === problemId);
    if (!problem) return;

    if (optionIndex === problem.correctIndex) {
      setSolvedIds((prev) => [...prev, problemId]);
      setPoints((prev) => prev + 10);
      setRewardToast("+১০ পয়েন্ট যোগ হয়েছে! 🐯🎉");
      setTimeout(() => setRewardToast(null), 3000);
    }
  };

  return (
    <>
      <Nav
        points={points}
        streak={streak}
        onOpenHalumAI={() => setIsHalumOpen(true)}
        onOpenCashout={() => setIsCashoutOpen(true)}
      />

      <main className="min-h-screen bg-[#FAF9F6] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                <span>🧮 ১,০০০+ অলিম্পিয়াড প্রব্লেম আর্কাইভ</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black">
                গণিত সমস্যা সমাধান ও পয়েন্ট অর্জন
              </h1>
              <p className="text-purple-100 text-sm sm:text-base max-w-2xl">
                প্রতিটি সঠিক উত্তরে <strong className="text-amber-300">+১০ পয়েন্ট</strong> পাও। ১০০০ পয়েন্ট জমলেই ১০০ টাকা বিকাশ ক্যাশআউট!
              </p>
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 text-8xl font-serif pointer-events-none hidden sm:block">
              ∑
            </div>
          </div>

          {/* Toast Notification */}
          {rewardToast && (
            <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <Sparkle size={18} weight="fill" className="text-amber-300" />
              <span>{rewardToast}</span>
            </div>
          )}

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Problems List */}
          <div className="space-y-6">
            {filteredProblems.map((p, idx) => {
              const selectedOpt = answers[p.id];
              const isSolved = solvedIds.includes(p.id);
              const isWrong = selectedOpt !== undefined && selectedOpt !== p.correctIndex;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {p.category}
                      </span>
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        {p.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Trophy size={14} weight="fill" className="text-amber-500" />
                      <span>+১০ পয়েন্ট</span>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {p.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {p.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";

                      if (isSolved && optIdx === p.correctIndex) {
                        btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                      } else if (isWrong && isOptionSelected) {
                        btnStyle = "bg-rose-50 border-rose-300 text-rose-900 font-bold";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(p.id, optIdx)}
                          disabled={isSolved}
                          className={`p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isSolved && optIdx === p.correctIndex && (
                            <CheckCircle size={18} weight="fill" className="text-emerald-600" />
                          )}
                          {isWrong && isOptionSelected && (
                            <XCircle size={18} weight="fill" className="text-rose-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation when answered */}
                  {selectedOpt !== undefined && (
                    <div
                      className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                        isSolved
                          ? "bg-emerald-50/70 border border-emerald-200 text-emerald-950"
                          : "bg-rose-50/70 border border-rose-200 text-rose-950"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <Lightbulb size={16} weight="fill" className="text-amber-500" />
                        <span>ব্যাখ্যা ও সমাধান:</span>
                      </div>
                      <p>{p.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />

      <HalumAIModal isOpen={isHalumOpen} onClose={() => setIsHalumOpen(false)} />
      <CashoutModal isOpen={isCashoutOpen} onClose={() => setIsCashoutOpen(false)} points={points} />
    </>
  );
}