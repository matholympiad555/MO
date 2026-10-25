"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { HalumAIModal } from "@/components/halum-ai-modal";
import { CashoutModal } from "@/components/cashout-modal";
import { GameController, CheckCircle, ArrowClockwise, Sparkle, Trophy } from "@phosphor-icons/react";

// 4x4 Mini Sudoku Puzzle (Great for Primary Olympiad logic building)
const INITIAL_GRID = [
  [1, 0, 3, 0],
  [0, 0, 0, 2],
  [3, 0, 0, 0],
  [0, 4, 0, 1],
];

const SOLUTION_GRID = [
  [1, 2, 3, 4],
  [4, 3, 1, 2],
  [3, 1, 2, 4],
  [2, 4, 4, 1],
];

export default function SudokuPage() {
  const [points, setPoints] = useState(120);
  const [streak] = useState(4);
  const [isHalumOpen, setIsHalumOpen] = useState(false);
  const [isCashoutOpen, setIsCashoutOpen] = useState(false);

  const [grid, setGrid] = useState<number[][]>(INITIAL_GRID.map((row) => [...row]));
  const [isCompleted, setIsCompleted] = useState(false);
  const [rewardToast, setRewardToast] = useState<string | null>(null);

  const handleCellChange = (r: number, c: number, val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1 || num > 4) {
      const newGrid = grid.map((row) => [...row]);
      newGrid[r][c] = 0;
      setGrid(newGrid);
      return;
    }

    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);

    // Check if fully solved
    const allFilled = newGrid.every((row) => row.every((cell) => cell > 0));
    if (allFilled) {
      setIsCompleted(true);
      setPoints((prev) => prev + 20);
      setRewardToast("+২০ পয়েন্ট যোগ হয়েছে! 🎮🎉");
      setTimeout(() => setRewardToast(null), 3500);
    }
  };

  const handleReset = () => {
    setGrid(INITIAL_GRID.map((row) => [...row]));
    setIsCompleted(false);
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
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <GameController size={16} weight="fill" />
              <span>অলিম্পিয়াড ব্রেইন গেম</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">ম্যাথ সুডোকু ও লজিক পাজল</h1>
            <p className="text-pink-100 text-xs sm:text-sm">
              প্রতিটি সারিতে, কলামে এবং ২×২ ব্লকে ১ থেকে ৪ পর্যন্ত সংখ্যা একবারই বসবে। সমাধান করলেই <strong className="text-amber-300">+২০ পয়েন্ট</strong>!
            </p>
          </div>

          {rewardToast && (
            <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <Sparkle size={18} weight="fill" className="text-amber-300" />
              <span>{rewardToast}</span>
            </div>
          )}

          {/* Sudoku Board */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md text-center space-y-6">
            <div className="inline-grid grid-cols-4 gap-2 bg-slate-900 p-3 rounded-2xl border-4 border-slate-900 shadow-inner">
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const isInitial = INITIAL_GRID[r][c] !== 0;

                  return (
                    <input
                      key={`${r}-${c}`}
                      type="number"
                      min="1"
                      max="4"
                      disabled={isInitial || isCompleted}
                      value={cell === 0 ? "" : cell}
                      onChange={(e) => handleCellChange(r, c, e.target.value)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black rounded-xl transition-all outline-none ${
                        isInitial
                          ? "bg-slate-200 text-slate-900 cursor-not-allowed select-none"
                          : "bg-white text-purple-700 focus:bg-purple-50 focus:ring-2 focus:ring-purple-500 shadow-xs"
                      }`}
                    />
                  );
                })
              )}
            </div>

            {isCompleted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2 text-emerald-900">
                <CheckCircle size={32} weight="fill" className="text-emerald-600 mx-auto" />
                <div className="font-black text-lg">অসাধারণ! তুমি সুডোকু সমাধান করে ফেলেছো!</div>
                <p className="text-xs text-emerald-700">তুমি জিতে নিয়েছো +২০ অলিম্পিয়াড রিওয়ার্ড পয়েন্ট!</p>
              </div>
            ) : null}

            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowClockwise size={16} />
                <span>রিসেট করো</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <HalumAIModal isOpen={isHalumOpen} onClose={() => setIsHalumOpen(false)} />
      <CashoutModal isOpen={isCashoutOpen} onClose={() => setIsCashoutOpen(false)} points={points} />
    </>
  );
}