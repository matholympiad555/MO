"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { HalumAIModal } from "@/components/halum-ai-modal";
import { CashoutModal } from "@/components/cashout-modal";
import { Trophy, CheckCircle, XCircle, Lightbulb, Sparkle } from "@phosphor-icons/react";

interface PhysicsProblem {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_PHYSICS: PhysicsProblem[] = [
  {
    id: 1,
    topic: "গতিবিদ্যা ও বেগ",
    question: "একটি গাড়ি স্থির অবস্থা থেকে শুরু করে ২ মি/সে² সুষম ত্বরণে ৫ সেকেন্ড চলল। গাড়িটির অতিক্রান্ত দূরত্ব কত মিটার?",
    options: ["১০ মিটার", "২০ মিটার", "২৫ মিটার", "৫০ মিটার"],
    correctIndex: 2,
    explanation: "দূরত্ব s = ut + ½at²। যেহেতু u = 0, তাই s = ½ × ২ × (৫)² = ২৫ মিটার।",
  },
  {
    id: 2,
    topic: "বলবিদ্যা ও নিউটনের সূত্র",
    question: "৫ কেজি ভরের একটি বস্তুর ওপর ১০ নিউটন বল প্রয়োগ করলে বস্তুটির ত্বরণ কত হবে?",
    options: ["০.৫ মি/সে²", "২ মি/সে²", "১৫ মি/সে²", "৫০ মি/সে²"],
    correctIndex: 1,
    explanation: "নিউটনের দ্বিতীয় সূত্রানুযায়ী F = ma => a = F/m = ১০ / ৫ = ২ মি/সে²।",
  },
  {
    id: 3,
    topic: "আলো ও প্রতিফলন",
    question: "একটি সমতল দর্পণে আলোর আপতন কোণ ৩০° হলে প্রতিফলন কোণ কত হবে?",
    options: ["১৫°", "৩০°", "৬০°", "৯০°"],
    correctIndex: 1,
    explanation: "প্রতিফলনের প্রথম সূত্র অনুযায়ী আপতন কোণ এবং প্রতিফলন কোণ সর্বদা সমান হয় (i = r = ৩০°)।",
  },
];

export default function PhysicsPage() {
  const [points, setPoints] = useState(120);
  const [streak] = useState(4);
  const [isHalumOpen, setIsHalumOpen] = useState(false);
  const [isCashoutOpen, setIsCashoutOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [rewardToast, setRewardToast] = useState<string | null>(null);

  const handleSelectOption = (id: number, optIdx: number) => {
    if (solvedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: optIdx }));

    const p = SAMPLE_PHYSICS.find((item) => item.id === id);
    if (p && optIdx === p.correctIndex) {
      setSolvedIds((prev) => [...prev, id]);
      setPoints((prev) => prev + 10);
      setRewardToast("+১০ পয়েন্ট যোগ হয়েছে! ⚛️🎉");
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
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                <span>⚛️ ১০০টি পদার্থবিজ্ঞান সমস্যা আর্কাইভ</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black">
                পদার্থবিজ্ঞান অলিম্পিয়াড প্রস্তুতি ও পয়েন্ট
              </h1>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
                পদার্থবিজ্ঞানের প্রতিটি গভীর যুক্তিনির্ভর প্রশ্নে সঠিক উত্তরে পাও <strong className="text-amber-300">+১০ পয়েন্ট</strong>!
              </p>
            </div>
          </div>

          {rewardToast && (
            <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <Sparkle size={18} weight="fill" className="text-amber-300" />
              <span>{rewardToast}</span>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-6">
            {SAMPLE_PHYSICS.map((p, idx) => {
              const selectedOpt = answers[p.id];
              const isSolved = solvedIds.includes(p.id);
              const isWrong = selectedOpt !== undefined && selectedOpt !== p.correctIndex;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {p.topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Trophy size={14} weight="fill" className="text-amber-500" />
                      <span>+১০ পয়েন্ট</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    {p.question}
                  </h3>

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
                        <span>ব্যাখ্যা ও সূত্র:</span>
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