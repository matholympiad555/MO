"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  List,
  X,
  Sparkle,
  Trophy,
  Flame,
  YoutubeLogo,
  Globe,
  CaretDown,
  GraduationCap,
  BookOpen,
  GameController,
  ChatsCircle,
  MagnifyingGlass,
  Shield,
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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Only section allowed to have 2 lines */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <span>🐯</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                Tiger <span className="text-purple-600">Math</span>
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-1.5 py-0.2 rounded-full tracking-wide">
                BDMO
              </span>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 tracking-normal whitespace-nowrap">
              {t.brandSubtitle}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links - Clean, Uncrowded & Strictly Single-Lined */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-bold text-slate-700 whitespace-nowrap">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            {t.navHome}
          </Link>

          <Link
            href="/problems"
            className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{t.navMath}</span>
            <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded-full font-black">
              ১০০০+
            </span>
          </Link>

          <Link
            href="/physics"
            className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{t.navPhysics}</span>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full font-black">
              ১০০
            </span>
          </Link>

          <Link
            href="/mock-tests"
            className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors whitespace-nowrap"
          >
            {t.navMockTests}
          </Link>

          <Link
            href="/leaderboard"
            className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors whitespace-nowrap"
          >
            {t.navLeaderboard}
          </Link>

          {/* Clean 'More' Dropdown Menu (Prevents navbar crowding) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                isMoreOpen ? "bg-purple-50 text-purple-700" : ""
              }`}
            >
              <span>{language === "bn" ? "আরও" : "More"}</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Popover */}
            {isMoreOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1 animate-fade-in">
                <Link
                  href="/#course"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors text-xs font-bold whitespace-nowrap"
                >
                  <GraduationCap size={18} className="text-purple-600 shrink-0" weight="fill" />
                  <span>{t.navCourse} (১৯৯৳)</span>
                </Link>

                <Link
                  href="/resources"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors text-xs font-bold whitespace-nowrap"
                >
                  <BookOpen size={18} className="text-blue-600 shrink-0" weight="fill" />
                  <span>{t.navResources}</span>
                </Link>

                <Link
                  href="/sudoku"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors text-xs font-bold whitespace-nowrap"
                >
                  <GameController size={18} className="text-amber-500 shrink-0" weight="fill" />
                  <span>{t.navSudoku} 🎮</span>
                </Link>

                <Link
                  href="/qa"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors text-xs font-bold whitespace-nowrap"
                >
                  <ChatsCircle size={18} className="text-emerald-600 shrink-0" weight="fill" />
                  <span>{t.navQa}</span>
                </Link>

                <Link
                  href="/status"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors text-xs font-bold whitespace-nowrap"
                >
                  <MagnifyingGlass size={18} className="text-slate-500 shrink-0" weight="bold" />
                  <span>{language === "bn" ? "বুকিং স্ট্যাটাস চেক" : "Check Booking Status"}</span>
                </Link>

                <div className="border-t border-slate-100 my-1 pt-1">
                  <a
                    href="https://www.youtube.com/@BanglarMathOlympiad"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-xs font-bold whitespace-nowrap"
                  >
                    <YoutubeLogo size={18} weight="fill" className="text-red-600 shrink-0" />
                    <span>ইউটিউব চ্যানেল ↗</span>
                  </a>

                  <Link
                    href="/admin"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors text-[11px] font-semibold whitespace-nowrap"
                  >
                    <Shield size={15} />
                    <span>অ্যাডমিন পোর্টাল</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Compact, Single-Lined & Polished */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap">
          {/* Language Switcher Pill */}
          <button
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            title="Switch Language (বাংলা / English)"
          >
            <Globe size={14} weight="bold" className="text-purple-600" />
            <span className="whitespace-nowrap">{language === "bn" ? "EN" : "বাংলা"}</span>
          </button>

          {/* Tiger AI Button */}
          <button
            onClick={onOpenHalumAI}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkle size={15} weight="fill" className="text-amber-300" />
            <span className="whitespace-nowrap">Tiger AI</span>
          </button>

          {/* Points & Streak Combined Pill (Compact & Clickable for Cashout) */}
          <button
            onClick={onOpenCashout}
            title={t.cashoutTitle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Trophy size={16} weight="fill" className="text-amber-500 shrink-0" />
            <span className="whitespace-nowrap font-mono">{points} pts</span>
            <span className="text-amber-300 font-normal">|</span>
            <span className="flex items-center gap-0.5 text-orange-600 font-bold whitespace-nowrap">
              <Flame size={14} weight="fill" />
              <span>{streak}</span>
            </span>
          </button>

          {/* Direct Prebook Pill (199৳) */}
          <a
            href="#hero-booking"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs active:scale-95 transition-all whitespace-nowrap"
            title="প্রি-বুকিং করো (১৯৯৳)"
          >
            <span>১৯৯৳</span>
            <span className="text-[10px] font-normal opacity-90">বুকিং</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">ভাষা / Language:</span>
            <button
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200"
            >
              🌐 {language === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🏠 {t.navHome}
            </Link>
            <Link
              href="/problems"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🧮 {t.navMath} (১০০০+)
            </Link>
            <Link
              href="/physics"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              ⚛️ {t.navPhysics} (১০০)
            </Link>
            <Link
              href="/mock-tests"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              📝 {t.navMockTests}
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🏆 {t.navLeaderboard}
            </Link>
            <Link
              href="/#course"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🎓 {t.navCourse}
            </Link>
            <Link
              href="/resources"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              📚 {t.navResources}
            </Link>
            <Link
              href="/sudoku"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🎮 {t.navSudoku}
            </Link>
            <Link
              href="/qa"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              💬 {t.navQa}
            </Link>
            <Link
              href="/status"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🔍 স্ট্যাটাস চেক
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <a
              href="https://www.youtube.com/@BanglarMathOlympiad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-red-600 flex items-center gap-1.5"
            >
              <YoutubeLogo size={18} weight="fill" />
              <span>@BanglarMathOlympiad</span>
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCashout?.();
              }}
              className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full whitespace-nowrap"
            >
              ক্যাশআউট: ১০০৳ bKash
            </button>
          </div>
        </div>
      )}
    </header>
  );
}