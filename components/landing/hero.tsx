"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  Trophy,
  PuzzlePiece,
  ChatsCircle,
  ChartLineUp,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";

export function Hero() {
  return (
    <div className="w-full">
      {/* GonitZoggo Signature Hero Banner */}
      <section className="bg-gradient-to-r from-[#005a9e] via-[#0072c6] to-[#0284c7] text-white py-14 sm:py-20 relative overflow-hidden shadow-inner">
        {/* Subtle geometric math grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badge */}
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="font-shadhinata font-bold">যুক্তির শক্তিতে চিন্তা করতে শেখা</span>
                  <span className="text-white/60">•</span>
                  <span className="text-amber-300 font-bold">প্রি-বুকিং চলছে!</span>
                </div>
              </Reveal>

              {/* Headline using Shadhinata 2.0 Matra Font */}
              <Reveal delay={100}>
                <div className="space-y-2">
                  <h1 className="font-shadhinata text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.2]">
                    The Playground for Problem Solvers
                  </h1>
                  <p className="font-shadhinata text-2xl sm:text-3xl lg:text-4xl text-amber-300 font-bold leading-snug">
                    প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬
                  </p>
                </div>
              </Reveal>

              {/* Subtitle */}
              <Reveal delay={150}>
                <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                  গণিত অলিম্পিয়াডে ভালো করার সবচেয়ে কার্যকর প্ল্যাটফর্ম। মুখস্থ নয়—যুক্তির শক্তিতে চিন্তা করো, সমস্যা বিশ্লেষণ করো এবং সমাধান করো।
                </p>
              </Reveal>

              {/* Action Buttons - GonitZoggo Signature Style */}
              <Reveal delay={200}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#prebook"
                    className="px-6 py-3 rounded-md bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white font-bold text-base shadow-md transition-all flex items-center gap-2.5 border border-emerald-400/40"
                  >
                    <span>প্রি-বুক করো</span>
                    <span className="bg-white/25 px-2 py-0.5 rounded text-xs font-black">
                      ১৯৯৳
                    </span>
                    <ArrowRight size={18} weight="bold" />
                  </a>

                  <Link
                    href="/mock-tests"
                    className="px-6 py-3 rounded-md bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-semibold text-base border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2"
                  >
                    <Trophy size={18} weight="bold" className="text-amber-300" />
                    <span>মক টেস্ট শুরু করো</span>
                  </Link>

                  <Link
                    href="/qa"
                    className="px-5 py-3 rounded-md text-white/90 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all flex items-center gap-1.5"
                  >
                    <ChatsCircle size={18} />
                    <span>কমিউনিটি প্রশ্নোত্তর</span>
                  </Link>
                </div>
              </Reveal>

              {/* Quick checklist */}
              <Reveal delay={250}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-blue-100 pt-3 border-t border-white/15">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={16} weight="fill" className="text-amber-300" />
                    <span>৭+ ঘণ্টা লাইভ ক্লাস</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={16} weight="fill" className="text-amber-300" />
                    <span>২টি পূর্ণাঙ্গ লাইভ মক টেস্ট</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={16} weight="fill" className="text-amber-300" />
                    <span>২৪/৭ মেন্টর সমাধান</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Graphic / Card - GonitZoggo Style Math Polygon */}
            <div className="lg:col-span-4 flex justify-center">
              <Reveal delay={200}>
                <div className="w-full max-w-sm rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl text-center space-y-5">
                  {/* Geometric Math Icon */}
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center text-amber-300 shadow-inner">
                    <span className="text-5xl font-serif">π</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                      অলিম্পিয়াড প্রস্তুতি প্ল্যাটফর্ম
                    </div>
                    <div className="font-shadhinata text-2xl font-bold text-white">
                      বাংলার ম্যাথ অলিম্পিয়াড
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-black/20 border border-white/10 text-left space-y-1.5 text-xs text-blue-100">
                    <div className="flex justify-between">
                      <span className="text-white/70">কোর্স ফি:</span>
                      <span className="font-bold text-amber-300 font-mono text-sm">১৯৯৳ (৮০% ছাড়)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">রেফারেন্স কোড:</span>
                      <span className="font-mono font-bold text-white">PRE_BOOK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">bKash নম্বর:</span>
                      <span className="font-mono font-bold text-white">+8801331366865</span>
                    </div>
                  </div>

                  <a
                    href="#prebook"
                    className="w-full py-2.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm block shadow-md transition-all"
                  >
                    সিট নিশ্চিত করো
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* GonitZoggo 4 Core Pillars Section: Practice, Compete, Compare, Collaborate */}
      <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0072c6]">
            অলিম্পিয়াড প্রস্তুতির ৪টি স্তম্ভ
          </div>
          <h2 className="font-shadhinata text-3xl sm:text-4xl text-[#2d2d2d] font-bold">
            গণিত অলিম্পিয়াডের পূর্ণাঙ্গ ইকোসিস্টেম
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            GonitZoggo মডেলের আদলে সাজানো আমাদের ইন্টারঅ্যাক্টিভ গণিত প্ল্যাটফর্ম
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Practice (অনুশীলন) */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0072c6] flex items-center justify-center">
                <PuzzlePiece size={28} weight="bold" />
              </div>
              <h3 className="font-shadhinata text-xl font-bold text-[#2d2d2d]">
                অনুশীলন (Practice)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                সংখ্যাতত্ত্ব, জ্যামিতি, বীজগণিত ও কম্বিনেটোরিক্স — প্রতিটি টপিকের ধাপে ধাপে গভীর সমস্যা সমাধান।
              </p>
            </div>
            <a
              href="#course"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0072c6] hover:underline pt-2"
            >
              <span>সিলেবাস দেখো</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* 2. Compete (প্রতিযোগিতা) */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy size={28} weight="bold" />
              </div>
              <h3 className="font-shadhinata text-xl font-bold text-[#2d2d2d]">
                প্রতিযোগিতা (Compete)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                অলিম্পিয়াড স্ট্যান্ডার্ড টাইমারযুক্ত লাইভ মক টেস্ট দিয়ে রিয়েল পরীক্ষার সময় ও চাপের প্রস্তুতি নাও।
              </p>
            </div>
            <Link
              href="/mock-tests"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline pt-2"
            >
              <span>মক টেস্টে অংশ নাও</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3. Compare & Progress (অগ্রগতি ও অ্যানালাইসিস) */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ChartLineUp size={28} weight="bold" />
              </div>
              <h3 className="font-shadhinata text-xl font-bold text-[#2d2d2d]">
                অগ্রগতি (Analyze)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                তাৎক্ষণিক স্কোরকার্ড, সঠিক/ভুল উত্তর বিশ্লেষণ এবং প্রতিটি প্রশ্নের সম্পূর্ণ ব্যাখ্যা ও ট্রিকস।
              </p>
            </div>
            <Link
              href="/mock-tests"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline pt-2"
            >
              <span>স্কোরকার্ড দেখো</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4. Collaborate (কমিউনিটি ও প্রশ্নোত্তর) */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <ChatsCircle size={28} weight="bold" />
              </div>
              <h3 className="font-shadhinata text-xl font-bold text-[#2d2d2d]">
                কমিউনিটি (Collaborate)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                গণিতের যে কোনো প্রশ্নে আটকে গেলে সরাসরি প্রশ্ন করো এবং অভিজ্ঞ মেন্টরদের যাচাইকৃত সমাধান পাও।
              </p>
            </div>
            <Link
              href="/qa"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline pt-2"
            >
              <span>প্রশ্নোত্তর ফোরামে যাও</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}