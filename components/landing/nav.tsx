"use client";

import { useState } from "react";
import Link from "next/link";
import {
  List,
  X,
  Sparkle,
  Trophy,
  Flame,
  Lightning,
  YoutubeLogo,
  Globe,
} from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

interface NavProps {
  points?: number;
  streak?: number;
  onOpenHalumAI?: () => void;
  onOpenCashout?: () => void;
}

export function Nav({
  points = 120,
  streak = 4,
  onOpenHalumAI,
  onOpenCashout,
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Brand Logo - Tiger Math (Exact Image 4) */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
            <span>🐯</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                Tiger <span className="text-purple-600">Math</span>
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wide">
                BDMO
              </span>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 tracking-normal">
              {t.brandSubtitle}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links (Exact from Image 4) */}
        <nav className="hidden xl:flex items-center gap-1 text-[13px] font-bold text-slate-700">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
          >
            {t.navHome}
          </Link>
          <Link
            href="/problems"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1"
          >
            <span>{t.navMath}</span>
            <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded-full font-black">
              ১০০০+
            </span>
          </Link>
          <Link
            href="/physics"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1"
          >
            <span>{t.navPhysics}</span>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full font-black">
              ১০০
            </span>
          </Link>
          <Link
            href="/leaderboard"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors"
          >
            {t.navLeaderboard}
          </Link>
          <a
            href="https://www.youtube.com/@BanglarMathOlympiad"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-full text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 font-semibold"
          >
            <YoutubeLogo size={16} weight="fill" className="text-red-600" />
            <span>{t.navYoutube}</span>
          </a>
          <Link
            href="/#course"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1"
          >
            <span>{t.navCourse}</span>
            <span>🎓</span>
          </Link>
          <Link
            href="/resources"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors"
          >
            {t.navResources}
          </Link>
          <Link
            href="/mock-tests"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors"
          >
            {t.navMockTests}
          </Link>
          <Link
            href="/sudoku"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1"
          >
            <span>{t.navSudoku}</span>
            <span>🎮</span>
          </Link>
          <Link
            href="/qa"
            className="px-2.5 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors"
          >
            {t.navQa}
          </Link>
        </nav>

        {/* Right Gamification, AI & Language Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Switcher Button (বাংলা | English) */}
          <button
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="Switch Language (বাংলা / English)"
          >
            <Globe size={14} weight="bold" className="text-purple-600" />
            <span>{language === "bn" ? "EN" : "বাংলা"}</span>
          </button>

          {/* Tiger AI Button */}
          <button
            onClick={onOpenHalumAI}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
          >
            <Sparkle size={15} weight="fill" className="text-amber-300 animate-spin" />
            <span>Tiger AI</span>
          </button>

          {/* Points Pill (Clickable for 1000 pt = 100tk bKash Cashout) */}
          <button
            onClick={onOpenCashout}
            title={t.cashoutTitle}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs"
          >
            <Trophy size={16} weight="fill" className="text-amber-500" />
            <span>{points} pts</span>
          </button>

          {/* Streak Badge */}
          <div
            title="Day streak!"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold"
          >
            <Flame size={16} weight="fill" className="text-orange-500" />
            <span>{streak}</span>
          </div>

          {/* Speed Badge */}
          <div
            title="Fast Solver"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-amber-500 border border-slate-200"
          >
            <Lightning size={16} weight="fill" />
          </div>

          {/* User Profile / Prebook Link */}
          <Link
            href="/#prebook"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-bold text-xs shadow-xs hover:ring-2 hover:ring-purple-400 transition-all"
            title="Pre-book & Profile"
          >
            <span>১৯৯৳</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">ভাষা / Language:</span>
            <button
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200"
            >
              🌐 {language === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              🏠 {t.navHome}
            </Link>
            <Link
              href="/problems"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              🧮 {t.navMath}
            </Link>
            <Link
              href="/physics"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              ⚛️ {t.navPhysics}
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              🏆 {t.navLeaderboard}
            </Link>
            <Link
              href="/#course"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              🎓 {t.navCourse}
            </Link>
            <Link
              href="/resources"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              📚 {t.navResources}
            </Link>
            <Link
              href="/mock-tests"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              📝 {t.navMockTests}
            </Link>
            <Link
              href="/sudoku"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              🎮 {t.navSudoku}
            </Link>
            <Link
              href="/qa"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              💬 {t.navQa}
            </Link>
            <Link
              href="/status"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900 hover:bg-purple-50"
            >
              🔍 স্ট্যাটাস চেক
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}