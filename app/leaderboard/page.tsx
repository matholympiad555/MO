"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { HalumAIModal } from "@/components/halum-ai-modal";
import { CashoutModal } from "@/components/cashout-modal";
import { FloatingAIButton } from "@/components/floating-ai-button";
import { Trophy, Medal, Flame, Star, Sparkle } from "@phosphor-icons/react";

interface LeaderboardUser {
  rank: number;
  name: string;
  classLevel: string;
  institution: string;
  points: number;
  streak: number;
  solved: number;
  badge: string;
}

const LEADERBOARD_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    name: "তাহমিদ হাসান",
    classLevel: "১০ম শ্রেণি",
    institution: "নটর ডেম কলেজ, ঢাকা",
    points: 1450,
    streak: 14,
    solved: 145,
    badge: "🥇 স্বর্ণ পদক",
  },
  {
    rank: 2,
    name: "নুসরাত জাহান",
    classLevel: "৮ম শ্রেণি",
    institution: "ভিকারুননিসা নূন স্কুল ও কলেজ",
    points: 980,
    streak: 7,
    solved: 98,
    badge: "🥈 রৌপ্য পদক",
  },
  {
    rank: 3,
    name: "রাহাত আল মামুন",
    classLevel: "৫ম শ্রেণি",
    institution: "আইডিয়াল স্কুল ও কলেজ",
    points: 620,
    streak: 5,
    solved: 62,
    badge: "🥉 ব্রোঞ্জ পদক",
  },
  {
    rank: 4,
    name: "সাদিয়া আক্তার",
    classLevel: "৭ম শ্রেণি",
    institution: "রাজউক উত্তরা মডেল কলেজ",
    points: 480,
    streak: 4,
    solved: 48,
    badge: "⭐ স্টার সলভার",
  },
  {
    rank: 5,
    name: "আবরার ফাইয়াজ",
    classLevel: "৪র্থ শ্রেণি",
    institution: "ঢাকা রেসিডেনসিয়াল মডেল কলেজ",
    points: 390,
    streak: 3,
    solved: 39,
    badge: "⭐ স্টার সলভার",
  },
];

export default function LeaderboardPage() {
  const [points] = useState(120);
  const [streak] = useState(4);
  const [isHalumOpen, setIsHalumOpen] = useState(false);
  const [isCashoutOpen, setIsCashoutOpen] = useState(false);

  return (
    <>
      <Nav
        points={points}
        streak={streak}
        onOpenHalumAI={() => setIsHalumOpen(true)}
        onOpenCashout={() => setIsCashoutOpen(true)}
      />

      <main className="min-h-screen bg-[#FAF9F6] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/30 text-xs font-black">
              <Trophy size={16} weight="fill" />
              <span>টাইগার ম্যাথ অলিম্পিয়াড র‍্যাঙ্কিং</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">জাতীয় গণিত অলিম্পিয়াড লিডারবোর্ড</h1>
            <p className="text-slate-900 text-sm sm:text-base font-semibold max-w-xl mx-auto">
              প্রতিটি সঠিক সমস্যা সমাধানে +১০ পয়েন্ট এবং ১০০০ পয়েন্ট অর্জনে সরাসরি ১০০ টাকা বিকাশ ক্যাশআউট পুরস্কার!
            </p>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEADERBOARD_DATA.slice(0, 3).map((user) => (
              <div
                key={user.rank}
                className={`bg-white rounded-2xl border p-5 shadow-xs text-center space-y-3 relative overflow-hidden ${
                  user.rank === 1
                    ? "border-amber-400 ring-2 ring-amber-300 md:-translate-y-2"
                    : "border-slate-200"
                }`}
              >
                <div className="text-4xl">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{user.name}</h3>
                  <div className="text-xs text-slate-500">{user.institution}</div>
                  <div className="text-xs font-semibold text-purple-700">{user.classLevel}</div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-xs font-bold">
                  <span className="text-amber-800 font-black">{user.points} pts</span>
                  <span className="text-orange-700 flex items-center gap-1">
                    <Flame size={14} weight="fill" />
                    {user.streak} দিন
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Full Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 font-bold text-slate-800 text-sm flex items-center justify-between">
              <span>শীর্ষ সমস্যা সমাধানকারী (Top Solvers)</span>
              <span className="text-xs text-purple-700 font-semibold">লাইভ আপডেট</span>
            </div>

            <div className="divide-y divide-slate-100">
              {LEADERBOARD_DATA.map((user) => (
                <div
                  key={user.rank}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-black text-sm flex items-center justify-center">
                      #{user.rank}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{user.name}</div>
                      <div className="text-xs text-slate-500">
                        {user.institution} • {user.classLevel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-black text-amber-800 text-sm sm:text-base font-mono">
                        {user.points} pts
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">{user.solved} টি প্রশ্ন সলভ</div>
                    </div>
                    <span className="hidden sm:inline-block text-xs font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                      {user.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingAIButton onClick={() => setIsHalumOpen(true)} />
      <HalumAIModal isOpen={isHalumOpen} onClose={() => setIsHalumOpen(false)} />
      <CashoutModal isOpen={isCashoutOpen} onClose={() => setIsCashoutOpen(false)} points={points} />
    </>
  );
}