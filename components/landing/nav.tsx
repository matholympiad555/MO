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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <span>🐯</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-display font-black text-2xl sm:text-[1.65rem] tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                Tiger <span className="text-purple-600">Math</span>
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-2 py-0.5 rounded-full tracking-wide">
                BDMO
              </span>
            </div>
            {/* Increased font size for brand subtitle */}
            <div className="text-xs sm:text-sm font-bold text-slate-500 tracking-normal whitespace-nowrap mt-0.5">
              {t.brandSubtitle}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links - Clean, Larger & Strictly Single-Lined */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm sm:text-[15px] font-bold text-slate-700 whitespace-nowrap">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-full bg-slate-100 text-slate-950 hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            {t.navHome}
          </Link>

          <Link
            href="/problems"
            className="px-3 py-2 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{t.navMath}</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-black">
              {language === "bn" ? "১০০০+" : "1000+"}
            </span>
          </Link>

          <Link
            href="/physics"
            className="px-3 py-2 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{t.navPhysics}</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black">
              {language === "bn" ? "১০০" : "100"}
            </span>
          </Link>

          <Link
            href="/mock-tests"
            className="px-3 py-2 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors whitespace-nowrap"
          >
            {t.navMockTests}
          </Link>

          <Link
            href="/leaderboard"
            className="px-3 py-2 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-colors whitespace-nowrap"
          >
            {t.navLeaderboard}
          </Link>

          {/* Clean 'More' Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`px-3 py-2 rounded-full hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                isMoreOpen ? "bg-purple-50 text-purple-700" : ""
              }`}
            >
              <span>{t.navMore}</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Popover */}
            {isMoreOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 space-y-1 animate-fade-in">
                <Link
                  href="/#course"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-purple-700 hover:bg-purple-50 transition-colors text-sm font-bold whitespace-nowrap"
                >
                  <GraduationCap size={20} className="text-purple-600 shrink-0" weight="fill" />
                  <span>{t.navCourse} {language === "bn" ? "(১৯৯৳)" : "(199 BDT)"}</span>
                </Link>

                <Link
                  href="/resources"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-purple-700 hover:bg-purple-50 transition-colors text-sm font-bold whitespace-nowrap"
                >
                  <BookOpen size={20} className="text-blue-600 shrink-0" weight="fill" />
                  <span>{t.navResources}</span>
                </Link>

                <Link
                  href="/sudoku"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-purple-700 hover:bg-purple-50 transition-colors text-sm font-bold whitespace-nowrap"
                >
                  <GameController size={20} className="text-amber-500 shrink-0" weight="fill" />
                  <span>{t.navSudoku} 🎮</span>
                </Link>

                <Link
                  href="/qa"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-purple-700 hover:bg-purple-50 transition-colors text-sm font-bold whitespace-nowrap"
                >
                  <ChatsCircle size={20} className="text-emerald-600 shrink-0" weight="fill" />
                  <span>{t.navQa}</span>
                </Link>

                <Link
                  href="/status"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-purple-700 hover:bg-purple-50 transition-colors text-sm font-bold whitespace-nowrap"
                >
                  <MagnifyingGlass size={20} className="text-slate-500 shrink-0" weight="bold" />
                  <span>{t.statusCheck}</span>
                </Link>

                <div className="border-t border-slate-100 my-1 pt-1.5">
                  <a
                    href="https://www.youtube.com/@BanglarMathOlympiad"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-sm font-bold whitespace-nowrap"
                  >
                    <YoutubeLogo size={20} weight="fill" className="text-red-600 shrink-0" />
                    <span>{language === "bn" ? "ইউটিউব চ্যানেল ↗" : "YouTube Channel ↗"}</span>
                  </a>

                  <Link
                    href="/admin"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors text-xs font-semibold whitespace-nowrap"
                  >
                    <Shield size={16} />
                    <span>{t.adminPortal}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Slider Toggle, Tiger AI, Points & Prebook */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          {/* Animated Language Slider Switch (বাং | EN) */}
          <div
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="relative flex items-center bg-slate-200 hover:bg-slate-300 p-0.5 rounded-full cursor-pointer select-none transition-colors border border-slate-300/80 w-[72px] h-8 shrink-0 shadow-inner"
            title={language === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
          >
            {/* Sliding Pill */}
            <div
              className={`absolute top-0.5 bottom-0.5 w-[33px] bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-md transition-transform duration-200 ease-out ${
                language === "en" ? "translate-x-[35px]" : "translate-x-0"
              }`}
            />
            <span
              className={`flex-1 text-xs font-black text-center z-10 transition-colors select-none ${
                language === "bn" ? "text-white" : "text-slate-800"
              }`}
            >
              বাং
            </span>
            <span
              className={`flex-1 text-xs font-black text-center z-10 transition-colors select-none ${
                language === "en" ? "text-white" : "text-slate-800"
              }`}
            >
              EN
            </span>
          </div>

          {/* Tiger AI Button */}
          <button
            onClick={onOpenHalumAI}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkle size={16} weight="fill" className="text-amber-300" />
            <span className="whitespace-nowrap font-bold">Tiger AI</span>
          </button>

          {/* Points & Streak Combined Pill */}
          <button
            onClick={onOpenCashout}
            title={t.cashoutTitle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Trophy size={17} weight="fill" className="text-amber-500 shrink-0" />
            <span className="whitespace-nowrap font-mono">{points} pts</span>
            <span className="text-amber-300 font-normal">|</span>
            <span className="flex items-center gap-0.5 text-orange-600 font-bold whitespace-nowrap">
              <Flame size={15} weight="fill" />
              <span>{streak}</span>
            </span>
          </button>

          {/* Direct Prebook Pill */}
          <a
            href="#hero-booking"
            className="hidden sm:flex items-center gap-1 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-xs active:scale-95 transition-all whitespace-nowrap"
            title="Pre-Book (199 BDT)"
          >
            <span>{language === "bn" ? "১৯৯৳" : "199৳"}</span>
            <span className="text-xs font-medium opacity-90">{language === "bn" ? "বুকিং" : "Book"}</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-600">Language / ভাষা:</span>
            {/* Slider Switch in Mobile Drawer */}
            <div
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="relative flex items-center bg-slate-200 p-0.5 rounded-full cursor-pointer select-none transition-colors border border-slate-300 w-[72px] h-8 shrink-0"
            >
              <div
                className={`absolute top-0.5 bottom-0.5 w-[33px] bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-sm transition-transform duration-200 ${
                  language === "en" ? "translate-x-[35px]" : "translate-x-0"
                }`}
              />
              <span className={`flex-1 text-xs font-black text-center z-10 ${language === "bn" ? "text-white" : "text-slate-800"}`}>
                বাং
              </span>
              <span className={`flex-1 text-xs font-black text-center z-10 ${language === "en" ? "text-white" : "text-slate-800"}`}>
                EN
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🏠 {t.navHome}
            </Link>
            <Link
              href="/problems"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🧮 {t.navMath} ({language === "bn" ? "১০০০+" : "1000+"})
            </Link>
            <Link
              href="/physics"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              ⚛️ {t.navPhysics} ({language === "bn" ? "১০০" : "100"})
            </Link>
            <Link
              href="/mock-tests"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              📝 {t.navMockTests}
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🏆 {t.navLeaderboard}
            </Link>
            <Link
              href="/#course"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🎓 {t.navCourse}
            </Link>
            <Link
              href="/resources"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              📚 {t.navResources}
            </Link>
            <Link
              href="/sudoku"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🎮 {t.navSudoku}
            </Link>
            <Link
              href="/qa"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              💬 {t.navQa}
            </Link>
            <Link
              href="/status"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-purple-50 whitespace-nowrap"
            >
              🔍 {t.statusCheck}
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
              className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full whitespace-nowrap"
            >
              {language === "bn" ? "ক্যাশআউট: ১০০৳ bKash" : "Cashout: 100 BDT"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}