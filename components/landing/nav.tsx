"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { List, X, Shield, Exam, ChatsCircle, CheckCircle, ArrowRight, Phone } from "@phosphor-icons/react";
import { navLinks, site } from "@/lib/content";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white font-display font-black flex items-center justify-center text-2xl shadow-md shadow-blue-700/20 ring-1 ring-blue-700/30 group-hover:scale-105 transition-transform">
            <span className="text-amber-400 drop-shadow-sm">B</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-black text-slate-900 tracking-tight text-base sm:text-lg flex items-center gap-1.5">
              <span>BANGLAR MATH OLYMPIAD</span>
            </div>
            <div className="text-[11px] font-semibold text-blue-700 tracking-wide">
              {site.tagline} • প্রাইমারি প্রস্তুতি ২০২৬
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <Link
            href="/"
            className="text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
          >
            হোম
          </Link>
          <Link
            href="/#course"
            className="text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
          >
            কোর্স
          </Link>
          <Link
            href="/mock-tests"
            className="text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <span>মক টেস্ট</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
              লাইভ
            </span>
          </Link>
          <Link
            href="/qa"
            className="text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <span>প্রশ্নোত্তর (Q&A)</span>
          </Link>
          <Link
            href="/status"
            className="text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
          >
            স্ট্যাটাস চেক
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/admin"
            title="অ্যাডমিন পোর্টাল"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Shield size={19} />
          </Link>

          <Link
            href="/#prebook"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-display font-bold text-sm shadow-md shadow-blue-700/20 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            <span>প্রি-বুকিং করো</span>
            <span className="bg-amber-400 text-slate-900 text-xs px-2 py-0.5 rounded-md font-black">
              ১৯৯৳
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-slate-700 p-2 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-20 bg-white z-50 flex flex-col justify-between p-6 overflow-y-auto lg:hidden border-t border-slate-200">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3">
              প্রধান মেনু
            </div>
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-slate-800 font-bold hover:bg-slate-50 transition-colors"
              >
                <span>হোম</span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/#course"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-slate-800 font-bold hover:bg-slate-50 transition-colors"
              >
                <span>কোর্স পরিচিতি ও মডিউল</span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/mock-tests"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-slate-800 font-bold hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>অনলাইন মক টেস্ট</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                    লাইভ
                  </span>
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/qa"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-slate-800 font-bold hover:bg-slate-50 transition-colors"
              >
                <span>প্রশ্নোত্তর ফোরাম (Q&A)</span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
              <Link
                href="/status"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-slate-800 font-bold hover:bg-slate-50 transition-colors"
              >
                <span>বুকিং স্ট্যাটাস চেক</span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Phone size={14} className="text-blue-700" />
                  <span>bKash হেল্পলাইন: +8801331366865</span>
                </div>
                <div className="text-blue-700">Reference: PRE_BOOK (কোর্স ফি ১৯৯৳)</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <Link
              href="/#prebook"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-center block shadow-md text-base"
            >
              প্রি-বুকিং নিশ্চিত করো (১৯৯৳)
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-center text-xs block hover:bg-slate-50"
            >
              🛡️ অ্যাডমিন পোর্টাল
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
