"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  List,
  X,
  Shield,
  Trophy,
  PuzzlePiece,
  ChatsCircle,
  MagnifyingGlass,
  ArrowRight,
  Phone,
  CheckCircle,
} from "@phosphor-icons/react";
import { site } from "@/lib/content";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0072c6] text-white shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo - GonitZoggo Style */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-white/15 border border-white/25 text-white flex items-center justify-center font-black text-xl shadow-inner group-hover:bg-white/25 transition-all">
            <span className="text-amber-300 font-serif">∑</span>
          </div>
          <div className="leading-tight">
            <div className="font-shadhinata font-bold text-white tracking-normal text-lg sm:text-xl flex items-center gap-2">
              <span>বাংলার ম্যাথ অলিম্পিয়াড</span>
            </div>
            <div className="text-[10px] text-blue-100 font-medium tracking-wide hidden sm:block">
              The Playground for Math Olympiad Solvers
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links - GonitZoggo Style */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/#course"
            className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-md text-sm font-medium transition-all"
          >
            <PuzzlePiece size={16} weight="bold" />
            <span>কোর্স ও সমস্যা</span>
          </Link>
          <Link
            href="/mock-tests"
            className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-md text-sm font-medium transition-all"
          >
            <Trophy size={16} weight="bold" />
            <span>মক টেস্ট</span>
            <span className="px-1.5 py-0.2 text-[10px] font-bold bg-amber-400 text-slate-900 rounded-full">
              লাইভ
            </span>
          </Link>
          <Link
            href="/qa"
            className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-md text-sm font-medium transition-all"
          >
            <ChatsCircle size={16} weight="bold" />
            <span>কমিউনিটি Q&A</span>
          </Link>
          <Link
            href="/status"
            className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-md text-sm font-medium transition-all"
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>স্ট্যাটাস চেক</span>
          </Link>
        </nav>

        {/* Right Action Buttons - GonitZoggo Success Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/admin"
            title="অ্যাডমিন পোর্টাল"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <Shield size={18} />
          </Link>

          <Link
            href="/#prebook"
            className="px-4 py-2 rounded-md bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2 border border-emerald-400/30"
          >
            <span>প্রি-বুক করো</span>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-black">
              ১৯৯৳
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-[#F6F6F4] text-[#2d2d2d] z-50 flex flex-col justify-between p-6 overflow-y-auto lg:hidden">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">
              ন্যাভিগেশন মেনু
            </div>
            <div className="space-y-1.5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:border-blue-400 transition-colors"
              >
                <span>হোম পেইজ</span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/#course"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <PuzzlePiece size={18} className="text-[#0072c6]" />
                  <span>কোর্স ও প্র্যাকটিস মডিউল</span>
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/mock-tests"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-amber-500" />
                  <span>অলিম্পিয়াড মক টেস্ট</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                    লাইভ
                  </span>
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/qa"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ChatsCircle size={18} className="text-[#0072c6]" />
                  <span>কমিউনিটি প্রশ্নোত্তর (Q&A)</span>
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/status"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MagnifyingGlass size={18} className="text-emerald-600" />
                  <span>বুকিং স্ট্যাটাস চেক</span>
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Phone size={14} className="text-[#0072c6]" />
                  <span>bKash হেল্পলাইন: +8801331366865</span>
                </div>
                <div className="text-slate-600">রেফারেন্স: PRE_BOOK (কোর্স ফি ১৯৯৳)</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <Link
              href="/#prebook"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-lg bg-[#28a745] hover:bg-[#218838] text-white font-bold text-center block shadow-sm text-base"
            >
              প্রি-বুকিং নিশ্চিত করো (১৯৯৳)
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-lg bg-white border border-slate-300 text-slate-600 font-semibold text-center text-xs block hover:bg-slate-50"
            >
              🛡️ অ্যাডমিন পোর্টাল
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}