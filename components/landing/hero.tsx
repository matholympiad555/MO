"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";
import { ArrowRight, Exam, ChatsCircle, CheckCircle, ShieldCheck } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="container-x min-h-[calc(100vh-5rem)] flex items-center pt-12 pb-20 relative overflow-hidden">
      {/* Background soft ambient radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-100/60 via-amber-100/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{site.tagline} • প্রি-বুকিং চলছে!</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 leading-[1.15] tracking-tight">
              প্রাইমারি গণিত অলিম্পিয়াড <br />
              <span className="text-blue-700 relative inline-block mt-1">
                প্রস্তুতি কোর্স ২০২৬
              </span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-lg sm:text-xl text-slate-800 font-bold font-display leading-snug">
              গণিতকে ভয় নয়, যুক্তি দিয়ে গণিতকে জয় করো!
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed mt-2">
              ৭+ ঘণ্টার ক্লাস, রেকর্ডেড লেকচার, পূর্ণাঙ্গ মক টেস্ট এবং ২৪/৭ প্রশ্ন সমাধানের সুবিধা নিয়ে তৈরি বিশেষায়িত অলিম্পিয়াড কোর্স।
            </p>
          </Reveal>

          {/* Quick bullets */}
          <Reveal delay={200}>
            <div className="grid grid-cols-2 gap-3 pt-1 max-w-lg text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600 shrink-0" weight="fill" />
                <span>৭+ ঘণ্টার গভীর আলোচনা ও ক্লাস</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600 shrink-0" weight="fill" />
                <span>২টি পূর্ণাঙ্গ অলিম্পিয়াড মক টেস্ট</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600 shrink-0" weight="fill" />
                <span>২৪/৭ মেন্টর প্রশ্ন সমাধান সুবিধা</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600 shrink-0" weight="fill" />
                <span>যুক্তিনির্ভর চিন্তন দক্ষতা বৃদ্ধি</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#prebook"
                className="px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-display font-bold text-sm sm:text-base shadow-md shadow-blue-700/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>প্রি-বুকিং করো</span>
                <span className="bg-amber-400 text-slate-900 text-xs px-2 py-0.5 rounded-md font-black">
                  ১৯৯৳
                </span>
              </a>
              <Link
                href="/mock-tests"
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-body font-semibold text-sm border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2"
              >
                <Exam size={18} className="text-blue-600" weight="bold" />
                <span>মক টেস্ট দিন</span>
              </Link>
              <Link
                href="/qa"
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-body font-semibold text-sm border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2"
              >
                <ChatsCircle size={18} className="text-amber-600" weight="bold" />
                <span>প্রশ্নোত্তর (Q&A)</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Pricing & Course Box (Right Side) */}
        <div className="lg:col-span-5">
          <div className="card-shell p-7 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-xl shadow-slate-200/60 relative space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-mono font-bold block">
                  কোর্স ফি মাত্র
                </span>
                <div className="text-4xl sm:text-5xl font-num text-blue-700 font-black tracking-tight mt-1">
                  ১৯৯৳
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold animate-pulse">
                সীমিত আসন অফার!
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">বিকাশ Personal:</span>
                <span className="font-mono text-slate-900 font-bold text-sm">+880 1331 366865</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Payment Reference:</span>
                <span className="font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  PRE_BOOK
                </span>
              </div>
            </div>

            <a
              href="#prebook"
              className="block text-center w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-display font-black text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            >
              এখনই আসন নিশ্চিত করো →
            </a>

            <div className="pt-2 text-center">
              <Link href="/status" className="text-xs text-blue-700 hover:underline font-semibold">
                আগের পেমেন্ট ভেরিফিকেশন স্ট্যাটাস চেক করুন →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
